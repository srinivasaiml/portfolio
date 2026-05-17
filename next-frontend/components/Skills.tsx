"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt, FaGitAlt,
    FaGithub, FaDocker, FaFigma, FaDatabase
} from "react-icons/fa";
import {
    SiTypescript, SiNextdotjs, SiTailwindcss,
    SiMongodb, SiMysql, SiVercel, SiVite, SiJest, SiFramer,
    SiNetlify, SiFirebase,
} from "react-icons/si";

const techIcons = [
    { icon: <FaReact />, name: "React", color: "text-blue-500", glow: "from-blue-500/20" },
    { icon: <SiTypescript />, name: "TypeScript", color: "text-blue-600", glow: "from-blue-600/20" },
    { icon: <SiNextdotjs />, name: "Next.js", color: "text-black dark:text-white", glow: "from-white/20" },
    { icon: <FaHtml5 />, name: "HTML5", color: "text-orange-500", glow: "from-orange-500/20" },
    { icon: <FaCss3Alt />, name: "CSS3", color: "text-blue-500", glow: "from-blue-500/20" },
    { icon: <FaJs />, name: "JavaScript", color: "text-yellow-400", glow: "from-yellow-400/20" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "text-cyan-400", glow: "from-cyan-400/20" },
    { icon: <FaFigma />, name: "Figma", color: "text-purple-500", glow: "from-purple-500/20" },
    { icon: <FaNodeJs />, name: "Node.js", color: "text-green-600", glow: "from-green-600/20" },
    { icon: <FaPython />, name: "Python", color: "text-blue-400", glow: "from-blue-400/20" },
    { icon: <FaDatabase />, name: "SQL", color: "text-indigo-500", glow: "from-indigo-500/20" },
    { icon: <SiMongodb />, name: "MongoDB", color: "text-green-500", glow: "from-green-500/20" },
    { icon: <SiMysql />, name: "MySQL", color: "text-blue-600", glow: "from-blue-600/20" },
    { icon: <FaGitAlt />, name: "Git", color: "text-red-500", glow: "from-red-500/20" },
    { icon: <FaDocker />, name: "Docker", color: "text-blue-500", glow: "from-blue-500/20" },
    { icon: <FaGithub />, name: "GitHub", color: "text-gray-800 dark:text-gray-200", glow: "from-gray-500/20" },
    { icon: <SiVite />, name: "Vite", color: "text-purple-500", glow: "from-purple-500/20" },
    { icon: <SiFramer />, name: "Framer Motion", color: "text-pink-500", glow: "from-pink-500/20" },
    { icon: <SiNetlify />, name: "Netlify", color: "text-teal-500", glow: "from-teal-500/20" },
    { icon: <SiVercel />, name: "Vercel", color: "text-black dark:text-white", glow: "from-white/20" },
    { icon: <SiFirebase />, name: "Firebase", color: "text-yellow-500", glow: "from-yellow-500/20" },
    { icon: <SiJest />, name: "Jest", color: "text-red-500", glow: "from-red-500/20" },
];


function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize, startIndex }: any) {
    return (
        <>
            {/* Semi-circle glow background */}
            <div className="absolute inset-0 flex justify-center">
                <div
                    className="
            w-[1000px] h-[1000px] rounded-full 
            bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)]
            dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]
            blur-3xl 
            -mt-40 
            pointer-events-none
          "
                    style={{ zIndex: 0 }}
                />
            </div>

            {/* Orbit icons */}
            {Array.from({ length: count }).map((_, index) => {
                const angle = (index / (count - 1)) * 180;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                // Map to our techIcons using startIndex offset to prevent duplicates across rings
                const globalIndex = startIndex + index;
                const tech = techIcons[globalIndex % techIcons.length];

                // Tooltip positioning — above or below based on angle
                const tooltipAbove = angle > 90;

                return (
                    <div
                        key={index}
                        className="absolute flex flex-col items-center group"
                        style={{
                            left: `${centerX + x - iconSize / 2}px`,
                            top: `${centerY - y - iconSize / 2}px`,
                            zIndex: 5,
                        }}
                    >
                        <div
                            className={`flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-800 cursor-pointer transition-transform hover:scale-110 ${tech.color}`}
                            style={{ width: iconSize, height: iconSize, fontSize: iconSize * 0.55 }}
                        >
                            {tech.icon}
                        </div>

                        {/* Tooltip */}
                        <div
                            className={`absolute ${tooltipAbove ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
                                } hidden group-hover:block w-fit px-3 py-1.5 rounded-lg bg-black dark:bg-zinc-800 text-xs text-white shadow-lg text-center whitespace-nowrap border border-zinc-800 font-medium`}
                        >
                            {tech.name}
                            <div
                                className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black dark:bg-zinc-800 border-zinc-800 ${tooltipAbove ? "top-full -mt-1 border-r border-b" : "bottom-full -mb-1 border-l border-t"
                                    }`}
                            />
                        </div>
                    </div>
                );
            })}
        </>
    );
}

import { useState, useEffect } from "react";

export default function Skills() {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const baseWidth = Math.min(size.width * 0.9, 1000); // Increased base width
    const centerX = baseWidth / 2;
    const centerY = baseWidth * 0.5;

    // Significantly increased icon sizes
    const iconSize =
        size.width < 480
            ? Math.max(50, baseWidth * 0.12)
            : size.width < 768
                ? Math.max(64, baseWidth * 0.1)
                : Math.max(80, baseWidth * 0.09);

    return (
        <section
            id="skills"
            className="py-32 relative min-h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-500 border-y border-zinc-100 dark:border-zinc-900"
        >
            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
                {/* Section Header */}
                <div className="relative flex justify-center items-center py-10 md:py-20 -mb-4 overflow-hidden pointer-events-none">
                    <span
                        className="absolute text-[6rem] md:text-[9rem] lg:text-[13rem] font-bold text-gray-200/80 dark:text-zinc-800/80 select-none z-0 tracking-tighter whitespace-nowrap"
                        style={{ fontFamily: "'Brush Script MT', 'Caveat', 'Dancing Script', var(--font-playfair), cursive" }}
                    >
                        Skills
                    </span>
                    <h2 className="relative text-3xl md:text-5xl lg:text-6xl font-black text-black dark:text-white tracking-widest uppercase z-10">
                        MY SKILLS.
                    </h2>
                </div>
                <p className="mb-16 max-w-2xl text-zinc-600 dark:text-zinc-400 lg:text-lg px-4 leading-relaxed text-center">
                    A comprehensive collection of technologies and tools I use to build modern, scalable web applications and elegant digital experiences.
                </p>

                {/* Orbit Display */}
                <div
                    className="relative mt-12"
                    style={{ width: baseWidth, height: baseWidth * 0.6 }}
                >
                    <SemiCircleOrbit radius={baseWidth * 0.25} centerX={centerX} centerY={centerY} count={5} iconSize={iconSize} startIndex={0} />
                    <SemiCircleOrbit radius={baseWidth * 0.4} centerX={centerX} centerY={centerY} count={8} iconSize={iconSize} startIndex={5} />
                    <SemiCircleOrbit radius={baseWidth * 0.55} centerX={centerX} centerY={centerY} count={11} iconSize={iconSize} startIndex={13} />
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-white dark:from-black via-transparent to-white dark:to-black pointer-events-none" />
        </section>
    );
}
