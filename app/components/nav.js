'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for the nav background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup if the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <nav 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-gradient-to-br from-cyan-600 to-indigo-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className={`text-xl font-bold transition-all duration-300 ${
              scrolled
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                : 'text-white-900'
            } hover:opacity-80`}
          >
            akm's portfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['aboutme', 'taskest'].map((item) => (
              <Link 
                key={item}
                href={`/${item}`} 
                className={`text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? 'text-black hover:text-blue-600'
                    : 'text-white hover:text-gray-600'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled 
                ? 'hover:bg-gray-100' 
                : 'hover:bg-gray-200'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Background Overlay for Dimming */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Slider */}
      <div 
        className="md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 z-40"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="p-4">
          <button 
            onClick={() => setIsOpen(false)} 
            className="mb-4 p-2 rounded-lg hover:bg-gray-200"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <nav className="flex flex-col space-y-4">
            {['aboutme', 'taskest'].map((item) => (
              <Link 
                key={item}
                href={`/${item}`} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-black hover:text-blue-600 transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
