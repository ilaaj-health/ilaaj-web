import type { Metadata } from 'next'
import SupportContent from './SupportContent'

export const metadata: Metadata = {
  title: 'Support Center - Get Help with IlaajAI',
  description: 'Need help with IlaajAI? Contact our support team via email, phone, or live chat. We\'re available 24/7 to assist you with any health app questions.',
  alternates: {
    canonical: '/support',
  },
  openGraph: {
    title: 'Support Center | IlaajAI',
    description: 'Get help with IlaajAI. Contact our support team via email, phone, or 24/7 live chat.',
    url: 'https://ilaaj.ai/support',
    type: 'website',
  },
}

export default function SupportPage() {
  return <SupportContent />
}
