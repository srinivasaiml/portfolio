import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code, Briefcase, GraduationCap, Mail } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement>(null);
  
  const { theme, toggleTheme } = useTheme();

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
        setTimeout(() => setIsReady, 50);
      }
    }
  }, [activeSection, isReady, navLinks.length]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        /* Signature Font Import */
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Allura&family=Sacramento&display=swap');
        
        .font-signature {
          font-family: 'Great Vibes', cursive;
        }
        
        .font-signature-alt {
          font-family: 'Allura', cursive;
        }

        /* --- Limelight Styles --- */
        .limelight-spotlight {
          box-shadow: 0 50px 30px rgba(59, 130, 246, 0.5);
        }
        .limelight-glow {
          clip-path: polygon(5% 100%, 25% 0, 75% 0, 95% 100%);
        }

        /* --- Airplane Switch Styles --- */
        .plane-switch {
          --dot: #fff;
          --street: #6B6D76;
          --street-line: #A8AAB4;
          --street-line-mid: #C0C2C8;
          --sky-1: #60A7FA;
          --sky-2: #2F8EFC;
          --light-1: rgba(255, 233, 0, 1);
          --light-2: rgba(255, 233, 0, .3);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .plane-switch input {
          display: none;
        }

        .plane-switch .switch-body {
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          position: relative;
          overflow: hidden;
          width: 60px;
          height: 30px;
          padding: 1px;
          border-radius: 15px;
          background: linear-gradient(90deg, var(--street) 0%, var(--street) 25%, var(--sky-1) 75%, var(--sky-2) 100%) left var(--p, 0%) top 0;
          background-position-x: var(--p, 0%);
          background-size: 400% auto;
          transition: background-position 0.6s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .plane-switch .switch-body:before, .plane-switch .switch-body:after {
          content: "";
          display: block;
          position: absolute;
          transform: translateX(var(--s, 0));
          transition: transform 0.3s;
        }

        .plane-switch .switch-body:before {
          width: 42px;
          right: 2px;
          top: 4px;
          height: 1px;
          background: var(--street-line);
          box-shadow: 0 16px 0 0 var(--street-line);
        }

        .plane-switch .switch-body:after {
          width: 2px;
          height: 2px;
          border-radius: 50%;
          left: 23px;
          top: 1px;
          -webkit-animation: lights2 2s linear infinite;
          animation: lights2 2s linear infinite;
          box-shadow: inset 0 0 0 2px var(--light-1), 0 21px 0 var(--light-1), 8px 0 0 var(--light-2), 8px 21px 0 var(--light-2), 16px 0 0 var(--light-2), 16px 21px 0 var(--light-2);
        }

        .plane-switch .switch-body span {
          display: block;
          position: absolute;
        }

        .plane-switch .switch-body span.street-middle {
          top: 12px;
          left: 21px;
          width: 3px;
          height: 1px;
          transform: translateX(var(--s, 0));
          background: var(--street-line-mid);
          box-shadow: 5px 0 0 var(--street-line-mid), 10px 0 0 var(--street-line-mid), 15px 0 0 var(--street-line-mid), 20px 0 0 var(--street-line-mid), 25px 0 0 var(--street-line-mid);
          transition: transform 0.3s;
        }

        .plane-switch .switch-body span.cloud {
          width: 12px;
          height: 4px;
          border-radius: 2px;
          background: #fff;
          position: absolute;
          top: var(--ct, 8px);
          left: 100%;
          opacity: var(--co, 0);
          transition: opacity 0.3s;
          -webkit-animation: clouds2 2s linear infinite var(--cd, 0s);
          animation: clouds2 2s linear infinite var(--cd, 0s);
        }

        .plane-switch .switch-body span.cloud:before, .plane-switch .switch-body span.cloud:after {
          content: "";
          position: absolute;
          transform: translateX(var(--cx, 0));
          border-radius: 50%;
          width: var(--cs, 5px);
          height: var(--cs, 5px);
          background: #fff;
          bottom: 1px;
          left: 1px;
        }

        .plane-switch .switch-body span.cloud:after {
          --cs: 6px;
          --cx: 4px;
        }

        .plane-switch .switch-body span.cloud.two {
          --ct: 20px;
          --cd: 1s;
          opacity: var(--co-2, 0);
        }

        .plane-switch .switch-body .plane-icon {
          display: table;
          position: relative;
          z-index: 1;
          padding: 5px;
          border-radius: 50%;
          background: var(--dot);
          transform: translateX(var(--x, 0));
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.35, 1.2);
        }

        .plane-switch .switch-body .plane-icon svg {
          width: 13px;
          height: 13px;
          display: block;
          color: var(--c, var(--street));
          transition: color 0.6s;
        }

        .plane-switch input:checked + .switch-body {
          --p: 100%;
          --x: 30px;
          --s: -50px;
          --c: var(--sky-2);
          --co: .8;
          --co-2: .6;
        }

        @keyframes lights2 {
          20%, 30% {
            box-shadow: inset 0 0 0 2px var(--light-2), 0 21px 0 var(--light-2), 8px 0 0 var(--light-1), 8px 21px 0 var(--light-1), 16px 0 0 var(--light-2), 16px 21px 0 var(--light-2);
          }
          55%, 65% {
            box-shadow: inset 0 0 0 2px var(--light-2), 0 21px 0 var(--light-2), 8px 0 0 var(--light-2), 8px 21px 0 var(--light-2), 16px 0 0 var(--light-1), 16px 21px 0 var(--light-1);
          }
          90%, 100% {
            box-shadow: inset 0 0 0 2px var(--light-1), 0 21px 0 var(--light-1), 8px 0 0 var(--light-2), 8px 21px 0 var(--light-2), 16px 0 0 var(--light-2), 16px 21px 0 var(--light-2);
          }
        }

        @keyframes clouds2 {
          97% {
            transform: translateX(-72px);
            visibility: visible;
          }
          98%, 100% {
            visibility: hidden;
          }
          99% {
            transform: translateX(-72px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/10 dark:bg-black/20 backdrop-blur-2xl shadow-2xl border-b border-white/20 dark:border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Signature Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group"
              onClick={() => handleNavClick('#home')}
            >
              <div className="relative">
                {/* Main Signature Text */}
                <h1 className="text-2xl md:text-3xl font-signature bg-gradient-to-r from-orange-600 via-pink-600 to-violet-600 dark:from-orange-400 dark:via-pink-400 dark:to-violet-400 bg-clip-text text-transparent">
                  P. Srinivas
                </h1>
                
                {/* Subtle Underline Effect */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex relative items-center h-16 px-2">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  ref={el => (navItemRefs.current[index] = el)}
                  onClick={() => handleNavClick(link.href)}
                  className="relative z-20 flex h-full cursor-pointer items-center justify-center px-4 py-2 transition-all duration-200"
                  aria-label={link.label}
                >
                  <div className={`flex items-center space-x-2 transition-opacity duration-100 ${
                    activeSection === link.href.slice(1) 
                    ? 'opacity-100' 
                    : 'opacity-60 dark:opacity-50 hover:opacity-100'
                  }`}>
                    <span className="dark:text-white text-gray-700">{link.icon}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">{link.label}</span>
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

            <div className="flex items-center gap-4">
              {/* Airplane Toggle Switch */}
              <label className="plane-switch">
                <input 
                  type="checkbox" 
                  checked={theme === 'light'}
                  onChange={toggleTheme}
                />
                <div className="switch-body">
                  <div className="plane-icon">
                    <svg viewBox="0 0 13 13">
                      <path d="M1.55989957,5.41666667 L5.51582215,5.41666667 L4.47015462,0.108333333 L4.47015462,0.108333333 C4.47015462,0.0634601974 4.49708054,0.0249592654 4.5354546,0.00851337035 L4.57707145,0 L5.36229752,0 C5.43359776,0 5.50087375,0.028779451 5.55026392,0.0782711996 L5.59317877,0.134368264 L7.13659662,2.81558333 L8.29565964,2.81666667 C8.53185377,2.81666667 8.72332694,3.01067661 8.72332694,3.25 C8.72332694,3.48932339 8.53185377,3.68333333 8.29565964,3.68333333 L7.63589819,3.68225 L8.63450135,5.41666667 L11.9308317,5.41666667 C12.5213171,5.41666667 13,5.90169152 13,6.5 C13,7.09830848 12.5213171,7.58333333 11.9308317,7.58333333 L8.63450135,7.58333333 L7.63589819,9.31666667 L8.29565964,9.31666667 C8.53185377,9.31666667 8.72332694,9.51067661 8.72332694,9.75 C8.72332694,9.98932339 8.53185377,10.1833333 8.29565964,10.1833333 L7.13659662,10.1833333 L5.59317877,12.8656317 C5.55725264,12.9280353 5.49882018,12.9724157 5.43174295,12.9907056 L5.36229752,13 L4.57707145,13 L4.55610333,12.9978962 C4.51267695,12.9890959 4.48069792,12.9547924 4.47230803,12.9134397 L4.47223088,12.8704208 L5.51582215,7.58333333 L1.55989957,7.58333333 L0.891288881,8.55114605 C0.853775374,8.60544678 0.798421006,8.64327676 0.73629202,8.65879796 L0.672314689,8.66666667 L0.106844414,8.66666667 L0.0715243949,8.66058466 L0.0715243949,8.66058466 C0.0297243066,8.6457608 0.00275502199,8.60729104 0,8.5651586 L0.00593007386,8.52254537 L0.580855011,6.85813984 C0.64492547,6.67265611 0.6577034,6.47392717 0.619193545,6.28316421 L0.580694768,6.14191703 L0.00601851064,4.48064746 C0.00203480725,4.4691314 0,4.45701613 0,4.44481314 C0,4.39994001 0.0269259152,4.36143908 0.0652999725,4.34499318 L0.106916826,4.33647981 L0.672546853,4.33647981 C0.737865848,4.33647981 0.80011301,4.36066329 0.848265401,4.40322477 L0.89131128,4.45169723 L1.55989957,5.41666667 Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="street-middle" />
                  <span className="cloud" />
                  <span className="cloud two" />
                </div>
              </label>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-white/10 dark:to-white/5 text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors backdrop-blur-sm border border-white/20"
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
              className="lg:hidden bg-white/10 dark:bg-black/60 backdrop-blur-2xl border-t border-white/20 dark:border-white/10 overflow-hidden"
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
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/10 dark:hover:bg-white/5'
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