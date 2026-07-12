import { MetadataRoute } from "next";

const BASE = "https://www.jelevenmedia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                                   lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/services/web-development`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/maintenance`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/hosting`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/seo`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/social-media`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
