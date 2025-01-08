import React, { useEffect, useRef } from 'react';

const FallingPetals = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Petal class
    class Petal {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20; // Start above the screen
        this.size = Math.random() * 15 + 5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.speedX = Math.random() * 2 + 1;
        this.speedY = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = Math.random() > 0.5 ? '#D946EF' : '#FF69B4'; // Primary and accent colors
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Reset petal position when it goes off screen
        if (this.y > canvas.height || this.x > canvas.width) {
          this.x = -20;
          this.y = Math.random() * canvas.height * 0.3;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // Draw petal shape
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          this.size / 2, -this.size / 2,
          this.size, 0,
          this.size / 2, this.size / 2
        );
        ctx.bezierCurveTo(
          0, this.size / 3,
          -this.size / 2, this.size / 2,
          0, 0
        );
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }

    // Create petals
    const petals: Petal[] = Array.from({ length: 50 }, () => new Petal());

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(petal => {
        petal.update();
        petal.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default FallingPetals;