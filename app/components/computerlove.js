'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const ComputerLove = () => {
  const words = [
    'Computer Science',
    'User Interfaces',
    'User Experience',
    'Blockchains',
    'Gaphic Design',
    'Photography',
    'Web Development',
    'Software Engineering'
  ];

  // Reduce state updates by using useRef for non-visual state
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Increase interval time to reduce re-renders
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000); // increased from 2000 to 3000ms

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[25vh] flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          I love{' '}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
              className="text-red-500 inline-block"
            >
              {words[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </h2>
      </div>
    </div>
  );
};

export default ComputerLove;