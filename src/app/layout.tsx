import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_CONFIG } from '@/data/siteConfig';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://avnivo.in'),
  title: {
    default: 'AVNIVO – Smart Living, Better Home | Home & Kitchen Shopping Discovery',
    template: '%s | AVNIVO India',
  },
  description: 'Discover the best Home & Kitchen products in India. Unbiased product reviews, side-by-side comparisons, curated buying guides, and verified Amazon deals for smart homes.',
  keywords: [
    'AVNIVO',
    'Home and Kitchen India',
    'Best kitchen gadgets India',
    'Cookware reviews India',
    'Tri-ply kadhai',
    'Air fryer comparison India',
    'Kitchen storage organizers',
    'Home improvement tools',
    'Amazon affiliate shopping India',
    'Smart living better home'
  ],
  authors: [{ name: 'AVNIVO Editorial Team' }],
  creator: 'AVNIVO India',
  publisher: 'AVNIVO',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://avnivo.in',
    siteName: 'AVNIVO',
    title: 'AVNIVO – Smart Living, Better Home',
    description: 'Modern, Premium, Trustworthy Home & Kitchen recommendations for Indian households. Compare products, explore reviews, and find verified merchant prices.',
    images: [
      {
        url: '/images/logo.svg',
        width: 512,
        height: 512,
        alt: 'AVNIVO Circular Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVNIVO – Smart Living, Better Home',
    description: 'Curated Home & Kitchen shopping discovery with in-depth reviews and comparisons for Indian homes.',
    images: ['/images/logo.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#102F59',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AVNIVO',
    url: 'https://avnivo.in',
    logo: 'https://avnivo.in/images/logo.svg',
    description: 'India’s premier Home & Kitchen shopping discovery platform.',
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.youtube,
    ],
  };

  const schemaWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AVNIVO',
    url: 'https://avnivo.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://avnivo.in/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en-IN" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#F8FAFC]">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

