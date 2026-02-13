"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  Trophy,
  Flame,
  Compass
} from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  event: string;
  type: 'internship' | 'workshop' | 'achievement';
  duration: string;
  location: string;
  description: string;
  skills: string[];
  gradient: string;
  lightGradient: string;
  accentColor: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

const Experience: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, height]),
    { stiffness: 100, damping: 30 }
  );
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const experiences: ExperienceItem[] = [
    {
      title: '2025',
      company: 'Aditya University',
      event: 'Software Engineer Intern',
      type: 'internship',
      duration: 'May 2025 – Jun 2025',
      location: 'Smart Library Seat Management System',
      description: 'Developed a full-stack seat reservation platform using Node.js, Express, and MongoDB. Implemented real-time seat tracking with a responsive frontend in HTML, CSS, and JavaScript. Optimized allocation logic, improving seat utilization by 25%, and streamlined the booking process, reducing manual work by 40%.',
      skills: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML/CSS', 'Full-Stack Development'],
      gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
      lightGradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      accentColor: 'violet',
      stats: [
        { label: 'Efficiency Boost', value: '+40%' },
        { label: 'Utilization', value: '+25%' }
      ]
    },
    {
      title: '2024',
      company: 'proTreX Technology re-Xplained',
      event: 'Artificial Intelligence (AI) Workshop',
      type: 'workshop',
      duration: '2024',
      location: 'Tech Conference',
      description: 'Participated in an immersive AI workshop covering latest advancements, trends, and real-world applications. Gained deep insights into machine learning algorithms, neural networks, and AI implementation strategies.',
      skills: ['Machine Learning', 'Neural Networks', 'AI Applications', 'Data Science'],
      gradient: 'from-pink-600 via-rose-600 to-red-600',
      lightGradient: 'from-pink-500 via-rose-500 to-red-500',
      accentColor: 'pink',
    },
    {
      title: '2023',
      company: 'Veda 2023 Technical Symposium',
      event: 'Technical Treasure Hunt Winner',
      type: 'achievement',
      duration: '2023',
      location: 'National Level Competition',
      description: 'Successfully completed challenging technical treasure hunt involving complex problem-solving, coding challenges, and collaborative teamwork. Demonstrated strong analytical and strategic thinking abilities.',
      skills: ['Problem Solving', 'Algorithms', 'Team Collaboration', 'Strategic Thinking'],
      gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
      lightGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      accentColor: 'emerald',
    },
    {
      title: '2023',
      company: 'Appleton Innovations',
      event: 'IoT & Machine Learning Workshop',
      type: 'workshop',
      duration: '2023',
      location: 'Technology Seminar',
      description: 'Engaged with cutting-edge IoT and ML technologies, learning about sensor networks, data processing, and intelligent system design. Worked on practical projects combining hardware and software solutions.',
      skills: ['IoT Development', 'Sensor Networks', 'Data Processing', 'Embedded Systems'],
      gradient: 'from-blue-600 via-indigo-600 to-purple-600',
      lightGradient: 'from-blue-500 via-indigo-500 to-purple-500',
      accentColor: 'blue',
    },
    {
      title: '2023',
      company: 'Technical Workshop',
      event: 'Web Development with Django',
      type: 'workshop',
      duration: '2023',
      location: 'Development Bootcamp',
      description: 'Intensive hands-on training in Django web framework, covering MVC architecture, database integration, user authentication, and deployment strategies for scalable web applications.',
      skills: ['Django', 'Python', 'Web Development', 'Database Design'],
      gradient: 'from-orange-600 via-amber-600 to-yellow-600',
      lightGradient: 'from-orange-500 via-amber-500 to-yellow-500',
      accentColor: 'orange',
    }
  ];

  const getIcon = (type: 'internship' | 'workshop' | 'achievement') => {
    const iconClass = "w-5 h-5";
    switch(type) {
      case 'internship':
        return <Briefcase className={iconClass} />;
      case 'achievement':
        return <Trophy className={iconClass} />;
      default:
        return <Flame className={iconClass} />;
    }
  };

  return (
    <section id="experience" className="relative">
      {/* Custom Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .font-body {
          font-family: 'DM Sans', sans-serif;
        }

        /* Grain Texture */
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }

        .grain {
          animation: grain 8s steps(10) infinite;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
        }
      `}</style>

      <div
        className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-700 font-body"
        ref={containerRef}
      >
        {/* Grain Texture */}
        <div className="grain absolute inset-0 pointer-events-none" />

        {/* Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Light Mode */}
          <div className="absolute inset-0 dark:opacity-0 opacity-100 transition-opacity duration-700">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-96 h-96"
              style={{
                background: 'radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -120, 0],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/3 -left-32 w-[500px] h-[500px]"
              style={{
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                x: [0, 50, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 right-1/4 w-80 h-80"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                filter: 'blur(70px)',
              }}
            />
          </div>

          {/* Dark Mode */}
          <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 0],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-[600px] h-[600px]"
              style={{
                background: 'radial-gradient(circle, rgba(251, 146, 60, 0.08) 0%, transparent 70%)',
                filter: 'blur(100px)',
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-[550px] h-[550px]"
              style={{
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, transparent 70%)',
                filter: 'blur(90px)',
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                y: [0, -30, 0],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>

          {/* Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`float-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? 'rgba(251, 146, 60, 0.4)' : i % 3 === 1 ? 'rgba(236, 72, 153, 0.4)' : 'rgba(139, 92, 246, 0.4)',
              }}
              animate={{
                y: [0, Math.random() * -100 - 50, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="max-w-7xl mx-auto pt-24 pb-16 px-6 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-left"
            >
              {/* Decorative Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="h-0.5 w-24 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 mb-8 origin-left"
              />

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <Compass className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-semibold tracking-wider uppercase text-orange-900 dark:text-orange-300">
                  Journey Through Time
                </span>
              </motion.div>

              {/* Title */}
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-[0.95]">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="block text-gray-900 dark:text-white"
                >
                  Experience
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="block bg-gradient-to-r from-orange-600 via-pink-600 to-violet-600 dark:from-orange-400 dark:via-pink-400 dark:to-violet-400 bg-clip-text text-transparent italic"
                >
                  & Growth
                </motion.span>
              </h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed font-light"
              >
                A curated chronicle of technical milestones, creative breakthroughs, 
                and transformative learning experiences that shaped my journey.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-8 mt-12"
              >
                {[
                  { value: '01', label: 'Internship', icon: <Briefcase className="w-6 h-6" /> },
                  { value: '03', label: 'Workshops', icon: <Flame className="w-6 h-6" /> },
                  { value: '01', label: 'Achievement', icon: <Trophy className="w-6 h-6" /> }
                ].map((stat, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </div>
                      <div className="text-5xl font-display font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-sm tracking-wide text-gray-600 dark:text-gray-400 uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div ref={ref} className="relative max-w-7xl mx-auto pb-24 px-6 md:px-12 lg:px-16">
            {experiences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex gap-8 md:gap-16 mb-20 md:mb-32"
              >
                {/* Timeline Icons */}
                <div className="flex-shrink-0 relative pt-2">
                  <div className="sticky top-40 z-30 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                      className="relative -ml-8 md:-ml-10"
                    >
                      {/* Outer Ring */}
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-slate-900 border-4 border-orange-200 dark:border-orange-900/50 flex items-center justify-center shadow-xl relative z-10">
                        {/* Inner Circle */}
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg relative overflow-hidden group-hover:scale-110 transition-transform`}>
                          {getIcon(item.type)}
                          {/* Shine Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                          />
                        </div>
                        {/* Pulse Ring */}
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.gradient} opacity-20`}
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.2, 0, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Year Label - Desktop */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                      className="hidden md:block mt-6 ml-10"
                    >
                      <div className="text-7xl font-display font-bold bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-500 bg-clip-text text-transparent whitespace-nowrap">
                        {item.title}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Content Cards */}
                <div className="flex-1 pt-0">
                  {/* Year - Mobile */}
                  <div className="md:hidden mb-6">
                    <div className="text-5xl font-display font-bold bg-gradient-to-br from-gray-600 to-gray-900 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent">
                      {item.title}
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative"
                  >
                    <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden">
                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-48 h-48 opacity-10 dark:opacity-5">
                        <div className={`w-full h-full bg-gradient-to-br ${item.gradient} rounded-full blur-3xl`} />
                      </div>

                      {/* Top Accent Bar */}
                      <motion.div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="mb-6">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                                {item.event}
                              </h3>
                              <p className={`text-lg md:text-xl font-semibold bg-gradient-to-r ${item.lightGradient} bg-clip-text text-transparent`}>
                                {item.company}
                              </p>
                            </div>

                            {/* Type Badge */}
                            <motion.div
                              whileHover={{ rotate: 5, scale: 1.05 }}
                              className={`px-4 py-2 bg-gradient-to-r ${item.gradient} rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg flex-shrink-0`}
                            >
                              {item.type}
                            </motion.div>
                          </div>

                          {/* Meta */}
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">{item.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span className="font-medium">{item.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-base md:text-lg">
                          {item.description}
                        </p>

                        {/* Stats */}
                        {item.stats && (
                          <div className="grid grid-cols-2 gap-4 mb-8">
                            {item.stats.map((stat, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ y: -4 }}
                                className="p-5 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl border border-gray-200/50 dark:border-slate-600/50 backdrop-blur-sm"
                              >
                                <div className={`text-4xl font-display font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-1`}>
                                  {stat.value}
                                </div>
                                <div className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400 font-semibold">
                                  {stat.label}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2.5">
                          {item.skills.map((skill, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ y: -3, scale: 1.05 }}
                              className="px-4 py-2.5 bg-white dark:bg-slate-800 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-md hover:shadow-xl border border-gray-200 dark:border-slate-700 transition-all cursor-pointer backdrop-blur-sm"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Hover Glow */}
                      <div className={`absolute -inset-px bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-3xl`} />
                    </div>

                    {/* Shadow */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-3xl -z-10`} />
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Timeline Line */}
            <div
              style={{ height: height + "px" }}
              className="absolute left-[24px] md:left-[48px] lg:left-[64px] top-0 w-[2px] overflow-hidden z-0"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
              <motion.div
                style={{
                  height: heightTransform,
                  opacity: opacityTransform,
                }}
                className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-orange-500 via-pink-500 to-violet-500"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(251, 146, 60, 0.5)",
                      "0 0 40px rgba(236, 72, 153, 0.7)",
                      "0 0 20px rgba(139, 92, 246, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-50 dark:from-slate-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default Experience;