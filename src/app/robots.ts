import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  const baseUrl =
    envUrl && !envUrl.includes("localhost")
      ? envUrl
      : "https://avnivo.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/out/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

