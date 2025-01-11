"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState("");
  
  useEffect(() => {
    const targetDate = new Date("2025-05-11"); // 4 months from current date
    
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };
    
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-sm text-blue-400">Estimated Launch In</div>
      <div className="font-mono text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        {timeLeft}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Welcome to the Future of ML Learning
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            Experience machine learning like never before with our next-generation learning platform
          </p>
          <CountdownTimer />
        </header>

        <main className="space-y-20">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-white/10">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-blue-200">Learn ML concepts through hands-on exercises and real-time feedback</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-white/10">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Assistance</h3>
              <p className="text-blue-200">Get personalized guidance from our advanced AI tutoring system</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-white/10">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Project-Based Learning</h3>
              <p className="text-blue-200">Build real-world ML projects with industry-standard tools</p>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Join the Waitlist
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="group px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-300"
              >
                Register Interest
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                  →
                </span>
              </Link>
            </div>
          </section>
        </main>

        <footer className="mt-20 pt-8 border-t border-white/10">
          <div className="flex justify-center space-x-8 text-blue-300">
            <Link href="/community" className="hover:text-white transition-colors">Community</Link>
            <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
