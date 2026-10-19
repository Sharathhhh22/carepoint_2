import { describe, it, expect } from "vitest";
import { getAssistantReply } from "@/lib/data/assistant-replies";
import { appointmentSchema } from "@/lib/validations/enquiry.schema";
import { newsletterSchema } from "@/lib/validations/newsletter.schema";

describe("Assistant keyword replies unit tests", () => {
  it("triggers emergency guidance immediately on chest pain or emergency terms", () => {
    const chestPainReply = getAssistantReply("I am having severe chest pain right now");
    expect(chestPainReply.isEmergency).toBe(true);
    expect(chestPainReply.text).toContain("Call 112 now");
    expect(chestPainReply.text).toContain("nearest emergency department");

    const breathingReply = getAssistantReply("difficulty breathing and heart attack");
    expect(breathingReply.isEmergency).toBe(true);
    expect(breathingReply.text).toContain("112");
  });

  it("handles consultation fee inquiries with transparent fee info", () => {
    const feeReply = getAssistantReply("How much is a consultation?");
    expect(feeReply.isEmergency).toBe(false);
    expect(feeReply.text).toContain("₹");
    expect(feeReply.text).toContain("Budget Filter");
  });

  it("recommends dermatology for skin rash or itching symptoms", () => {
    const skinReply = getAssistantReply("Which doctor for a skin rash?");
    expect(skinReply.isEmergency).toBe(false);
    expect(skinReply.text).toContain("Dermatologist");
    expect(skinReply.action?.specialitySlug).toBe("dermatology");
  });

  it("explains cashless insurance policy demonstration status", () => {
    const insuranceReply = getAssistantReply("Is cashless insurance accepted?");
    expect(insuranceReply.isEmergency).toBe(false);
    expect(insuranceReply.text).toContain("Cashless insurance (demo)");
  });

  it("provides helpful default fallback for generic queries", () => {
    const defaultReply = getAssistantReply("Hello there");
    expect(defaultReply.isEmergency).toBe(false);
    expect(defaultReply.text).toContain("CarePoint demo assistant");
  });
});

describe("Form validation schemas unit tests", () => {
  describe("appointmentSchema", () => {
    it("validates valid appointment submission", () => {
      const validData = {
        patientName: "Sunita Deshmukh",
        phone: "+91 555 019 2831",
        email: "sunita@example.com",
        city: "Bengaluru",
        consultationType: "in-clinic",
        date: "2026-10-25",
        timeSlot: "10:30 AM",
        notes: "Routine health checkup",
      };

      const result = appointmentSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("rejects invalid patient name under 2 characters", () => {
      const invalidData = {
        patientName: "A",
        phone: "+91 555 019 2831",
        email: "a@example.com",
        city: "Bengaluru",
        consultationType: "in-clinic",
        date: "2026-10-25",
        timeSlot: "10:30 AM",
      };

      const result = appointmentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 2 characters");
      }
    });

    it("rejects invalid email address", () => {
      const invalidData = {
        patientName: "Sunita Deshmukh",
        phone: "+91 555 019 2831",
        email: "not-an-email",
        city: "Bengaluru",
        consultationType: "in-clinic",
        date: "2026-10-25",
        timeSlot: "10:30 AM",
      };

      const result = appointmentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("newsletterSchema", () => {
    it("validates valid email address", () => {
      const result = newsletterSchema.safeParse({ email: "hello@example.com" });
      expect(result.success).toBe(true);
    });

    it("rejects invalid email address", () => {
      const result = newsletterSchema.safeParse({ email: "invalid-email" });
      expect(result.success).toBe(false);
    });
  });
});
