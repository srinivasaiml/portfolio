import{ useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';
import { 
  FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, 
  FaGithub, FaAws, FaDocker, FaLinux, FaFigma, FaSass,
  FaDatabase
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiDjango, 
  SiExpress, SiFastapi, SiMongodb, SiMysql, SiPostgresql, 
  SiRedis, SiPrisma, SiVercel, SiVite, SiJest, SiFramer, SiGraphql, SiWebpack,
  SiKubernetes, SiTerraform, SiPrometheus, SiGrafana,
  SiDigitalocean, SiNetlify, SiFirebase, SiSupabase, 
  SiSvelte, SiVuedotjs, SiAngular, SiGoogleanalytics
} from 'react-icons/si';
import { SiGraphql as SiNestjs } from 'react-icons/si';

const Skills = () => {
  const [isScattered, setIsScattered] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [imageRotation, setImageRotation] = useState(0);
  const skillsRef = useRef(null);
  const lastScrollY = useRef(0);
  const { theme } = useTheme();

  // Full Stack Developer Icons with proper React Icons
  const techIcons = [
    // Frontend
    { icon: <FaReact />, name: 'React', color: 'from-cyan-400 to-blue-500' },
    { icon: <SiTypescript />, name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
    { icon: <SiNextdotjs />, name: 'Next.js', color: 'from-gray-900 to-black' },
    { icon: <FaHtml5 />, name: 'HTML5', color: 'from-orange-500 to-red-500' },
    { icon: <FaCss3Alt />, name: 'CSS3', color: 'from-blue-400 to-purple-500' },
    { icon: <FaJs />, name: 'JavaScript', color: 'from-yellow-400 to-orange-500' },
    { icon: <SiTailwindcss />, name: 'Tailwind', color: 'from-teal-400 to-cyan-500' },
    { icon: <FaSass />, name: 'Sass', color: 'from-pink-400 to-pink-600' },
    { icon: <FaFigma />, name: 'Figma', color: 'from-purple-500 to-red-500' },
    { icon: <SiVuedotjs />, name: 'Vue.js', color: 'from-green-500 to-green-700' },
    { icon: <SiAngular />, name: 'Angular', color: 'from-red-500 to-red-700' },
    { icon: <SiSvelte />, name: 'Svelte', color: 'from-orange-500 to-orange-700' },
    
    // Backend
    { icon: <FaNodeJs />, name: 'Node.js', color: 'from-green-500 to-green-700' },
    { icon: <FaPython />, name: 'Python', color: 'from-blue-400 to-yellow-400' },
    { icon: <SiDjango />, name: 'Django', color: 'from-green-600 to-green-800' },
    { icon: <SiExpress />, name: 'Express', color: 'from-gray-600 to-gray-800' },
    { icon: <SiFastapi />, name: 'FastAPI', color: 'from-teal-500 to-green-500' },
    { icon: <SiNestjs />, name: 'NestJS', color: 'from-red-500 to-red-800' },
    
    // Database
    { icon: <FaDatabase />, name: 'SQL', color: 'from-blue-600 to-indigo-600' },
    { icon: <SiMongodb />, name: 'MongoDB', color: 'from-green-400 to-green-600' },
    { icon: <SiMysql />, name: 'MySQL', color: 'from-blue-500 to-blue-700' },
    { icon: <SiPostgresql />, name: 'PostgreSQL', color: 'from-blue-600 to-blue-800' },
    { icon: <SiRedis />, name: 'Redis', color: 'from-red-500 to-red-700' },
    { icon: <SiPrisma />, name: 'Prisma', color: 'from-indigo-500 to-purple-600' },
    
    // DevOps & Cloud
    { icon: <FaGitAlt />, name: 'Git', color: 'from-orange-500 to-red-600' },
    { icon: <FaDocker />, name: 'Docker', color: 'from-blue-400 to-blue-600' },
    { icon: <FaAws />, name: 'AWS', color: 'from-orange-400 to-yellow-500' },
    { icon: <FaLinux />, name: 'Linux', color: 'from-yellow-400 to-black' },
    { icon: <SiKubernetes />, name: 'Kubernetes', color: 'from-blue-500 to-blue-700' },
    { icon: <SiTerraform />, name: 'Terraform', color: 'from-purple-500 to-purple-700' },
  
    
    // Tools & Platforms
    { icon: <FaGithub />, name: 'GitHub', color: 'from-gray-700 to-black' },
    { icon: <SiVercel />, name: 'Vercel', color: 'from-black to-gray-800' },
    { icon: <SiVite />, name: 'Vite', color: 'from-purple-500 to-yellow-400' },
    { icon: <SiJest />, name: 'Jest', color: 'from-red-500 to-orange-500' },
    { icon: <SiFramer />, name: 'Framer Motion', color: 'from-pink-500 to-purple-500' },
    { icon: <SiWebpack />, name: 'Webpack', color: 'from-blue-500 to-blue-800' },
    { icon: <SiGraphql />, name: 'GraphQL', color: 'from-pink-500 to-purple-600' },
    
    // Monitoring & Analytics
    { icon: <SiPrometheus />, name: 'Prometheus', color: 'from-orange-500 to-red-500' },
    { icon: <SiGrafana />, name: 'Grafana', color: 'from-orange-400 to-red-600' },
    { icon: <SiGoogleanalytics />, name: 'Analytics', color: 'from-blue-500 to-green-500' },
    
    // Others
    { icon: <SiSupabase />, name: 'Supabase', color: 'from-green-400 to-green-600' },
    { icon: <SiFirebase />, name: 'Firebase', color: 'from-yellow-500 to-orange-500' },
    { icon: <SiNetlify />, name: 'Netlify', color: 'from-teal-400 to-teal-600' },
    { icon: <SiDigitalocean />, name: 'DigitalOcean', color: 'from-blue-400 to-blue-600' },
  ];

  const ribbonTexts = [
    ['ACCESSIBLE', 'RESPONSIVE', 'DYNAMIC', 'SCALABLE', 'SEARCH OPTIMIZED', 'INTERACTIVE', 'SECURE', 'RELIABLE', 'ENGAGING'],
    ['IMPACTFUL', 'ACCESSIBLE', 'RESPONSIVE', 'DYNAMIC', 'SCALABLE', 'SEARCH OPTIMIZED', 'INTERACTIVE', 'SECURE', 'RELIABLE', 'ENGAGING']
  ];

useEffect(() => {
    let ticking = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!skillsRef.current) {
            ticking = false;
            return;
          }

          const rect = (skillsRef.current as HTMLElement).getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          const currentScrollY = window.scrollY;
          const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

          // Rotate image based on scroll
          setImageRotation(currentScrollY * 0.2);

          // Initial animation when first entering view
          if (isInView && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => setIsScattered(false), 300);
          }

          // Smooth scatter/gather based on scroll direction with threshold
          if (hasAnimated && isInView && scrollDelta > 5) {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            
            const scrollingDown = currentScrollY > lastScrollY.current;
            
            // Only change state if scroll is significant
            if (scrollingDown && isScattered) {
              setIsScattered(false);
            } else if (!scrollingDown && !isScattered) {
              setIsScattered(true);
            }
            
            // Debounce: settle to gathered state after scroll stops
            scrollTimeout = setTimeout(() => {
              if (!isScattered) {
                setIsScattered(false);
              }
            }, 150);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [hasAnimated, isScattered]);

  const generateScatterPosition = (index: number) => {
    const angle = (index * 137.5 + Math.random() * 30) * (Math.PI / 180);
    const distance = window.innerWidth < 768 ? 150 + Math.random() * 200 : 300 + Math.random() * 400;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotate: -180 + Math.random() * 360,
    };
  };

  return (
    <section
      id="skills"
      className={`min-h-screen relative overflow-hidden py-12 sm:py-16 md:py-20 transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-950 via-indigo-950/80 to-purple-950/90' 
          : 'bg-gradient-to-br from-sky-50 via-indigo-50/70 to-purple-50/90'
      }`}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient circles */}
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`absolute top-1/4 -left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-purple-600/30' : 'bg-purple-300/40'
          }`}
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-1/4 -right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-blue-600/30' : 'bg-blue-300/40'
          }`}
        />
        <motion.div
          animate={{ 
            x: [-50, 50, -50],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-indigo-600/20' : 'bg-indigo-200/30'
          }`}
        />
        
        {/* Grid pattern for light theme */}
        {theme === 'light' && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #8b5cf6 1px, transparent 1px),
                                linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
        )}
        
        {/* Subtle particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute w-1 h-1 rounded-full ${
              theme === 'dark' ? 'bg-white/30' : 'bg-purple-400/40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Floating shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute w-10 h-10 rounded-lg ${
              theme === 'dark' ? 'bg-blue-500/10' : 'bg-purple-300/20'
            } blur-sm`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0 relative z-10">
        {/* Header with Image - Increased image size */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <motion.div
            className="inline-block mb-8 sm:mb-10"
            style={{ rotate: imageRotation }}
            transition={{ type: 'spring', stiffness: 50 }}
          >
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto relative">
              <img 
                src="/steel-flower.webp" 
                alt="Steel Flower" 
                className="w-full h-full object-contain drop-shadow-2xl"
                style={{ 
                  filter: `drop-shadow(0 20px 40px ${theme === 'dark' ? 'rgba(147, 51, 234, 0.5)' : 'rgba(99, 102, 241, 0.5)'})`
                }}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4 ${
              theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
            }`}
          >
            TECH STACK & TOOLS
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 px-4"
          >
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Full Stack </span>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent italic">
              Tools
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            A comprehensive collection of technologies and tools I use to build modern, scalable web applications.
          </motion.p>
        </motion.div>

        {/* Tech Icons Grid */}
        <div
          ref={skillsRef}
          className="relative flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mb-40 sm:mb-48 md:mb-56 min-h-[300px] sm:min-h-[400px] px-4"
        >
          {techIcons.map((tech, index) => {
            const scatterPos = generateScatterPosition(index);
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isScattered
                    ? {
                        opacity: 0.3,
                        scale: 0.5,
                        x: scatterPos.x,
                        y: scatterPos.y,
                        rotate: scatterPos.rotate,
                      }
                    : {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                      }
                }
                transition={{
                  duration: 0.8,
                  delay: isScattered ? index * 0.02 : index * 0.03,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                  y: -5,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-xl sm:text-2xl md:text-3xl shadow-lg cursor-pointer relative group backdrop-blur-sm border ${
                  theme === 'dark' ? 'border-white/20' : 'border-white/30'
                } hover:shadow-2xl hover:scale-105 transition-all duration-300`}
              >
                <div className={theme === 'dark' ? 'text-white' : 'text-white'}>
                  {tech.icon}
                </div>
                <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-2xl ${
                  theme === 'dark' 
                    ? 'bg-gray-900/95 text-white border border-gray-700 backdrop-blur-sm' 
                    : 'bg-white/95 text-gray-900 border border-gray-200 backdrop-blur-sm'
                }`}>
                  {tech.name}
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${
                    theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
                  }`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ribbons - Full width, no padding */}
        <div className="mt-20 sm:mt-24 md:mt-28 w-full">
          {/* Top Ribbon - Full width with negative margin to extend beyond viewport */}
          <div className="relative w-[400%] left-[-150%]">
            <div
              className={`w-full h-12 sm:h-14 md:h-16 flex items-center overflow-hidden shadow-2xl mb-4 backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-800/95 via-pink-700/95 to-purple-800/95' 
                  : 'bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700'
              } border-t ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-400/30'} border-b ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-400/30'}`}
              style={{
                transform: 'rotateZ(-3deg) rotateY(-2deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              >
                {[...ribbonTexts[0], ...ribbonTexts[0], ...ribbonTexts[0], ...ribbonTexts[0]].map((text, i) => (
                  <span key={i} className="text-white font-bold text-sm sm:text-base md:text-lg mx-4 sm:mx-6 md:mx-8 tracking-wider flex items-center">
                    <span className="mr-2 text-lg">✨</span> {text} <span className="text-white/70 mx-2">•</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom Ribbon - Full width with negative margin to extend beyond viewport */}
          <div className="relative w-[400%] left-[-150%]">
            <div
              className={`w-full h-12 sm:h-14 md:h-16 flex items-center overflow-hidden shadow-2xl backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-indigo-800/95 via-blue-700/95 to-indigo-800/95' 
                  : 'bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-700'
              } border-t ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-400/30'} border-b ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-400/30'}`}
              style={{
                transform: 'rotateZ(3deg) rotateY(2deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ['-50%', '0%'] }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              >
                {[...ribbonTexts[1], ...ribbonTexts[1], ...ribbonTexts[1], ...ribbonTexts[1]].map((text, i) => (
                  <span key={i} className="text-white font-bold text-sm sm:text-base md:text-lg mx-4 sm:mx-6 md:mx-8 tracking-wider flex items-center">
                    <span className="mr-2 text-lg">⚡</span> {text} <span className="text-white/70 mx-2">•</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;