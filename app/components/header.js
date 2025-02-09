import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Linkedin, Github, Phone, Youtube } from "lucide-react";

const Header = () => {
  const name = "AUNGKOMYINT".split("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % name.length);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { icon: Mail, href: "mailto:myintkoaung4@gmail.com", label: "Email" },
    { icon: Phone, href: "https://wa.me/+66818987873", label: "Phone" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/akmnbc/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/agkomyint", label: "GitHub" },
    { icon: Youtube, href: "https://www.youtube.com/@kiskyyt", label: "Youtube" }
  ];

  return (
    <div className="min-h-[30vh] relative overflow-hidden bg-gradient-to-br from-cyan-600 to-indigo-900 text-white p-6">
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-40"
          animate={{
            x: [Math.random() * 1000, Math.random() * 1000],
            y: [Math.random() * 200, Math.random() * 200],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}

      {/* Main content container */}
      <div className="flex flex-col items-center justify-center text-center relative z-10">
        {/* Greeting */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4 text-opacity-80"
        >
          Hi, it's me
        </motion.h1>

        {/* Animated name */}
        <motion.h2
          className="text-3xl font-extrabold flex flex-wrap justify-center gap-1 mb-6"
          style={{
            textShadow: '0 0 15px rgba(255,255,255,0.5)'
          }}
        >
          {name.map((letter, index) => (
            <motion.span
              key={index}
              animate={{
                scale: activeIndex === index ? 1.4 : 1,
                y: activeIndex === index ? -10 : 0,
                rotate: activeIndex === index ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.3 }}
              className="inline-block cursor-pointer"
              whileHover={{ scale: 1.2, color: '#FFD700' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>

        {/* Social links */}
        <motion.div 
          className="flex gap-3 mb-9"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link 
                href={href} 
                target="_blank"
                className="block p-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <Icon className="w-5 h-5 text-gray-200" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Download CV Button with Liquid Background */}
        <motion.div className="relative">
          <motion.a
            href="/aungkomyintCV%202_8_2025.pdf"
            download
            className="relative inline-block overflow-hidden rounded-xl px-8 py-3 font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-white">Download CV</span>
            {/* Liquid Background Animation */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(270deg, #6a11cb, #2575fc, #6a11cb)",
                backgroundSize: "400% 400%",
                // The CSS animation below gives the liquid effect by shifting the gradient continuously
                animation: "liquidAnimation 8s ease infinite"
              }}
            />
          </motion.a>
        </motion.div>
      </div>

      {/* CSS Keyframes for Liquid Animation */}
      <style jsx>{`
        @keyframes liquidAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
