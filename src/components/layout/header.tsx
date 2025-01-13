'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon, FaUser } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

const publicNavItems = [
  { name: 'Courses', href: '/courses' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'API', href: '/api' }
];

const userNavItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' }
];

export function Header() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Determine which nav items to show
  const navItems = session ? userNavItems : publicNavItems;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDashboard 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 text-gray-800 dark:text-white' 
          : 'bg-transparent backdrop-blur-md border-b border-white/10 text-white'
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="relative w-8 h-8"
          >
            <Image
              src="/assets/logo.png"
              alt="Nurolab Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          <span className={`text-lg font-semibold ${
            isDashboard 
              ? 'text-gray-800 dark:text-white' 
              : 'text-white'
          }`}>
            Nurolab
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(({ name, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`${
                  isActive 
                    ? 'text-indigo-500'
                    : isDashboard 
                      ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white' 
                      : 'text-gray-200 hover:text-white'
                } transition-colors`}
              >
                {name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDashboard
                ? 'hover:bg-gray-100 dark:hover:bg-gray-800'
                : 'hover:bg-white/10'
            }`}
          >
            {theme === 'dark' ? (
              <FaSun className="w-5 h-5" />
            ) : (
              <FaMoon className="w-5 h-5" />
            )}
          </button>

          {session ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className={`flex items-center space-x-2 text-sm font-medium hover:text-indigo-500 transition-colors ${
                  isDashboard ? 'text-gray-600 dark:text-gray-300' : 'text-white'
                }`}
              >
                <FaUser className="w-4 h-4" />
                <span>{session.user.name}</span>
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium hover:text-indigo-500 transition-colors ${
                  isDashboard ? 'text-gray-600 dark:text-gray-300' : 'text-white'
                }`}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
