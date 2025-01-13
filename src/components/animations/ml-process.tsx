'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBrain, FaDatabase, FaChartLine, FaRobot } from 'react-icons/fa';

const MLProcessAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Data Collection & Processing',
      icon: <FaDatabase className="text-4xl" />,
      animation: (
        <motion.div className="w-full h-[400px] relative">
          <motion.div
            className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-2 p-8"
            initial="hidden"
            animate="visible"
          >
            {Array.from({ length: 64 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-primary/20 rounded-lg backdrop-blur-sm relative overflow-hidden group"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  background: i % 3 === 0 ? ['rgba(99, 102, 241, 0.2)', 'rgba(129, 140, 248, 0.3)', 'rgba(99, 102, 241, 0.2)'] : undefined
                }}
                transition={{
                  delay: i * 0.02,
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.04
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )
    },
    {
      title: 'Neural Network Training',
      icon: <FaBrain className="text-4xl" />,
      animation: (
        <motion.div className="w-full h-[400px] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 3 }).map((_, layerIndex) => (
              <div
                key={layerIndex}
                className="flex flex-col items-center justify-center mx-12"
              >
                {Array.from({ length: layerIndex === 1 ? 5 : 4 }).map((_, nodeIndex) => (
                  <motion.div
                    key={nodeIndex}
                    className="w-6 h-6 bg-primary rounded-full my-4 relative"
                    animate={{
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(99, 102, 241, 0.4)',
                        '0 0 0 10px rgba(99, 102, 241, 0)',
                        '0 0 0 0 rgba(99, 102, 241, 0.4)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: nodeIndex * 0.2 + layerIndex * 0.5
                    }}
                  >
                    {layerIndex < 2 && (
                      <motion.div
                        className="absolute left-full top-1/2 w-[100px] h-0.5 origin-left"
                        style={{
                          background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.6), rgba(99, 102, 241, 0.2))'
                        }}
                        animate={{
                          scaleX: [0, 1, 1, 0],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: nodeIndex * 0.2 + layerIndex * 0.5
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )
    },
    {
      title: 'Model Optimization',
      icon: <FaChartLine className="text-4xl" />,
      animation: (
        <motion.div className="w-full h-[400px] relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
            <motion.div className="w-3/4 space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">Loss</span>
                <motion.div
                  className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: '100%' }}
                    animate={{ width: '20%' }}
                    transition={{
                      duration: 4,
                      ease: 'easeInOut',
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">Accuracy</span>
                <motion.div
                  className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '95%' }}
                    transition={{
                      duration: 4,
                      ease: 'easeInOut',
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              </div>

              <motion.div 
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-4xl font-bold text-primary"
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [20, 0, 0, -20]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  times: [0, 0.2, 0.8, 1]
                }}
              >
                95.8%
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )
    },
    {
      title: 'AI Inference',
      icon: <FaRobot className="text-4xl" />,
      animation: (
        <motion.div className="w-full h-[400px] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative w-64 h-64"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full"
                  style={{
                    rotate: `${i * 45}deg`,
                    transformOrigin: '50% 50%'
                  }}
                >
                  <motion.div
                    className="w-4 h-4 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                </motion.div>
              ))}
              <motion.div
                className="absolute inset-8 rounded-xl border-2 border-primary/50"
                animate={{
                  scale: [0.8, 1, 0.8],
                  borderColor: ['rgba(99, 102, 241, 0.2)', 'rgba(99, 102, 241, 0.6)', 'rgba(99, 102, 241, 0.2)']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary"
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                >
                  AI
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-8"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="text-primary"
            >
              {steps[currentStep].icon}
            </motion.div>
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              {steps[currentStep].title}
            </h3>
          </div>
          {steps[currentStep].animation}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MLProcessAnimation;
