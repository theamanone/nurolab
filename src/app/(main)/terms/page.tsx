'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: January 12, 2025</p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using Nurolab, you agree to be bound by these Terms of Service and all
            applicable laws and regulations.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily access and use Nurolab for personal,
            non-commercial use only.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password.
            You agree to accept responsibility for all activities that occur under your account.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content included as part of the Service, such as text, graphics, logos, images,
            as well as the compilation thereof, and any software used on the Service, is the
            property of Nurolab or its suppliers and protected by copyright and other laws.
          </p>

          <h2>5. User Content</h2>
          <p>
            By posting, uploading, or sharing any content on Nurolab, you grant us a worldwide,
            non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify,
            publish, transmit, display, and distribute such content.
          </p>

          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately,
            without prior notice or liability, under our sole discretion, for any reason
            whatsoever.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall Nurolab, nor its directors, employees, partners, agents,
            suppliers, or affiliates, be liable for any indirect, incidental, special,
            consequential, or punitive damages.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            Email: legal@nurolab.ai
          </p>
        </div>
      </motion.div>
    </div>
  );
}
