'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function BlogPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const blogPosts = [
    {
      title: 'Getting Started with Machine Learning',
      excerpt: 'A beginner\'s guide to understanding the basics of machine learning...',
      date: '2025-01-10',
      readTime: '5 min read',
    },
    {
      title: 'Deep Learning vs Machine Learning',
      excerpt: 'Understanding the key differences between deep learning and traditional machine learning...',
      date: '2025-01-08',
      readTime: '7 min read',
    },
    {
      title: 'The Future of AI Education',
      excerpt: 'Exploring how artificial intelligence is transforming education...',
      date: '2025-01-05',
      readTime: '6 min read',
    },
  ];

  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <h1 className="text-4xl font-bold mb-12">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="mb-4">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <button className="text-primary hover:text-primary/80 transition-colors">
                Read more →
              </button>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
