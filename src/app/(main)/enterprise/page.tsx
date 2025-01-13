'use client';

import { motion } from 'framer-motion';

export default function EnterprisePage() {
  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Enterprise Solutions</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Empower your team with custom machine learning education solutions
          </p>
          <form className="max-w-md mx-auto">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full p-3 rounded-md border border-border bg-background"
              />
              <input
                type="email"
                placeholder="Work Email"
                className="w-full p-3 rounded-md border border-border bg-background"
              />
              <textarea
                placeholder="Tell us about your needs"
                rows={4}
                className="w-full p-3 rounded-md border border-border bg-background"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-md"
              >
                Contact Sales
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
