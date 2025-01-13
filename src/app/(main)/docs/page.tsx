'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBook, FaCode, FaLightbulb, FaRocket } from 'react-icons/fa';

export default function DocsPage() {
  const sections = [
    {
      icon: <FaBook />,
      title: 'Getting Started',
      description: 'Learn the basics of using Nurolab',
      links: [
        { title: 'Quick Start Guide', href: '/docs/quick-start' },
        { title: 'Installation', href: '/docs/installation' },
        { title: 'Basic Concepts', href: '/docs/concepts' },
      ],
    },
    {
      icon: <FaCode />,
      title: 'API Reference',
      description: 'Detailed API documentation',
      links: [
        { title: 'Authentication', href: '/docs/api/auth' },
        { title: 'Endpoints', href: '/docs/api/endpoints' },
        { title: 'Error Handling', href: '/docs/api/errors' },
      ],
    },
    {
      icon: <FaLightbulb />,
      title: 'Tutorials',
      description: 'Step-by-step guides',
      links: [
        { title: 'First Project', href: '/docs/tutorials/first-project' },
        { title: 'Best Practices', href: '/docs/tutorials/best-practices' },
        { title: 'Advanced Topics', href: '/docs/tutorials/advanced' },
      ],
    },
    {
      icon: <FaRocket />,
      title: 'Resources',
      description: 'Additional learning materials',
      links: [
        { title: 'Examples', href: '/docs/resources/examples' },
        { title: 'Templates', href: '/docs/resources/templates' },
        { title: 'Community', href: '/docs/resources/community' },
      ],
    },
  ];

  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Documentation</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Everything you need to know about using Nurolab
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg border border-border bg-card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-primary text-xl">{section.icon}</span>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <p className="text-muted-foreground mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        {link.title} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
