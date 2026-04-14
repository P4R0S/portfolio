import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { GradientText } from '@/components/ui/GradientText'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: `${post.title} — Your Name`, description: post.excerpt }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-slate-500 hover:text-white text-sm mb-10 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <header className="mb-10">
          <h1 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-4">
            <GradientText>{post.title}</GradientText>
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>
        </header>

        <article className="prose prose-invert prose-slate max-w-none prose-headings:font-heading prose-a:text-violet-400 hover:prose-a:text-violet-300">
          <MDXRemote source={post.content} />
        </article>
      </div>
    </main>
  )
}
