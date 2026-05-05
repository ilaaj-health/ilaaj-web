import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Health Blog - AI Health Tips & Medical Advice in Urdu & English',
  description: 'Read the latest health tips, medical advice, and wellness articles from IlaajAI. Expert health content in Urdu and English for Pakistan.',
  keywords: [
    'health blog Pakistan',
    'medical advice Urdu',
    'health tips',
    'AI health articles',
    'wellness Pakistan',
    'doctor advice blog',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Health Blog | IlaajAI',
    description: 'Latest health tips, medical advice, and wellness articles from IlaajAI.',
    url: 'https://ilaaj.ai/blog',
    type: 'website',
  },
}

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
    .replace(/[^a-z0-9\s_]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()
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

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/Icon-192.png" alt="IlaajAI Logo" className="w-8 h-8 rounded-lg" />
              <span className="text-2xl font-bold text-primary-700">IlaajAI</span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Health Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert health tips, medical advice, and wellness articles to help you live a healthier life.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${toSlug(post.title)}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Post Image */}
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <img src="/Icon-192.png" alt="IlaajAI" className="w-16 h-16 opacity-30" />
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {(() => {
                      const text = stripHtml(post.content)
                      return text.length > 150 ? text.substring(0, 150) + '...' : text
                    })()}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

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
