import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://coverly.com'
  
  // Define all your static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/customize`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Add dynamic routes for supported phone models
  const phoneModels = [
    'iphone-15-pro-max',
    'iphone-15-pro',
    'iphone-15-plus',
    'iphone-15',
    'iphone-14-pro-max',
    'iphone-14-pro',
    'iphone-14-plus',
    'iphone-14',
    'iphone-13-pro-max',
    'iphone-13-pro',
    'iphone-13',
    'iphone-13-mini',
    'galaxy-s24-ultra',
    'galaxy-s24-plus',
    'galaxy-s24',
    'galaxy-s23-ultra',
    'galaxy-s23-plus',
    'galaxy-s23',
    'galaxy-z-fold-5',
    'galaxy-z-flip-5',
    'galaxy-a54-5g',
    'xiaomi-14-pro',
    'xiaomi-14',
    'xiaomi-13-pro',
    'xiaomi-13',
    'redmi-note-13-pro-plus',
    'redmi-note-13-pro',
    'poco-f5-pro',
    'poco-f5',
  ]

  const dynamicRoutes = phoneModels.map((model) => ({
    url: `${baseUrl}/customize/${model}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...dynamicRoutes]
} 