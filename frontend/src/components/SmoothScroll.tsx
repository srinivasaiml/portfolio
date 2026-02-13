import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const location = useLocation(); // Get current route

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // FIX: Scroll to top immediately when route changes
    lenis.scrollTo(0, { immediate: true });

    // @ts-ignore
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      // @ts-ignore
      window.lenis = null;
    };
  }, [location.pathname]); // Re-run or trigger scroll reset when path changes

  return <div className="w-full min-h-screen">{children}</div>;
};

export default SmoothScroll;