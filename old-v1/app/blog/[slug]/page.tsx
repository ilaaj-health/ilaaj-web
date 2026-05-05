import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Post {
  id: string
  title: string
  content: string
  image: string | null
  published: boolean
  createdAt: string
  author: {
    id: string
    name: string
    email: string
  }
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()
}

async function getAllPosts(): Promise<Post[]> {
  try {
    const res = await fetch('https://illaj-node-production.up.railway.app/api/posts', {
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.data || []).filter((p: Post) => p.published)
  } catch {
    return []
  }
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `https://illaj-node-production.up.railway.app/api/posts/slug/${encodeURIComponent(slug)}`,
      { cache: 'no-store' }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.data || null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const plainText = stripHtml(post.content)
  const description = plainText.length > 160
    ? plainText.substring(0, 157) + '...'
    : plainText

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `https://www.ilaaj.ai/blog/${toSlug(post.title)}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `https://www.ilaaj.ai/blog/${toSlug(post.title)}`,
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author.name],
      ...(post.image && {
        images: [{ url: post.image, alt: post.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      ...(post.image && { images: [post.image] }),
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post || !post.published) {
    notFound()
  }

  const slug = toSlug(post.title)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.createdAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'IlaajAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.ilaaj.ai/Icon-512.png',
      },
    },
    description: stripHtml(post.content).length > 160
      ? stripHtml(post.content).substring(0, 157) + '...'
      : stripHtml(post.content),
    ...(post.image && { image: post.image }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.ilaaj.ai/blog/${slug}`,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/Icon-192.png" alt="IlaajAI Logo" className="w-8 h-8 rounded-lg" />
              <span className="text-2xl font-bold text-primary-700">IlaajAI</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Posts</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {post.image && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-500">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {post.author.name}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-primary-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Need Health Advice?</h3>
            <p className="text-gray-600 mb-6">
              Chat with our AI health assistant in Urdu or English. Get doctor-verified prescriptions for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.ilaaj.ai/chat"
                className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
              >
                Try IlaajAI Free
              </a>
              <Link
                href="/blog"
                className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold border border-primary-200 hover:bg-primary-50 transition-colors"
              >
                Read More Articles
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/ilaaj-logo.jpg" alt="ilaaj.ai logo" className="w-10 h-10 rounded-lg object-cover" />
                <h3 className="text-xl font-bold">ilaaj.ai</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your AI health companion. Chat in Urdu or English, get doctor-verified prescriptions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">Questions or issues?</p>
              <p className="text-primary-400 text-sm mt-2">ilaaj.health.ai@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Ilaaj AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
