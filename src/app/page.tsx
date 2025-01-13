'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaGraduationCap, FaLaptopCode, FaBrain, FaChartLine, FaCode, FaRobot } from 'react-icons/fa';
import MLProcessAnimation from '@/components/animations/ml-process';

// Animation for text that cycles through different ML concepts
const MLConceptsAnimation = () => {
  const concepts = [
    { text: "Neural Networks", icon: FaBrain },
    { text: "Deep Learning", icon: FaChartLine },
    { text: "Computer Vision", icon: FaCode },
    { text: "Natural Language", icon: FaRobot }
  ];
  const [conceptIndex, setConceptIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setConceptIndex((prev) => (prev + 1) % concepts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-16 relative">
      {concepts.map((concept, index) => {
        const Icon = concept.icon;
        return (
          <motion.div
            key={concept.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: conceptIndex === index ? 1 : 0,
              y: conceptIndex === index ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center space-x-2 text-primary"
          >
            <Icon className="w-6 h-6" />
            <span className="text-xl">{concept.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

const NeuralAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural network parameters
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }[] = [];

    const colors = [
      'rgba(99, 102, 241, 0.8)',   // Indigo
      'rgba(139, 92, 246, 0.8)',   // Purple
      'rgba(59, 130, 246, 0.8)',   // Blue
    ];

    // Initialize nodes with different sizes and colors
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach(node => {
        // Add mouse interaction
        const dx = mousePos.x - node.x;
        const dy = mousePos.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          node.vx -= Math.cos(angle) * 0.5;
          node.vy -= Math.sin(angle) * 0.5;
        }

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls with damping
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -0.8;
          node.x = Math.max(0, Math.min(canvas.width, node.x));
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -0.8;
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }

        // Apply friction
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections
      nodes.forEach((node1, i) => {
        nodes.slice(i + 1).forEach(node2 => {
          const dx = node2.x - node1.x;
          const dy = node2.y - node1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const gradient = ctx.createLinearGradient(
              node1.x, node1.y, node2.x, node2.y
            );
            gradient.addColorStop(0, node1.color);
            gradient.addColorStop(1, node2.color);

            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.max(0, 1 - distance / 150) * 2;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

const features = [
  {
    icon: <FaGraduationCap className="w-8 h-8" />,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world experience in machine learning and AI."
  },
  {
    icon: <FaLaptopCode className="w-8 h-8" />,
    title: "Hands-on Projects",
    description: "Build real ML projects with guided tutorials and instant feedback from our AI system."
  },
  {
    icon: <FaBrain className="w-8 h-8" />,
    title: "AI-Powered Learning",
    description: "Personalized learning paths adapted to your pace and style using advanced AI algorithms."
  }
];

export default function Home() {
  return (
    <>
      <div className="relative min-h-[90vh] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0">
          <NeuralAnimation />
        </div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% auto' }}
              >
                Next-Gen Machine
                <br />
                Learning Education
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Experience the future of ML learning with our AI-powered platform. 
                Build real projects, get instant feedback, and learn from industry experts.
              </motion.p>

              <MLConceptsAnimation />

              <div className="mt-12 bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700">
                <MLProcessAnimation />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
              >
                <Link 
                  href="/courses" 
                  className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Explore Courses
                </Link>
                <Link 
                  href="/about" 
                  className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-primary/50 transition-colors"
              >
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
