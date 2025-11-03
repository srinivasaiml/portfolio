// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridSize = 50;
    const dots = [];

    // Create grid of dots
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        dots.push({ x, y, baseY: y });
      }
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      dots.forEach((dot) => {
        const wave = Math.sin(dot.x * 0.01 + time) * 10;
        const currentY = dot.baseY + wave;

        ctx.beginPath();
        ctx.arc(dot.x, currentY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background with Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #fff 0%, #fff 40%, rgba(255, 255, 255, 0) 100%), linear-gradient(to right, #0ed2da, #5f29c7)',
        }}
      >
        {/* Vertical Grid Lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(90deg, #ccc 1px, transparent 1px)',
            backgroundSize: '50px 100%',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 70%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 70%)',
          }}
        />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Additional overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <div className="inline-block mb-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-slate-200">
            <span className="text-sm text-slate-800 font-medium tracking-wide">
              Frontend Developer & Designer
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight text-slate-900">
            Patchipala Srinivas
          </h1>

          <div className="text-2xl md:text-3xl lg:text-4xl text-slate-700 mb-8 font-light">
            <TypewriterText />
          </div>
        </div>

        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Creating seamless digital experiences through clean code, thoughtful design, and attention to detail.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group px-8 py-4 bg-slate-900 text-white rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 hover:bg-slate-800 shadow-xl hover:shadow-2xl hover:scale-105">
            <span>View My Work</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/Srinivas_Patchipala_2026.pdf'; // Path relative to public folder
              link.download = 'Srinivas_Patchipala_2026.pdf'; // Name for the downloaded file
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="group px-8 py-4 bg-white border-2 border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center divide-x divide-slate-300 mt-20">
          {[
            { number: '10+', label: 'Projects' },
            { number: '5+', label: 'Certificates' },
            { number: '2+', label: 'Years Experience' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="px-8 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Icon */}
      <div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity animate-bounce"
        onClick={() =>
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <ChevronDown className="text-slate-600 w-6 h-6" />
      </div>
    </section>
  );
};

// Typewriter text animation component
const TypewriterText = () => {
  const texts = [
    'Designing Interactive Frontends',
    'Building Powerful Backends',
    'Developing Full Stack Applications',
    'Creating Seamless User Experiences',
  ];
  const [currentText, setCurrentText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];

      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting]);

  return (
    <span>
      {currentText}
      <span className="animate-pulse text-slate-400">|</span>
    </span>
  );
};

export default Hero;
