

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

    // Create 3D floating particles
    for (let i = 0; i < 150; i++) {
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
        ctx.fillStyle = particle.color.replace('0.4', opacity.toString());
        ctx.fill();

        // Draw connections to nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return;

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
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 80) * scale})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Add floating geometric shapes
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(time * 0.1);
      
      // Floating triangles
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 3);
        ctx.translate(200 + Math.sin(time + i) * 50, 0);
        ctx.rotate(time * 0.5);
        
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(8, 5);
        ctx.lineTo(-8, 5);
        ctx.closePath();
        ctx.fillStyle = `rgba(147, 51, 234, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.fill();
        ctx.restore();
      }

      // Floating circles
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 5);
        ctx.translate(150 + Math.cos(time * 0.7 + i) * 30, 0);
        
        ctx.beginPath();
        ctx.arc(0, 0, 5 + Math.sin(time * 2 + i) * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${0.15 + Math.sin(time + i) * 0.1})`;
        ctx.fill();
        ctx.restore();
      }
      
      ctx.restore();

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
