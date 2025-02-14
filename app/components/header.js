'use client'
import React from 'react';
import Link from "next/link";

const Header = () => {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-cyan-600 to-indigo-900 text-white px-4 py-8 relative overflow-hidden">
      {/* Glow effect in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />
      
      <div className="max-w-xl mx-auto text-center relative z-10">
        {/* Greeting */}
        <h1 className="text-xl font-bold text-cyan-200 mb-3 drop-shadow-[0_0_15px_rgba(103,232,249,0.3)]">
          Hello, I&apos;m
        </h1>

        {/* Name */}
        <div className="mb-4">
          <h2 className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            AUNG KO MYINT
          </h2>
        </div>

        {/* Description */}
        <p className="text-base font-medium text-cyan-50 leading-relaxed mb-6 drop-shadow-[0_0_10px_rgba(165,243,252,0.3)]">
          A Creative Developer transforming businesses through innovative digital solutions.
        </p>

        {/* CTA Button with glow effect */}
        <Link
          href="/aboutme"
          className="inline-block px-6 py-2 bg-white text-indigo-900 font-bold rounded-lg 
                   hover:bg-cyan-50 transform hover:-translate-y-1 transition-all duration-300 text-sm
                   shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Header;