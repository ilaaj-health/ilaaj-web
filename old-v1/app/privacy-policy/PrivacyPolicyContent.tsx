'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Brain } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicyContent() {
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
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
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
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At IlaajAI, we respect your privacy and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may collect information that you provide to us, including:
            </p>
            <ul className="space-y-2 ml-4 text-gray-700">
              <li>• Personal information (name, phone number, email)</li>
              <li>• Health-related information you choose to share</li>
              <li>• Device and usage information</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 ml-4 text-gray-700">
              <li>• Provide and improve our services</li>
              <li>• Respond to your inquiries and requests</li>
              <li>• Ensure the security of our platform</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                <Brain className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Artificial Intelligence (AI) Usage</h2>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Collection and Sharing</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our app utilizes third-party AI services to enhance user experience and deliver personalized health-related responses.
                In order to generate responses, the app may send the following types of data to the AI system:
              </p>
              <ul className="space-y-2 ml-4 text-gray-700 mb-4">
                <li>• User queries and inputs (health-related questions)</li>
                <li>• Interaction history and preferences</li>
                <li>• Non-identifiable technical metadata</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                We do not share:
              </p>
              <ul className="space-y-2 ml-4 text-gray-700">
                <li>• Name</li>
                <li>• Email</li>
                <li>• Phone number</li>
                <li>• Location</li>
                <li>• Any personally identifiable information</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">User Consent</h3>
              <p className="text-gray-700 leading-relaxed">
                Before any data is shared with third-party AI systems, we obtain explicit user consent. This consent is
                collected through a prompt displayed during the onboarding process or prior to using any feature that relies
                on AI technology. Users must accept the terms to proceed with using the AI-powered features.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Processing and Retention</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                The data sent to third-party AI services is processed to provide relevant responses and recommendations.
                The data is temporarily stored and processed by our AI service providers as part of their standard data
                processing protocol.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Once the data is processed, it is either deleted or anonymized according to the AI service provider&apos;s
                retention policy. The AI service processes data temporarily for response generation and does not retain user
                data beyond the processing time.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party AI Service Providers</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                The AI services that process user data include third-party AI providers that specialize in natural language
                processing and health-related information. These providers operate under strict data protection and privacy
                standards.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For specific information about which AI service providers we use, please contact us using the contact
                information provided in this Privacy Policy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h3>
              <p className="text-gray-700 leading-relaxed">
                We implement encryption and security measures to protect user data while it is transmitted to third-party AI
                systems. Data is securely processed in accordance with industry standards to ensure user privacy and protection.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information. However,
              no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, or delete your personal information. You can contact us
              at any time to exercise these rights.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the updated policy on this page.
            </p>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
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
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms & Conditions
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
