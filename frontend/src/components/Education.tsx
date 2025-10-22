import React, { useState } from 'react';
import { GraduationCap, Calendar, Award, BookOpen, TrendingUp, Star, Sparkles } from 'lucide-react';

const Education = () => {
  const [activeCard, setActiveCard] = useState(null);

  const educationData = [
    {
      degree: 'B.E in Artificial Intelligence & Meachine Learning',
      institution: 'Aditya Engineering College',
      period: '2022-2026',
      grade: 'CGPA: 8.0',
      status: 'Current',
      description: 'Pursuing Bachelor of Engineering in Artificial Intelligence & Meachine Learning with focus on software development, algorithms, and modern programming paradigms.',
      highlights: ['Software Development', 'Data Structures', 'Web Technologies', 'AI & ML'],
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-blue-500 via-indigo-500 to-purple-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      degree: 'Class 12th',
      institution: 'State Board',
      period: '2021-2022',
      grade: 'Score: 899/1000',
      percentage: '89.9%',
      status: 'Completed',
      description: 'Completed higher secondary education with excellent performance in Mathematics, Physics, and Chemistry.',
      highlights: ['Mathematics', 'Physics', 'Chemistry', 'Top 10% Rank'],
      icon: <Award className="w-6 h-6" />,
      color: 'from-emerald-500 via-green-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-green-50'
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
      bgGradient: 'from-purple-50 to-violet-50'
    }
  ];

  return (
    <section id="education" className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fadeInUp">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-extrabold mb-6 relative inline-block">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Education Journey
            </span>
            <div className="absolute -right-6 md:-right-8 -top-3 md:-top-4">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 animate-pulse" />
            </div>
          </h2>
          
          <p className="text-base md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Charting my path through academic excellence and continuous learning
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4 px-4">
            <div className="px-4 md:px-6 py-2 md:py-3 bg-white rounded-full shadow-lg border border-indigo-100">
              <span className="text-xs md:text-sm font-semibold text-indigo-600">🎓 3 Milestones</span>
            </div>
            <div className="px-4 md:px-6 py-2 md:py-3 bg-white rounded-full shadow-lg border border-indigo-100">
              <span className="text-xs md:text-sm font-semibold text-green-600">📈 Growing Strong</span>
            </div>
          </div>
        </div>

        {/* Education Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 transform md:-translate-x-1/2 rounded-full shadow-lg"></div>
            
            <div className="space-y-16">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 z-20">
                    <div className={`w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br ${edu.color} rounded-full flex items-center justify-center text-white shadow-2xl border-2 md:border-4 border-white transform hover:scale-125 transition-all duration-300 cursor-pointer`}>
                      <div className="w-4 h-4 md:w-6 md:h-6">
                        {edu.icon}
                      </div>
                    </div>
                    {/* Pulse Effect */}
                    <div className={`absolute inset-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br ${edu.color} rounded-full animate-ping opacity-20`}></div>
                  </div>

                  {/* Content Card */}
                  <div 
                    className={`w-full md:w-5/12 pl-10 md:pl-0 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div className={`relative group animate-fadeInUp bg-gradient-to-br ${edu.bgGradient} rounded-3xl p-4 md:p-8 shadow-2xl border-2 border-white hover:shadow-[0_35px_60px_-15px_rgba(99,102,241,0.4)] transition-all duration-500 transform hover:-translate-y-2 ${
                      activeCard === index ? 'md:scale-105' : ''
                    }`}>
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 shimmer rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4">
                        <div className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg ${
                          edu.status === 'Current' 
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white animate-pulse' 
                            : 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white'
                        }`}>
                          {edu.status === 'Current' ? '🚀 ' : '✓ '}{edu.status}
                        </div>
                      </div>

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="mb-4 md:mb-6">
                          <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors leading-tight">
                            {edu.degree}
                          </h3>
                          <p className="text-base md:text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {edu.institution}
                          </p>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                          <div className="flex items-center gap-1 md:gap-2 bg-white/70 rounded-xl p-2 md:p-3 backdrop-blur-sm">
                            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 flex-shrink-0" />
                            <span className="font-semibold text-gray-700 text-xs md:text-sm">{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-1 md:gap-2 bg-white/70 rounded-xl p-2 md:p-3 backdrop-blur-sm">
                            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                            <span className="font-bold text-green-700 text-xs md:text-sm">{edu.grade}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                          {edu.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {edu.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 md:px-3 md:py-1 bg-white/90 rounded-full text-xs font-semibold text-indigo-700 shadow-sm border border-indigo-100 hover:scale-110 transition-transform duration-200 cursor-default"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-32 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="max-w-4xl mx-auto relative">
            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full filter blur-3xl opacity-20"></div>
            
            <div className="relative bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl p-6 md:p-12 lg:p-16 shadow-2xl border-2 border-white overflow-hidden">
              {/* Quote Mark */}
              
              <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10 rounded-br-full"></div>
              
              <div className="relative z-10">
                <div className="mb-6 md:mb-8 flex justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-2xl transform hover:rotate-12 transition-transform duration-300">
                    <span className="text-4xl md:text-5xl font-serif">"</span>
                  </div>
                </div>
                
                <blockquote className="text-lg md:text-3xl lg:text-4xl font-light text-gray-800 text-center mb-6 md:mb-8 leading-relaxed italic px-2">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                     Technology never stands still, and neither do I. Constantly learning, experimenting, 
                and pushing the boundaries of what's possible in web development.
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent font-medium">
                   
                  </span>
                </blockquote>
                
                <div className="text-center">
                  <cite className="text-sm md:text-lg font-semibold text-indigo-600 not-italic">
                    — Personal Philosophy
                  </cite>
                </div>
              </div>
         
              
              
              
              {/* Decorative Quote Mark Bottom */}
              <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tl from-purple-500 to-pink-600 opacity-10 rounded-tl-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;