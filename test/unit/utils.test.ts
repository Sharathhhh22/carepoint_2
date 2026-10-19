import { describe, it, expect } from "vitest";
import {
  formatINR,
  slugify,
  matchesBudget,
  filterFacilities,
  filterDoctors,
  haversineKm,
  openNowStatus,
  sortByFee,
  sortByDistance,
} from "@/lib/utils";
import { facilitiesData, OpeningHours } from "@/lib/data/facilities";
import { doctorsData } from "@/lib/data/doctors";
import { getGlossaryItem } from "@/lib/data/glossary";

describe("lib/utils unit tests", () => {
  describe("formatINR", () => {
    it("formats Indian rupees correctly without decimals", () => {
      const formatted500 = formatINR(500);
      expect(formatted500).toContain("₹");
      expect(formatted500).toContain("500");

      const formatted1000 = formatINR(1000);
      expect(formatted1000).toContain("₹");
      expect(formatted1000).toContain("1,000");

      const formatted1250 = formatINR(1250);
      expect(formatted1250).toContain("₹");
      expect(formatted1250).toContain("1,250");
    });

    it("formats Indian numbers with en-IN grouping (₹1,00,000)", () => {
      const formattedOneLakh = formatINR(100000);
      expect(formattedOneLakh).toContain("₹");
      expect(formattedOneLakh).toContain("1,00,000");
    });
  });

  describe("haversineKm", () => {
    it("calculates zero distance for identical coordinates", () => {
      expect(haversineKm(12.9784, 77.6408, 12.9784, 77.6408)).toBe(0);
    });

    it("calculates accurate straight-line distance between Bengaluru localities", () => {
      // Indiranagar (12.9784, 77.6408) to Koramangala (12.9352, 77.6245)
      const dist = haversineKm(12.9784, 77.6408, 12.9352, 77.6245);
      expect(dist).toBeGreaterThan(4);
      expect(dist).toBeLessThan(6);
      expect(dist).toBe(5.1);
    });

    it("calculates distance between Bengaluru and Mumbai", () => {
      // Bengaluru to Mumbai is roughly 840-850 km straight-line
      const dist = haversineKm(12.9716, 77.5946, 19.0760, 72.8777);
      expect(dist).toBeGreaterThan(830);
      expect(dist).toBeLessThan(860);
    });
  });

  describe("openNowStatus with fixed clock", () => {
    const sampleHours: OpeningHours = {
      mon: ["08:30", "19:30"],
      tue: ["08:30", "19:30"],
      wed: ["08:30", "19:30"],
      thu: ["08:30", "19:30"],
      fri: ["08:30", "19:30"],
      sat: ["08:30", "19:30"],
      sun: null,
    };

    it("reports open when current time in Asia/Kolkata is within operating hours", () => {
      // Monday 10:30 AM IST
      const monday1030 = new Date("2026-10-19T10:30:00+05:30");
      const status = openNowStatus(sampleHours, monday1030);
      expect(status.isOpen).toBe(true);
      expect(status.text).toBe("Open now until 7:30 PM");
    });

    it("reports closed when current time is past closing time on the same day", () => {
      // Monday 8:45 PM IST
      const monday2045 = new Date("2026-10-19T20:45:00+05:30");
      const status = openNowStatus(sampleHours, monday2045);
      expect(status.isOpen).toBe(false);
      expect(status.text).toBe("Closed. Opens Tomorrow 8:30 AM");
    });

    it("reports closed and next opening day when closed on Sunday", () => {
      // Sunday 11:00 AM IST
      const sunday1100 = new Date("2026-10-18T11:00:00+05:30");
      const status = openNowStatus(sampleHours, sunday1100);
      expect(status.isOpen).toBe(false);
      expect(status.text).toBe("Closed. Opens Tomorrow 8:30 AM");
    });

    it("reports 24/7 status for emergency desk hospitals", () => {
      const hospitalHours: OpeningHours = {
        mon: ["00:00", "23:59"],
        tue: ["00:00", "23:59"],
        wed: ["00:00", "23:59"],
        thu: ["00:00", "23:59"],
        fri: ["00:00", "23:59"],
        sat: ["00:00", "23:59"],
        sun: ["00:00", "23:59"],
      };
      const anyTime = new Date("2026-10-19T03:15:00+05:30");
      const status = openNowStatus(hospitalHours, anyTime);
      expect(status.isOpen).toBe(true);
      expect(status.text).toBe("Open now 24/7");
    });
  });

  describe("sortByFee and sortByDistance", () => {
    it("sorts items by fee in ascending order with nulls last", () => {
      const items = [{ fee: 850 }, { fee: null }, { fee: 400 }, { fee: 1200 }];
      const sorted = sortByFee(items, "asc");
      expect(sorted.map((i) => i.fee)).toEqual([400, 850, 1200, null]);
    });

    it("sorts items by fee in descending order with nulls last", () => {
      const items = [{ fee: 850 }, { fee: null }, { fee: 400 }, { fee: 1200 }];
      const sorted = sortByFee(items, "desc");
      expect(sorted.map((i) => i.fee)).toEqual([1200, 850, 400, null]);
    });

    it("sorts items by distance ascending", () => {
      const items = [
        { name: "Far", distanceKm: 8.4 },
        { name: "Closest", distanceKm: 1.2 },
        { name: "Middle", distanceKm: 4.5 },
      ];
      const sorted = sortByDistance(items);
      expect(sorted[0].name).toBe("Closest");
      expect(sorted[1].name).toBe("Middle");
      expect(sorted[2].name).toBe("Far");
    });
  });

  describe("glossary lookup", () => {
    it("retrieves plain explanation for required medical terms", () => {
      const opd = getGlossaryItem("opd");
      expect(opd).toBeDefined();
      expect(opd?.plainExplanation).toContain("Outpatient visit");

      const followUp = getGlossaryItem("follow-up");
      expect(followUp).toBeDefined();
      expect(followUp?.plainExplanation).toContain("subsequent review consultation");

      const cashless = getGlossaryItem("cashless-claim");
      expect(cashless).toBeDefined();

      const preAuth = getGlossaryItem("pre-authorisation");
      expect(preAuth).toBeDefined();

      const gp = getGlossaryItem("general-physician");
      expect(gp).toBeDefined();

      const specialist = getGlossaryItem("specialist");
      expect(specialist).toBeDefined();

      const fee = getGlossaryItem("consultation-fee");
      expect(fee).toBeDefined();
    });

    it("returns undefined for unknown glossary terms", () => {
      expect(getGlossaryItem("non-existent-term-xyz")).toBeUndefined();
    });

    it("contains translations for all 5 supported languages in glossary", () => {
      const opd = getGlossaryItem("opd");
      expect(opd?.translations.en).toBeDefined();
      expect(opd?.translations.hi).toBeDefined();
      expect(opd?.translations.kn).toBeDefined();
      expect(opd?.translations.ta).toBeDefined();
      expect(opd?.translations.te).toBeDefined();
    });
  });

  describe("slugify", () => {
    it("converts doctor and facility names into valid URL slugs", () => {
      expect(slugify("Dr. Arvind Somayaji")).toBe("dr-arvind-somayaji");
      expect(slugify("Mayura Valley Community Clinic")).toBe("mayura-valley-community-clinic");
      expect(slugify("Cardiology & Heart Health!")).toBe("cardiology-heart-health");
    });
  });

  describe("matchesBudget", () => {
    it("returns true for any budget if fee is present or null", () => {
      expect(matchesBudget(400, "any")).toBe(true);
      expect(matchesBudget(null, "any")).toBe(true);
    });

    it("evaluates under-500 bracket correctly", () => {
      expect(matchesBudget(400, "under-500")).toBe(true);
      expect(matchesBudget(500, "under-500")).toBe(false);
      expect(matchesBudget(null, "under-500")).toBe(false);
    });

    it("evaluates 500-1000 bracket correctly", () => {
      expect(matchesBudget(500, "500-1000")).toBe(true);
      expect(matchesBudget(750, "500-1000")).toBe(true);
      expect(matchesBudget(1000, "500-1000")).toBe(true);
      expect(matchesBudget(1100, "500-1000")).toBe(false);
      expect(matchesBudget(null, "500-1000")).toBe(false);
    });

    it("evaluates above-1000 bracket correctly", () => {
      expect(matchesBudget(1100, "above-1000")).toBe(true);
      expect(matchesBudget(1000, "above-1000")).toBe(false);
      expect(matchesBudget(null, "above-1000")).toBe(false);
    });
  });

  describe("filterFacilities", () => {
    it("filters facilities by city correctly", () => {
      const blrFacilities = filterFacilities(facilitiesData, { city: "Bengaluru" });
      expect(blrFacilities.length).toBeGreaterThan(0);
      expect(blrFacilities.every((f) => f.city === "Bengaluru")).toBe(true);
    });

    it("filters facilities by locality correctly", () => {
      const indiranagar = filterFacilities(facilitiesData, { locality: "Indiranagar" });
      expect(indiranagar.length).toBe(1);
      expect(indiranagar[0].name).toBe("Mayura Valley Community Clinic");
    });

    it("filters facilities by speciality correctly", () => {
      const cardioFacilities = filterFacilities(facilitiesData, { speciality: "Cardiology" });
      expect(cardioFacilities.length).toBeGreaterThan(0);
      expect(
        cardioFacilities.every((f) => f.specialities.includes("Cardiology"))
      ).toBe(true);
    });

    it("hides facilities with null fee when budget is set", () => {
      const anyBudget = filterFacilities(facilitiesData, { budget: "any" });
      const under500 = filterFacilities(facilitiesData, { budget: "under-500" });

      const hasNullInAny = anyBudget.some((f) => f.fee === null);
      const hasNullInUnder500 = under500.some((f) => f.fee === null);

      expect(hasNullInAny).toBe(true);
      expect(hasNullInUnder500).toBe(false);
    });

    it("searches across name, locality, and address case-insensitively", () => {
      const matches = filterFacilities(facilitiesData, { query: "mayura" });
      expect(matches.length).toBe(1);
      expect(matches[0].name).toContain("Mayura");
    });
  });

  describe("filterDoctors", () => {
    it("filters doctors by city", () => {
      const mumbaiDocs = filterDoctors(doctorsData, { city: "Mumbai" });
      expect(mumbaiDocs.length).toBeGreaterThan(0);
      expect(mumbaiDocs.every((d) => d.city === "Mumbai")).toBe(true);
    });

    it("filters doctors by specialty", () => {
      const gynDocs = filterDoctors(doctorsData, { specialty: "Gynaecology" });
      expect(gynDocs.length).toBe(1);
      expect(gynDocs[0].name).toBe("Dr. Malini Kedarnath");
    });

    it("filters by female doctor toggle", () => {
      const femaleOnly = filterDoctors(doctorsData, { femaleDoctor: true });
      expect(femaleOnly.length).toBeGreaterThan(0);
      expect(femaleOnly.every((d) => d.femaleDoctor === true)).toBe(true);
    });

    it("filters by language spoken", () => {
      const kannadaDocs = filterDoctors(doctorsData, { language: "Kannada" });
      expect(kannadaDocs.length).toBeGreaterThan(0);
      expect(kannadaDocs.every((d) => d.languages.includes("Kannada"))).toBe(true);
    });

    it("filters by budget correctly", () => {
      const under500 = filterDoctors(doctorsData, { budget: "under-500" });
      expect(under500.length).toBeGreaterThan(0);
      expect(under500.every((d) => d.fee < 500)).toBe(true);

      const above1000 = filterDoctors(doctorsData, { budget: "above-1000" });
      expect(above1000.length).toBeGreaterThan(0);
      expect(above1000.every((d) => d.fee > 1000)).toBe(true);
    });

    it("filters by state and facilityId", () => {
      const karnatakaDocs = filterDoctors(doctorsData, { state: "Karnataka" });
      expect(karnatakaDocs.length).toBeGreaterThan(0);
      expect(karnatakaDocs.every((d) => d.state === "Karnataka" || d.city === "Bengaluru")).toBe(true);

      const facDocs = filterDoctors(doctorsData, { facilityId: "fac-blr-02" });
      expect(facDocs.length).toBeGreaterThan(0);
      expect(facDocs.every((d) => d.facilityId === "fac-blr-02")).toBe(true);
    });
  });

  describe("state and facility filtering extensions", () => {
    it("filters facilities by state correctly", () => {
      const karnatakaFacilities = filterFacilities(facilitiesData, { state: "Karnataka" });
      expect(karnatakaFacilities.length).toBeGreaterThan(0);
      expect(karnatakaFacilities.every((f) => f.state === "Karnataka")).toBe(true);

      const maharashtraFacilities = filterFacilities(facilitiesData, { state: "Maharashtra" });
      expect(maharashtraFacilities.length).toBeGreaterThan(0);
      expect(maharashtraFacilities.every((f) => f.state === "Maharashtra")).toBe(true);
    });

    it("filters facilities by facility type correctly", () => {
      const hospitalsOnly = filterFacilities(facilitiesData, { type: "Hospital" });
      expect(hospitalsOnly.length).toBeGreaterThan(0);
      expect(hospitalsOnly.every((f) => f.type === "Hospital")).toBe(true);

      const clinicsOnly = filterFacilities(facilitiesData, { type: "Clinic" });
      expect(clinicsOnly.length).toBeGreaterThan(0);
      expect(clinicsOnly.every((f) => f.type === "Clinic")).toBe(true);
    });
  });
});
