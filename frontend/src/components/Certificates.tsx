import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Award } from 'lucide-react';

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const certificates = [
    {
      title: 'HackerRank Certification',
      issuer: 'HackerRank',
      description: 'Problem Solving and Programming Skills Certification',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      url: 'https://www.hackerrank.com/certificates/a67a507bbd1a',
      date: '2024'
    },
    {
      title: 'Great Learning Certificate',
      issuer: 'Great Learning',
      description: 'Data Science and Machine Learning Fundamentals',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      url: 'https://drive.google.com/file/d/1VMkkM0XFqum1I4sv552KuY4PzFNPlCMb/view?usp=sharing',
      date: '2024'
    },
    {
      title: 'CodeChef Certificate',
      issuer: 'CodeChef',
      description: 'Competitive Programming and Algorithm Design',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      url: '#',
      date: '2023'
    },
    {
      title: 'Infosys Springboard',
      issuer: 'Infosys',
      description: 'Software Development and Enterprise Solutions',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      url: 'https://drive.google.com/file/d/1fQEyayq5imG44u7ht03QBnXhdr3Fa60y/view?usp=sharing',
      date: '2023'
    },
    {
      title: 'EdX Certificate',
      issuer: 'EdX',
      description: 'Introduction to Computer Science and Programming',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      url: 'https://drive.google.com/file/d/1JibIVO86o-5LLU3J5wcjbdEFQzdXG93H/view?usp=sharing',
      date: '2023'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <section id="certificates" className="py-20 bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.6, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-red-200 to-orange-200 rounded-lg opacity-20"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Certificates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recognition of my continuous learning and skill development journey
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Certificate Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, rotateY: -30 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: 30 }}
                transition={{ duration: 0.6 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/30 transform-gpu"
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <motion.img
                      src={certificates[currentIndex].image}
                      alt={certificates[currentIndex].title}
                      className="w-full h-64 md:h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg text-white mr-4">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        {certificates[currentIndex].date}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      {certificates[currentIndex].title}
                    </h3>
                    
                    <p className="text-lg text-orange-600 font-semibold mb-4">
                      {certificates[currentIndex].issuer}
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {certificates[currentIndex].description}
                    </p>
                    
                    <motion.a
                      href={certificates[currentIndex].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      View Certificate
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-orange-500 to-red-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <motion.div
            className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;