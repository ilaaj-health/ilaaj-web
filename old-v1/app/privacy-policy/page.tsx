import type { Metadata } from 'next'
import PrivacyPolicyContent from './PrivacyPolicyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy - How IlaajAI Protects Your Health Data',
  description: 'Learn how IlaajAI protects your personal health information. We use encryption, never share your data, and follow strict medical data protection standards.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | IlaajAI',
    description: 'Learn how IlaajAI protects your personal health information with encryption and strict data protection.',
    url: 'https://ilaaj.ai/privacy-policy',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
