'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const GREETINGS = [
  'Hola',       // Spanish
  'Bonjour',    // French
  'Ciao',       // Italian
  'こんにちは',   // Japanese
  'नमस्ते',      // Hindi
  'مرحبا',      // Arabic
  '안녕하세요',   // Korean
  '你好',        // Chinese
  'Olá',        // Portuguese
  'Hallo',      // German
  'Hello',      // English — final
];

const CYCLE_MS   = 240;   // time per greeting
const FINAL_HOLD = 900;   // hold on big "Hello"
const EXIT_MS    = 700;   // fade-out duration

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [index, setIndex]     = useState(0);
  const [isFinal, setIsFinal] = useState(false);
  const [isExit, setIsExit]   = useState(false);
  const [gone, setGone]       = useState(false);
  const [mounted, setMounted] = useState(false);   // portal guard
  const onDoneRef = useRef(onDone);

  // keep ref fresh without affecting effect deps
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  // wait for client mount before creating portal
  useEffect(() => { setMounted(true); }, []);

  // Lock scroll for the entire duration of loading
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    // Snap scroll position to top
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.style.overflow = prev;
      document.body.style.overflow = '';
    };
  }, []);

  // Main sequence — runs once
  useEffect(() => {
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const interval = setInterval(() => {
      i += 1;
      if (i >= GREETINGS.length) {
        clearInterval(interval);
        setIndex(GREETINGS.length - 1);
        setIsFinal(true);

        const t1 = setTimeout(() => {
          setIsExit(true);
          const t2 = setTimeout(() => {
            setGone(true);
            onDoneRef.current();
          }, EXIT_MS);
          timers.push(t2);
        }, FINAL_HOLD);
        timers.push(t1);
      } else {
        setIndex(i);
      }
    }, CYCLE_MS);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (gone || !mounted) return null;

  const totalCycleMs = GREETINGS.length * CYCLE_MS;

  // Render via portal → directly into document.body
  // This bypasses ANY CSS transform on parent elements that would
  // break position:fixed by creating a new stacking context.
  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483647, // max possible z-index
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        opacity: isExit ? 0 : 1,
        transition: isExit ? `opacity ${EXIT_MS}ms cubic-bezier(0.4,0,0.2,1)` : 'none',
        pointerEvents: isExit ? 'none' : 'all',
        // No transform here — avoids the very issue we're solving
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Cycling greetings */}
      {!isFinal && (
        <span
          key={index}
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 'clamp(2.8rem, 9vw, 6rem)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            lineHeight: 1,
            userSelect: 'none',
            animation: `ls-word ${CYCLE_MS}ms ease-in-out forwards`,
          }}
        >
          {GREETINGS[index]}
        </span>
      )}

      {/* Final "Hello" — separate element, scale-in animation */}
      {isFinal && (
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 'clamp(5rem, 18vw, 11rem)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            userSelect: 'none',
            animation: `ls-final ${FINAL_HOLD}ms cubic-bezier(0.22,1,0.36,1) forwards`,
          }}
        >
          Hello
        </span>
      )}

      {/* Thin Apple-style progress bar */}
      {!isFinal && (
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            width: '140px',
            height: '2px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: '100%',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.75)',
              transformOrigin: 'left center',
              animation: `ls-bar ${totalCycleMs}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes ls-word {
          0%   { opacity: 0; transform: translateY(8px) scale(0.96); }
          25%  { opacity: 1; transform: translateY(0)   scale(1);    }
          75%  { opacity: 1; transform: translateY(0)   scale(1);    }
          100% { opacity: 0; transform: translateY(-6px) scale(1.02);}
        }
        @keyframes ls-final {
          0%   { opacity: 0; transform: scale(0.78); }
          60%  { opacity: 1; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1);    }
        }
        @keyframes ls-bar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>,
    document.body   // ← portal target: renders outside any transformed ancestor
  );
}
