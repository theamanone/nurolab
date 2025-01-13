'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is Nurolab?',
      answer: 'Nurolab is a next-generation machine learning education platform that combines interactive learning, expert instruction, and AI-powered assistance to help you master machine learning concepts and build real-world projects.',
    },
    {
      question: 'Who is Nurolab for?',
      answer: 'Nurolab is designed for anyone interested in learning machine learning, from beginners to advanced practitioners. Our platform adapts to your skill level and learning pace.',
    },
    {
      question: 'Do I need prior programming experience?',
      answer: 'While some programming experience is helpful, our beginner courses start from the basics and gradually build up to more advanced concepts. We recommend having basic Python knowledge.',
    },
    {
      question: 'How does the platform work?',
      answer: 'Our platform combines video lessons, interactive coding exercises, real-world projects, and AI-powered assistance. You will learn by doing, with immediate feedback and help when you need it.',
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We offer multiple levels of support including community forums, AI-powered assistance, and direct instructor support for premium members.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all our paid plans. If you are not satisfied with your learning experience, we will provide a full refund.',
    },
  ];

  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Find answers to common questions about Nurolab
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary/5"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className="transform transition-transform duration-200">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-card border-t border-border">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-card border border-border rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              We're here to help. Contact our support team anytime.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
