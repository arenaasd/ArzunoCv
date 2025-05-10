// app/ClientLayout.jsx
'use client'

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import { Toaster } from "@/components/ui/sonner";

export default function ClientLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Header />
        {children}
        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  );
}
