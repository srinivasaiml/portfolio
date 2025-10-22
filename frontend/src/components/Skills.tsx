import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Globe, Server, Terminal, Zap, Sparkles, Rocket, Award, TrendingUp } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      skills: [
        { name: 'HTML5', level: 90, icon: '🌐', description: 'Semantic markup & accessibility' },
        { name: 'CSS3', level: 85, icon: '🎨', description: 'Advanced styling & animations' },
        { name: 'JavaScript', level: 80, icon: '⚡', description: 'ES6+ & modern frameworks' },
        { name: 'React', level: 75, icon: '⚛️', description: 'Component-based architecture' },
      ]
    },
    {
      title: 'Backend',
      icon: <Server className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      skills: [
        { name: 'Node.js', level: 70, icon: '🟢', description: 'Scalable server applications' },
        { name: 'Python', level: 85, icon: '🐍', description: 'Data processing & automation' },
        { name: 'Django', level: 75, icon: '🎯', description: 'Full-stack web framework' },
        { name: 'Express', level: 65, icon: '🚀', description: 'RESTful API development' },
      ]
    },
    {
      title: 'Database',
      icon: <Database className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      skills: [
        { name: 'SQL', level: 75, icon: '🗄️', description: 'Complex queries & optimization' },
        { name: 'MongoDB', level: 70, icon: '🍃', description: 'NoSQL document databases' },
        { name: 'MySQL', level: 80, icon: '🐬', description: 'Relational data management' },
        { name: 'PostgreSQL', level: 65, icon: '🐘', description: 'Advanced SQL features' },
      ]
    },
    {
      title: 'Tools & DevOps',
      icon: <Terminal className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      skills: [
        { name: 'Git', level: 80, icon: '📝', description: 'Version control & collaboration' },
        { name: 'Docker', level: 60, icon: '🐳', description: 'Container orchestration' },
        { name: 'AWS', level: 55, icon: '☁️', description: 'Cloud infrastructure' },
        { name: 'Linux', level: 70, icon: '🐧', description: 'System administration' },
      ]
    }
  ];

  const stats = [
    { number: '15+', label: 'Technologies', icon: <Code className="w-6 h-6" /> },
    { number: '4', label: 'Specializations', icon: <Award className="w-6 h-6" /> },
    { number: '10+', label: 'Projects Built', icon: <Rocket className="w-6 h-6" /> },
    { number: '∞', label: 'Learning Mode', icon: <TrendingUp className="w-6 h-6" /> },
  ];

  // Memoized particles for better performance
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 3,
      size: Math.random() * 2 + 1,
    })), []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        delay: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Optimized Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 80, 0],
            y: [0, -60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatType: "reverse"
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, 80, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatType: "reverse"
          }}
          className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatType: "mirror"
          }}
          className="absolute -bottom-40 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/30 to-blue-400/30 rounded-full blur-3xl"
        />

        {/* Optimized Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-blue-400/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated Grid Pattern */}
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            variants={{
              hidden: { scale: 0, rotate: -180 },
              visible: { 
                scale: 1, 
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }
              }
            }}
            className="inline-block relative mb-8"
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-50"
            />
            <div className="relative p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-black mb-6"
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-size-200 bg-pos-0"
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Technical Arsenal
            </motion.span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Mastering the tools and technologies that power modern digital experiences
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover="hover"
              className="relative group"
            >
              <motion.div
                variants={{
                  hover: {
                    scale: 1.05,
                    rotate: [0, -5, 5, 0],
                    transition: {
                      rotate: {
                        duration: 0.5,
                        ease: "easeInOut"
                      }
                    }
                  }
                }}
                className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-6 text-center shadow-lg"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-blue-600 mb-3 flex justify-center"
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className="text-4xl font-black text-gray-900 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.title}
              onClick={() => setActiveCategory(index)}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 overflow-hidden ${
                activeCategory === index
                  ? 'text-white shadow-2xl'
                  : 'text-gray-700 hover:text-gray-900 bg-white/70 backdrop-blur-sm'
              }`}
            >
              {activeCategory === index && (
                <motion.div
                  layoutId="activeCategory"
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl`}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
              <motion.div
                whileHover={{ 
                  scale: activeCategory === index ? 1 : 1.1 
                }}
                className="relative flex items-center gap-3"
              >
                {category.icon}
                <span>{category.title}</span>
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative">
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute inset-0 bg-gradient-to-br ${skillCategories[activeCategory].bgGradient} rounded-3xl blur-2xl`}
              />
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 md:p-12 shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {skillCategories[activeCategory].skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={skillCardVariants}
                      custom={index}
                      whileHover="hover"
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="group relative p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/80 border border-gray-100/60 shadow-lg"
                    >
                      {/* Skill Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ 
                              scale: 1.3,
                              rotate: 360,
                            }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl"
                          >
                            {skill.icon}
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {skill.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: index * 0.1 + 0.3,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`px-4 py-2 bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full font-bold text-white text-sm shadow-lg`}
                        >
                          {skill.level}%
                        </motion.div>
                      </div>

                      {/* Enhanced Progress Bar */}
                      <div className="relative h-4 bg-gray-200/80 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full shadow-lg`}
                          variants={progressBarVariants}
                          custom={skill.level}
                          initial="hidden"
                          animate="visible"
                        />
                        
                        {/* Enhanced Animated Shine */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ 
                            x: hoveredSkill === skill.name ? ['0%', '100%'] : ['-100%', '200%'],
                          }}
                          transition={{
                            duration: hoveredSkill === skill.name ? 0.8 : 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      </div>

                      {/* Enhanced Skill Level Markers */}
                      <motion.div 
                        className="flex justify-between mt-3 text-xs text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.8 }}
                      >
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Expert</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;