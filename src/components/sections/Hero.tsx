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
  const lettersRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate letters with creative effects
      const letters = gsap.utils.toArray('.hero-letter');

      letters.forEach((letter: any, index) => {
        // Complex entrance animation with elastic bounce
        const tl = gsap.timeline();

        tl.fromTo(
          letter,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
            y: -200,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            duration: 1.5,
            delay: index * 0.08,
            ease: 'elastic.out(1, 0.6)',
          }
        );

        // Continuous floating animation
        gsap.to(letter, {
          y: -20,
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.1,
        });

        // Rotation on scroll
        gsap.to(letter, {
          rotationY: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });

        // Advanced mouse parallax with 3D effect
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, {
            scale: 1.3,
            z: 100,
            rotationX: 20,
            rotationY: 20,
            color: theme === 'dark' ? '#888' : '#555',
            textShadow: theme === 'dark'
              ? '0 20px 40px rgba(255,255,255,0.3)'
              : '0 20px 40px rgba(0,0,0,0.3)',
            duration: 0.4,
            ease: 'power3.out',
          });
        });

        letter.addEventListener('mouseleave', () => {
          gsap.to(letter, {
            scale: 1,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            color: theme === 'dark' ? '#fff' : '#000',
            textShadow: 'none',
            duration: 0.5,
            ease: 'power3.out',
          });
        });

        // Random glitch effect occasionally
        setInterval(() => {
          if (Math.random() > 0.98) {
            gsap.to(letter, {
              x: Math.random() * 20 - 10,
              duration: 0.1,
              yoyo: true,
              repeat: 3,
              ease: 'power1.inOut',
            });
          }
        }, 100);
      });

      // Horizontal scrolling text with speed variation
      if (scrollTextRef.current) {
        gsap.to(scrollTextRef.current, {
          x: '-50%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Parallax content with rotation
      gsap.to('.hero-content', {
        y: 200,
        opacity: 0.2,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Orbs parallax movement
      gsap.to('.orb-1', {
        y: -150,
        x: 100,
        scale: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.orb-2', {
        y: 150,
        x: -100,
        scale: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [theme]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="orb-1 absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="orb-2 absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/10 to-orange-500/10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 z-10 hero-content">
        <div className="max-w-7xl mx-auto text-center">
          {/* Large name with interactive letters */}
          <div
            ref={lettersRef}
            className="mb-8"
            style={{
              perspective: '1000px',
              transform: `rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <h1 className="text-7xl md:text-[10rem] lg:text-[14rem] font-bold leading-none tracking-tighter">
              {'TAHEER'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block"
                  style={{
                    transformStyle: 'preserve-3d',
                    display: 'inline-block',
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Subtitle with stagger animation */}
          <div className="mb-16">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl lg:text-6xl text-gray-600 dark:text-gray-400 font-light"
            >
              {roles[currentRole]}
            </motion.div>
          </div>

          {/* CTA with magnetic effect */}
          <div className="flex flex-wrap gap-6 justify-center mb-24">
            <button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
              }}
              className="group relative px-12 py-5 bg-black dark:bg-white text-white dark:text-black text-lg font-medium overflow-hidden transition-transform duration-300"
            >
              <span className="relative z-10">Explore Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black dark:from-gray-200 dark:to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </button>

            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
              }}
              className="px-12 py-5 border-2 border-black dark:border-white text-black dark:text-white text-lg font-medium hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="inline-flex flex-col items-center gap-3 cursor-pointer"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-xs uppercase tracking-widest text-gray-400">Scroll</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling text at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden py-6 border-t border-gray-200 dark:border-gray-800">
        <div ref={scrollTextRef} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-5xl md:text-6xl font-bold text-gray-100 dark:text-gray-900 mx-8">
                CREATIVE DEVELOPER
              </span>
              <span className="text-5xl md:text-6xl text-gray-200 dark:text-gray-800 mx-8">•</span>
              <span className="text-5xl md:text-6xl font-bold text-gray-100 dark:text-gray-900 mx-8">
                UI/UX DESIGNER
              </span>
              <span className="text-5xl md:text-6xl text-gray-200 dark:text-gray-800 mx-8">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
