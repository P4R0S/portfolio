import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { getAllPosts } from '@/lib/blog'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function BlogSection() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <SectionWrapper id="blog">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">Thinking out loud</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            Latest <GradientText>Posts</GradientText>
          </h2>
        </div>
        <Link
          href="/blog"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          View all posts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {posts.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <p className="text-slate-500 text-sm">Blog posts coming soon.</p>
        </GlassCard>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <GlassCard hover className="h-full p-5 flex flex-col">
                <h3 className="font-heading font-semibold text-white text-sm leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTime}
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
