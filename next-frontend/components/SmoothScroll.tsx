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
        // ─── iOS UIScrollView deceleration curve ─────────────────────────
        // Quintic ease-out: blazing fast initial response, extremely long
        // silky deceleration tail — like flicking a page on an iPhone.
        const iosEasing = (t: number): number => {
            return 1 - Math.pow(1 - t, 8); // Extremely pronounced easing for a very slow tail
        };

        const lenis = new Lenis({
            // ★ CRITICAL: Let GSAP drive the RAF, not Lenis internally
            autoRaf: false,

            // ★ Scroll momentum duration (seconds).
            // Increased to 6.0s for an extremely slow, luxurious deceleration
            duration: 6.0,

            // ★ The deceleration curve. Only active when `lerp` is NOT set.
            easing: iosEasing,

            // Smooth wheel scrolling
            smoothWheel: true,

            // ★ How far each mouse-wheel notch travels.
            // Lowered to 0.3 for very minimal distance per physical scroll notch
            wheelMultiplier: 0.3,

            // ★ Enable iOS-style touch momentum on mobile
            syncTouch: true,

            // ★ Touch follow smoothness (lower = dreamier trailing)
            syncTouchLerp: 0.015,

            // ★ How long touch momentum carries (lower = longer coast)
            touchInertiaExponent: 0.7,

            // ★ Touch scroll speed (higher = more momentum per swipe)
            touchMultiplier: 1.0,

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
                duration: 2.2,
                easing: iosEasing,
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
