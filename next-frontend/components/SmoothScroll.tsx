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
        // ─── Smooth easing for scroll momentum ─────────────────────────
        // Cubic ease-out: responsive and snappy, especially on mobile
        const smoothEasing = (t: number): number => {
            return 1 - Math.pow(1 - t, 3); // Moderate easing for snappy response
        };

        const lenis = new Lenis({
            // ★ CRITICAL: Let GSAP drive the RAF, not Lenis internally
            autoRaf: false,

            // ★ Scroll momentum duration (seconds).
            // Reduced to 1.5s for snappy, responsive scrolling (especially on mobile)
            duration: 1.5,

            // ★ The deceleration curve. Only active when `lerp` is NOT set.
            easing: smoothEasing,

            // Smooth wheel scrolling
            smoothWheel: true,

            // ★ How far each mouse-wheel notch travels.
            // Increased to 1.0 for responsive scroll distance per notch
            wheelMultiplier: 1.0,

            // ★ Enable iOS-style touch momentum on mobile
            syncTouch: true,

            // ★ Touch follow smoothness (higher = snappier response on mobile)
            syncTouchLerp: 0.075,

            // ★ How long touch momentum carries (higher = shorter coast)
            touchInertiaExponent: 1.2,

            // ★ Touch scroll speed (higher = more momentum per swipe)
            touchMultiplier: 1.2,

            // DO NOT set `lerp` — it kills duration-based easing

            prevent: (node: Element) => {
                return node.hasAttribute('data-lenis-prevent') ||
                    node.closest('[data-lenis-prevent]') !== null;
            },
        });

        lenisRef.current = lenis;
        (window as any).lenis = lenis;

        // ─── Single RAF source: GSAP ticker → Lenis ─────────────────────
        const onTick = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0);

        // Sync ScrollTrigger with Lenis virtual scroll
        lenis.on('scroll', ScrollTrigger.update);

        // Reset on route change
        lenis.scrollTo(0, { immediate: true });

        // ─── Intercept anchor clicks for smooth scrollTo ─────────────────
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
                duration: 1.2,
                easing: smoothEasing,
            });
        };

        document.addEventListener('click', handleAnchorClick, { capture: true });

        return () => {
            lenis.destroy();
            gsap.ticker.remove(onTick);
            document.removeEventListener('click', handleAnchorClick, { capture: true });
            (window as any).lenis = undefined;
            lenisRef.current = null;
        };
    }, [pathname]);

    return <>{children}</>;
};

export default SmoothScroll;
