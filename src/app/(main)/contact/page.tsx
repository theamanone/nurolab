'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Have questions? We'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 rounded-md border border-border bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded-md border border-border bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 rounded-md border border-border bg-background"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-white rounded-md"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-primary" />
                    <span className="text-muted-foreground">support@nurolab.ai</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-primary" />
                    <span className="text-muted-foreground">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-primary" />
                    <span className="text-muted-foreground">
                      123 AI Street, San Francisco, CA 94105
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Office Hours</h2>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM (PST)
                  <br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
