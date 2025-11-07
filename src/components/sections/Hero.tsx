import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LaserFlow from '../ui/LaserFlow';
import gsap from 'gsap';

const roles = ['Full-Stack Developer', 'AI Engineer', 'Creative Technologist', 'Problem Solver'];

export const Hero: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // TAHEER entrance animation
  useEffect(() => {
    const letters = gsap.utils.toArray('.hero-letter');

    gsap.fromTo(
      letters,
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: 'expo.out',
      }
    );

    // Animate other elements
    gsap.fromTo(
      '.hero-role',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-cta',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-meta',
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 1.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-black"
    >
      {/* Network visualization - subtle */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <LaserFlow />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-white/90 dark:from-black/90 dark:via-transparent dark:to-black/90" />

      {/* Main content - Full width, clean layout */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 z-10 relative w-full">
        <div className="flex flex-col justify-center min-h-screen py-20 max-w-6xl">

          {/* TAHEER - Dominant, massive */}
          <div style={{ perspective: '1000px' }} className="mb-8 md:mb-12">
            <h1 className="text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[140px] font-black leading-[0.9] tracking-tighter text-black dark:text-white">
              {'TAHEER'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Role - Clean, medium prominence */}
          <div className="hero-role mb-8 md:mb-10">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 dark:text-gray-300 tracking-wide"
            >
              {roles[currentRole]}
            </motion.div>
          </div>

          {/* Description - Concise, readable */}
          <div className="hero-description mb-12 md:mb-14 max-w-2xl">
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Crafting exceptional digital experiences at the intersection of design,
              engineering, and artificial intelligence.
            </p>
          </div>

          {/* CTA Buttons - Minimalist, professional */}
          <div className="hero-cta flex flex-wrap gap-4 items-center mb-16">
            <button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 text-black dark:text-white text-sm font-medium tracking-wide uppercase border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              Contact
            </button>
          </div>

          {/* Meta info - Subtle, professional */}
          <div className="hero-meta flex flex-wrap items-center gap-6 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Available</span>
            </div>
            <div className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <span>AI-Powered</span>
            </div>
            <div className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Elegant, minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-gray-400 to-transparent"
        />
      </motion.div>
    </section>
  );
};
