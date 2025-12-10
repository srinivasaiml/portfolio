import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  // 1. Motion values for tracking mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // 2. Spring physics for smooth following
  const springConfig = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Arrow rotation springs
  const rotation = useSpring(0, { damping: 60, stiffness: 300 });
  const scale = useSpring(1, { stiffness: 500, damping: 35 });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Arrow physics state
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updateVelocity = (currentPos: { x: number; y: number }) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const moveCursor = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);
      
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Arrow rotation logic
      const speed = Math.sqrt(Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2));
      if (speed > 0.1) {
        const currentAngle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        scale.set(isHovering ? 1.2 : 0.95);
        
        const timeout = setTimeout(() => {
          scale.set(isHovering ? 1.3 : 1);
        }, 150);
        return () => clearTimeout(timeout);
      }
    };

    const handleMouseDown = () => setIsHovering(true);
    const handleMouseUp = () => setIsHovering(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    let rafId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        moveCursor(e);
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, rotation, scale, isHovering]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>

      {/* SMALLER RED-PINK ARROW CURSOR */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          rotate: rotation,
          scale: scale,
          filter: isHovering 
            ? 'drop-shadow(0 0 15px rgba(239,68,68,0.8)) drop-shadow(0 0 25px rgba(244,63,94,0.7))'
            : 'drop-shadow(0 0 8px rgba(239,68,68,0.6))',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={35}  // Reduced from 50
          height={38} // Reduced from 54
          viewBox="0 0 50 54"
          fill="none"
          className="drop-shadow-2xl"
          style={{ scale: 0.35 }}  // Reduced from 0.45
        >
          <g filter="url(#filter0_d_91_7928)">
            <path
              d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
              className="fill-red-400/95 dark:fill-pink-400/95"
            />
            <path
              d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
              className="stroke-white/90 dark:stroke-pink-200/80"
              strokeWidth={1.8}  // Slightly reduced stroke
            />
          </g>
          <defs>
            <filter
              id="filter0_d_91_7928"
              x={0.602397}
              y={0.952444}
              width={49.0584}
              height={52.428}
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy={1.8} />  {/* Reduced shadow offset */}
              <feGaussianBlur stdDeviation={1.8} />  {/* Reduced blur */}
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_91_7928"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_91_7928"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </>
  );
};

export default CustomCursor;
