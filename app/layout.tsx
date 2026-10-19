import type { Metadata } from "next";
import { Hind } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ToastProvider } from "@/components/ui/Toast";
import { SkipLink } from "@/components/layout/SkipLink";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";

const hind = Hind({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CarePoint | Multi-Specialty Clinics and Hospitals in India (Demo)",
  description:
    "Discover verified multi-specialty clinics, experienced clinicians, and transparent consultation fees in ₹ across Indian cities. Fictional demonstration portal for RYNX Digital Media.",
  keywords: [
    "CarePoint",
    "clinic discovery India",
    "hospital directory",
    "doctor consultation fee",
    "transparent healthcare India",
    "demo healthcare website",
  ],
  authors: [{ name: "RYNX Digital Media (Category 7 Demo)" }],
  openGraph: {
    title: "CarePoint | Multi-Specialty Clinics and Hospitals in India (Demo)",
    description:
      "Discover verified clinics, experienced doctors, and transparent consultation fees in ₹ across Bengaluru, Mumbai, and New Delhi.",
    type: "website",
    locale: "en_IN",
    siteName: "CarePoint Healthcare Demo",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD MedicalClinic schema using strictly fictional sample data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "CarePoint Healthcare Directory (Demo)",
    description:
      "A frontend demonstration platform for clinic and doctor discovery across India.",
    url: "https://carepoint.example.com",
    telephone: "+91 555 019 2831",
    priceRange: "₹400 - ₹1,500",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot 42, 3rd Cross, 100ft Road",
      addressLocality: "Indiranagar",
      addressRegion: "Bengaluru",
      postalCode: "560038",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
  };

  return (
    <html lang="en" className={hind.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-cream text-ink" suppressHydrationWarning>
        <LanguageProvider>
          <ToastProvider>
            <SkipLink />
            <ScrollProgress />
            <TopBar />
            <Header />
            <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <BackToTop />
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
