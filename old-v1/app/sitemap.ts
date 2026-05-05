import { MetadataRoute } from 'next'

interface Post {
  id: string
  title: string
  published: boolean
  createdAt: string
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch('https://illaj-node-production.up.railway.app/api/posts', {
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.data || []).filter((post: Post) => post.published)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://www.ilaaj.ai',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://www.ilaaj.ai/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://www.ilaaj.ai/support',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.ilaaj.ai/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.ilaaj.ai/terms-and-conditions',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://www.ilaaj.ai/blog/${toSlug(post.title)}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
