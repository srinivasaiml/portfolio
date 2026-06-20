"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from './ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const { theme } = useTheme();
    const sectionRef = useRef(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    const educationData = [
        {
            title: 'B.E in AI & ML',
            institution: 'Aditya Engineering College',
            period: '2022-2026',
            grade: 'CGPA: 8.0',
            desc: 'Pursuing Bachelor of Engineering with focus on software development and AI.'
        },
        {
            title: 'Class 12th',
            institution: 'State Board',
            period: '2020-2022',
            grade: 'Score: 89.9%',
            desc: 'Completed higher secondary education with excellent performance in Mathematics, Physics, and Chemistry.'
        },
        {
            title: 'Class 10th',
            institution: 'State Board',
            period: '2019-2020',
            grade: 'CGPA: 9.7',
            desc: 'Successfully completed secondary education with distinction in all subjects and academic excellence.'
        }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item, i) => {
                gsap.fromTo(item,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="education"
            className={`py-16 md:py-40 px-4 md:px-6 relative transition-colors duration-500 overflow-hidden ${theme === 'dark' ? 'bg-black text-white' : 'bg-slate-50 text-black'
                }`}
        >
            <div className="max-w-5xl mx-auto">
                <div className="mb-12 md:mb-24">
                    <h2 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 leading-none">
                        EDUCATION<span className="text-lime-500">.</span>
                    </h2>
                    <p className="font-mono text-zinc-500 uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs font-bold">
                        [ Academic Foundation & Journey ]
                    </p>
                </div>
                <div className="space-y-20 md:space-y-40">
                    {educationData.map((s, i) => (
                        <div
                            key={i}
                            ref={el => { if (el) itemsRef.current[i] = el }}
                            className="group relative flex flex-col md:flex-row gap-6 md:gap-20 items-start md:items-end"
                        >
                            <div className="text-[12vw] sm:text-[15vw] font-black leading-none opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                                0{i + 1}
                            </div>
                            <div className={`pb-8 md:pb-10 border-b flex-1 w-full ${theme === 'dark' ? 'border-white/20' : 'border-black/20'}`}>
                                <h3 className="text-3xl md:text-6xl font-black uppercase mb-3 md:mb-4 tracking-tighter">
                                    {s.title}
                                </h3>
                                <div className="mb-6 md:mb-8 flex flex-wrap items-center gap-3 md:gap-4 font-mono text-[10px] md:text-base">
                                    <span className="text-lime-600 dark:text-lime-400 font-bold uppercase tracking-widest">{s.institution}</span>
                                    <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline">/</span>
                                    <span className="uppercase text-zinc-600 dark:text-zinc-400">{s.period}</span>
                                    <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline">/</span>
                                    <span className="text-zinc-600 dark:text-zinc-400 font-bold">{s.grade}</span>
                                </div>
                                <p className={`max-w-md font-mono text-xs md:text-base uppercase leading-relaxed ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                    {s.desc}
                                </p>
                            </div>
                            <div className="hidden md:block w-32 h-32 bg-lime-500 dark:bg-lime-400 rounded-full group-hover:scale-150 transition-transform duration-700 mix-blend-difference shrink-0" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
