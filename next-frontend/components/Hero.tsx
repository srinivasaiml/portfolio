"use client";

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';

const LiquidBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;
            float color = smoothstep(0.0, 1.0, (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5);
            gl_FragColor = vec4(mix(vec3(0.005), vec3(0.05), color), 1.0);
          }
        `}
      />
    </mesh>
  );
};

const Monolith = ({ theme }: { theme: 'light' | 'dark' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  const materialColor = theme === 'light' ? "#ffffff" : "#0a0a0a";
  const metalness = theme === 'light' ? 0.3 : 1.0;
  const roughness = theme === 'light' ? 0.1 : 0.05;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[13, 1]} />
        <MeshDistortMaterial color={materialColor} speed={4} distort={0.4} roughness={roughness} metalness={metalness} />
      </mesh>
    </Float>
  );
};

export default function Hero() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(revealRef.current,
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" }
      );

      gsap.from(".command-cell", {
        x: 60, opacity: 0, stagger: 0.1, duration: 1.5, ease: "power4.out", delay: 1, clearProps: "all"
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!ctaRef.current) return;
        const rect = ctaRef.current.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
        if (dist < 150) {
          gsap.to(ctaRef.current, { x: (e.clientX - (rect.left + rect.width / 2)) * 0.4, y: (e.clientY - (rect.top + rect.height / 2)) * 0.4, duration: 0.6 });
        } else {
          gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen w-full bg-white dark:bg-black flex flex-col selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-100 transition-opacity duration-500">
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
          <ambientLight intensity={theme === 'light' ? 0.8 : 0.4} />
          <spotLight position={[50, 50, 50]} intensity={theme === 'light' ? 2 : 3} />
          <LiquidBackground />
          <Monolith theme={theme} />
        </Canvas>
      </div>

      {/* Dark-mode only lamp / glow animation */}
      {theme === 'dark' && (
        <div className="absolute top-0 isolate z-0 flex w-screen flex-1 items-start justify-center pointer-events-none">
          <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />

          {/* Main glow */}
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-white/60 opacity-80 blur-3xl" />

          {/* Lamp effect */}
          <motion.div
            initial={{ width: "8rem" }}
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
            whileInView={{ width: "16rem" }}
            className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-white/60 blur-2xl"
          />

          {/* Top line */}
          <motion.div
            initial={{ width: "15rem" }}
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
            whileInView={{ width: "30rem" }}
            className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-white/60"
          />

          {/* Left gradient cone */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-white/60 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
          >
            <div className="absolute w-[100%] left-0 bg-[#020202] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-40 h-[100%] left-0 bg-[#020202] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          {/* Right gradient cone */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-white/60 [--conic-position:from_290deg_at_center_top]"
          >
            <div className="absolute w-40 h-[100%] right-0 bg-[#020202] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-[100%] right-0 bg-[#020202] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>
        </div>
      )}

      <div ref={revealRef} className="relative z-10 w-full flex flex-col md:flex-row pt-32 pb-12 px-6 md:p-14 lg:p-20 min-h-screen md:items-stretch gap-12 md:gap-10 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 flex flex-col justify-center md:justify-between w-full md:-translate-x-6 lg:-translate-x-10">
          <div className="flex items-center gap-3">
            <div className="relative w-2.5 h-2.5 bg-black dark:bg-white rounded-full transition-colors duration-500">
              <div className="absolute inset-0 bg-black dark:bg-white rounded-full animate-ping opacity-30 transition-colors duration-500" />
            </div>
            <span className="font-mono text-[11px] font-bold text-black dark:text-white tracking-[0.2em] uppercase transition-colors duration-500">SRINIVAS.DEV</span>
          </div>

          <div className="max-w-4xl lg:-translate-y-8 pr-0 md:pr-12 my-8 md:my-0">
            <h1 className="text-[clamp(1.8rem,11.5vw,10.5rem)] font-black leading-[0.87] tracking-tighter text-black dark:text-white uppercase italic-none transition-colors duration-500">
              PATCHIPALA <br />
              <span
                className="text-outline"
                style={{ WebkitTextFillColor: "transparent", WebkitTextStroke: "2px currentColor" }}
              >
                SRINIVAS
              </span>
            </h1>
            <p className="mt-8 font-mono text-[11px] text-black/50 dark:text-white/40 uppercase tracking-[0.35em] max-w-sm leading-relaxed transition-colors duration-500">
              We engineer immersive digital experiences through spatial logic and advanced WebGL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:-translate-y-12 mt-6 md:mt-0">
            <a href="/Srinivas_P_2026.pdf" download className="w-fit flex items-center gap-4 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-all duration-500 overflow-hidden shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-white dark:group-hover:stroke-black stroke-black dark:stroke-white transition-colors duration-500">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-mono text-[10px] md:text-[11px] font-bold text-black dark:text-white uppercase tracking-[0.2em] transition-colors duration-500 text-left">Download Resume</span>
            </a>
          </div>
        </div>

        {/* Right Side Deck */}
        <div className="w-full md:w-80 lg:w-[450px] shrink-0 flex flex-col gap-4 justify-center z-20 pb-12 md:pb-0 translate-x-0 md:translate-x-10 lg:translate-x-50 translate-y-0 lg:-translate-y-16">
          {[
            { id: "003", title: "EXPERTISE", val: "Creative Dev", type: "image" }
          ].map((item) => (
            <div
              key={item.id}
              className={`command-cell block transition-colors duration-500 ${item.type === 'image'
                ? 'flex flex-col items-center justify-center pt-4 md:pt-8 translate-y-10'
                : 'p-6 sm:p-7 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl backdrop-blur-md'
                }`}
            >
              {item.type !== 'image' && (
                <span className="font-mono text-[9px] text-black/30 dark:text-white/25 uppercase tracking-widest block mb-3 transition-colors duration-500">
                  {item.id} // {item.title}
                </span>
              )}
              {item.type === "image" ? (
                <div className="flex flex-col items-center justify-center w-full relative z-50">
                  <Image
                    src="/sssss.png"
                    alt="P. Srinivas"
                    width={330}
                    height={200}
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    priority
                    unoptimized
                  />
                  <h3 className="text-[10px] sm:text-xs font-mono text-black/40 dark:text-white/40 mt-6 leading-relaxed transition-colors duration-500 text-center uppercase tracking-widest max-w-[250px]">
                    Transforming static interfaces into <br /><span className="italic text-black/80 dark:text-white/80 transition-colors duration-500">narrative apertures</span>.
                  </h3>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

