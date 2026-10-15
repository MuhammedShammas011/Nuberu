import { MetadataRoute } from 'next';
import { servicesData } from '@/app/data/servicesData';
import { insightsData } from '@/app/data/insightsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nuberu.tech';

  const staticPages = [
    '',
    '/about',
    '/services',
    '/insights',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const servicePages = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const insightPages = insightsData.map((i) => ({
    url: `${baseUrl}/insights/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...insightPages];
}
