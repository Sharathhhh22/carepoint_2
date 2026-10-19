import { Facility } from "./data/facilities";
import { Doctor } from "./data/doctors";

/**
 * Format a numeric amount into Indian Rupee currency format (e.g. ₹500).
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

export type BudgetRange = "any" | "under-500" | "500-1000" | "above-1000";

export interface FacilityFilterOptions {
  query?: string;
  city?: string;
  locality?: string;
  speciality?: string;
  budget?: BudgetRange;
}

export interface DoctorFilterOptions {
  query?: string;
  city?: string;
  specialty?: string;
  femaleDoctor?: boolean;
  language?: string;
  budget?: BudgetRange;
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
 * Filter facilities based on search query, city, locality, speciality, and budget.
 */
export function filterFacilities(
  facilities: Facility[],
  options: FacilityFilterOptions
): Facility[] {
  const { query, city, locality, speciality, budget = "any" } = options;
  const cleanQuery = query?.trim().toLowerCase() || "";

  return facilities.filter((facility) => {
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
}

/**
 * Filter doctors based on search query, city, specialty, femaleDoctor, language, and budget.
 */
export function filterDoctors(
  doctors: Doctor[],
  options: DoctorFilterOptions
): Doctor[] {
  const { query, city, specialty, femaleDoctor, language, budget = "any" } = options;
  const cleanQuery = query?.trim().toLowerCase() || "";

  return doctors.filter((doc) => {
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
}
