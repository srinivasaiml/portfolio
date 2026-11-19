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
            year: '2026',
            company: 'Amazon',
            event: 'Transportation Representative – QC',
            type: 'Work Experience',
            duration: 'Jul 2026 – Present',
            location: 'Amazon Logistics & Operations',
            description: 'Supporting Amazon transportation and quality-control operations through shipment reconciliation, transshipment verification, shortage analysis, damage validation, and image verification. Identifying discrepancies across shipment and inventory data, resolving IOG/process errors, and ensuring accurate operational records according to quality standards.',
            highlightsTitle: 'Key Responsibilities',
            highlights: [
                'Perform shipment reconciliation and transshipment checks to identify shortages and quantity discrepancies.',
                'Analyze shipment data and validate shortage cases for accurate reconciliation.',
                'Verify DMG001 bin movements and determine whether ASINs are genuinely damaged.',
                'Perform image validation for damaged ASINs and approve or reject damage classifications based on evidence.',
                'Raise Trouble Tickets (TTs) for ASINs requiring investigation or correction.',
                'Identify and resolve IOG/system and process errors affecting operational accuracy.',
                'Maintain data accuracy and quality while following standard operating procedures.'
            ],
            skills: [
                'Quality Control',
                'Data Analysis',
                'Excel',
                'Shipment Reconciliation',
                'Inventory Validation',
                'Transshipment',
                'Image Validation',
                'Discrepancy Resolution',
                'Process Management'
            ],
            icon: Briefcase,
            cardBg: "bg-gradient-to-br from-[#4f46e5] via-[#4338ca] to-[#1e1b4b]",
            borderColor: "border-indigo-500/30",
            shadowColor: "shadow-[0_20px_50px_-10px_rgba(79,70,229,0.35)]",
            bulletColor: "bg-indigo-400 shadow-[0_0_10px_#818cf8]",
            accentIcon: "text-indigo-400"
        },
        {
            year: '2025',
            company: 'Aditya University',
            event: 'Software Engineer Intern',
            type: 'Internship',
            duration: 'May 2025 – Jun 2025',
            location: 'Smart Campus Systems',
            description: 'Spearheaded full-stack engineering of a Smart Library Seat Management platform. Designed robust seat reservation microservices, dynamic WebSocket synchronization, and automated check-ins to optimize collegiate campus resources.',
            highlightsTitle: 'Key Technical Contributions',
            highlights: [
                'Architected real-time WebSocket seat allocation engine handling dynamic reservations and concurrency locks.',
                'Implemented secure JWT authentication and role-based access control (RBAC) across student and faculty tiers.',
                'Engineered QR-code check-in & check-out validation system, boosting seat utilization by 25%.',
                'Optimized MongoDB indexing and aggregation queries, slashing seat lookup and search latency by 40%.',
                'Designed high-performance responsive administrative dashboard with live occupancy telemetry and analytics.'
            ],
            skills: [
                'Node.js',
                'Express.js',
                'MongoDB',
                'React',
                'WebSockets',
                'REST APIs',
                'JWT Auth',
                'System Architecture'
            ],
            icon: Briefcase,
            cardBg: "bg-gradient-to-br from-[#a855f7] via-[#9333ea] to-[#5b21b6]",
            borderColor: "border-purple-500/30",
            shadowColor: "shadow-[0_20px_50px_-10px_rgba(168,85,247,0.35)]",
            bulletColor: "bg-purple-400 shadow-[0_0_10px_#a78bfa]",
            accentIcon: "text-purple-400"
        },
        {
            year: '2024',
            company: 'proTreX',
            event: 'AI / Machine Learning Intensive',
            type: 'Technical Fellowship',
            duration: 'Aug 2024',
            location: 'Tech Conference, Hyderabad',
            description: 'Completed an intensive hands-on AI/ML engineering program covering deep neural architectures, transformer models, and computer vision pipelines. Built production-oriented pipelines from raw feature engineering to deployed inference endpoints.',
            highlightsTitle: 'Key Technical Highlights',
            highlights: [
                'Trained and evaluated deep neural network architectures using PyTorch for computer vision classification.',
                'Explored Transformer fundamentals and fine-tuned open-source LLMs on specialized domain datasets.',
                'Constructed real-time computer vision feature detection and image transformation pipelines using OpenCV.',
                'Designed MLOps deployment workflows with Docker containerization, REST inference endpoints, and model metrics.',
                'Implemented RAG (Retrieval-Augmented Generation) patterns utilizing vector embeddings and semantic search.'
            ],
            skills: [
                'PyTorch',
                'Deep Learning',
                'Computer Vision',
                'LLMs & Transformers',
                'OpenCV',
                'MLOps',
                'Python',
                'Vector Embeddings'
            ],
            icon: Flame,
            cardBg: "bg-gradient-to-br from-[#06b6d4] via-[#0891b2] to-[#0c4a6e]",
            borderColor: "border-cyan-500/30",
            shadowColor: "shadow-[0_20px_50px_-10px_rgba(6,182,212,0.35)]",
            bulletColor: "bg-cyan-400 shadow-[0_0_10px_#22d3ee]",
            accentIcon: "text-cyan-400"
        },
        {
            year: '2023',
            company: 'Veda Symposium',
            event: 'National Technical Hunt Champion',
            type: 'National Award',
            duration: 'Oct 2023',
            location: 'National Level — Inter-College',
            description: 'Clinched 1st place championship at the prestigious national-level technical symposium outperforming 200+ collegiate teams. Solved complex problem sets spanning algorithm design, cryptographic ciphers, and algorithmic puzzles under timed conditions.',
            highlightsTitle: 'Championship Highlights',
            highlights: [
                'Ranked 1st place out of 200+ inter-college teams across 5 high-stakes technical elimination rounds.',
                'Decrypted multi-layered cryptographic challenges including RSA, AES, steganography, and custom matrix ciphers.',
                'Solved advanced algorithmic and dynamic programming puzzles within tight countdown limits.',
                'Demonstrated rapid collaborative problem-solving, algorithmic efficiency, and technical team leadership.',
                'Recognized with official commendation and trophy for technical excellence and computational speed.'
            ],
            skills: [
                'Algorithms & DSA',
                'Cryptography',
                'Problem Solving',
                'Data Structures',
                'Dynamic Programming',
                'Computational Logic',
                'C++ / Python'
            ],
            icon: Trophy,
            cardBg: "bg-gradient-to-br from-[#ec4899] via-[#be185d] to-[#7f1d1d]",
            borderColor: "border-rose-500/30",
            shadowColor: "shadow-[0_20px_50px_-10px_rgba(236,72,153,0.35)]",
            bulletColor: "bg-rose-400 shadow-[0_0_10px_#fb7185]",
            accentIcon: "text-rose-400"
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
            "py-16 md:py-28 px-4 md:px-6 relative transition-colors duration-500",
            theme === 'dark' ? 'bg-black text-white' : 'bg-slate-50 text-black'
        )}>
            {/* Background Kinetic Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-10 md:mb-16 text-left">
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-3 leading-none">
                        EXPERIENCE<span className="text-lime-500">.</span>
                    </h2>
                    <p className="font-mono text-zinc-500 uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs font-bold">
                        [ SCROLL TO EXPLORE TIMELINE ]
                    </p>
                </div>

                <div className="relative space-y-8 md:space-y-12 pb-36">
                    {experiences.map((exp, i) => (
                        <div
                            key={i}
                            ref={el => { if (el) cardsRef.current[i] = el }}
                            className={cn(
                                "group sticky top-20 md:top-28 w-full rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-9 flex flex-col justify-between overflow-hidden border text-white transition-all duration-500 min-h-[420px] md:min-h-[440px]",
                                exp.cardBg,
                                exp.borderColor,
                                exp.shadowColor
                            )}
                        >
                            {/* Subtle Inner Highlight */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />

                            {/* Year Indicator Watermark */}
                            <div className="absolute top-4 right-6 md:top-6 md:right-10 text-6xl md:text-8xl font-black font-mono tracking-tighter text-white/15 pointer-events-none select-none">
                                '{exp.year.slice(-2)}
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 md:p-3 rounded-2xl bg-white/15 border border-white/25 shadow-inner text-white backdrop-blur-md">
                                        <exp.icon size={18} className="md:w-5 md:h-5 text-white" />
                                    </div>
                                    <div className="px-3 py-1 rounded-full border border-white/25 bg-black/20 text-white text-[10px] uppercase font-bold tracking-widest backdrop-blur-md">
                                        {exp.type}
                                    </div>
                                    <div className="ml-auto font-mono text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-widest hidden sm:block">
                                        {exp.company}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight flex items-start gap-2.5 text-white">
                                        <span>{exp.event}</span>
                                        <ArrowUpRight className="opacity-50 group-hover:opacity-100 transition-opacity hidden sm:block shrink-0 mt-1 text-white" size={24} />
                                    </h3>
                                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] md:text-xs uppercase font-bold text-white/80">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={13} className={exp.accentIcon} /> {exp.duration}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={13} className={exp.accentIcon} /> {exp.location}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-5 border-t border-white/15 items-start relative z-10">
                                <div className="space-y-4">
                                    <p className="text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed text-white/90">
                                        {exp.description}
                                    </p>
                                    <div className="space-y-2 pt-1">
                                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 font-bold">Skills & Technologies</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.skills.map((skill, si) => (
                                                <span key={si} className="px-2.5 py-1 rounded-md border border-white/20 bg-black/25 text-white text-[10px] sm:text-[11px] font-mono font-medium tracking-tight hover:bg-black/40 transition-colors backdrop-blur-xs">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/60 font-black">
                                        {exp.highlightsTitle || "Key Highlights"}
                                    </div>
                                    <ul className="space-y-2">
                                        {exp.highlights.map((h, hi) => (
                                            <li key={hi} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-medium leading-snug text-white/95">
                                                <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0 transition-transform group-hover:scale-110", exp.bulletColor)} />
                                                <span>{h}</span>
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
