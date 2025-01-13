'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { motion } from 'framer-motion';

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Courses', href: '/courses' },
    { name: 'Enterprise', href: '/enterprise' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Community', href: '/community' },
    { name: 'API', href: '/apis' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, href: '#' },
  { name: 'Twitter', icon: FaTwitter, href: '#' },
  { name: 'LinkedIn', icon: FaLinkedin, href: '#' },
  { name: 'Discord', icon: FaDiscord, href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-gray-400 text-sm">
              {new Date().getFullYear()} Nurolab. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
