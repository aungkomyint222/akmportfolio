'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const GradientLine = () => {
  const [gradient, setGradient] = useState(
    'linear-gradient(90deg, #a1c4fd, #c2e9fb, #fbc2eb, #f5f7fa)'
  );

  useEffect(() => {
    let hue = 0;
    const interval = setInterval(() => {
      hue = (hue + 1) % 360;
      setGradient(
        `linear-gradient(90deg, hsl(${hue}, 60%, 80%), hsl(${(hue + 60) % 360}, 60%, 80%), hsl(${(hue + 120) % 360}, 60%, 80%), hsl(${(hue + 180) % 360}, 60%, 80%), hsl(${(hue + 240) % 360}, 60%, 80%), hsl(${(hue + 300) % 360}, 60%, 80%))`
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full h-3"
      style={{ background: gradient }}
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

export default GradientLine;
