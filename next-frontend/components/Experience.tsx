"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Trophy, Flame, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const { theme } = useTheme();
    const container = useRef(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    const experiences = [
        {
            year: '2025',
            company: 'Aditya University',
            event: 'Software Engineer Intern',
            type: 'internship',
            duration: 'May 2025 – Jun 2025',
            location: 'Smart Library Seat Management System',
            description: 'Led end-to-end development of a Smart Library Seat Management System. Engineered a full-stack seat reservation platform using Node.js, Express, and MongoDB.',
            highlights: ['Real-time seat tracking via WebSockets', 'QR-code check-in integration', '25% improvement in seat utilization'],
            skills: ['Node.js', 'Express', 'MongoDB', 'React', 'WebSockets'],
            icon: Briefcase,
            color: "bg-indigo-600 dark:bg-indigo-950"
        },
        {
            year: '2024',
            company: 'proTreX',
            event: 'AI/ML Workshop',
            type: 'workshop',
            duration: 'Aug 2024',
            location: 'Tech Conference, Hyderabad',
            description: 'Intensive AI/ML workshop covering deep learning, LLMs, and computer vision. Hands-on sessions involving model fine-tuning and neural network design.',
            highlights: ['Deep learning & LLM fundamentals', 'Computer vision hands-on sessions', 'MLOps pipeline design'],
            skills: ['Machine Learning', 'Neural Networks', 'Computer Vision', 'AI', 'Python'],
            icon: Flame,
            color: "bg-zinc-900 dark:bg-black"
        },
        {
            year: '2023',
            company: 'Veda Symposium',
            event: 'Treasure Hunt Winner',
            type: 'achievement',
            duration: 'Oct 2023',
            location: 'National Level — Inter-College',
            description: 'Secured 1st place in the national-level technical Treasure Hunt. multilayered problem sets spanning data structures and cryptographic puzzles.',
            highlights: ['1st place — national level', '5 elimination rounds completed', 'Cryptographic & DSA challenges'],
            skills: ['Problem Solving', 'Data Structures', 'Algorithms', 'Cryptography'],
            icon: Trophy,
            color: "bg-lime-400 dark:bg-lime-900"
        },
        {
            year: '2023',
            company: 'Appleton Innovations',
            event: 'IoT & ML Workshop',
            type: 'workshop',
            duration: 'Jul 2023',
            location: 'Seminar, Visakhapatnam',
            description: 'Workshop on IoT and Machine Learning, gaining practical exposure to sensor networks, edge computing, and intelligent device design.',
            highlights: ['Arduino & Raspberry Pi prototyping', 'MQTT / HTTP IoT protocols', 'Edge ML inference integration'],
            skills: ['IoT', 'Arduino', 'Raspberry Pi', 'MQTT', 'Machine Learning'],
            icon: Flame,
            color: "bg-zinc-100 dark:bg-zinc-900"
        }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                gsap.fromTo(card,
                    { scale: 0.9, y: 50, opacity: 0.3 },
                    {
                        scale: 1 - (i * 0.04),
                        y: 0,
                        opacity: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            end: "top 20%",
                            scrub: 0.5,
                        }
                    }
                );
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} id="experience" className={cn(
            "py-16 md:py-32 px-4 md:px-6 relative transition-colors duration-500",
            theme === 'dark' ? 'bg-black text-white' : 'bg-slate-50 text-black'
        )}>
            {/* Background Kinetic Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-12 md:mb-24 text-left">
                    <h2 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 leading-none">
                        EXPERIENCE<span className="text-lime-500">.</span>
                    </h2>
                    <p className="font-mono text-zinc-500 uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs font-bold">
                        [ SCROLL TO EXPLORE TIMELINE ]
                    </p>
                </div>

                <div className="relative space-y-8 md:space-y-16 pb-40">
                    {experiences.map((exp, i) => (
                        <div
                            key={i}
                            ref={el => { if (el) cardsRef.current[i] = el }}
                            className={cn(
                                "sticky top-20 md:top-28 w-full min-h-[350px] md:min-h-[400px] rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.5)] border transition-all duration-500",
                                exp.color,
                                theme === 'dark' ? 'border-white/5' : 'border-black/5'
                            )}
                        >
                            {/* Year Indicator */}
                            <div className="absolute top-6 right-8 md:top-8 md:right-12 text-5xl md:text-8xl font-black opacity-10 font-mono tracking-tighter">
                                '{exp.year.slice(-2)}
                            </div>

                            <div className="relative">
                                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                                    <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-inner">
                                        <exp.icon size={20} className="md:w-7 md:h-7 text-white" />
                                    </div>
                                    <div className="px-3 py-1 rounded-full border border-current/20 text-[9px] md:text-[10px] uppercase font-bold tracking-widest bg-current/5">
                                        {exp.type}
                                    </div>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    <h3 className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.85] flex items-start gap-3">
                                        {exp.event}
                                        <ArrowUpRight className="opacity-20 group-hover:opacity-100 transition-opacity hidden sm:block" size={32} />
                                    </h3>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] md:text-xs uppercase font-black opacity-60">
                                        <div className="flex items-center gap-1.5 md:gap-2">
                                            <Calendar size={12} className="text-lime-500" /> {exp.duration}
                                        </div>
                                        <div className="flex items-center gap-1.5 md:gap-2">
                                            <MapPin size={12} className="text-lime-500" /> {exp.location}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-end relative">
                                <div className="space-y-6">
                                    <p className="text-base md:text-xl font-medium opacity-80 leading-relaxed max-w-md">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill, si) => (
                                            <span key={si} className="px-3 py-1 rounded-lg border border-current/10 bg-current/5 text-[9px] font-mono uppercase font-black tracking-tighter">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 font-black">Success Parameters</div>
                                    <ul className="space-y-3">
                                        {exp.highlights.map((h, hi) => (
                                            <li key={hi} className="flex items-center gap-3 text-xs md:text-sm font-bold uppercase leading-none">
                                                <div className="w-1.5 h-1.5 rounded-full bg-lime-500 shrink-0 shadow-[0_0_10px_#84cc16]" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
