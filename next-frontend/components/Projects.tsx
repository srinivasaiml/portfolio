"use client";

import React, { useRef, useState, useMemo, useCallback, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Award, Plus, Folder } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  demo: string | null;
  github: string | null;
  featured: boolean;
}

import { HeroParallax } from "./ui/hero-parallax";

const projects: Project[] = [
  {
    title: "ChatWithAI",
    description: "AI-powered doctor appointment booking system with intelligent conversation flow.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "AI/ML", "Node.js"],
    category: "2025",
    demo: "https://ai-smart-hp.netlify.app", // ✅ UPDATED
    github: null,
    featured: true,
  }, {
    title: "Library Management",
    description: "Comprehensive library management solution built for students and administrators.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
    tags: ["JavaScript", "HTML", "CSS"],
    category: "2025",
    demo: "https://adityasmartlibrary.netlify.app", // ✅ UPDATED
    github: "#",
    featured: false,
  },
  {
    title: "AI Excel Assistant",
    description: "Edit, create, and manage Excel files using natural language commands — powered by AI.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["AI/ML", "React", "Excel API"],
    category: "2025",
    demo: "https://ai-excel.netlify.app/",
    github: null,
    featured: true,
  },
  {
    title: "8 Queen Chess Puzzle",
    description: "Strategic chess puzzle game with intelligent solving algorithms and interactive gameplay.",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&q=80&w=800",
    tags: ["JavaScript", "Algorithm", "Game Logic"],
    category: "2025",
    demo: "https://srinivasaiml.github.io/project/queen.html",
    github: null,
    featured: false,
  },
  {
    title: "Resume Analyzer Pro",
    description: "ATS-friendly resume analyzer with detailed feedback and scoring to optimize your CV.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "NLP", "Machine Learning"],
    category: "2024",
    demo: "https://srinivasaiml.github.io/project/Resumescore.html",
    github: null,
    featured: true,
  },
  {
    title: "Speed Tracker",
    description: "Real-time vehicle speed tracking system with GPS integration and live dashboard.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "GPS", "Real-time"],
    category: "2024",
    demo: "https://srinivasaiml.github.io/Codesoft/success.html",
    github: null,
    featured: false,
  },
  {
    title: "Cosmic Typing Game",
    description: "Fast-paced typing game to benchmark and improve your typing speed and accuracy.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&q=80&w=800",
    tags: ["JavaScript", "Game", "HTML5"],
    category: "2023",
    demo: "https://srinivasaiml.github.io/project/typinggame.html",
    github: null,
    featured: false,
  },
  {
    title: "Signature Generator",
    description: "Create beautiful digital signatures with a modern, intuitive UI and live preview.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    tags: ["JavaScript", "UI/UX", "HTML5"],
    category: "2023",
    demo: "https://srinivasaiml.github.io/project/uiux.html",
    github: null,
    featured: false,
  },
  {
    title: "Tic Tac Toe Game",
    description: "Classic Tic Tac Toe with interactive UI, smooth animations, and two-player mode.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=800",
    tags: ["JavaScript", "Game", "CSS3"],
    category: "2023",
    demo: "https://srinivasaiml.github.io/project/tictak.html",
    github: null,
    featured: false,
  },
  {
    title: "Premium Portfolio",
    description: "A high-end personal portfolio website built with Next.js, Framer Motion, and Aceternity UI.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "Tailwind", "Motion"],
    category: "2025",
    demo: "https://srinivasaiml.github.io/portfolio",
    github: "#",
    featured: true,
  },
];

const products = [
  // User's projects (9)
  ...projects.slice(0, 9).map((p) => ({
    title: p.title,
    link: p.demo || p.github || "#",
    thumbnail: p.image,
  })),
  // Filler projects from demo (6)
  {
    title: "Weather Website",
    link: "https://srinivasaiml.github.io/weather-website/weather.html",
    thumbnail: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Interview Prep UI",
    link: "https://uv-interview.netlify.app/",
    thumbnail: "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "AI Excel Tool",
    link: "https://ai-excel.netlify.app/",
    // Updated this specific link to a reliable source
    thumbnail: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "AI Voice Assistant",
    link: "https://github.com/srinivasaiml/ai-voice-assistant",
    thumbnail: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Fruits Login Page",
    link: "https://fruitsloginpages.netlify.app/",
    thumbnail: "fruits.png",
  },
  {
    title: "Mechanical Login Form",
    link: "https://srinivasaiml.github.io/meachincal_loginForm/meachincal_loginForm.html",
    thumbnail: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1000&auto=format&fit=crop",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-10 relative w-full overflow-hidden bg-white dark:bg-black transition-colors duration-500 border-y border-zinc-100 dark:border-zinc-900"
    >
      <HeroParallax products={products} />

      {/* Background Decorations to match Skills section */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-white dark:from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-white dark:from-black to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Projects;
