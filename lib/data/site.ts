export interface SiteConfig {
  name: string;
  wordmark: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
  };
  operatingHours: string;
  emergencyNotice: string;
  disclaimer: string;
  navLinks: {
    label: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "CarePoint Clinic",
  wordmark: "CarePoint Clinic",
  tagline: "Healthcare, closer to home.",
  description:
    "A multi-specialty clinic and hospital discovery directory for India. Transparent consultation fees, verified local facilities, and experienced clinicians.",
  phone: "+91 555 019 2831",
  email: "contact@carepoint.in",
  address: {
    street: "Plot 42, 3rd Cross, 100ft Road",
    locality: "Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
  },
  operatingHours: "Monday to Saturday, 8:00 AM – 8:00 PM IST",
  emergencyNotice:
    "For emergencies, call 112 immediately or go to the nearest emergency department.",
  disclaimer:
    "Demonstration website. All clinicians, patients, and content are fictional.",
  navLinks: [
    { label: "Find Doctors", href: "#find-doctors" },
    { label: "Clinics & Hospitals", href: "#clinics" },
    { label: "Lab Tests", href: "#lab-tests" },
    { label: "Health Services", href: "#services" },
  ],
};
