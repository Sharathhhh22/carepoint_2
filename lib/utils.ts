import { Facility, OpeningHours, Weekday } from "./data/facilities";
import { Doctor } from "./data/doctors";

/**
 * Format a numeric amount into Indian Rupee currency format (e.g. ₹500 or ₹1,00,000).
 * Strictly uses Intl.NumberFormat with "en-IN" and "INR".
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Normalise a string into an ASCII URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Computes great-circle straight-line distance between two geographic coordinates
 * in kilometers using the Haversine formula.
 * Earth radius = 6371 km.
 * Returns distance rounded to 1 decimal place.
 */
export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

const WEEKDAY_KEYS: Weekday[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const WEEKDAY_NAMES: Record<Weekday, string> = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

/**
 * Formats a 24-hour time string ("20:00" or "08:30") into 12-hour format ("8:00 PM" or "8:30 AM").
 */
export function formatTime12(time24: string): string {
  const [hourStr, minStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const min = minStr || "00";
  const ampm = hour >= 12 ? "PM" : "AM";
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }
  return `${hour}:${min} ${ampm}`;
}

/**
 * Returns whether a facility is currently open and a human-readable status string
 * based on Asia/Kolkata timezone or a passed-in Date.
 * e.g. "Open now until 8:00 PM" or "Closed. Opens Monday 9:00 AM".
 */
export function openNowStatus(
  openingHours: OpeningHours,
  nowDate: Date = new Date()
): { isOpen: boolean; text: string } {
  // Format current time in Asia/Kolkata timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(nowDate);
  let weekdayStr = "";
  let hourStr = "00";
  let minStr = "00";

  for (const part of parts) {
    if (part.type === "weekday") weekdayStr = part.value.toLowerCase().slice(0, 3);
    if (part.type === "hour") hourStr = part.value;
    if (part.type === "minute") minStr = part.value;
  }

  // Handle midnight 24 format issue in some environments
  if (hourStr === "24") hourStr = "00";

  const currentMinutes = parseInt(hourStr, 10) * 60 + parseInt(minStr, 10);
  const currentWeekday = (weekdayStr as Weekday) || "mon";
  const currentDayIndex = WEEKDAY_KEYS.indexOf(currentWeekday);

  const todayHours = openingHours[currentWeekday];

  if (todayHours) {
    const [startStr, endStr] = todayHours;
    const [startH, startM] = startStr.split(":").map(Number);
    const [endH, endM] = endStr.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    // 24/7 check
    if (startStr === "00:00" && endStr === "23:59") {
      return { isOpen: true, text: "Open now 24/7" };
    }

    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      return {
        isOpen: true,
        text: `Open now until ${formatTime12(endStr)}`,
      };
    }

    if (currentMinutes < startMinutes) {
      return {
        isOpen: false,
        text: `Closed. Opens today ${formatTime12(startStr)}`,
      };
    }
  }

  // If closed or past today's closing time, look for next opening slot within the next 7 days
  for (let offset = 1; offset <= 7; offset++) {
    const nextDayIndex = (currentDayIndex + offset) % 7;
    const nextWeekday = WEEKDAY_KEYS[nextDayIndex];
    const nextHours = openingHours[nextWeekday];

    if (nextHours) {
      const [startStr] = nextHours;
      const capitalizedDay =
        offset === 1 ? "Tomorrow" : WEEKDAY_NAMES[nextWeekday];
      return {
        isOpen: false,
        text: `Closed. Opens ${capitalizedDay} ${formatTime12(startStr)}`,
      };
    }
  }

  return { isOpen: false, text: "Closed" };
}

export type BudgetRange = "any" | "under-500" | "500-1000" | "above-1000";
export type SortOption = "default" | "fee-asc" | "fee-desc" | "nearest";

export interface FacilityFilterOptions {
  query?: string;
  state?: string;
  city?: string;
  locality?: string;
  speciality?: string;
  type?: string;
  budget?: BudgetRange;
  sortBy?: SortOption;
  userCoords?: { latitude: number; longitude: number } | null;
}

export interface DoctorFilterOptions {
  query?: string;
  state?: string;
  city?: string;
  specialty?: string;
  facilityId?: string;
  femaleDoctor?: boolean;
  language?: string;
  budget?: BudgetRange;
  sortBy?: SortOption;
}

/**
 * Matches a fee against a selected budget range.
 * Returns false if fee is null or not in range.
 */
export function matchesBudget(fee: number | null, budget: BudgetRange): boolean {
  if (budget === "any") return true;
  if (fee === null || fee === undefined) return false;

  switch (budget) {
    case "under-500":
      return fee < 500;
    case "500-1000":
      return fee >= 500 && fee <= 1000;
    case "above-1000":
      return fee > 1000;
    default:
      return true;
  }
}

/**
 * Sorts items by consultation fee.
 * Items with null fees are placed at the end in both directions.
 */
export function sortByFee<T extends { fee: number | null }>(
  items: T[],
  direction: "asc" | "desc"
): T[] {
  return [...items].sort((a, b) => {
    if (a.fee === null && b.fee === null) return 0;
    if (a.fee === null) return 1;
    if (b.fee === null) return -1;
    return direction === "asc" ? a.fee - b.fee : b.fee - a.fee;
  });
}

/**
 * Sorts items by computed distance (distanceKm) ascending.
 */
export function sortByDistance<T extends { distanceKm?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const distA = a.distanceKm !== undefined ? a.distanceKm : Infinity;
    const distB = b.distanceKm !== undefined ? b.distanceKm : Infinity;
    return distA - distB;
  });
}

