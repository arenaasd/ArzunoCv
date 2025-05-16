// app/layout.js

export const metadata = {
  title: {
    default: 'ArzunoCV – Free Resume Builder for Professionals',
    template: '%s | ArzunoCV – Free Resume Builder',
  },
  description:
  'Build a job-winning resume in minutes with ArzunoCV. Choose from professional templates, customize easily, and download instantly. 100% free and ATS-friendly.',
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
       <head>
        <meta name="google-site-verification" content="WnbzgcKwlmgQNwVamL5Ou7wfRJZVKHMhcmtkQbKE2V4" />     
         </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
