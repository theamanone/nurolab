'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { setCookie, getCookie } from 'cookies-next';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = getCookie('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie('cookie-consent', 'true', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'strict',
      secure: true,
    });
    setIsVisible(false);
  };

  const declineCookies = () => {
    setCookie('cookie-consent', 'false', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'strict',
      secure: true,
    });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-background border-t z-50"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">🍪 Cookie Settings</h3>
                <p className="text-muted-foreground">
                  We use cookies to enhance your learning experience and analyze site traffic. 
                  By clicking "Accept", you consent to our use of cookies. Read our{' '}
                  <a href="/cookies" className="text-primary hover:underline">
                    cookie policy
                  </a>{' '}
                  to learn more.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={declineCookies}
                  className="min-w-[100px]"
                >
                  Decline
                </Button>
                <Button
                  onClick={acceptCookies}
                  className="min-w-[100px]"
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
