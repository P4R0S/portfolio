import { getAllPosts } from '@/lib/blog'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientText } from '@/components/ui/GradientText'
import { Calendar, Clock, Tag } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Blog — Your Name',
  description: 'Articles on ML systems, approximate computing, and hardware design.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">Writing</p>
          <h1 className="font-heading font-bold text-4xl">
            The <GradientText>Blog</GradientText>
          </h1>
          <p className="text-slate-400 mt-3 text-sm">
            ML systems, approximate computing, hardware design, and lessons learned.
          </p>
        </div>

        {posts.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <p className="text-slate-500">No posts yet. Check back soon.</p>
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <GlassCard hover className="p-6">
                  <h2 className="font-heading font-semibold text-white text-lg mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime}
                    </span>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                        <Tag className="w-3 h-3" /> {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