/**
 * Filter and sort facilities based on query, city, locality, speciality, budget, and sort options.
 */
export function filterFacilities(
  facilities: Facility[],
  options: FacilityFilterOptions
): (Facility & { distanceKm?: number })[] {
  const {
    query,
    state,
    city,
    locality,
    speciality,
    type,
    budget = "any",
    sortBy = "default",
    userCoords,
  } = options;
  const cleanQuery = query?.trim().toLowerCase() || "";

  // 1. Filter
  const filtered = facilities.filter((facility) => {
    // State match
    if (state && state !== "all" && facility.state && facility.state.toLowerCase() !== state.toLowerCase()) {
      return false;
    }

    // Type match
    if (type && type !== "all" && facility.type.toLowerCase() !== type.toLowerCase()) {
      return false;
    }

    // City match
    if (city && city !== "all" && facility.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }

    // Locality match
    if (
      locality &&
      locality !== "all" &&
      facility.locality.toLowerCase() !== locality.toLowerCase()
    ) {
      return false;
    }

    // Speciality match
    if (speciality && speciality !== "all") {
      const hasSpeciality = facility.specialities.some(
        (s) => s.toLowerCase() === speciality.toLowerCase()
      );
      if (!hasSpeciality) return false;
    }

    // Budget match
    if (budget !== "any" && !matchesBudget(facility.fee, budget)) {
      return false;
    }

    // Free text query match across name, type, locality, city, address, specialities
    if (cleanQuery) {
      const matchName = facility.name.toLowerCase().includes(cleanQuery);
      const matchType = facility.type.toLowerCase().includes(cleanQuery);
      const matchLocality = facility.locality.toLowerCase().includes(cleanQuery);
      const matchCity = facility.city.toLowerCase().includes(cleanQuery);
      const matchAddress = facility.address.toLowerCase().includes(cleanQuery);
      const matchSpec = facility.specialities.some((s) =>
        s.toLowerCase().includes(cleanQuery)
      );

      if (!matchName && !matchType && !matchLocality && !matchCity && !matchAddress && !matchSpec) {
        return false;
      }
    }

    return true;
  });

  // 2. Attach computed distance if userCoords are available
  const withDistance: (Facility & { distanceKm?: number })[] = filtered.map((fac) => {
    if (userCoords) {
      const dist = haversineKm(
        userCoords.latitude,
        userCoords.longitude,
        fac.latitude,
        fac.longitude
      );
      return { ...fac, distanceKm: dist };
    }
    return { ...fac, distanceKm: undefined };
  });

  // 3. Sort
  if (sortBy === "fee-asc") {
    return sortByFee(withDistance, "asc");
  }
  if (sortBy === "fee-desc") {
    return sortByFee(withDistance, "desc");
  }
  if (sortBy === "nearest") {
    return sortByDistance(withDistance);
  }

  return withDistance;
}

/**
 * Filter and sort doctors based on search query, city, specialty, femaleDoctor, language, budget, and sort options.
 */
export function filterDoctors(
  doctors: Doctor[],
  options: DoctorFilterOptions
): Doctor[] {
  const {
    query,
    state,
    city,
    specialty,
    facilityId,
    femaleDoctor,
    language,
    budget = "any",
    sortBy = "default",
  } = options;
  const cleanQuery = query?.trim().toLowerCase() || "";

  // 1. Filter
  const filtered = doctors.filter((doc) => {
    // State match
    if (state && state !== "all") {
      const docState =
        doc.state ||
        (doc.city === "Bengaluru"
          ? "Karnataka"
          : doc.city === "Mumbai"
          ? "Maharashtra"
          : doc.city === "New Delhi"
          ? "Delhi NCR"
          : "");
      if (docState.toLowerCase() !== state.toLowerCase()) {
        return false;
      }
    }

    // Facility match
    if (facilityId && facilityId !== "all" && doc.facilityId !== facilityId) {
      return false;
    }

    // City match
    if (city && city !== "all" && doc.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }

    // Specialty match
    if (specialty && specialty !== "all") {
      if (doc.specialty.toLowerCase() !== specialty.toLowerCase()) {
        return false;
      }
    }

    // Female doctor toggle
    if (femaleDoctor && !doc.femaleDoctor) {
      return false;
    }

    // Language match
    if (language && language !== "all") {
      const speaksLanguage = doc.languages.some(
        (l) => l.toLowerCase() === language.toLowerCase()
      );
      if (!speaksLanguage) return false;
    }

    // Budget match
    if (budget !== "any" && !matchesBudget(doc.fee, budget)) {
      return false;
    }

    // Free text query match across name, qualification, specialty, bio, city
    if (cleanQuery) {
      const matchName = doc.name.toLowerCase().includes(cleanQuery);
      const matchQual = doc.qualification.toLowerCase().includes(cleanQuery);
      const matchSpec = doc.specialty.toLowerCase().includes(cleanQuery);
      const matchBio = doc.bio.toLowerCase().includes(cleanQuery);
      const matchCity = doc.city.toLowerCase().includes(cleanQuery);

      if (!matchName && !matchQual && !matchSpec && !matchBio && !matchCity) {
        return false;
      }
    }

    return true;
  });

  // 2. Sort
  if (sortBy === "fee-asc") {
    return sortByFee(filtered, "asc");
  }
  if (sortBy === "fee-desc") {
    return sortByFee(filtered, "desc");
  }

  return filtered;
}
