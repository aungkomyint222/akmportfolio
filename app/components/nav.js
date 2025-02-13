'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Library } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <Link
            href="/"
            className={`text-2xs font-bold transition-all duration-300 ${
              scrolled
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                : 'text-white'
            } hover:opacity-80`}
          >
            akm&apos;s portfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['aboutme', 'taskest','careercompass'].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? 'text-black hover:text-blue-600'
                    : 'text-white hover:text-gray-200'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/app-library"
              className={`inline-flex items-center px-2.5 py-1.5 text-2xs font-medium rounded-full transition-all duration-200 ${
                scrolled
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Library className="w-4 h-4 mr-1" />
              Apps Library
            </Link>
            <button
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'text-black hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['aboutme', 'taskest','careercompass'].map((item) => (
                <Link
                  key={item}
                  href={`/${item}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    scrolled
                      ? 'text-black hover:text-blue-600 hover:bg-gray-100'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;