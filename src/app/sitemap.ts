import { MetadataRoute } from 'next';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { BUYING_GUIDES } from '@/data/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://avnivo.in';

  // 10 Core Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/buying-guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
  ];

  // Dynamic Category Pages (8 categories)
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Product Review Pages
  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/reviews/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic Buying Guides
  const guidePages: MetadataRoute.Sitemap = BUYING_GUIDES.map((guide) => ({
    url: `${baseUrl}/buying-guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...guidePages];
}

