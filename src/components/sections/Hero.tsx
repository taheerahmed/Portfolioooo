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

  // Minimal TAHEER entrance animation
  useEffect(() => {
    const letters = gsap.utils.toArray('.hero-letter');

    letters.forEach((letter: any, index) => {
      gsap.fromTo(
        letter,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2 + index * 0.08,
          ease: 'expo.out',
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
      <div className="absolute inset-0" style={{ opacity: 0.8 }}>
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={0.0}
          color="#FF79C6"
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#060010]/60" />

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center justify-center">
          {/* TAHEER text - clean and bold */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-black leading-none tracking-tighter text-white drop-shadow-2xl">
              {'TAHEER'.split('').map((letter, i) => (
                <span key={i} className="hero-letter inline-block">
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 md:mb-16">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-300 font-light tracking-wide"
            >
              {roles[currentRole]}
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 md:gap-6 justify-center"
          >
            <button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-10 py-4 bg-[#FF79C6] hover:bg-[#ff8dd4] text-black text-base md:text-lg font-semibold transition-all duration-300 rounded-xl hover:scale-105 shadow-lg shadow-[#FF79C6]/50 hover:shadow-[#FF79C6]/70"
            >
              <span className="relative z-10">Explore Work</span>
            </button>

            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-4 border-2 border-[#FF79C6] text-white text-base md:text-lg font-semibold hover:bg-[#FF79C6]/10 transition-all duration-300 rounded-xl hover:scale-105 backdrop-blur-sm"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
