import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LaserFlow from '../ui/LaserFlow';
import gsap from 'gsap';

const roles = ['Developer', 'Designer', 'Creator', 'Innovator'];

export const Hero: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Simple TAHEER entrance animation
  useEffect(() => {
    const letters = gsap.utils.toArray('.hero-letter');

    letters.forEach((letter: any, index) => {
      gsap.fromTo(
        letter,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 + index * 0.06,
          ease: 'power3.out',
        }
      );
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900"
    >
      {/* Data Flow Network Background */}
      <div className="absolute inset-0 opacity-40">
        <LaserFlow />
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-8 z-10 relative">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center justify-center">
          {/* Minimalistic TAHEER text */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white">
              {'TAHEER'.split('').map((letter, i) => (
                <span key={i} className="hero-letter inline-block">
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-14 md:mb-16">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 font-light tracking-wide"
            >
              {roles[currentRole]}
            </motion.div>
          </div>

          {/* Minimalistic tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-500 text-sm md:text-base mb-12 max-w-md"
          >
            Building with the best AI tools and technologies
          </motion.p>

          {/* CTA Buttons - more minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-white text-black text-base font-medium transition-all duration-300 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            >
              View Work
            </button>

            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 border border-gray-600 text-gray-300 text-base font-medium hover:border-white hover:text-white transition-all duration-300 rounded-lg hover:scale-105"
            >
              Contact
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
