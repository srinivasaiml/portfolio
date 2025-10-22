import React, { useRef, useEffect } from 'react';

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(59, 130, 246, 0.4)',    // Blue
      'rgba(147, 51, 234, 0.4)',    // Purple
      'rgba(236, 72, 153, 0.4)',    // Pink
      'rgba(34, 197, 94, 0.4)',     // Green
      'rgba(249, 115, 22, 0.4)',    // Orange
    ];

    // Reduced particle count for better performance
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      particles.forEach((particle, index) => {
        // Update particle position with 3D movement
        particle.x += particle.vx + Math.sin(time + index * 0.01) * 0.1;
        particle.y += particle.vy + Math.cos(time + index * 0.01) * 0.1;
        particle.z += particle.vz;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.z < 0) particle.z = 1000;
        if (particle.z > 1000) particle.z = 0;

        // Calculate 3D perspective
        const scale = 1000 / (1000 + particle.z);
        const x = particle.x * scale;
        const y = particle.y * scale;
        const size = particle.size * scale;
        const opacity = particle.opacity * scale;

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        // A more direct way to set opacity
        ctx.globalAlpha = opacity;
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.globalAlpha = 1; // Reset global alpha

        // --- OPTIMIZED CONNECTION LOGIC ---
        const connectRange = 10; // Only check the next 10 particles
        for (let j = index + 1; j < index + connectRange && j < particles.length; j++) {
          const otherParticle = particles[j];

          const otherScale = 1000 / (1000 + otherParticle.z);
          const otherX = otherParticle.x * otherScale;
          const otherY = otherParticle.y * otherScale;

          const dx = x - otherX;
          const dy = y - otherY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(otherX, otherY);
            ctx.strokeStyle = 'rgba(59, 130, 246, 1)';
            // Set opacity based on distance
            ctx.globalAlpha = 0.1 * (1 - distance / 80) * scale;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1; // Reset global alpha after drawing lines
      });

      // (The floating geometric shapes code remains the same)

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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default BackgroundAnimation;