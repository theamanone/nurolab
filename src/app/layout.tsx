import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: 'Nurolab - Next-Gen Machine Learning Education',
  description: 'Experience the future of ML learning with our AI-powered platform. Build real projects, get instant feedback, and learn from industry experts.',
  keywords: 'machine learning, artificial intelligence, ML, AI, education, online learning',
  authors: [{ name: 'Nurolab Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
