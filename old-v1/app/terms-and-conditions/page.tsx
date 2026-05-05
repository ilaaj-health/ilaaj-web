import type { Metadata } from 'next'
import TermsAndConditionsContent from './TermsAndConditionsContent'

export const metadata: Metadata = {
  title: 'Terms and Conditions - IlaajAI Service Agreement',
  description: 'Read the terms and conditions for using IlaajAI, Pakistan\'s AI-powered health companion. Understand our service terms, medical disclaimers, and user responsibilities.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
  openGraph: {
    title: 'Terms and Conditions | IlaajAI',
    description: 'Terms and conditions for using IlaajAI AI health consultation service in Pakistan.',
    url: 'https://ilaaj.ai/terms-and-conditions',
    type: 'website',
  },
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsContent />
}
