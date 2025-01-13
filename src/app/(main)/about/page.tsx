'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBrain, FaRobot, FaChartLine, FaGraduationCap } from 'react-icons/fa';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: FaBrain,
      title: "AI-Powered Learning",
      description: "Our platform adapts to your learning style using advanced AI algorithms.",
    },
    {
      icon: FaRobot,
      title: "Interactive ML Tools",
      description: "Practice with real machine learning models in your browser.",
    },
    {
      icon: FaChartLine,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and insights.",
    },
    {
      icon: FaGraduationCap,
      title: "Structured Curriculum",
      description: "Follow a carefully designed path from basics to advanced ML concepts.",
    },
  ];

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="container mx-auto px-4"
      >
        {/* Hero Section */}
        <motion.div 
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Welcome to Nurolab
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering the next generation of ML engineers through interactive and intuitive learning
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-6 rounded-lg bg-card hover:bg-accent/50 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="max-w-3xl mx-auto space-y-12"
        >
          <motion.section variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              To democratize machine learning education by providing an accessible, 
              interactive platform that combines theoretical knowledge with practical 
              experience, enabling anyone to master ML concepts and build real-world applications.
            </p>
          </motion.section>

          <motion.section variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-4">Why Choose Nurolab?</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card">
                <h3 className="font-semibold mb-2">Focused on Machine Learning</h3>
                <p className="text-muted-foreground">
                  Our curriculum is specifically designed for ML education, 
                  covering everything from basic concepts to advanced neural networks.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card">
                <h3 className="font-semibold mb-2">Interactive Learning</h3>
                <p className="text-muted-foreground">
                  Practice with real ML models directly in your browser, 
                  with immediate feedback and guidance from our AI system.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card">
                <h3 className="font-semibold mb-2">Community Driven</h3>
                <p className="text-muted-foreground">
                  Join a community of ML enthusiasts, share your progress, 
                  and learn from others' experiences.
                </p>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  );
}
