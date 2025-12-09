"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { Calendar, MapPin, Award, Sparkles, Briefcase, Zap } from 'lucide-react';

const Experience = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, height]),
    { stiffness: 100, damping: 30 }
  );
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const experiences = [
    {
      title: '2025',
      company: 'Aditya University',
      event: 'Software Engineer Intern',
      type: 'internship',
      duration: 'May 2025 – Jun 2025',
      location: 'Smart Library Seat Management System',
      description: 'Developed a full-stack seat reservation platform using Node.js, Express, and MongoDB. Implemented real-time seat tracking with a responsive frontend in HTML, CSS, and JavaScript. Optimized allocation logic, improving seat utilization by 25%, and streamlined the booking process, reducing manual work by 40%.',
      skills: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML/CSS', 'Full-Stack Development'],
      color: 'from-indigo-500 via-purple-500 to-pink-500',
      glowColor: 'shadow-indigo-500/50 dark:shadow-indigo-500/30',
      borderGlow: 'group-hover:shadow-indigo-500/50 dark:group-hover:shadow-indigo-400/40',
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
      color: 'from-purple-500 via-fuchsia-500 to-pink-500',
      glowColor: 'shadow-purple-500/50 dark:shadow-purple-500/30',
      borderGlow: 'group-hover:shadow-purple-500/50 dark:group-hover:shadow-purple-400/40',
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
      color: 'from-green-500 via-emerald-500 to-teal-500',
      glowColor: 'shadow-green-500/50 dark:shadow-green-500/30',
      borderGlow: 'group-hover:shadow-green-500/50 dark:group-hover:shadow-green-400/40',
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
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      glowColor: 'shadow-blue-500/50 dark:shadow-blue-500/30',
      borderGlow: 'group-hover:shadow-blue-500/50 dark:group-hover:shadow-blue-400/40',
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
      color: 'from-orange-500 via-red-500 to-pink-500',
      glowColor: 'shadow-orange-500/50 dark:shadow-orange-500/30',
      borderGlow: 'group-hover:shadow-orange-500/50 dark:group-hover:shadow-orange-400/40',
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'internship':
        return <Briefcase className="w-5 h-5 md:w-6 md:h-6" />;
      case 'achievement':
        return <Award className="w-5 h-5 md:w-6 md:h-6" />;
      default:
        return <Zap className="w-5 h-5 md:w-6 md:h-6" />;
    }
  };

  return (
    <section id="experience">
    <div
      className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-neutral-950 dark:to-black font-sans md:px-10 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Enhanced floating background elements with animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 dark:bg-green-500/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 dark:bg-cyan-500/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200/10 dark:bg-purple-500/10 rounded-full blur-3xl"
        ></motion.div>
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-500/20 dark:to-teal-500/20 rounded-full shadow-lg dark:shadow-green-500/20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
            </motion.div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">My Journey</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl mb-4 font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 dark:from-green-400 dark:via-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg max-w-2xl">
            A collection of internships, workshops, competitions, and learning experiences that have shaped my technical journey and expertise.
          </p>
        </motion.div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {experiences.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 absolute left-2.5 md:left-2.5 w-12 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center shadow-lg dark:shadow-xl dark:shadow-cyan-500/20 ring-4 ring-white/50 dark:ring-neutral-800/50">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  viewport={{ once: true }}
                  className={`h-6 w-6 rounded-full bg-gradient-to-br ${item.color} shadow-lg ${item.glowColor}`}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full rounded-full bg-gradient-to-br from-white/40 to-transparent"
                  />
                </motion.div>
              </div>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-r from-neutral-300 to-neutral-500 dark:from-neutral-400 dark:to-neutral-200 bg-clip-text text-transparent"
              >
                {item.title}
              </motion.h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-neutral-400 to-neutral-600 dark:from-neutral-300 dark:to-neutral-100 bg-clip-text text-transparent">
                {item.title}
              </h3>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <div className={`relative bg-white/90 dark:bg-gradient-to-br dark:from-neutral-900/90 dark:via-neutral-900/80 dark:to-neutral-800/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-2xl border border-gray-200/50 dark:border-neutral-700/50 hover:shadow-2xl dark:hover:shadow-cyan-500/10 transition-all duration-500 overflow-hidden ${item.borderGlow}`}>
                    
                    {/* Animated border gradient */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)`,
                      }}
                    />
                    
                    {/* Enhanced shine effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-cyan-400/10 to-transparent translate-x-[-200%]"
                      animate={{
                        translateX: ["-200%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 dark:group-hover:from-cyan-500/5 dark:group-hover:via-blue-500/5 dark:group-hover:to-purple-500/5 transition-all duration-500"></div>
                    
                    <div className="flex items-start mb-4 relative z-10">
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`p-3 bg-gradient-to-br ${item.color} rounded-xl text-white mr-4 flex-shrink-0 shadow-lg ${item.glowColor} relative overflow-hidden`}
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-white/30 rounded-xl"
                        />
                        {getIcon(item.type)}
                      </motion.div>
                      <div className="min-w-0">
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:dark:text-cyan-100 transition-colors duration-300">
                          {item.event}
                        </h4>
                        <p className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-semibold text-sm md:text-base`}>
                          {item.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-gray-600 dark:text-neutral-300 text-sm mb-5 relative z-10">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1.5 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm dark:shadow-md dark:shadow-cyan-500/10 border border-gray-200/50 dark:border-neutral-700/50"
                      >
                        <Calendar className="w-4 h-4 flex-shrink-0 text-gray-500 dark:text-cyan-400" />
                        <span>{item.duration}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1.5 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm dark:shadow-md dark:shadow-cyan-500/10 border border-gray-200/50 dark:border-neutral-700/50"
                      >
                        <MapPin className="w-4 h-4 flex-shrink-0 text-gray-500 dark:text-cyan-400" />
                        <span>{item.location}</span>
                      </motion.div>
                    </div>

                    <p className="text-gray-700 dark:text-neutral-200 mb-6 leading-relaxed text-sm md:text-base relative z-10 group-hover:dark:text-neutral-100 transition-colors duration-300">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 relative z-10">
                      {item.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            scale: 1.1,
                            y: -2,
                          }}
                          className="px-4 py-2 bg-white/90 dark:bg-gradient-to-r dark:from-neutral-800/90 dark:to-neutral-700/90 backdrop-blur-sm text-gray-700 dark:text-cyan-100 text-xs md:text-sm rounded-full font-medium shadow-sm dark:shadow-md dark:shadow-cyan-500/10 hover:shadow-lg dark:hover:shadow-cyan-500/20 transition-all duration-300 border border-gray-200/50 dark:border-cyan-500/30 dark:hover:border-cyan-400/50 cursor-pointer"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-neutral-200 dark:via-neutral-700/50 to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-green-500 via-cyan-500 to-blue-500 dark:from-green-400 dark:via-cyan-400 dark:to-blue-400 shadow-lg dark:shadow-cyan-500/50"
          >
            {/* Animated glow */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.5)",
                  "0 0 40px rgba(6, 182, 212, 0.8)",
                  "0 0 20px rgba(6, 182, 212, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full h-full rounded-full"
            />
          </motion.div>
        </div>
      </div>
      </div>
      </section>
  );
};

export default Experience;