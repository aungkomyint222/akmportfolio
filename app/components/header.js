'use client'
import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const containerVariants = {
    hidden: { 
      y: -50,
      opacity: 0 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-cyan-600 to-indigo-900 text-white px-4 py-8">
      <motion.div 
        className="max-w-xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <h1 className="text-xl font-bold text-cyan-200 mb-3">
          Hello, I'm
        </h1>

        {/* Name */}
        <div className="mb-4">
          <h2 className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
            AUNG KO MYINT
          </h2>
        </div>

        {/* Description */}
        <p className="text-base font-medium text-cyan-50 leading-relaxed mb-6">
          A Creative Developer transforming businesses through innovative digital solutions.
        </p>

        {/* CTA Button */}
        <Link 
          href="/aboutme"
          className="inline-block px-6 py-2 bg-white text-indigo-900 font-bold rounded-lg hover:bg-cyan-50 transform hover:-translate-y-1 transition-all duration-300 text-sm"
        >
          Learn More
        </Link>
      </motion.div>
    </div>
  );
};

export default Header;