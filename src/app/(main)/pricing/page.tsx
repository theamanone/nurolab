'use client';

import { motion } from 'framer-motion';

export default function PricingPage() {
  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <h1 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <p className="text-3xl font-bold mb-4">$0</p>
            <ul className="space-y-2 mb-6">
              <li className="text-muted-foreground">Access to basic courses</li>
              <li className="text-muted-foreground">Community support</li>
            </ul>
            <button className="w-full px-4 py-2 rounded-md bg-primary text-white">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="p-6 rounded-lg border-2 border-primary bg-card relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                Popular
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-4">$29</p>
            <ul className="space-y-2 mb-6">
              <li className="text-muted-foreground">All Free features</li>
              <li className="text-muted-foreground">Advanced courses</li>
              <li className="text-muted-foreground">Priority support</li>
            </ul>
            <button className="w-full px-4 py-2 rounded-md bg-primary text-white">
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <p className="text-3xl font-bold mb-4">Custom</p>
            <ul className="space-y-2 mb-6">
              <li className="text-muted-foreground">All Pro features</li>
              <li className="text-muted-foreground">Custom solutions</li>
              <li className="text-muted-foreground">Dedicated support</li>
            </ul>
            <button className="w-full px-4 py-2 rounded-md bg-primary text-white">
              Contact Sales
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
