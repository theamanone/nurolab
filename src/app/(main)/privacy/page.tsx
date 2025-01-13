'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: January 12, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Nurolab ("we," "our," or "us"). We respect your privacy and are committed
            to protecting your personal data.
          </p>

          <h2>2. Data We Collect</h2>
          <ul>
            <li>Account information (name, email, password)</li>
            <li>Profile information</li>
            <li>Course progress and completion data</li>
            <li>Usage data and analytics</li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <p>
            We use your data to provide and improve our services, including:
          </p>
          <ul>
            <li>Personalizing your learning experience</li>
            <li>Tracking your progress</li>
            <li>Providing support</li>
            <li>Sending important updates</li>
          </ul>

          <h2>4. Data Protection</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your
            personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@nurolab.ai
          </p>
        </div>
      </motion.div>
    </div>
  );
}
