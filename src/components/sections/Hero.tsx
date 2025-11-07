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
          delay: index * 0.1,
          ease: 'power2.out',
        }
      );
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060010]"
    >
      {/* LaserFlow Background */}
      <div className="absolute inset-0">
        <LaserFlow
          horizontalBeamOffset={0.0}
          verticalBeamOffset={0.0}
          color="#3b82f6"
          speed={0.3}
        />
      </div>

      {/* Optional: Add a subtle overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center justify-center">
          {/* TAHEER text */}
          <div className="mb-8 md:mb-10">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tighter text-white">
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-400 font-light"
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
              className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium transition-all duration-300 rounded-xl hover:scale-105 shadow-lg shadow-blue-500/50"
            >
              Explore Work
            </button>

            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-12 py-5 border-2 border-white text-white text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 rounded-xl hover:scale-105"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
