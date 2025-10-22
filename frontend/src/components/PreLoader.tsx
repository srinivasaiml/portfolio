import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    const texts = ['Initializing', 'Loading Assets', 'Preparing Experience', 'Almost Ready'];
    let textIndex = 0;

    const textTimer = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      setLoadingText(texts[textIndex]);
    }, 1500);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          clearInterval(textTimer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 1000);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 120);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute inset-0 opacity-60"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.3), transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3), transparent 50%), radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.3), transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(217, 70, 239, 0.3), transparent 50%), radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.3), transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.3), transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Particle System */}
          <div className="absolute inset-0">
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.3})`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Orbital Rings */}
          <div className="absolute">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-purple-500/20"
                style={{
                  width: 200 + i * 80,
                  height: 200 + i * 80,
                  left: '50%',
                  top: '50%',
                  x: '-50%',
                  y: '-50%',
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center px-4">
            {/* Main Logo Container */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="mb-12 relative"
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 blur-3xl opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full" />
              </motion.div>

              {/* Logo */}
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/10">
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255,255,255,0.5)',
                      '0 0 40px rgba(255,255,255,0.8)',
                      '0 0 20px rgba(255,255,255,0.5)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl font-black text-white relative z-10"
                >
                  PS
                </motion.span>
              </div>

              {/* Rotating Elements */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((i * Math.PI) / 2) * 80,
                    y: Math.sin((i * Math.PI) / 2) * 80,
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    x: { duration: 4, repeat: Infinity, ease: "linear" },
                    y: { duration: 4, repeat: Infinity, ease: "linear" },
                  }}
                />
              ))}
            </motion.div>

            {/* Name with Letter Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mb-3"
            >
              <h1 className="text-5xl md:text-6xl font-black mb-2">
                {['P', 'a', 't', 'c', 'h', 'i', 'p', 'a', 'l', 'a', ' ', 'S', 'r', 'i', 'n', 'i', 'v', 'a', 's'].map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                    className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-gray-400 text-xl mb-12 font-light tracking-wider"
            >
              Crafting Digital Experiences
            </motion.p>

            {/* Enhanced Progress Bar */}
            <div className="w-96 max-w-full mx-auto">
              <div className="flex justify-between text-sm text-gray-400 mb-3 font-medium">
                <motion.span
                  key={loadingText}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-purple-400"
                >
                  {loadingText}
                </motion.span>
                <motion.span
                  className="text-blue-400 font-bold"
                  animate={{ scale: progress === 100 ? [1, 1.2, 1] : 1 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
              
              <div className="relative h-2.5 bg-gray-900/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-800/50">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  style={{ width: '50%' }}
                />
              </div>
            </div>

            {/* Pulsing Dots */}
            <div className="flex justify-center space-x-3 mt-10">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Corner Accents */}
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-purple-500/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blue-500/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;