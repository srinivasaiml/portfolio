import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Eye, Sparkles } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(59, 130, 246, 0.6)',
      'rgba(147, 51, 234, 0.6)',
      'rgba(236, 72, 153, 0.6)',
      'rgba(34, 197, 94, 0.6)',
    ];

    // Create floating particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 0.8 - 0.4,
        vy: Math.random() * 0.8 - 0.4,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let time = 0;

    const animate = () => {
      // 1. Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Outer loop: Iterate through all particles to update position and draw
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx + Math.sin(time + index * 0.01) * 0.2;
        particle.y += particle.vy + Math.cos(time + index * 0.01) * 0.2;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Apply glow settings first
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
        
        // Fill the particle
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Reset shadow/glow after drawing the particle
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent'; // Optional: ensures no other elements are affected

        // Connect nearby particles (Optimized inner loop)
        // Start from index + 1 to prevent double-checking (A->B and B->A)
        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex++) {
          const otherParticle = particles[otherIndex];
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) { // Keep connection radius at 100 (or reduce for further gains)
            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // Request the next frame
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      />
      
      {/* Enhanced floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-40 h-40 border-2 border-blue-300/30 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.7, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-2xl"
        />
        <motion.div
          animate={{
            y: [-30, 30, -30],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/4 w-24 h-24 border-2 border-purple-300/40 rounded-2xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center mb-6"
          >
            <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
            <span className="text-lg text-gray-600 font-medium">Hello, I'm</span>
            <Sparkles className="w-6 h-6 text-yellow-500 ml-2" />
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Patchipala
            </span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Srinivas
            </motion.span>
          </motion.h1>
          
          <motion.div
            className="text-3xl md:text-4xl lg:text-5xl text-gray-600 mb-8 h-20 font-light"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <TypewriterText />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
        >
          Passionate <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frontend Developer</span> crafting beautiful, 
          interactive digital experiences with modern technologies and innovative design solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center space-x-3 text-lg"
          >
            <Eye className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span>View My Work</span>
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-500 flex items-center space-x-3 text-lg shadow-xl"
          >
            <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
            <span>Download Resume</span>
          </motion.button>
        </motion.div>

        {/* Social Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex justify-center space-x-12 mt-16"
        >
          {[
            { number: '10+', label: 'Projects' },
            { number: '5+', label: 'Certificates' },
            { number: '2+', label: 'Years Learning' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

   
    </section>
  );
};

const TypewriterText = () => {
  const texts = [
    'Full Stack Developer',
    'Frontend Specialist', 
    'UI/UX Designer',
    'React Developer',
    'Problem Solver'
  ];
  const [currentText, setCurrentText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  return (
    <span className="font-light">
      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {currentText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-blue-600"
      >
        |
      </motion.span>
    </span>
  );
};

export default Hero;