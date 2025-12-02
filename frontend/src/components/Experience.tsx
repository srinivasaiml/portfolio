"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Calendar, MapPin, Award, Sparkles, Briefcase } from 'lucide-react';

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

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
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
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50', // Removed dark mode colors
      borderColor: 'border-indigo-200',
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
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
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
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
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
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
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
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'internship':
        return <Briefcase className="w-5 h-5 md:w-6 md:h-6" />;
      case 'achievement':
        return <Award className="w-5 h-5 md:w-6 md:h-6" />;
      default:
        return <Award className="w-5 h-5 md:w-6 md:h-6" />;
    }
  };

  return (
    <div
      // FIXED: Removed dark mode gradients
      className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 font-sans md:px-10 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">My Journey</span>
          </div>
          <h2 className="text-4xl md:text-6xl mb-4 font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-neutral-600 text-base md:text-lg max-w-2xl">
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
              <div className="h-12 absolute left-2.5 md:left-2.5 w-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`h-6 w-6 rounded-full bg-gradient-to-br ${item.color} shadow-lg`}
                />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-neutral-400 to-neutral-600 bg-clip-text text-transparent">
                {item.title}
              </h3>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="mb-8"
              >
                <div className={`bg-gradient-to-br ${item.bgColor} backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border ${item.borderColor} hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}>
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <div className="flex items-start mb-4 relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`p-3 bg-gradient-to-br ${item.color} rounded-xl text-white mr-4 flex-shrink-0 shadow-lg`}
                    >
                      {getIcon(item.type)}
                    </motion.div>
                    <div className="min-w-0">
                      <h4 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2">
                        {item.event}
                      </h4>
                      <p className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-semibold text-sm md:text-base`}>
                        {item.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-gray-600 text-sm mb-5 relative z-10">
                    <div className="flex items-center gap-1.5 bg-white/50 px-3 py-1.5 rounded-full">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/50 px-3 py-1.5 rounded-full">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base relative z-10">
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
                        whileHover={{ scale: 1.1 }}
                        className="px-4 py-2 bg-white/70 backdrop-blur-sm text-gray-700 text-xs md:text-sm rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-neutral-200 to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-green-500 via-teal-500 to-emerald-500 shadow-lg shadow-teal-500/50"
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;
