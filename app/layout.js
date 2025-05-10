// app/layout.js

export const metadata = {
  title: {
    default: 'ArzunoCV',
    template: '%s - ArzunoCV',
  },
  description: 'Create professional resumes effortlessly with ArzunoCV. Design, customize, and download your perfect CV in minutes.',
  openGraph: {
    title: 'ArzunoCV',
    description: 'Create professional resumes effortlessly with ArzunoCV. Design, customize, and download your perfect CV in minutes.',
    url: 'https://arzuno.dev/cv',
    siteName: 'ArzunoCV',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ArzunoCV',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArzunoCV',
    description: 'Create professional resumes effortlessly with ArzunoCV. Design, customize, and download your perfect CV in minutes.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

import './globals.css'
import ClientLayout from './ClientLayout'  // Your client-side wrapper (for ClerkProvider etc.)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
