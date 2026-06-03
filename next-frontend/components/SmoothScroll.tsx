"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

const SmoothScroll: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Exponential out
            smoothWheel: true,
            wheelMultiplier: 1.0,
            syncTouch: true,         // Enable smooth touch scrolling like iOS momentum
            syncTouchLerp: 0.08,      // Touch scrolling linear interpolation
            touchInertiaExponent: 1.2, // Momentum inertia strength (lower = longer glide)
            touchMultiplier: 1.8,     // Touch scroll speed multiplier
            lerp: 0.08,               // Global scroll smoothing weight
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Reset scroll position on route change
        lenis.scrollTo(0, { immediate: true });

        // Global intercept for all anchor links starting with '#'
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');
            if (anchor) {
                const href = anchor.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetEl = document.querySelector(href);
                    if (targetEl) {
                        lenis.scrollTo(targetEl as HTMLElement, {
                            offset: 0,
                            duration: 1.5,
                        });
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick, { capture: true });

        // @ts-ignore
        window.lenis = lenis;

        return () => {
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick, { capture: true });
            // @ts-ignore
            window.lenis = null;
        };
    }, [pathname]);

    return <>{children}</>;
};

export default SmoothScroll;

