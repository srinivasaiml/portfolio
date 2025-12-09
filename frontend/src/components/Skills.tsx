import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Globe, Server, Terminal, Rocket, Award, TrendingUp, Sparkles } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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

  return (
    <section id="skills" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-neutral-900 dark:to-slate-950 relative overflow-hidden transition-colors duration-500">
      
      {/* Background FX */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-full blur-3xl"
        />
        {/* Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-blue-400/30 dark:bg-blue-300/20 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block relative mb-8">
            <div className="relative p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Mastering the tools and technologies that power modern digital experiences
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl p-6 text-center shadow-lg"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.title}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 overflow-hidden border border-transparent ${
                activeCategory === index
                  ? 'text-white shadow-2xl'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border-gray-200 dark:border-slate-700'
              }`}
            >
              {activeCategory === index && (
                <motion.div
                  layoutId="activeCategory"
                  className={`absolute inset-0 bg-gradient-to-r ${category.color}`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative flex items-center gap-3">
                {category.icon}
                <span>{category.title}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="group relative p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border border-gray-100 dark:border-slate-700 shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{skill.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{skill.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                        </div>
                      </div>
                      <div className={`px-4 py-2 bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full font-bold text-white text-sm shadow-lg`}>
                        {skill.level}%
                      </div>
                    </div>

                    <div className="relative h-4 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skillCategories[activeCategory].color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;