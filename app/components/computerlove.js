import { motion, AnimatePresence } from 'framer-motion';
import { Scroll } from 'lucide-react';
import { useState, useEffect } from 'react';

const ComputerLove = () => {
  const [displayText, setDisplayText] = useState('computer');
  const words = ['Computer Science', 'User Interfaces','User Experience', 'Blockchains', 'Gaphic Design', 'Photography', 'Web Development','Software Engineering'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      
      className="h-[25vh] flex items-center justify-center bg-gray-900 text-white p-4"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          I love{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={words[currentIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 inline-block"
            >
              {words[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </h2>
      
      </div>
    </motion.div>
  );
};

export default ComputerLove;