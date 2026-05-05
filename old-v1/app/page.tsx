import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle,
  MessageCircle,
  Mic,
  Shield,
  ArrowRight,
  Globe,
  Users,
  FileText,
  UserCheck,
  Heart,
} from 'lucide-react'
import NavbarClient from '../components/NavbarClient'
import FaqAccordion from '../components/FaqAccordion'
import PWAInstallPrompt from '../components/PWAInstallPrompt'

const features = [
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Chat in Urdu & English',
    description:
      'Describe your symptoms in your preferred language. Our AI understands both Urdu and English and responds naturally.',
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: 'Voice Messages',
    description:
      "Can't type? No problem. Just speak and describe your health concerns using voice messages.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Family Profiles',
    description:
      'Create separate profiles for yourself, your children, parents - everyone. Keep medical history organized.',
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'AI Prescriptions',
    description:
      'Get AI-generated health assessments and prescription suggestions based on your symptoms.',
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: 'Doctor Verified',
    description:
      'Every prescription is reviewed and approved by a licensed doctor before you receive it. Complete peace of mind.',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Secure & Private',
    description:
      'Your health information is encrypted and completely private. We follow strict medical data protection standards.',
  },
]

const steps = [
  {
    number: '1',
    title: 'Quick Phone Login',
    description:
      'Enter your Pakistani phone number, verify with OTP, and you\'re ready to start chatting with your AI health assistant.',
    image: '/screenshots/home.png',
  },
  {
    number: '2',
    title: 'Chat with AI',
    description:
      'Describe your symptoms - type or speak. The AI will ask relevant questions to understand your condition better.',
    image: '/screenshots/chat.png',
  },
  {
    number: '3',
    title: 'Get Your Prescription',
    description:
      'AI analyzes your symptoms and prepares a prescription. After doctor approval, you receive your verified prescription.',
    image: '/screenshots/prescription.png',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarClient />

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary-500 to-primary-700 min-h-screen flex items-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="mb-4">
                  <span className="text-sm font-medium text-white bg-white/20 px-3 py-1 rounded-full">
                    🇵🇰 Pakistan&apos;s First AI Health Companion
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Your AI-Powered
                  <span className="block text-white/90">Health Assistant</span>
                </h1>
                <p className="text-xl text-white mb-8 leading-relaxed">
                  Describe your symptoms in Urdu or English. Get AI health advice and doctor-verified prescriptions.
                  <br />
                  <span className="font-semibold">Free. Simple. Trusted.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://app.ilaaj.ai/chat"
                    className="bg-white text-primary-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Globe className="mr-2 w-5 h-5" />
                    Try Now - It&apos;s Free
                  </a>
                </div>
                <div className="mt-8 flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>Doctor Verified</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative mx-auto max-w-sm">
                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <Image
                      src="/screenshots/home.png"
                      alt="Ilaaj AI App"
                      width={390}
                      height={844}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Get health advice in three simple steps
              </p>
            </div>

            <div className="space-y-16">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="relative mx-auto max-w-md">
                      <div className="absolute -inset-4 bg-primary-100 rounded-3xl"></div>
                      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={390}
                          height={844}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white text-3xl font-bold rounded-full mb-6">
                      {step.number}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Ilaaj AI?
              </h2>
              <p className="text-xl text-gray-600">
                Features that make your health journey easier
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Your Health, Our Priority
            </h2>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
              Ilaaj AI isn&apos;t just AI - every prescription is reviewed by a real licensed doctor.
              You get advice you can trust.
            </p>
            <div className="flex items-center justify-center gap-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">✓</div>
                <div className="text-sm text-white">Licensed Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-white">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-white">Free</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">Everything you need to know</p>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white mb-8">
              Health advice at your fingertips. Free. In your language.
            </p>
            <a
              href="https://app.ilaaj.ai/chat"
              className="inline-flex items-center bg-white text-primary-700 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Now - It&apos;s Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <p className="text-sm text-white/80 mt-6">
              No download required - use directly on web
            </p>
          </div>
        </section>

        <PWAInstallPrompt />
      </main>

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is Ilaaj AI free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Ilaaj AI is completely free. You can get AI health consultations and doctor-verified prescriptions without any charges.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are prescriptions reviewed by real doctors?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Absolutely! Every prescription suggested by AI is reviewed and approved by a licensed doctor. You receive a verified prescription with the doctor's name.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can I chat in Urdu?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Ilaaj AI fully supports Urdu. You can type in Roman Urdu or Urdu script, or use voice messages in Urdu.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I use it for family members?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Go to your profile and tap 'Add Member'. Create profiles for your children, parents, or any family member. Then select who you're consulting for when chatting.",
                },
              },
              {
                '@type': 'Question',
                name: 'Is my health information secure?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, all your health data is encrypted and only accessible to you. We never share your information with anyone without your consent.',
                },
              },
              {
                '@type': 'Question',
                name: 'What should I do in an emergency?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For serious emergencies, immediately call 1122 (Rescue) or go to the nearest hospital. Ilaaj AI is for general health consultations, not emergencies.',
                },
              },
            ],
          }),
        }}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/ilaaj-logo.jpg"
                  alt="ilaaj.ai logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <h3 className="text-xl font-bold">ilaaj.ai</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your AI health companion. Chat in Urdu or English, get doctor-verified prescriptions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">Questions or issues?</p>
              <p className="text-primary-400 text-sm mt-2">ilaaj.health.ai@gmail.com</p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://www.instagram.com/ilaaj_ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.987 15.668 24 15.259 24 12s-.013-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61588590745625"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/ilaajai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-300 text-sm">
            <p>© 2025 Ilaaj AI. All rights reserved.</p>
            <p className="mt-2 text-xs">
              ⚠️ This service is for general health advice. For emergencies, call 1122 (Rescue).
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
