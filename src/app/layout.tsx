import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

const SITE_URL = 'https://ateeshay-rawat.netlify.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ── Core ──
  title: {
    default: 'Ateeshay Rawat — Full Stack Developer & DevOps Specialist',
    template: '%s | Ateeshay Rawat',
  },
  description:
    'Portfolio of Ateeshay Rawat – Full Stack Developer & DevOps Specialist skilled in React, Next.js, React Native, Node.js, TypeScript, AWS, Docker, and more. Currently pursuing B.Tech in CSE at Bennett University.',
  applicationName: 'Ateeshay Rawat Portfolio',
  authors: [{ name: 'Ateeshay Rawat', url: SITE_URL }],
  creator: 'Ateeshay Rawat',
  publisher: 'Ateeshay Rawat',
  generator: 'Next.js',

  // ── Keywords ──
  keywords: [
    'Ateeshay Rawat',
    'Full Stack Developer',
    'DevOps Specialist',
    'React Developer',
    'Next.js Developer',
    'React Native Developer',
    'Node.js Developer',
    'TypeScript',
    'MERN Stack',
    'AWS',
    'Docker',
    'Kubernetes',
    'Portfolio',
    'Bennett University',
    'Web Developer India',
    'Mobile App Developer',
    'CI/CD',
    'GitHub Actions',
  ],

  // ── Open Graph ──
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Ateeshay Rawat — Portfolio',
    title: 'Ateeshay Rawat — Full Stack Developer & DevOps Specialist',
    description:
      'Full Stack Developer & DevOps Specialist. React, Next.js, React Native, Node.js, TypeScript, AWS, Docker, Kubernetes. Building production-ready web & mobile apps.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ateeshay Rawat — Full Stack Developer & DevOps Specialist',
      },
    ],
  },

  // ── Twitter ──
  twitter: {
    card: 'summary_large_image',
    title: 'Ateeshay Rawat — Full Stack Developer & DevOps Specialist',
    description:
      'Full Stack Developer & DevOps Specialist. React, Next.js, Node.js, TypeScript, AWS, Docker. Building production-ready web & mobile apps.',
    images: ['/og-image.png'],
    creator: '@ateeshayrawat',
  },

  // ── Icons ──
  icons: {
    icon: '/ar-icon.svg',
    shortcut: '/ar-icon.svg',
    apple: '/apple-icon.png',
  },

  // ── Robots ──
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

  // ── Verification (add your IDs when you have them) ──
  // verification: {
  //   google: 'your-google-verification-id',
  // },

  // ── Alternate ──
  alternates: {
    canonical: SITE_URL,
  },

  // ── Category ──
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ateeshay Rawat',
              url: SITE_URL,
              jobTitle: 'Full Stack Developer & DevOps Specialist',
              description:
                'Full Stack Developer & DevOps Specialist skilled in React, Next.js, React Native, Node.js, TypeScript, AWS, Docker, Kubernetes.',
              email: 'rawatateeshay4002@gmail.com',
              telephone: '+917078542610',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Greater Noida',
                addressCountry: 'IN',
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Bennett University',
              },
              sameAs: ['https://github.com/Atee-Rawat'],
              knowsAbout: [
                'React',
                'Next.js',
                'React Native',
                'Node.js',
                'TypeScript',
                'JavaScript',
                'MongoDB',
                'PostgreSQL',
                'Docker',
                'Kubernetes',
                'AWS',
                'Azure',
                'Google Cloud',
                'CI/CD',
                'GitHub Actions',
                'Express.js',
                'NestJS',
                'GraphQL',
                'Redis',
                'Tailwind CSS',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
