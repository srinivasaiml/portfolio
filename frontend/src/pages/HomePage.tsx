// frontend/src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PreLoader from '../components/PreLoader';
import ScrollProgress from '../components/ScrollProgress';
import FloatingElements from '../components/FloatingElements';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import BackgroundAnimation from '../components/BackgroundAnimation';
import Footer from '../components/Footer';


function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handlePreloadComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 300);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="sync">
        {isLoading && <PreLoader onComplete={handlePreloadComplete} />}
      </AnimatePresence>
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-black dark:bg-none"
          >

            <FloatingElements />
            <ScrollProgress />
            <div className="relative z-10">
              <Navbar />
              <BackgroundAnimation />
              <Hero />

              <About />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <Certificates />
              <Contact />
              <Footer />

            </div>
            <motion.button
              onClick={() => {
                // @ts-ignore
                if (window.lenis) {
                  // @ts-ignore
                  window.lenis.scrollTo(0);
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl z-50 hover:scale-110 active:scale-95 transition-transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;