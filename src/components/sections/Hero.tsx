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
        y: 60,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out',
      }
    );
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Network visualization */}
      <div className="absolute inset-0 opacity-50 dark:opacity-70">
        <LaserFlow />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-black/50" />

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 z-10 relative">
        <div className="max-w-7xl mx-auto">
          {/* Name - Fixed visibility with proper colors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
            style={{ perspective: '1000px' }}
          >
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black leading-none tracking-tighter text-black dark:text-white">
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
          </motion.div>

          {/* Role subtitle with smooth transitions */}
          <div className="mb-12 md:mb-16">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-gray-700 dark:text-gray-300"
            >
              {roles[currentRole]}
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 text-base md:text-lg lg:text-xl mb-12 md:mb-16 max-w-2xl leading-relaxed"
          >
            Crafting exceptional digital experiences at the intersection of design,
            engineering, and artificial intelligence.
          </motion.p>

          {/* CTA Buttons with theme-aware design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-5 items-center"
          >
            <button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-base md:text-lg font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-10 py-4 text-gray-800 dark:text-gray-200 text-base md:text-lg font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get in Touch
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </button>
          </motion.div>

          {/* Social proof / Tech stack indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 md:mt-20"
          >
            <div className="flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Available for projects</span>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span>Powered by AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
