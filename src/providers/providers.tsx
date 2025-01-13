'use client';

import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Suspense, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { storage } from '@/lib/storage';

function ThemeHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const theme = storage.get<string>('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return children;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if we're in the dashboard or auth routes
  const isDashboard = pathname?.startsWith('/dashboard');
  const isAuth = pathname?.startsWith('/auth') || pathname === '/login' || pathname === '/register';

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SessionProvider>
        <NextThemesProvider 
          attribute="class" 
          defaultTheme={storage.get('theme') || 'system'} 
          enableSystem
          forcedTheme={typeof window === 'undefined' ? undefined : undefined}
        >
          <ThemeHandler>
            <div className={`min-h-screen flex flex-col bg-white dark:bg-gray-900 ${isDashboard ? '' : 'pt-16'}`}>
              {/* Only show header if not in dashboard or auth routes */}
              {!isDashboard && !isAuth && <Header />}
              
              {/* Main content */}
              <main className={`flex-grow ${!isDashboard && !isAuth ? 'container mx-auto px-4' : ''}`}>
                {children}
              </main>
              
              {/* Only show footer if not in dashboard or auth routes */}
              {!isDashboard && !isAuth && <Footer />}
            </div>
          </ThemeHandler>
        </NextThemesProvider>
      </SessionProvider>
    </Suspense>
  );
}
