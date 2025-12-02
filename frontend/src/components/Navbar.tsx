import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code, Briefcase, GraduationCap, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef([]);
  const limelightRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { href: '#about', label: 'About', icon: <User className="w-4 h-4" /> },
    { href: '#skills', label: 'Skills', icon: <Code className="w-4 h-4" /> },
    { href: '#projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { href: '#experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { href: '#education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { href: '#contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  useLayoutEffect(() => {
    if (navLinks.length === 0) return;

    const activeIndex = navLinks.findIndex(link => link.href.slice(1) === activeSection);
    if (activeIndex === -1) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeSection, isReady, navLinks.length]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .limelight-spotlight {
          box-shadow: 0 50px 30px rgba(59, 130, 246, 0.5);
        }
        
        .limelight-glow {
          clip-path: polygon(5% 100%, 25% 0, 75% 0, 95% 100%);
        }
      `}</style>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-white/10 backdrop-blur-2xl shadow-2xl border-b border-white/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => handleNavClick('#home')}
            >
              &lt; PSrinivas /&gt;
            </motion.div>

            {/* Desktop Navigation with Limelight Effect */}
            <div className="hidden lg:flex relative items-center h-16 px-2">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  ref={el => (navItemRefs.current[index] = el)}
                  onClick={() => handleNavClick(link.href)}
                  className="relative z-20 flex h-full cursor-pointer items-center justify-center px-5 py-2 transition-all duration-200"
                  aria-label={link.label}
                >
                  <div className={`flex items-center space-x-2 transition-opacity duration-100 ${
                    activeSection === link.href.slice(1) ? 'opacity-100' : 'opacity-40'
                  }`}>
                    {link.icon}
                    <span className="font-medium text-gray-700">{link.label}</span>
                  </div>
                </button>
              ))}

              {/* Limelight Effect */}
              <div 
                ref={limelightRef}
                className={`absolute top-0 z-10 w-16 h-[5px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 limelight-spotlight ${
                  isReady ? 'transition-[left] duration-[400ms] ease-in-out' : ''
                }`}
                style={{ left: '-999px' }}
              >
                <div className="absolute left-[-30%] top-[5px] w-[160%] h-14 limelight-glow bg-gradient-to-b from-blue-500/30 to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-700 hover:text-blue-600 transition-colors backdrop-blur-sm border border-white/20"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white/10 backdrop-blur-2xl border-t border-white/20 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeSection === link.href.slice(1)
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 shadow-lg'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-white/10'
                    }`}
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


    </>
  );
};

export default Navbar;
