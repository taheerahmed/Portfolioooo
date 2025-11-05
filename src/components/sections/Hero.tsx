import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roles = ['Developer', 'Designer', 'Creator', 'Innovator'];

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate name letters
      const letters = document.querySelectorAll('.name-letter');
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'power4.out',
          delay: 0.3,
        }
      );

      // Horizontal scrolling text effect
      if (scrollTextRef.current) {
        const scrollWidth = scrollTextRef.current.scrollWidth;

        gsap.to(scrollTextRef.current, {
          x: -scrollWidth / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Parallax sections
      gsap.to('.hero-content', {
        y: 100,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Floating elements
      gsap.to('.float-element', {
        y: -30,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        duration: 2,
        stagger: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden"
    >
      {/* Floating minimal shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="float-element absolute top-20 left-20 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="float-element absolute top-40 right-32 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="float-element absolute bottom-40 left-40 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="float-element absolute bottom-20 right-20 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 z-10 hero-content">
        <div className="max-w-6xl mx-auto text-center">
          {/* Large name with split text animation */}
          <h1
            className="text-8xl md:text-[12rem] lg:text-[16rem] font-bold text-black dark:text-white mb-4 leading-none tracking-tighter"
            style={{ perspective: '1000px' }}
          >
            {'TAHEER'.split('').map((letter, i) => (
              <span
                key={i}
                className="name-letter inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Animated role text */}
          <div className="h-16 flex items-center justify-center mb-12">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-3xl md:text-5xl text-gray-600 dark:text-gray-400 font-light"
            >
              {roles[currentRole]}
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 justify-center mb-32">
            <button
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative px-12 py-5 bg-black dark:bg-white text-white dark:text-black text-lg font-medium rounded-full overflow-hidden"
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black dark:from-gray-200 dark:to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>

            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-12 py-5 border-2 border-black dark:border-white text-black dark:text-white text-lg font-medium rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>

          {/* Scroll indicator */}
          <motion.a
            href="#projects"
            onClick={scrollToProjects}
            className="inline-block text-gray-400 dark:text-gray-600"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ArrowDown className="w-5 h-5" />
            </div>
          </motion.a>
        </div>
      </div>

      {/* Scrolling text at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden py-8 border-t border-gray-200 dark:border-gray-800">
        <div ref={scrollTextRef} className="flex whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-6xl font-bold text-gray-100 dark:text-gray-900 mx-8">
                FULL STACK DEVELOPER
              </span>
              <span className="text-6xl text-gray-300 dark:text-gray-700 mx-8">•</span>
              <span className="text-6xl font-bold text-gray-100 dark:text-gray-900 mx-8">
                UI/UX DESIGNER
              </span>
              <span className="text-6xl text-gray-300 dark:text-gray-700 mx-8">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
