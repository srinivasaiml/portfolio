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

    const lines: Array<{
      y: number;
      baseY: number;
      speed: number;
      amplitude: number;
      frequency: number;
      opacity: number;
    }> = [];

    // Create flowing lines
    const lineCount = 8;
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        y: (canvas.height / (lineCount + 1)) * (i + 1),
        baseY: (canvas.height / (lineCount + 1)) * (i + 1),
        speed: 0.001 + Math.random() * 0.002,
        amplitude: 30 + Math.random() * 20,
        frequency: 0.002 + Math.random() * 0.003,
        opacity: 0.03 + Math.random() * 0.05,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      lines.forEach((line, index) => {
        ctx.beginPath();
        ctx.moveTo(0, line.y);

        for (let x = 0; x <= canvas.width; x += 5) {
          const wave = Math.sin(x * line.frequency + time * line.speed) * line.amplitude;
          const y = line.baseY + wave;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(100, 116, 139, ${line.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add subtle gradient fill
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, line.baseY, 0, canvas.height);
        gradient.addColorStop(0, `rgba(148, 163, 184, ${line.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(148, 163, 184, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw subtle geometric accent
      ctx.save();
      ctx.translate(canvas.width * 0.85, canvas.height * 0.15);
      ctx.rotate(time * 0.001);
      
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(-50, -50, 100, 100);
      
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.05)';
      ctx.strokeRect(-70, -70, 140, 140);
      
      ctx.restore();

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Update line positions on resize
      lines.forEach((line, i) => {
        line.baseY = (canvas.height / (lineCount + 1)) * (i + 1);
        line.y = line.baseY;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default BackgroundAnimation;