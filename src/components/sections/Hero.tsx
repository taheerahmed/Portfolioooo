import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const roles = ['Developer', 'Designer', 'Creator', 'Innovator'];

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const laserRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Laser flow animation
  useEffect(() => {
    if (!laserRef.current) return;

    const ctx = gsap.context(() => {
      const lasers = gsap.utils.toArray('.laser-path');

      lasers.forEach((laser: any, index) => {
        gsap.fromTo(
          laser,
          {
            strokeDashoffset: 2000,
          },
          {
            strokeDashoffset: 0,
            duration: 3 + index * 0.5,
            repeat: -1,
            ease: 'none',
          }
        );

        gsap.to(laser, {
          opacity: [0.3, 1, 0.3],
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Animate laser dots
      const dots = gsap.utils.toArray('.laser-dot');
      dots.forEach((dot: any, index) => {
        gsap.to(dot, {
          motionPath: {
            path: `.laser-path-${index % 6}`,
            align: `.laser-path-${index % 6}`,
            alignOrigin: [0.5, 0.5],
          },
          duration: 4 + Math.random() * 2,
          repeat: -1,
          ease: 'none',
          delay: Math.random() * 2,
        });
      });
    }, laserRef);

    return () => ctx.revert();
  }, []);

  // Simple TAHEER entrance
  useEffect(() => {
    const letters = gsap.utils.toArray('.hero-letter');

    letters.forEach((letter: any, index) => {
      gsap.fromTo(
        letter,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out',
        }
      );
    });
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-white dark:bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-950 opacity-90" />
      </div>

      {/* Laser Flow Background */}
      <svg
        ref={laserRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.6 }}
      >
        <defs>
          <linearGradient id="laser-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="laser-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="laser-gradient-3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Laser Paths */}
        <path
          className="laser-path laser-path-0"
          d="M-100,200 Q400,100 800,300 T1600,400 T2400,200"
          fill="none"
          stroke="url(#laser-gradient-1)"
          strokeWidth="2"
          strokeDasharray="2000"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <path
          className="laser-path laser-path-1"
          d="M-100,400 Q300,300 700,500 T1400,300 T2200,600"
          fill="none"
          stroke="url(#laser-gradient-2)"
          strokeWidth="2"
          strokeDasharray="2000"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <path
          className="laser-path laser-path-2"
          d="M2400,150 Q1800,250 1200,150 T400,300 T-100,250"
          fill="none"
          stroke="url(#laser-gradient-3)"
          strokeWidth="2"
          strokeDasharray="2000"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <path
          className="laser-path laser-path-3"
          d="M-100,600 Q500,500 1000,700 T2000,500 T2400,800"
          fill="none"
          stroke="url(#laser-gradient-1)"
          strokeWidth="1.5"
          strokeDasharray="2000"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <path
          className="laser-path laser-path-4"
          d="M2400,450 Q1600,550 900,400 T200,600 T-100,450"
          fill="none"
          stroke="url(#laser-gradient-2)"
          strokeWidth="1.5"
          strokeDasharray="2000"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <path
          className="laser-path laser-path-5"
          d="M-100,100 Q600,200 1100,100 T2000,200 T2400,100"
          fill="none"
          stroke="url(#laser-gradient-3)"
          strokeWidth="1.5"
          strokeDasharray="2000"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Animated dots along lasers */}
        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            className="laser-dot"
            r="3"
            fill={i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#ec4899' : '#06b6d4'}
            filter="url(#glow)"
          />
        ))}
      </svg>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center justify-center">
          {/* Simple TAHEER text */}
          <div className="mb-8 md:mb-10">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tighter text-black dark:text-white">
              {'TAHEER'.split('').map((letter, i) => (
                <span key={i} className="hero-letter inline-block">
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-16 md:mb-20">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-600 dark:text-gray-400 font-light"
            >
              {roles[currentRole]}
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-12 py-5 bg-black dark:bg-white text-white dark:text-black text-lg font-medium overflow-hidden transition-all duration-300 rounded-xl hover:scale-105"
            >
              <span className="relative z-10">Explore Work</span>
            </button>

            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-12 py-5 border-2 border-black dark:border-white text-black dark:text-white text-lg font-medium hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 rounded-xl hover:scale-105"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
