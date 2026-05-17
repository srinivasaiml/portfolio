"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

/* ─── Content ─────────────────────────────────────────────────── */
const cardContents = [
    {
        title: "Creative Developer & Problem Solver",
        description:
            "I build modern, interactive web applications that combine clean design with powerful functionality. My focus is on creating seamless digital experiences that are both visually engaging and highly efficient.",
    },
    {
        title: "Developer Focused Approach",
        description:
            "I enjoy working across the full stack — from crafting responsive frontends to building scalable backend systems. My projects emphasize performance, usability, and real-world problem solving.",
    },
    {
        title: "Dynamic & Scalable Designs",
        description:
            "From portfolio websites to full-stack systems, I design layouts that adapt smoothly across devices. I prioritize responsiveness, structured architecture, and user-friendly interfaces in every project.",
    },
    {
        title: "Smart & AI-Driven Solutions",
        description:
            "I actively explore AI-powered applications like smart booking systems, document processing tools, and automation bots to solve practical problems with intelligent solutions.",
    },
    {
        title: "Performance & Optimization",
        description:
            "I build applications that are fast, lightweight, and optimized for real-world usage — ensuring smooth performance and quick load times.",
    },
];

/* ─── Circuit wave border animation ───────────────────────────── */
const BorderBeam = ({ delay = 0 }: { delay?: number }) => (
    <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
        <motion.div
            className="absolute top-0 left-0 h-[1.5px] w-[55%] bg-linear-to-r from-transparent via-zinc-500/70 to-transparent dark:via-white/50"
            initial={{ x: "-100%" }}
            animate={{ x: "250%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay }}
        />
        <motion.div
            className="absolute top-0 right-0 w-[1.5px] h-[55%] bg-linear-to-b from-transparent via-zinc-500/70 to-transparent dark:via-white/50"
            initial={{ y: "-100%" }}
            animate={{ y: "250%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: delay + 0.875 }}
        />
        <motion.div
            className="absolute bottom-0 right-0 h-[1.5px] w-[55%] bg-linear-to-l from-transparent via-zinc-500/70 to-transparent dark:via-white/50"
            initial={{ x: "-100%" }}
            animate={{ x: "250%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: delay + 1.75 }}
        />
        <motion.div
            className="absolute bottom-0 left-0 w-[1.5px] h-[55%] bg-linear-to-t from-transparent via-zinc-500/70 to-transparent dark:via-white/50"
            initial={{ y: "-100%" }}
            animate={{ y: "250%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: delay + 2.625 }}
        />
    </div>
);

/* ─── Plus corner icons ───────────────────────────────────────── */
const PlusIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        strokeWidth="1"
        stroke="currentColor"
        className={`dark:text-white text-black size-6 ${className}`}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
);

const CornerPlusIcons = () => (
    <>
        <PlusIcon className="absolute -top-3 -left-3" />
        <PlusIcon className="absolute -top-3 -right-3" />
        <PlusIcon className="absolute -bottom-3 -left-3" />
        <PlusIcon className="absolute -bottom-3 -right-3" />
    </>
);

/* ─── Card ─────────────────────────────────────────────────────── */
const PlusCard: React.FC<{
    className?: string;
    title: string;
    description: string;
    beamDelay?: number;
}> = ({ className = "", title, description, beamDelay = 0 }) => (
    <div
        className={cn(
            "relative border border-dashed border-zinc-400 dark:border-zinc-700 rounded-lg p-6 bg-white dark:bg-zinc-950 min-h-[200px]",
            "flex flex-col justify-between",
            className
        )}
    >
        <BorderBeam delay={beamDelay} />
        <CornerPlusIcons />
        <div className="relative z-10 space-y-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>
    </div>
);

/* ─── Section ──────────────────────────────────────────────────── */
export default function About() {
    return (
        <section
            id="about"
            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
            style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
        >
            <div className="mx-auto container border border-gray-200 dark:border-gray-800 py-12 border-t-0 px-4">
                {/* Section Header */}
                <div className="relative flex justify-center items-center py-10 md:py-20 mb-8 overflow-hidden pointer-events-none">
                    <span
                        className="absolute text-[6rem] md:text-[9rem] lg:text-[13rem] font-bold text-gray-200/80 dark:text-zinc-800/80 select-none z-0 tracking-tighter whitespace-nowrap"
                        style={{ fontFamily: "'Brush Script MT', 'Caveat', 'Dancing Script', var(--font-playfair), cursive" }}
                    >
                        About
                    </span>
                    <h2 className="relative text-3xl md:text-5xl lg:text-6xl font-black text-black dark:text-white tracking-widest uppercase z-10">
                        ABOUT ME.
                    </h2>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-4">
                    <PlusCard {...cardContents[0]} className="lg:col-span-3 lg:row-span-2" beamDelay={0} />
                    <PlusCard {...cardContents[1]} className="lg:col-span-2 lg:row-span-2" beamDelay={0.4} />
                    <PlusCard {...cardContents[2]} className="lg:col-span-4 lg:row-span-1" beamDelay={0.8} />
                    <PlusCard {...cardContents[3]} className="lg:col-span-2 lg:row-span-1" beamDelay={1.2} />
                    <PlusCard {...cardContents[4]} className="lg:col-span-2 lg:row-span-1" beamDelay={1.6} />
                </div>

                {/* Section Footer Heading */}
                <div className="max-w-2xl ml-auto text-right px-4 mt-8 lg:-mt-20 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
                        Built with purpose. Driven by innovation.
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        I create scalable and impactful digital solutions by blending creativity with technology. My goal is to build applications that not only look great but also deliver meaningful user experiences.
                    </p>
                </div>
            </div>
        </section>
    );
}
