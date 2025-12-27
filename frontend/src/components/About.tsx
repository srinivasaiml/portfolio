import React, { memo, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Users, Download, Award, Target, Heart, User } from 'lucide-react';
import { animate } from 'framer-motion';

// Enhanced GlowingEffect Component with stronger glow
const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className = "",
    movementDuration = 2,
    borderWidth = 1,
    disabled = false,
  }) => {
    const containerRef = useRef(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(0);

    const handleMove = useCallback(
      (e) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={`pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity ${
            glow && "opacity-100"
          } ${variant === "white" && "border-white"} ${disabled && "!block"}`}
        />
        <div
          ref={containerRef}
          style={{
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            "--gradient":
              variant === "white"
                ? `repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                var(--black),
                var(--black) calc(25% / var(--repeating-conic-gradient-times))
              )`
                : `radial-gradient(circle, #dd7bbb 15%, #dd7bbb00 25%),
              radial-gradient(circle at 40% 40%, #d79f1e 10%, #d79f1e00 20%),
              radial-gradient(circle at 60% 60%, #5a922c 15%, #5a922c00 25%), 
              radial-gradient(circle at 40% 60%, #4c7894 15%, #4c789400 25%),
              repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                #dd7bbb 0%,
                #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
              )`,
          }}
          className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity ${
            glow && "opacity-100"
          } ${blur > 0 && "blur-[var(--blur)]"} ${className} ${
            disabled && "!hidden"
          }`}
        >
          <div
            className="glow rounded-[inherit] after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

const About = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following industry best practices.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Modern Design',
      description: 'Creating beautiful, intuitive user interfaces with attention to detail and aesthetics.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance',
      description: 'Optimizing applications for speed, responsiveness, and efficiency across all devices.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'Working effectively in teams, communicating technical concepts, and contributing solutions.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const stats = [
    { icon: <Award className="w-6 h-6" />, value: '5+', label: 'Certificates' },
    { icon: <Target className="w-6 h-6" />, value: '10+', label: 'Projects' },
    { icon: <Heart className="w-6 h-6" />, value: '100%', label: 'Passion' },
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/autoCV.pdf'; 
    link.download = 'autoCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-500">
      
      {/* Animated Blobs */}
      <div className="absolute inset-0">
        <div 
          className="absolute h-[500px] w-[500px] rounded-full opacity-60 blur-[3rem] bg-pink-500/50 dark:bg-pink-900/30"
          style={{ 
            animation: 'blob-bounce 12s infinite ease', 
            filter: 'blur(3rem)', 
            top: '50%',
            left: '50%',
          }}
        />

        <div 
          className="absolute h-[600px] w-[600px] rounded-full opacity-60 blur-[3rem] bg-blue-500/50 dark:bg-blue-900/30"
          style={{ 
            animation: 'blob-bounce 15s infinite ease reverse', 
            filter: 'blur(3rem)',
            top: '20%',
            left: '70%',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: isMobile ? 0.4 : 1, 
            ease: isMobile ? [0.25, 0.1, 0.25, 1] : "easeOut" 
          }}
          viewport={{ once: true, margin: isMobile ? "-50px" : "0px" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: isMobile ? 1 : 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0 : 0.2 }}
            viewport={{ once: true, margin: isMobile ? "-50px" : "0px" }}
            className="inline-block p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-2xl mb-6"
          >
            <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0 : 0.4 }}
            viewport={{ once: true, margin: isMobile ? "-50px" : "0px" }}
            className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light"
          >
            Passionate about creating digital experiences that make a difference
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: isMobile ? 0.4 : 1, 
              ease: isMobile ? [0.25, 0.1, 0.25, 1] : "easeOut" 
            }}
            viewport={{ once: true, margin: isMobile ? "-30px" : "0px" }}
            className="space-y-8"
          >
            <div className="relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 dark:border-white/10 hover:shadow-3xl transition-all duration-500">
              {/* Enhanced main card glow - disabled on mobile */}
              {!isMobile && (
                <GlowingEffect 
                  proximity={250}
                  blur={0}
                  spread={50}
                  borderWidth={4}
                />
              )}
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 10 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0 : 0.2 }}
                viewport={{ once: true, margin: isMobile ? "-30px" : "0px" }}
              >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
                  My Journey
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Hi, I'm <span className="font-semibold text-blue-600 dark:text-blue-400">Srinivas</span>, a passionate Frontend Developer. My journey in web development began with a fascination for creating 
                  interactive and user-friendly digital experiences.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  Currently, I'm on an exciting journey to master the <span className="font-semibold text-purple-600 dark:text-purple-400">MERN stack</span> (MongoDB, Express.js, React, Node.js) 
                  to build full-stack applications.
                </p>
              </motion.div>

              {/* Enhanced Stats glow - disabled on mobile */}
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 10 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0 : 0.4 }}
                viewport={{ once: true, margin: isMobile ? "-30px" : "0px" }}
                className="grid grid-cols-3 gap-6 mb-8"
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={isMobile ? {} : { scale: 1.05, y: -5 }}
                    className="relative text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-white/50 dark:border-white/5"
                  >
                    {!isMobile && (
                      <GlowingEffect 
                        proximity={250}
                        blur={15}
                        spread={60}
                        borderWidth={3}
                      />
                    )}
                    <div className="text-blue-600 dark:text-blue-400 mb-2 flex justify-center">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                whileHover={isMobile ? {} : { 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                  y: -3
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center space-x-3"
              >
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                <span>Download Resume</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: isMobile ? 0.4 : 1, 
              ease: isMobile ? [0.25, 0.1, 0.25, 1] : "easeOut", 
              delay: isMobile ? 0 : 0.3 
            }}
            viewport={{ once: true, margin: isMobile ? "-30px" : "0px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: isMobile ? 20 : 50, rotateY: isMobile ? 0 : -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: isMobile ? 0.3 : 0.8, 
                  delay: isMobile ? 0 : index * 0.2 
                }}
                viewport={{ once: true, margin: isMobile ? "-30px" : "0px" }}
                whileHover={isMobile ? {} : { 
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  y: -10
                }}
                className="relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-white/10 transform-gpu hover:shadow-2xl transition-all duration-500 group"
              >
                {/* Enhanced skills cards glow - disabled on mobile */}
                {!isMobile && (
                  <GlowingEffect 
                    proximity={250}
                    blur={0}
                    spread={50}
                    borderWidth={4}
                  />
                )}
                <motion.div
                  whileHover={isMobile ? {} : { rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 bg-gradient-to-br ${skill.color} text-white rounded-xl mb-6 shadow-lg`}
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {skill.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Philosophy Section glow - disabled on mobile */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: isMobile ? 0.4 : 1, 
            ease: isMobile ? [0.25, 0.1, 0.25, 1] : "easeOut" 
          }}
          viewport={{ once: true, margin: isMobile ? "-30px" : "0px" }}
          className="text-center"
        >
          <div className="relative max-w-4xl mx-auto bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-white/10">
            {!isMobile && (
              <GlowingEffect 
                proximity={400}
                blur={30}
                spread={120}
                borderWidth={6}
              />
            )}
            <motion.div
              initial={{ scale: isMobile ? 1 : 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0 : 0.2 }}
              viewport={{ once: true, margin: isMobile ? "-30px" : "0px" }}
              className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-8 shadow-xl"
            >
              "
            </motion.div>
            <blockquote className="text-3xl md:text-4xl font-light text-gray-700 dark:text-gray-200 italic mb-8 leading-relaxed">
              Code is like humor. When you have to explain it, it's bad.
            </blockquote>
            <cite className="text-xl text-blue-600 dark:text-blue-400 font-semibold">— My Development Philosophy</cite>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob-bounce {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>
    </section>
  );
};

export default About;