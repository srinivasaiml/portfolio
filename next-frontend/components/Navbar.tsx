"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Menu, X } from 'lucide-react';
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '#home' },
    { name: 'Skills', path: '#skills' },
    { name: 'Projects', path: '#projects' },
    { name: 'Certificates', path: '#certificates' },
    { name: 'Contact', path: '#contact' },
  ];

  const handleNavClick = (path: string, closeMobile = false) => {
    if (closeMobile) setIsOpen(false);
    if (path.startsWith('#')) {
      const lenis = (window as any).lenis;
      if (lenis) {
        // Give mobile drawer time to animate out before scrolling
        const delay = closeMobile ? 120 : 0;
        setTimeout(() => {
          lenis.scrollTo(path, {
            offset: -80,          // clear the fixed navbar
            duration: 1.4,
            easing: (t: number) => 1 - Math.pow(1 - t, 3), // iOS cubic ease-out
          });
        }, delay);
      } else {
        const element = document.getElementById(path.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      router.push(path);
    }
  };

  const [activePath, setActivePath] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = navItems.map(item => item.path.substring(1));
      let currentSection = sections[0];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentSection = section;
          }
        }
      }
      setActivePath(`#${currentSection}`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIndex = navItems.findIndex(item => item.path === activePath);

  // Measure real label positions for accurate indicator placement
  const pillContainerRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLLabelElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 6, width: 0 });

  useEffect(() => {
    const update = () => {
      const container = pillContainerRef.current;
      const label = labelRefs.current[activeIndex >= 0 ? activeIndex : 0];
      if (container && label) {
        const cRect = container.getBoundingClientRect();
        const lRect = label.getBoundingClientRect();
        setIndicator({ left: lRect.left - cRect.left, width: lRect.width });
      }
    };
    // Small delay so DOM settles before measuring
    const t = setTimeout(update, 50);
    window.addEventListener('resize', update);
    return () => { clearTimeout(t); window.removeEventListener('resize', update); };
  }, [activeIndex, pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/70 dark:bg-black/40 backdrop-blur-2xl shadow-lg border-b border-white/20 dark:border-white/5'
        : 'bg-transparent'
        }`}
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="cursor-pointer group z-50 shrink-0"
          >
            <div className="relative">
              <span className={`text-3xl sm:text-4xl md:text-5xl ${dancingScript.className} font-bold tracking-tight bg-linear-to-r from-orange-400 via-pink-500 to-violet-500 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_2px_10px_rgba(236,72,153,0.3)]`}>
                P. Srinivas
              </span>
              <motion.div
                className="h-0.5 bg-linear-to-r from-orange-500 via-pink-500 to-violet-500 origin-left mt-1"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="pill-radio-container" ref={pillContainerRef}>
              {navItems.map((item, idx) => (
                <React.Fragment key={item.path}>
                  <input
                    type="radio"
                    name="nav"
                    id={`nav-${idx}`}
                    className="hidden"
                    checked={activePath === item.path}
                    onChange={() => handleNavClick(item.path)}
                  />
                  <label
                    htmlFor={`nav-${idx}`}
                    ref={(el) => { labelRefs.current[idx] = el; }}
                  >
                    {item.name}
                  </label>
                </React.Fragment>
              ))}
              {/* Indicator tracks the real DOM position of the active label */}
              <div
                className="pill-indicator"
                style={{
                  left: `${indicator.left}px`,
                  width: `${indicator.width}px`,
                }}
              />
            </div>

            {/* Theme Toggle */}
            <div className="toggle-container transform hover:scale-105 transition-transform">
              <input
                type="checkbox"
                className="toggle-input"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                aria-label="Toggle Theme"
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 292 142" className="toggle w-full h-full overflow-visible drop-shadow-sm">
                <path d="M71 142C31.7878 142 0 110.212 0 71C0 31.7878 31.7878 0 71 0C110.212 0 119 30 146 30C173 30 182 0 221 0C260 0 292 31.7878 292 71C292 110.212 260.212 142 221 142C181.788 142 173 112 146 112C119 112 110.212 142 71 142Z" className="toggle-background" />
                <rect rx={6} height={64} width={12} y={39} x={64} className="toggle-icon on" />
                <path d="M221 91C232.046 91 241 82.0457 241 71C241 59.9543 232.046 51 221 51C209.954 51 201 59.9543 201 71C201 82.0457 209.954 91 221 91ZM221 103C238.673 103 253 88.6731 253 71C253 53.3269 238.673 39 221 39C203.327 39 189 53.3269 189 71C189 88.6731 203.327 103 221 103Z" fillRule="evenodd" className="toggle-icon off" />
                <g filter="url('#goo')">
                  <rect fill="#fff" rx={29} height={58} width={116} y={42} x={13} className="toggle-circle-center" />
                  <rect fill="#fff" rx={58} height={114} width={114} y={14} x={14} className="toggle-circle left" />
                  <rect fill="#fff" rx={58} height={114} width={114} y={14} x={164} className="toggle-circle right" />
                </g>
                <filter id="goo">
                  <feGaussianBlur stdDeviation={10} result="blur" in="SourceGraphic" />
                  <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur" />
                </filter>
              </svg>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="lg:hidden flex items-center gap-1.5 z-50 shrink-0 ml-auto">
            {/* Fixed-size gooey toggle for mobile */}
            <div style={{ width: '52px', height: '26px' }} className="relative shrink-0">
              <input
                type="checkbox"
                className="toggle-input"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                aria-label="Toggle Theme"
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 292 142" className="toggle w-full h-full overflow-visible">
                <path d="M71 142C31.7878 142 0 110.212 0 71C0 31.7878 31.7878 0 71 0C110.212 0 119 30 146 30C173 30 182 0 221 0C260 0 292 31.7878 292 71C292 110.212 260.212 142 221 142C181.788 142 173 112 146 112C119 112 110.212 142 71 142Z" className="toggle-background" />
                <rect rx={6} height={64} width={12} y={39} x={64} className="toggle-icon on" />
                <path d="M221 91C232.046 91 241 82.0457 241 71C241 59.9543 232.046 51 221 51C209.954 51 201 59.9543 201 71C201 82.0457 209.954 91 221 91ZM221 103C238.673 103 253 88.6731 253 71C253 53.3269 238.673 39 221 39C203.327 39 189 53.3269 189 71C189 88.6731 203.327 103 221 103Z" fillRule="evenodd" className="toggle-icon off" />
                <g filter="url('#goo-mobile')">
                  <rect fill="#fff" rx={29} height={58} width={116} y={42} x={13} className="toggle-circle-center" />
                  <rect fill="#fff" rx={58} height={114} width={114} y={14} x={14} className="toggle-circle left" />
                  <rect fill="#fff" rx={58} height={114} width={114} y={14} x={164} className="toggle-circle right" />
                </g>
                <filter id="goo-mobile">
                  <feGaussianBlur stdDeviation={10} result="blur" in="SourceGraphic" />
                  <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur" />
                </filter>
              </svg>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors shrink-0"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white/95 dark:bg-[#08021a]/95 backdrop-blur-2xl border-l border-black/5 dark:border-white/10 z-50 lg:hidden shadow-2xl flex flex-col p-8 pt-28"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.path}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleNavClick(item.path, true)}
                    className={`text-left px-4 py-3 rounded-2xl text-xl font-semibold transition-all ${activePath === item.path
                      ? 'bg-linear-to-r from-orange-500/10 to-violet-500/10 dark:from-orange-500/20 dark:to-violet-500/20 text-violet-600 dark:text-violet-400'
                      : 'text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'
                      }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
              <div className="mt-auto pt-8 border-t border-black/10 dark:border-white/10">
                <p className={`text-foreground/40 ${dancingScript.className} font-bold text-4xl tracking-tight`}>P. Srinivas</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
