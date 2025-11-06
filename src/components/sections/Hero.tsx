import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roles = ['Developer', 'Designer', 'Creator', 'Innovator'];

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const wavesRef = useRef<SVGSVGElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate letters with enhanced entrance
      const letters = gsap.utils.toArray('.hero-letter');

      letters.forEach((letter: any, index) => {
        // Enhanced entrance animation
        gsap.fromTo(
          letter,
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
            z: -200,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            z: 0,
            duration: 1.2,
            delay: index * 0.08,
            ease: 'expo.out',
          }
        );

        // 3D rotation on scroll
        gsap.to(letter, {
          rotationY: 360,
          rotationX: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });

        // Enhanced mouse hover effect
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, {
            scale: 1.15,
            rotationY: 15,
            color: theme === 'dark' ? '#888' : '#555',
            duration: 0.4,
            ease: 'back.out(1.4)',
          });
        });

        letter.addEventListener('mouseleave', () => {
          gsap.to(letter, {
            scale: 1,
            rotationY: 0,
            color: theme === 'dark' ? '#fff' : '#000',
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      });

      // Animate morphing mesh gradients
      if (meshRef.current) {
        const meshBlobs = meshRef.current.querySelectorAll('.mesh-blob');
        meshBlobs.forEach((blob: any, index) => {
          // Morphing animation
          gsap.to(blob, {
            scale: [1, 1.3, 0.9, 1.2, 1],
            x: [0, 60, -40, 50, 0],
            y: [0, -50, 60, -30, 0],
            rotation: [0, 15, -10, 20, 0],
            duration: 20 + index * 3,
            repeat: -1,
            ease: 'sine.inOut',
            delay: index * 2,
          });

          // Scroll-based morphing
          gsap.to(blob, {
            scale: 1.5,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }

      // Animate wave lines
      if (wavesRef.current) {
        const waves = wavesRef.current.querySelectorAll('.wave-path');
        waves.forEach((wave: any, index) => {
          gsap.to(wave, {
            attr: { d: wave.getAttribute('data-morph') },
            duration: 4 + index,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5,
          });
        });
      }

      // Enhanced layered particles with depth
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          const layer = index % 3; // 3 layers of depth
          const size = layer === 0 ? 2 : layer === 1 ? 1.5 : 1;
          const speed = layer === 0 ? 3 : layer === 1 ? 5 : 7;
          const opacity = layer === 0 ? 0.8 : layer === 1 ? 0.5 : 0.3;

          gsap.set(particle, {
            width: size,
            height: size,
          });

          gsap.fromTo(
            particle,
            {
              y: '120%',
              x: Math.random() * window.innerWidth,
              opacity: 0,
            },
            {
              y: '-20%',
              x: `+=${Math.sin(index) * 100}`,
              opacity: [0, opacity, opacity, 0],
              duration: speed + Math.random() * 2,
              repeat: -1,
              delay: Math.random() * 5,
              ease: 'none',
            }
          );

          // Parallax effect based on layer
          gsap.to(particle, {
            y: layer === 0 ? -250 : layer === 1 ? -150 : -50,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });

      // Grid line wave animation
      if (gridRef.current) {
        const lines = gridRef.current.querySelectorAll('.grid-line');
        lines.forEach((line: any, index) => {
          gsap.to(line, {
            opacity: Math.random() > 0.5 ? 0.12 : 0.06,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            delay: index * 0.02,
            ease: 'sine.inOut',
          });

          // Subtle wave distortion on scroll
          gsap.to(line, {
            scaleY: 1.5,
            transformOrigin: 'center',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 2,
            },
          });
        });
      }

      // Parallax content with bounce
      gsap.to('.hero-content', {
        y: 250,
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

      // Enhanced orb movements
      gsap.to('.orb-1', {
        y: -200,
        x: 150,
        scale: 2,
        rotation: 180,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.orb-2', {
        y: 200,
        x: -150,
        scale: 0.6,
        rotation: -180,
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

  // Mouse-interactive gradient effect
  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current, {
        x: mousePosition.x * 30,
        y: mousePosition.y * 30,
        duration: 2,
        ease: 'power2.out',
      });
    }
  }, [mousePosition]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden"
    >
      {/* Morphing Mesh Gradient Background */}
      <div ref={meshRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="mesh-blob absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-transparent blur-3xl" />
        <div className="mesh-blob absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-500/20 to-transparent blur-3xl" />
        <div className="mesh-blob absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-pink-500/15 via-orange-500/10 to-transparent blur-3xl" />
        <div className="mesh-blob absolute bottom-1/3 left-1/3 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-transparent blur-3xl" />
        <div className="mesh-blob absolute top-1/2 left-1/2 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-500/10 via-blue-500/15 to-transparent blur-3xl" />
      </div>

      {/* Flowing Wave Lines */}
      <svg
        ref={wavesRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          className="wave-path stroke-gray-400 dark:stroke-gray-600"
          d="M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200"
          data-morph="M0,200 Q250,250 500,200 T1000,200 T1500,200 T2000,200"
          fill="none"
          stroke="url(#wave-gradient-1)"
          strokeWidth="2"
        />
        <path
          className="wave-path stroke-gray-400 dark:stroke-gray-600"
          d="M0,400 Q300,350 600,400 T1200,400 T1800,400 T2400,400"
          data-morph="M0,400 Q300,450 600,400 T1200,400 T1800,400 T2400,400"
          fill="none"
          stroke="url(#wave-gradient-2)"
          strokeWidth="1.5"
        />
        <path
          className="wave-path stroke-gray-400 dark:stroke-gray-600"
          d="M0,600 Q350,550 700,600 T1400,600 T2100,600 T2800,600"
          data-morph="M0,600 Q350,650 700,600 T1400,600 T2100,600 T2800,600"
          fill="none"
          stroke="url(#wave-gradient-1)"
          strokeWidth="1"
        />
      </svg>

      {/* Animated Grid Background */}
      <div ref={gridRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {/* Vertical lines */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line absolute h-full w-px bg-gradient-to-b from-transparent via-gray-400 dark:via-gray-600 to-transparent"
            style={{
              left: `${(i / 30) * 100}%`,
              opacity: 0.03,
            }}
          />
        ))}
        {/* Horizontal lines */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line absolute w-full h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"
            style={{
              top: `${(i / 30) * 100}%`,
              opacity: 0.03,
            }}
          />
        ))}
      </div>

      {/* Depth-layered Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={`particle-${i}`}
            ref={(el) => {
              particlesRef.current[i] = el;
            }}
            className="absolute rounded-full bg-gray-500 dark:bg-gray-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `100%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/15 to-purple-500/15 blur-3xl"
          animate={{
            x: [0, 80, -20, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.3, 0.9, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="orb-2 absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-500/15 to-orange-500/15 blur-3xl"
          animate={{
            x: [0, -80, 20, 0],
            y: [0, 40, -60, 0],
            scale: [1.2, 0.8, 1.4, 1.2],
            rotate: [0, -90, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 z-10 hero-content">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center justify-center">
          {/* Large name with interactive letters */}
          <div
            ref={lettersRef}
            className="mb-8 md:mb-10"
            style={{
              perspective: '1000px',
            }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tighter">
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
          <div className="mb-16 md:mb-20">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-600 dark:text-gray-400 font-light"
            >
              {roles[currentRole]}
            </motion.div>
          </div>

          {/* CTA with magnetic effect */}
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
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
              className="group relative px-12 py-5 bg-black dark:bg-white text-white dark:text-black text-lg font-medium overflow-hidden transition-transform duration-300 rounded-xl"
            >
              <span className="relative z-10">Explore Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black dark:from-gray-200 dark:to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 rounded-xl" />
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
              className="px-12 py-5 border-2 border-black dark:border-white text-black dark:text-white text-lg font-medium hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 rounded-xl"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
