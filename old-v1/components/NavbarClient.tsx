'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function NavbarClient() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('how-it-works')
  const router = useRouter()
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)

      const howItWorksSection = document.getElementById('how-it-works')
      const featuresSection = document.getElementById('features')
      const faqSection = document.getElementById('faq')

      if (howItWorksSection && featuresSection && faqSection) {
        const howItWorksTop = howItWorksSection.offsetTop - 150
        const featuresTop = featuresSection.offsetTop - 150
        const faqTop = faqSection.offsetTop - 150

        if (scrollTop >= faqTop) {
          setActiveTab('faq')
        } else if (scrollTop >= featuresTop) {
          setActiveTab('features')
        } else {
          setActiveTab('how-it-works')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({ top: elementPosition, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Image
              src="/Icon-192.png"
              alt="Ilaaj AI Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg"
            />
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-primary-600' : 'text-white'
              }`}
            >
              Ilaaj AI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://app.ilaaj.ai/chat"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                isScrolled
                  ? 'bg-primary-700 text-white hover:bg-primary-800'
                  : 'bg-white text-primary-700 hover:bg-gray-100'
              }`}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      <div
        className={`bg-primary-600 overflow-hidden transition-all duration-300 ${
          isScrolled ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2">
            {(['how-it-works', 'features', 'faq'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToSection(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-primary-700 text-white'
                    : 'text-white hover:bg-primary-700'
                }`}
              >
                {tab === 'how-it-works'
                  ? 'How It Works'
                  : tab === 'features'
                  ? 'Features'
                  : 'FAQ'}
              </button>
            ))}
              <button
               
                onClick={() => router.push('/blog') }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize text-white hover:bg-primary-700 `}
              >
                 Blog
              </button>
          </div>
        </div>
      </div>
    </header>
  )
}
