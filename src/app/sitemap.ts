import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lens.theconflux.com";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Future pages:
    // { url: `${baseUrl}/docs`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    // { url: `${baseUrl}/docs/quickstart`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    // { url: `${baseUrl}/docs/install`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    // { url: `${baseUrl}/docs/configuration`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    // { url: `${baseUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    // { url: `${baseUrl}/blog/introducing-conflux-lens`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
