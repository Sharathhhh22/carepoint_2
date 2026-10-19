import { describe, it, expect } from "vitest";
import {
  formatINR,
  slugify,
  matchesBudget,
  filterFacilities,
  filterDoctors,
} from "@/lib/utils";
import { facilitiesData } from "@/lib/data/facilities";
import { doctorsData } from "@/lib/data/doctors";

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
  });
});
