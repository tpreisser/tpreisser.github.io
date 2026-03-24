"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
};

const sparkPalette = ["#C4843E", "#D4A054", "#FFD700", "#FFF6DB"];

export function SparkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const particles: Spark[] = [];
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const spawn = (x: number, y: number) => {
      const count = 10 + Math.floor(Math.random() * 6);

      for (let index = 0; index < count; index += 1) {
        particles.push({
          x,
          y,
          vx: -3 + Math.random() * 6,
          vy: -5 + Math.random() * 4,
          size: 2 + Math.random() * 2,
          opacity: 1,
          color: sparkPalette[Math.floor(Math.random() * sparkPalette.length)],
        });
      }
    };

    const render = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.15;
        particle.vx *= 0.98;
        particle.opacity -= 0.025;

        if (particle.opacity <= 0) {
          particles.splice(index, 1);
          continue;
        }

        context.globalAlpha = particle.opacity;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      raf = window.requestAnimationFrame(render);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement) || !target.closest(".spark-trigger")) {
        return;
      }

      spawn(event.clientX, event.clientY);
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    document.addEventListener("click", handleClick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
