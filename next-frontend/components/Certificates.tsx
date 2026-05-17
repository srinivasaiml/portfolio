"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";

interface CertificateData {
  title: string;
  image: string;
  issuer: string;
  date: string;
  skills: string[];
  description: string;
  url: string;
}

const CERTIFICATE_DATA: CertificateData[] = [
  {
    title: "HackerRank Certification",
    issuer: "HackerRank",
    image: "HackerRank_Icon-1000px.png",
    url: "https://www.hackerrank.com/certificates/a67a507bbd1a",
    date: "2025",
    skills: ["Algorithms", "Data Structures"],
    description: "Validated proficiency in complex algorithmic problem solving and advanced data structure implementations through rigorous technical assessments.",
  },
  {
    title: "Great Learning Data Science",
    issuer: "Great Learning",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1920",
    url: "https://drive.google.com/file/d/1VMkkM0XFqum1I4sv552KuY4PzFNPlCMb/view?usp=sharing",
    date: "2024",
    skills: ["Python", "Machine Learning"],
    description: "Mastered fundamental data science methodologies including predictive modeling, statistical analysis, and machine learning pipeline development.",
  },
  {
    title: "Competitive Programming",
    issuer: "CodeChef",
    image: "programing.avif",
    url: "#",
    date: "2024",
    skills: ["Logic", "Optimization"],
    description: "Demonstrated competitive problem-solving skills and optimized code efficiency through participation in high-level programming challenges.",
  },
  {
    title: "Enterprise Solutions",
    issuer: "Infosys",
    image: "programing2.jpg",
    url: "https://drive.google.com/file/d/1fQEyayq5imG44u7ht03QBnXhdr3Fa60y/view?usp=sharing",
    date: "2023",
    skills: ["Java", "Agile Methods"],
    description: "Successfully completed enterprise solutions training, focusing on agile methodologies and scalable software architecture principles.",
  },
  {
    title: "Computer Science Intro",
    issuer: "EdX",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1920",
    url: "https://drive.google.com/file/d/1JibIVO86o-5LLU3J5wcjbdEFQzdXG93H/view?usp=sharing",
    date: "2023",
    skills: ["Python", "CS Theory"],
    description: "Acquired a solid foundation in computer science theory and practical application using Python, backed by academic excellence.",
  },
];

// Duplicate the array to create a seamless infinite loop
const CAROUSEL_DATA = [...CERTIFICATE_DATA, ...CERTIFICATE_DATA];

export default function Certificates() {
  return (
    <section 
      id="certificates" 
      className="relative min-h-screen py-24 md:py-32 flex flex-col justify-center bg-white dark:bg-black overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-violet-600/10 dark:bg-violet-900/20 blur-[120px] rounded-[100%] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none z-10" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center mb-16 md:mb-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-600 dark:text-violet-400 text-xs font-bold tracking-[0.2em] uppercase"
        >
          Accreditation
        </motion.div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black dark:text-white tracking-tighter uppercase mb-6">
          CERTIFICATIONS.
        </h2>
        <p className="max-w-2xl text-zinc-500 dark:text-zinc-400 font-mono text-sm uppercase">
          A selection of professional certifications and honors earned through continuous learning and technical mastery.
        </p>
      </div>

      {/* Infinite Carousel Container */}
      <div className="relative w-full z-20 flex flex-col justify-center">
        {/* Edge Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-64 bg-gradient-to-r from-white dark:from-black to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-64 bg-gradient-to-l from-white dark:from-black to-transparent z-30 pointer-events-none" />

        {/* CSS-driven infinite animation track */}
        <div className="flex w-fit animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused] gap-6 md:gap-10 px-4 group">
          {CAROUSEL_DATA.map((cert, index) => (
            <CertificateCard
              key={`${cert.title}-${index}`}
              cert={cert}
            />
          ))}
        </div>
      </div>

      {/* Required CSS Keyframes inline inject for simplicity */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1.25rem)); } /* -50% taking the gap into account roughly */
        }
      `}} />
    </section>
  );
}

function CertificateCard({ cert }: { cert: CertificateData }) {
  return (
    <div className="relative group/card flex-shrink-0 w-[300px] md:w-[450px]">
      {/* Animated Drop Shadow / Glow */}
      <div className="absolute -inset-[2px] rounded-[32px] bg-gradient-to-b from-violet-500 to-indigo-600 opacity-0 group-hover/card:opacity-30 blur-xl transition-opacity duration-500 z-0" />

      {/* Main Card Surface */}
      <div className="relative h-full flex flex-col bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-[#1A1A1A] rounded-[30px] overflow-hidden z-10 transition-all duration-500 group-hover/card:-translate-y-4 group-hover/card:border-violet-500/30">

        {/* Top Image Section */}
        <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-zinc-900 overflow-hidden">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Issuer Badge floated on image */}
          <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.1em]">{cert.issuer}</span>
          </div>

          {/* Date Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/80">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{cert.date}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {cert.title}
          </h3>

          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 line-clamp-3 mb-6">
            {cert.description}
          </p>

          {/* Skills Container */}
          <div className="flex flex-wrap gap-2 mb-8 mt-auto">
            {cert.skills.map(skill => (
              <div key={skill} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <CheckCircle2 className="w-3 h-3 text-violet-500" />
                <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{skill}</span>
              </div>
            ))}
          </div>

          {/* Optional Action Button */}
          {cert.url && cert.url !== "#" ? (
            <a
              href={cert.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-3.5 bg-slate-900 hover:bg-violet-600 dark:bg-white dark:hover:bg-violet-400 text-white dark:text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300"
            >
              <span>View Credential</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <div className="inline-flex w-full items-center justify-center gap-2 px-4 py-3.5 bg-slate-100 dark:bg-[#111] text-slate-400 dark:text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest cursor-not-allowed">
              <span>Credential Offline</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}