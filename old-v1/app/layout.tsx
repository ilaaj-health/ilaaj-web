import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const GA_MEASUREMENT_ID = 'G-KNTMD61HWL'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'IlaajAI - Free AI Doctor for Pakistan | Urdu & English',
    template: '%s | IlaajAI',
  },
  description: 'Free AI health advice & doctor-verified prescriptions in Urdu or English. Pakistan\'s #1 AI health companion. Available 24/7.',
  keywords: [
    'AI doctor Pakistan',
    'free online doctor Pakistan',
    'AI health assistant',
    'medical advice Urdu',
    'telemedicine Pakistan',
    'online doctor consultation free',
    'health advice Urdu English',
    'AI prescription Pakistan',
    'doctor verified prescription',
    'ilaaj AI',
    'ilaaj.ai',
    'health companion app',
    'AI medical assistant',
    'free health consultation',
    'Pakistan healthcare app',
    'online doctor Urdu',
    'symptom checker Pakistan',
    'medical AI chatbot',
    'voice doctor consultation',
    'family health app Pakistan',
    'digital health Pakistan',
    'AI dawai',
    'online nuskha',
    'sehat app',
    'free doctor advice Pakistan',
    'health tech Pakistan',
    'AI health chatbot Urdu',
    'doctor finder Pakistan',
    'medical consultation online',
    'telehealth Pakistan',
  ],
  authors: [{ name: 'IlaajAI Team', url: 'https://ilaaj.ai' }],
  creator: 'IlaajAI',
  publisher: 'IlaajAI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'IlaajAI - Free AI Doctor for Pakistan | Urdu & English',
    description: 'Get free AI health advice and doctor-verified prescriptions in Urdu or English. Chat with AI, send photos, voice notes. Available 24/7.',
    url: 'https://ilaaj.ai',
    siteName: 'IlaajAI',
    images: [
      {
        url: 'https://www.ilaaj.ai/Icon-512.png',
        width: 512,
        height: 512,
        alt: 'IlaajAI - AI Health Companion for Pakistan',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IlaajAI - Free AI Doctor for Pakistan',
    description: 'Free AI health advice & doctor-verified prescriptions in Urdu or English. Pakistan\'s first AI health companion. Available 24/7.',
    images: ['https://www.ilaaj.ai/Icon-512.png'],
    creator: '@ilaaboratory',
  },
  metadataBase: new URL('https://www.ilaaj.ai'),
  alternates: {
    canonical: 'https://www.ilaaj.ai',
    languages: {
      'en': '/',
      'ur': '/',
    },
  },
  category: 'health',
  verification: {
    google: '8RtzwgVYowrMGF4E77jnKOX33seYEQTuXmxps2XkPxI',
  },
  other: {
    'google-site-verification': '8RtzwgVYowrMGF4E77jnKOX33seYEQTuXmxps2XkPxI',
    'applicable-device': 'pc,mobile',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'IlaajAI',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'IlaajAI',
  url: 'https://www.ilaaj.ai',
  logo: 'https://www.ilaaj.ai/Icon-512.png',
  description: 'Pakistan\'s first AI-powered health companion offering free doctor-verified prescriptions in Urdu and English.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-324-819-9663',
    contactType: 'customer support',
    email: 'ilaaj.health.ai@gmail.com',
    availableLanguage: ['English', 'Urdu'],
  },
  sameAs: [
    'https://www.instagram.com/ilaaj_ai/',
    'https://www.facebook.com/profile.php?id=61588590745625',
    'https://x.com/ilaajai',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Pakistan',
  },
  medicalSpecialty: 'General Practice',
}

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'IlaajAI',
  url: 'https://www.ilaaj.ai',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PKR',
  },
  description: 'Free AI-powered health companion with doctor-verified prescriptions. Chat in Urdu or English.',
  inLanguage: ['en', 'ur'],
  availableOnDevice: 'Mobile, Desktop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta name="theme-color" content="#00897B" />
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Pakistan" />
        <meta name="rating" content="general" />
        <meta property="fb:app_id" content="26439240792359680" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script
          id="tawk-to"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;s1.src='https://embed.tawk.to/69ce56b0127eae1c37be0e72/1jl70596p';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
