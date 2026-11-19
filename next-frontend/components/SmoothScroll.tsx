"use client";

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Gentle cubic ease-out — responsive without being snappy/jerky
        const smoothEasing = (t: number): number => {
            return 1 - Math.pow(1 - t, 3);
        };

        const lenis = new Lenis({
            // Drive the RAF loop from GSAP so Lenis and ScrollTrigger share one clock
            autoRaf: false,

            // Shorter momentum so the page stops quickly instead of coasting too far
            duration: 1.4,

            // Deceleration curve used when lerp is not set
            easing: smoothEasing,

            smoothWheel: true,

            // Much slower: each mouse-wheel notch travels very little distance
            wheelMultiplier: 0.25,

            // Much slower trackpad/touch-wheel scroll too
            touchMultiplier: 0.25,

            // Native hardware-accelerated inertial scroll on mobile
            syncTouch: false,

            prevent: (node: Element) => {
                return node.hasAttribute('data-lenis-prevent') ||
                    node.closest('[data-lenis-prevent]') !== null;
            },
        });

        lenisRef.current = lenis;
        (window as unknown as Record<string, unknown>).lenis = lenis;

        // Single RAF source: GSAP ticker → Lenis
        const onTick = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(onTick);
        // Keep lag smoothing on so slow frames don't cause stutter/jank
        gsap.ticker.lagSmoothing(1000, 30);

        // Sync ScrollTrigger with Lenis virtual scroll
        lenis.on('scroll', ScrollTrigger.update);

        // Reset on route change
        lenis.scrollTo(0, { immediate: true });

        // Intercept anchor clicks for smooth scrollTo
        const handleAnchorClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest('a');
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (!href?.startsWith('#')) return;
            const targetEl = document.querySelector(href);
            if (!targetEl) return;

            e.preventDefault();
            lenis.scrollTo(targetEl as HTMLElement, {
                offset: -80,
                duration: 1.4,
                easing: smoothEasing,
            });
        };

        document.addEventListener('click', handleAnchorClick, { capture: true });

        return () => {
            lenis.destroy();
            gsap.ticker.remove(onTick);
            document.removeEventListener('click', handleAnchorClick, { capture: true });
            (window as unknown as Record<string, unknown>).lenis = undefined;
            lenisRef.current = null;
        };
    }, [pathname]);

    return <>{children}</>;
};

export default SmoothScroll;
