import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/hobbies`, changeFrequency: 'yearly', priority: 0.4 },
  ]

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...pages, ...posts]
}
