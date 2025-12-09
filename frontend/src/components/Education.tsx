import React, { useState } from 'react';
import { GraduationCap, Calendar, Award, BookOpen, TrendingUp, Star, Sparkles } from 'lucide-react';

const Education = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const educationData = [
    {
      degree: 'B.E in Artificial Intelligence & Machine Learning',
      institution: 'Aditya Engineering College',
      period: '2022-2026',
      grade: 'CGPA: 8.0',
      status: 'Current',
      description: 'Pursuing Bachelor of Engineering with focus on software development and AI.',
      highlights: ['Software Development', 'Data Structures', 'Web Technologies', 'AI & ML'],
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-blue-500 via-indigo-500 to-purple-600',
      bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
    },
    {
        degree: 'Class 12th',
        institution: 'State Board',
        period: '2020-2022',
        grade: 'Score: 899/1000',
        percentage: '89.9%',
        status: 'Completed',
        description: 'Completed higher secondary education with excellent performance in Mathematics, Physics, and Chemistry.',
        highlights: ['Mathematics', 'Physics', 'Chemistry', 'Top 10% Rank'],
        icon: <Award className="w-6 h-6" />,
        color: 'from-emerald-500 via-green-500 to-teal-600',
        bgGradient: 'from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20'
      },
      {
        degree: 'Class 10th',
        institution: 'State Board',
        period: '2019-2020',
        grade: 'CGPA: 9.7',
        status: 'Completed',
        description: 'Successfully completed secondary education with distinction in all subjects and academic excellence.',
        highlights: ['Academic Excellence', 'All Subjects Distinction', 'School Topper', 'Perfect Attendance'],
        icon: <Star className="w-6 h-6" />,
        color: 'from-purple-500 via-violet-500 to-pink-600',
        bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20'
      }
  ];

  return (
    <section id="education" className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-500">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fadeInUp">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-extrabold mb-6 relative inline-block">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Education Journey
            </span>
          </h2>
          
          <p className="text-base md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Charting my path through academic excellence and continuous learning
          </p>
        </div>

        {/* Education Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 transform md:-translate-x-1/2 rounded-full"></div>
            
            <div className="space-y-16">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 z-20">
                    <div className={`w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br ${edu.color} rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white dark:border-slate-800`}>
                      {edu.icon}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div 
                    className={`w-full md:w-5/12 pl-10 md:pl-0 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div className={`relative bg-gradient-to-br ${edu.bgGradient} rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50 dark:border-white/10 transition-all duration-300 transform hover:-translate-y-2 ${activeCard === index ? 'scale-105' : ''}`}>
                      
                      <div className="mb-4 md:mb-6">
                        <h3 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                          {edu.degree}
                        </h3>
                        <p className="text-base md:text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 bg-white/70 dark:bg-black/30 rounded-xl p-2">
                          <Calendar className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/70 dark:bg-black/30 rounded-xl p-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-bold text-green-700 dark:text-green-400">{edu.grade}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                        {edu.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((highlight, i) => (
                          <span key={i} className="px-3 py-1 bg-white/90 dark:bg-slate-800 rounded-full text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-sm">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;