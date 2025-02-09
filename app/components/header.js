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
    { icon: Linkedin, href: "https://www.linkedin.com/in/yourlinkedin", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/yourgithub", label: "GitHub" },
    { icon: Youtube, href: "https://github.com/yourgithub", label: "Youtube" }
  ];

  return (
    <div className="min-h-[45vh] relative overflow-hidden bg-gradient-to-br from-red-900 to-red-700 text-white p-6">
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-50"
          animate={{
            x: [
              Math.random() * 1000,
              Math.random() * 1000
            ],
            y: [
              Math.random() * 200,
              Math.random() * 200
            ],
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
          className="text-3xl font-bold mb-4"
        >
          Hi, it's me
        </motion.h1>

        {/* Animated name */}
        <motion.h2
          className="text-3xl font-extrabold flex flex-wrap justify-center gap-1 mb-6"
          style={{
            textShadow: '0 0 10px rgba(255,255,255,0.3)'
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
              whileHover={{ scale: 1.2, color: '#ffd700' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>

        {/* Social links */}
        <motion.div 
          className="flex gap-3 mb-6"
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
                <Icon className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Download CV Button with Wave Effect */}
        <motion.div
          className="relative"
          whileHover="hover"
          whileTap="tap"
        >
          <motion.a
            href="/aungkomyintCV%202_8_2025.pdf"
            download
            className="relative inline-block overflow-hidden rounded-xl px-8 py-3 bg-white text-black font-semibold"
            variants={{
              hover: {
                scale: 1.05,
                transition: {
                  duration: 0.2
                }
              },
              tap: {
                scale: 0.95
              }
            }}
          >
            <span className="relative z-10">Download CV</span>
            {/* Wave animation overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              variants={{
                hover: {
                  x: ["100%", "-100%"],
                  transition: {
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear"
                  }
                }
              }}
              style={{
                opacity: 0.7,
                mixBlendMode: "color"
              }}
            />
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-white"
              variants={{
                hover: {
                  x: ["-100%", "100%"],
                  transition: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear"
                  }
                }
              }}
              style={{
                opacity: 0.2,
                skewX: -20
              }}
            />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;