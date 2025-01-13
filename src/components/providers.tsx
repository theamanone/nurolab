'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation'; 
import { CookieConsent } from '@/components/cookie-consent';
import { Header } from './layout/header';
import { Footer } from './layout/footer';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <>
          {!isDashboard && <Header />}
          {children}
          {!isDashboard && <Footer />}
          <CookieConsent />
        </>
      </ThemeProvider>
    </SessionProvider>
  );
}
