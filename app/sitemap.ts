import { MetadataRoute } from "next";
import { SOCIAL_MEDIAS } from "./server/get-texts-by-slug";

export default function sitemap(): MetadataRoute.Sitemap {
  const socialMediaEntries: MetadataRoute.Sitemap = SOCIAL_MEDIAS.map(
    (media) => ({
      url: `https://micro-saas-course-projectinbio-bice.vercel.app/recursos/link-na-bio-para-${media}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    })
  );

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: "https://micro-saas-course-projectinbio-bice.vercel.app/",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  return [...staticEntries, ...socialMediaEntries];
}