import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  Shield,
  Trophy,
  Star,
  Sparkles,
  Calendar,
  CheckCircle,
} from 'lucide-react';

// Types
interface Certificate {
  title: string;
  issuer: string;
  description: string;
  image: string;
  url: string;
  date: string;
  skills: string[];
  color: string;
  icon: React.ReactNode;
}

const Certificates: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(0);

  const certificates: Certificate[] = [
    {
      title: 'HackerRank Certification',
      issuer: 'HackerRank',
      description: 'Problem Solving and Programming Skills Certification',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
      url: 'https://www.hackerrank.com/certificates/a67a507bbd1a',
      date: '2024',
      skills: ['Problem Solving', 'Algorithms', 'Data Structures'],
      color: 'from-green-500 to-emerald-600',
      icon: <Trophy className="w-6 h-6" />,
    },
    {
      title: 'Great Learning Certificate',
      issuer: 'Great Learning',
      description: 'Data Science and Machine Learning Fundamentals',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
      url: 'https://drive.google.com/file/d/1VMkkM0XFqum1I4sv552KuY4PzFNPlCMb/view?usp=sharing',
      date: '2024',
      skills: ['Data Science', 'Machine Learning', 'Python'],
      color: 'from-blue-500 to-indigo-600',
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: 'CodeChef Certificate',
      issuer: 'CodeChef',
      description: 'Competitive Programming and Algorithm Design',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      url: '#',
      date: '2023',
      skills: ['Competitive Programming', 'C++', 'Algorithms'],
      color: 'from-orange-500 to-red-600',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: 'Infosys Springboard',
      issuer: 'Infosys',
      description: 'Software Development and Enterprise Solutions',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      url: 'https://drive.google.com/file/d/1fQEyayq5imG44u7ht03QBnXhdr3Fa60y/view?usp=sharing',
      date: '2023',
      skills: ['Software Development', 'Java', 'Enterprise'],
      color: 'from-purple-500 to-pink-600',
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: 'EdX Certificate',
      issuer: 'EdX',
      description: 'Introduction to Computer Science and Programming',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      url: 'https://drive.google.com/file/d/1JibIVO86o-5LLU3J5wcjbdEFQzdXG93H/view?usp=sharing',
      date: '2023',
      skills: ['Computer Science', 'Programming', 'Fundamentals'],
      color: 'from-teal-500 to-cyan-600',
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ];

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay, certificates.length]);

  const nextSlide = (): void => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
    setIsAutoPlay(false);
  };

  const prevSlide = (): void => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number): void => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const currentCert = certificates[currentIndex];

  // Smooth horizontal slide animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30, mass: 0.5 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30, mass: 0.5 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  // Content stagger only on manual interaction
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      id="certificates"
      className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-orange-400 rounded-full"
              initial={{ opacity: 0.1, scale: 1 }}
              animate={{
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut',
              }}
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-red-400/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 30, -20, 20, 0],
            y: [0, -30, 20, 10, 0],
            rotate: [0, 5, -5, 3, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-red-300/20 to-orange-400/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -30, 20, -20, 0],
            y: [0, 30, -20, 10, 0],
            rotate: [0, -5, 5, -3, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <motion.div
                className={`p-5 bg-gradient-to-br ${currentCert.color} rounded-2xl shadow-2xl`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Award className="w-16 h-16 text-white" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </motion.div>
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Certificates & Achievements
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed px-4"
          >
            Recognition of my continuous learning journey and professional development
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-4 px-4"
          >
            <motion.div
              className="glass-card px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="text-sm font-semibold text-orange-600">
                🏆 {certificates.length} Certifications
              </span>
            </motion.div>
            <motion.div
              className="glass-card px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="text-sm font-semibold text-purple-600">⚡ Active Learner</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Certificate Display */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative" style={{ perspective: '1000px' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative"
              >
                <motion.div
                  className="glass-card rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative group overflow-hidden">
                      <motion.img
                        src={currentCert.image}
                        alt={currentCert.title}
                        className="w-full h-64 md:h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100" />

                      {/* Date Badge */}
                      <motion.div
                        className="absolute top-4 left-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <div className="glass-card px-4 py-2 rounded-full backdrop-blur-md">
                          <span className="text-gray-800 text-sm font-bold flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {currentCert.date}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative">
                      <motion.div
                        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-300/20 to-pink-300/20 rounded-full filter blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />

                      <div className="relative z-10">
                        {/* Icon & Verified Badge */}
                        <motion.div
                          className="flex items-center justify-between mb-6"
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          custom={0}
                        >
                          <motion.div
                            className={`p-4 bg-gradient-to-br ${currentCert.color} rounded-xl shadow-lg`}
                            whileHover={{ rotate: 8, scale: 1.08 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                          >
                            {currentCert.icon}
                          </motion.div>
                          <div className="glass-card px-4 py-2 rounded-full">
                            <span className="text-emerald-600 text-sm font-bold flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Verified
                            </span>
                          </div>
                        </motion.div>

                        {/* Title & Issuer */}
                        <motion.h3
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          custom={1}
                          className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight"
                        >
                          {currentCert.title}
                        </motion.h3>

                        <motion.p
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          custom={2}
                          className={`text-lg md:text-xl font-semibold bg-gradient-to-r ${currentCert.color} bg-clip-text text-transparent mb-4`}
                        >
                          {currentCert.issuer}
                        </motion.p>

                        {/* Description */}
                        <motion.p
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          custom={3}
                          className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base"
                        >
                          {currentCert.description}
                        </motion.p>

                        {/* Skills */}
                        <motion.div
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          custom={4}
                          className="flex flex-wrap gap-2 mb-6"
                        >
                          {currentCert.skills.map((skill, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 500, damping: 15 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="glass-card px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 cursor-default"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </motion.div>

                        {/* View Button */}
                        <motion.a
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          custom={5}
                          href={currentCert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r ${currentCert.color} text-white rounded-xl font-bold shadow-2xl group`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Certificate
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="ml-2"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.div>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-2 md:-left-6 top-1/2 transform -translate-y-1/2 glass-card p-3 md:p-4 rounded-full shadow-2xl z-20"
              whileHover={{ scale: 1.15, x: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous certificate"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className="absolute right-2 md:-right-6 top-1/2 transform -translate-y-1/2 glass-card p-3 md:p-4 rounded-full shadow-2xl z-20"
              whileHover={{ scale: 1.15, x: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next certificate"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </motion.button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-8 flex justify-center items-center gap-3 px-4 overflow-x-auto pb-4">
            {certificates.map((cert, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0.6,
                  scale: index === currentIndex ? 1.1 : 0.95,
                }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 ${
                    index === currentIndex
                      ? 'border-orange-500 shadow-lg shadow-orange-500/50'
                      : 'border-orange-300/50'
                  }`}
                >
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                </div>
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Auto-play Progress Bar */}
          {isAutoPlay && (
            <motion.div
              className="mt-6 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="h-1 bg-orange-200/50 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${currentCert.color} rounded-full`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  key={currentIndex}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certificates;