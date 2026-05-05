'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function TermsAndConditionsContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/Icon-192.png" alt="IlaajAI Logo" className="w-8 h-8 rounded-lg" />
              <h1 className="text-2xl font-bold text-primary-600">IlaajAI</h1>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Important Medical Disclaimer</h3>
                <p className="text-yellow-800 text-sm">
                  IlaajAI is not a substitute for professional medical care. Always consult qualified healthcare
                  professionals for medical diagnosis and treatment. In emergencies, call 112 immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using IlaajAI, you accept and agree to be bound by these Terms and Conditions.
              If you do not agree with any part of these terms, you must not use our service.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-700 leading-relaxed">
              IlaajAI provides AI-powered health consultation services and general health information.
              Our service is designed to provide preliminary guidance and is not a replacement for professional medical care.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              When using IlaajAI, you agree to:
            </p>
            <ul className="space-y-2 ml-4 text-gray-700">
              <li>• Provide accurate information</li>
              <li>• Use the service responsibly and lawfully</li>
              <li>• Not misuse or abuse the service</li>
              <li>• Consult healthcare professionals for medical decisions</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              IlaajAI is provided &quot;as is&quot; without warranties of any kind. We are not liable for any decisions
              made based on information provided through our service. Always consult with qualified healthcare
              professionals for medical advice.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
              immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> ilaaj.health.ai@gmail.com</p>
              <p><strong>Phone:</strong> +92 324 819 9663</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src="/ilaaj-logo.jpg" alt="ilaaj.ai logo" className="w-8 h-8 rounded-lg object-cover" />
              <h3 className="text-xl font-bold">ilaaj.ai</h3>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/support" className="hover:text-white transition-colors">
                Support
              </Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 IlaajAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
