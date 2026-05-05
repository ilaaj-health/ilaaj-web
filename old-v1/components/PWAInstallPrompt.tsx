'use client'

import { useState, useEffect } from 'react'
import { X, Smartphone, ArrowRight } from 'lucide-react'

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    
    // Check if dismissed recently
    const dismissed = localStorage.getItem('pwa-prompt-dismissed')
    if (dismissed && Date.now() - parseInt(dismissed) < 24 * 60 * 60 * 1000) {
      return
    }

    // Show after 2 seconds on mobile
    if (mobile) {
      setTimeout(() => setShowPrompt(true), 2000)
    }
  }, [])

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
  }

  if (!isMobile || !showPrompt) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg animate-slide-up">
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">IlaajAI Health App</h3>
            <p className="text-sm text-gray-600">
              Get instant health advice in Urdu & English
            </p>
          </div>

          <a
            href="https://app.ilaaj.ai/chat"
            className="bg-primary-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-800 transition-colors flex items-center whitespace-nowrap"
          >
            Try Now
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
    </div>
  )
}
