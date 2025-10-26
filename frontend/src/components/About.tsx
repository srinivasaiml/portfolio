import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Users, Download, Award, Target, Heart, User } from 'lucide-react';

const About = () => {
  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following industry best practices and modern development standards.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Modern Design',   
      description: 'Creating beautiful, intuitive user interfaces with attention to detail, aesthetics, and user experience principles.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance',
      description: 'Optimizing applications for speed, responsiveness, and efficiency across all devices and platforms.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'Working effectively in teams, communicating technical concepts, and contributing to innovative solutions.',
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
  link.href = '/Srinivas_Patchipala_2026.pdf'; // Path relative to public folder
  link.download = 'Srinivas_Patchipala_2026.pdf'; // Name for the downloaded file
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <section id="about" className="py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl mb-6"
          >
            <User className="w-12 h-12 text-blue-600" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-2xl text-gray-600 max-w-4xl mx-auto font-light"
          >
            Passionate about creating digital experiences that make a difference
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
                  My Journey
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Hi, I'm <span className="font-semibold text-blue-600">Srinivas</span>, a passionate and dedicated Frontend Developer with a strong foundation in 
                  HTML, CSS, and JavaScript. My journey in web development began with a fascination for creating 
                  interactive and user-friendly digital experiences.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Currently, I'm on an exciting journey to master the <span className="font-semibold text-purple-600">MERN stack</span> (MongoDB, Express.js, React, Node.js) 
                  to build full-stack applications. I believe in the power of continuous learning and am committed to 
                  staying updated with the latest industry trends.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-6 mb-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"
                  >
                    <div className="text-blue-600 mb-2 flex justify-center">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                whileHover={{ 
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
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  y: -10
                }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 transform-gpu hover:shadow-2xl transition-all duration-500 group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 bg-gradient-to-br ${skill.color} text-white rounded-xl mb-6 shadow-lg`}
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {skill.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-8 shadow-xl"
            >
              "
            </motion.div>
            <blockquote className="text-3xl md:text-4xl font-light text-gray-700 italic mb-8 leading-relaxed">
              Code is like humor. When you have to explain it, it's bad.
            </blockquote>
            <cite className="text-xl text-blue-600 font-semibold">— My Development Philosophy</cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
