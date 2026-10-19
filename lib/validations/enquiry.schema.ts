import { z } from "zod";

export const appointmentSchema = z.object({
  patientName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name cannot exceed 60 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(
      /^(?:\+91[\s-]?)?[6-9]\d{9}$|^\+91[\s-]?555[\s-]?\d{3}[\s-]?\d{4}$/,
      "Please enter a valid 10-digit Indian mobile number or +91 555 sample number"
    ),
  email: z.string().email("Please enter a valid email address (e.g., patient@example.com)"),
  city: z.string().min(1, "Please select or confirm your city"),
  consultationType: z.enum(["in-clinic", "online"], {
    message: "Please choose whether you prefer an in-clinic or online consultation",
  }),
  date: z.string().min(1, "Please select a consultation date"),
  timeSlot: z.string().min(1, "Please select an available appointment time slot"),
  notes: z
    .string()
    .max(300, "Notes cannot exceed 300 characters")
    .optional()
    .or(z.literal("")),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
