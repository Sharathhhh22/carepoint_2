import { MetadataRoute } from "next";
import { doctorsData } from "@/lib/data/doctors";
import { facilitiesData } from "@/lib/data/facilities";
import { specialitiesData } from "@/lib/data/specialities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://carepoint.example.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/doctors`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hospitals`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/specialties`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  const doctorPages: MetadataRoute.Sitemap = doctorsData.map((doc) => ({
    url: `${baseUrl}/doctors/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const facilityPages: MetadataRoute.Sitemap = facilitiesData.map((fac) => ({
    url: `${baseUrl}/hospitals/${fac.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const specialtyPages: MetadataRoute.Sitemap = specialitiesData.map((spec) => ({
    url: `${baseUrl}/specialties/${spec.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...doctorPages, ...facilityPages, ...specialtyPages];
}
