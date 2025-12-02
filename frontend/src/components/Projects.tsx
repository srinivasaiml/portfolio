import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'ChatWithAI',
      description: 'AI-powered doctor appointment booking system with intelligent conversation flow',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      category: '2025',
      tech: ['React', 'AI/ML', 'Node.js'],
      liveUrl: 'https://srinivasaiml.github.io/Codesoft/hospitalpage.html'
    },
    {
      id: 2,
      title: 'Library Management System',
      description: 'Comprehensive library management solution for students and administrators',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      category: '2025',
      tech: ['JavaScript', 'HTML', 'CSS'],
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'AI Excel Assistant',
      description: 'AI-powered Excel assistant that lets you edit, create, and manage Excel files using natural language commands',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      category: '2025',
      tech: ['AI/ML', 'React', 'Excel API'],
      liveUrl: 'https://ai-excel.netlify.app/'
    },
    {
      id: 4,
      title: '8 Queen Chess Puzzle',
      description: 'Strategic chess puzzle game with intelligent solving algorithms and interactive gameplay',
      image: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=400&h=250&fit=crop',
      category: '2025',
      tech: ['JavaScript', 'Algorithm', 'Game Logic'],
      liveUrl: 'https://srinivasaiml.github.io/project/queen.html'
    },
    {
      id: 5,
      title: 'Resume Analyzer Pro',
      description: 'ATS-friendly resume analyzer with detailed feedback and scoring',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop',
      category: '2024',
      tech: ['Python', 'NLP', 'Machine Learning'],
      liveUrl: 'https://srinivasaiml.github.io/project/Resumescore.html'
    },
    {
      id: 6,
      title: 'Speed Tracker',
      description: 'Real-time vehicle speed tracking system with GPS integration',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
      category: '2024',
      tech: ['Python', 'GPS', 'Real-time'],
      liveUrl: 'https://srinivasaiml.github.io/Codesoft/success.html'
    },
    {
      id: 7,
      title: 'Cosmic Typing Game',
      description: 'Fast-paced typing game to test and improve your typing speed and accuracy',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=250&fit=crop',
      category: '2023',
      tech: ['JavaScript', 'Game', 'HTML5'],
      liveUrl: 'https://srinivasaiml.github.io/project/typinggame.html'
    },
    {
      id: 8,
      title: 'Premium Signature Generator',
      description: 'Create digital stylish signatures with a modern UI',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop',
      category: '2023',
      tech: ['JavaScript', 'UI/UX', 'HTML5'],
      liveUrl: 'https://srinivasaiml.github.io/project/uiux.html'
    },
    {
      id: 9,
      title: 'Tic Tac Toe Game',
      description: 'Classic Tic Tac Toe game with interactive UI and smooth animations',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=250&fit=crop',
      category: '2023',
      tech: ['JavaScript', 'Game', 'CSS3'],
      liveUrl: 'https://srinivasaiml.github.io/project/tictak.html'
    }
  ];

  const categories = ['all', '2025', '2024', '2023'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of my technical creations and innovative solutions
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      exit={{ opacity: 0, y: -50, rotateY: 15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
      }}
      className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/30 transform-gpu"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <ExternalLink size={18} />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <Github size={18} />
              </motion.a>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
