import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Clock, BarChart } from 'lucide-react';

// --- Types ---
interface Certificate {
  title: string;
  issuer: string;
  description: string;
  gradient: string;
  url: string;
  date: string;
  skills?: string[];
  level?: string;
  duration?: string;
}

// --- Sub-components ---

// We use forwardRef to allow the parent to manipulate the card's DOM for the stack animation
const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { customClass?: string }>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`card ${customClass || ''} ${rest.className || ''}`.trim()}
    />
  )
);
Card.displayName = 'Card';

// --- Main Component ---
const Certificates = () => {
  // --- Data ---
  const certificates: Certificate[] = [
    {
      title: 'HackerRank Certification',
      issuer: 'HackerRank',
      description: 'Problem Solving and Programming Skills Certification. validated expertise in algorithms and data structures.',
      gradient: 'from-green-500 to-emerald-600',
      url: 'https://www.hackerrank.com/certificates/a67a507bbd1a',
      date: '2025',
      skills: ['Algorithms', 'Data Structures', 'Time Complexity', 'Recursion'],
      level: 'Intermediate',
      duration: '40+ Hours'
    },
    {
      title: 'Great Learning Certificate',
      issuer: 'Great Learning',
      description: 'Data Science and Machine Learning Fundamentals covering statistical analysis and predictive modeling.',
      gradient: 'from-blue-500 to-cyan-600',
      url: 'https://drive.google.com/file/d/1VMkkM0XFqum1I4sv552KuY4PzFNPlCMb/view?usp=sharing',
      date: '2024',
      skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Linear Regression'],
      level: 'Beginner to Intermediate',
      duration: '6 Weeks'
    },
    {
      title: 'CodeChef Certificate',
      issuer: 'CodeChef',
      description: 'Competitive Programming and Algorithm Design. Solved complex problems under time constraints.',
      gradient: 'from-orange-500 to-red-600',
      url: '#',
      date: '2024',
      skills: ['Competitive Programming', 'Greedy Algorithms', 'Dynamic Programming'],
      level: 'Intermediate',
      duration: 'Self-paced'
    },
    {
      title: 'Infosys Springboard',
      issuer: 'Infosys',
      description: 'Software Development and Enterprise Solutions. Learned SDLC and Agile methodologies in a corporate environment.',
      gradient: 'from-purple-500 to-pink-600',
      url: 'https://drive.google.com/file/d/1fQEyayq5imG44u7ht03QBnXhdr3Fa60y/view?usp=sharing',
      date: '2023',
      skills: ['Java', 'OOPs', 'SQL', 'SDLC', 'Agile'],
      level: 'Beginner',
      duration: '80 Hours'
    },
    {
      title: 'EdX Certificate',
      issuer: 'EdX',
      description: 'Introduction to Computer Science and Programming using Python. Focus on computational thinking.',
      gradient: 'from-indigo-500 to-blue-600',
      url: 'https://drive.google.com/file/d/1JibIVO86o-5LLU3J5wcjbdEFQzdXG93H/view?usp=sharing',
      date: '2023',
      skills: ['Python', 'Algorithms', 'Computational Thinking', 'Debugging'],
      level: 'Beginner',
      duration: '10 Weeks'
    }
  ];

  // --- State & Refs ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>(certificates.map(() => null));
  const order = useRef<number[]>(Array.from({ length: certificates.length }, (_, i) => i));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const container = useRef<HTMLDivElement>(null);

  // --- Animation Config ---
  const cardDistance = 60; // Horizontal offset
  const verticalDistance = 70; // Vertical offset between cards
  const skewAmount = 6; // Skew angle
  const delay = 4000; // Auto-swap delay

  // --- Animation Logic ---

  // Calculate 3D slot position
  const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
  });

  // Set initial position immediately
  const placeCard = (el: HTMLDivElement | null, slot: ReturnType<typeof makeSlot>, skew: number) => {
    if (!el) return;
    el.style.transform = `translate(-50%, -50%) translate3d(${slot.x}px, ${slot.y}px, ${slot.z}px) skewY(${skew}deg)`;
    el.style.zIndex = `${slot.zIndex}`;
  };

  // Animate to new position
  const animateCard = (el: HTMLDivElement | null, slot: ReturnType<typeof makeSlot>, duration = 800) => {
    if (!el) return;
    el.style.transition = `transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0ms ${duration * 0.5}ms`;
    el.style.transform = `translate(-50%, -50%) translate3d(${slot.x}px, ${slot.y}px, ${slot.z}px) skewY(${skewAmount}deg)`;
    el.style.zIndex = `${slot.zIndex}`;
  };

  useEffect(() => {
    const total = refs.current.length;
    
    // Initial placement
    refs.current.forEach((r, i) => {
      if (r) {
        placeCard(r, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });

    // Swap Logic
    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs.current[front];

      // Update state to show details of the "new" front card (which is actually rest[0])
      setCurrentIndex(rest[0]);

      // 1. Drop the front card down
      if (elFront) {
        elFront.style.transition = 'transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        const currentSlot = makeSlot(0, cardDistance, verticalDistance, total);
        // Move it way down (+500px y)
        elFront.style.transform = `translate(-50%, -50%) translate3d(${currentSlot.x}px, ${currentSlot.y + 500}px, ${currentSlot.z}px) skewY(${skewAmount}deg)`;
      }

      // 2. Move everyone else forward
      setTimeout(() => {
        rest.forEach((idx, i) => {
          const el = refs.current[idx];
          const slot = makeSlot(i, cardDistance, verticalDistance, total);
          animateCard(el, slot);
        });

        // 3. Move the old front card to the very back
        const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
        
        // Wait for cards to move forward, then tuck the dropped card to the back
        setTimeout(() => {
          if (elFront) {
             animateCard(elFront, backSlot);
          }
        }, 400);

        // Update the order reference for the next loop
        setTimeout(() => {
          order.current = [...rest, front];
        }, 800);
      }, 400);
    };

    const startInterval = () => {
      intervalRef.current = setInterval(swap, delay);
    };

    startInterval();

    // Pause on hover
    const node = container.current;
    const pause = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    const resume = () => startInterval();

    if (node) {
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (node) {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
      }
    };
  }, []);

  const currentCert = certificates[currentIndex];

  return (
    <>
      <style>{`
        .card-swap-container {
          position: relative;
          width: 100%;
          height: 420px;
          perspective: 1200px;
          overflow: visible;
        }
        
        .card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 380px;
          height: 260px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: #1e293b; /* Fallback dark */
          transform-style: preserve-3d;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          cursor: pointer;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .card:hover {
          transform: translate(-50%, -50%) scale(1.02) !important;
        }
        
        @media (max-width: 768px) {
          .card {
            width: 300px;
            height: 200px;
          }
          .card-swap-container {
            height: 350px;
          }
        }
        
        @media (max-width: 480px) {
          .card {
            width: 260px;
            height: 180px;
          }
          .card-swap-container {
            height: 300px;
          }
        }
      `}</style>

      <section id="certificates" className="pt-8 pb-12 bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden transition-colors duration-500">
        {/* Background Animation */}
        <div className="absolute inset-0 pointer-events-none">
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
            className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-red-200 dark:from-orange-900/20 dark:to-red-900/20 rounded-full opacity-20 blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-red-200 to-orange-200 dark:from-red-900/20 dark:to-orange-900/20 rounded-full opacity-20 blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Certificates
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
             A collection of my professional certificates showcasing skills, courses, and accomplishments.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Explore the highlights of my learning journey.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mt-0">
            {/* --- Left side: Certificate Details --- */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 bg-gradient-to-br ${currentCert.gradient} rounded-xl shadow-lg`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium border border-orange-200 dark:border-orange-800">
                  {currentCert.date}
                </span>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white leading-tight mb-2">
                  {currentCert.title}
                </h3>

                <p className={`text-xl font-semibold bg-gradient-to-r ${currentCert.gradient} bg-clip-text text-transparent`}>
                  {currentCert.issuer}
                </p>
              </div>

              <div className="p-5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-slate-700 space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentCert.description}
                </p>

                {/* Meta Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {currentCert.level && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <BarChart className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">Level:</span> {currentCert.level}
                    </div>
                  )}
                  {currentCert.duration && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span className="font-semibold">Duration:</span> {currentCert.duration}
                    </div>
                  )}
                </div>

                {currentCert.skills && (
                  <div className="pt-2">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 block mb-2">Skills Acquired:</span>
                    <div className="flex flex-wrap gap-2">
                      {currentCert.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white dark:bg-slate-700 rounded-md text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-2">
                {currentCert.url && currentCert.url !== '#' && (
                  <motion.a
                    href={currentCert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${currentCert.gradient} text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300`}
                  >
                    View Certificate
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </motion.a>
                )}
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center gap-3 pt-4">
                {certificates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-12 bg-gradient-to-r from-orange-500 to-red-500'
                        : 'w-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
                    }`}
                    aria-label={`Go to certificate ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* --- Right side: 3D Card Stack --- */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2 flex justify-center items-center"
            >
              <div ref={container} className="card-swap-container">
                {certificates.map((cert, index) => (
                  <Card
                    key={index}
                    ref={(el) => {
                      if (refs.current) refs.current[index] = el;
                    }}
                    className="card"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (cert.url && cert.url !== '#') {
                        window.open(cert.url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${cert.gradient} rounded-[20px] p-8 flex flex-col justify-between relative overflow-hidden`}>
                      {/* Decorative elements within card */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full blur-xl" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <Award className="w-10 h-10 text-white drop-shadow-lg" />
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                            {cert.date}
                          </span>
                        </div>
                        
                        <h4 className="text-2xl font-bold text-white mb-2 line-clamp-2 drop-shadow-md">
                          {cert.title}
                        </h4>
                        
                        <p className="text-white/90 font-semibold text-lg drop-shadow-sm">
                          {cert.issuer}
                        </p>
                      </div>
                      
                      <div className="relative z-10">
                        <p className="text-white/80 text-sm line-clamp-2 mb-4 drop-shadow-sm">
                          {cert.description}
                        </p>
                        
                        <div className="flex items-center text-white text-sm font-medium drop-shadow-sm group">
                          <span className="border-b border-transparent group-hover:border-white transition-all">View Details</span>
                          <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Certificates;