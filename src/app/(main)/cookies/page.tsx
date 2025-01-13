'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CookiePolicyPage() {
  return (
    <div className="py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeIn} className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-xl text-muted-foreground mb-12">
            At Nurolab, we use cookies to enhance your learning experience and improve our services.
          </p>

          <div className="space-y-8">
            <motion.section variants={fadeIn}>
              <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are stored on your device when you visit our website.
                They help us remember your preferences and provide a more personalized experience.
              </p>
            </motion.section>

            <motion.section variants={fadeIn}>
              <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card">
                  <h3 className="font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies are necessary for the website to function properly. They enable core
                    functionality such as security, account authentication, and remembering your preferences.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-card">
                  <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-muted-foreground">
                    We use analytics cookies to understand how you interact with our website. This helps
                    us improve our services and provide better content.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-card">
                  <h3 className="font-semibold mb-2">Learning Progress Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies help us track your learning progress and customize the learning
                    experience based on your needs and preferences.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeIn}>
              <h2 className="text-2xl font-semibold mb-4">Your Cookie Choices</h2>
              <p className="text-muted-foreground mb-4">
                You can control and/or delete cookies as you wish. You can delete all cookies that are
                already on your device and set most browsers to prevent them from being placed.
              </p>
              <div className="p-4 rounded-lg bg-card">
                <h3 className="font-semibold mb-2">Browser Settings</h3>
                <p className="text-muted-foreground">
                  Most browsers allow you to refuse to accept cookies and to delete cookies. The methods
                  for doing so vary from browser to browser. Please refer to your browser&apos;s help
                  documentation for more information.
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeIn}>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our use of cookies, please contact us through our{' '}
                <a href="/contact" className="text-primary hover:underline">
                  contact page
                </a>
                .
              </p>
            </motion.section>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
