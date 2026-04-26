"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const colors = ["#ff9cec", "#ffe2a9", "#92e8ff", "#ffbacb", "#f6d2ff"];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function drawShape(ctx, x, y, size, color, type, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.fillStyle = color;
  if (type === "heart") {
    ctx.beginPath();
    ctx.moveTo(0, size / 4);
    ctx.bezierCurveTo(0, -size / 2, -size, -size / 2, -size, 0);
    ctx.bezierCurveTo(-size, size / 1.4, 0, size, 0, size * 1.35);
    ctx.bezierCurveTo(0, size, size, size / 1.4, size, 0);
    ctx.bezierCurveTo(size, -size / 2, 0, -size / 2, 0, size / 4);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.beginPath();
    for (let i = 0; i < 5; i += 1) {
      const angle = (i * Math.PI * 2) / 5;
      const radius = i % 2 === 0 ? size : size * 0.45;
      ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

export default function MagicCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle() {
      const size = randomRange(16, 34);
      particlesRef.current.push({
        x: randomRange(0, canvas.width),
        y: canvas.height + size,
        size,
        velocity: randomRange(0.8, 2.4),
        drift: randomRange(-0.9, 0.9),
        rotation: randomRange(0, Math.PI * 2),
        spin: randomRange(-0.03, 0.03),
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.45 ? "heart" : "star",
        alpha: randomRange(0.5, 0.95),
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (particlesRef.current.length < 65) createParticle();
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.y -= particle.velocity;
        particle.x += particle.drift;
        particle.rotation += particle.spin;
        particle.alpha -= 0.0009;

        if (particle.y < -50 || particle.alpha <= 0) {
          return false;
        }

        ctx.globalAlpha = particle.alpha;
        drawShape(
          ctx,
          particle.x,
          particle.y,
          particle.size,
          particle.color,
          particle.type,
          particle.rotation,
        );
        return true;
      });
      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    gsap.fromTo(
      canvas,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" },
    );
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="magic-canvas" />;
}
