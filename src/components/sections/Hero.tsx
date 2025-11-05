import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Code, Server, Database, GitBranch, FileCode, Globe, Cloud, Layers, Smartphone, Cpu, Figma } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Skills for typing animation
const skills = ['Full Stack Developer', 'React Specialist', 'Cloud Architect', 'UI/UX Enthusiast'];

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingShapesRef = useRef<HTMLDivElement>(null);
  const skillCardsRef = useRef<HTMLDivElement>(null);
  const [currentSkill, setCurrentSkill] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  // Enhanced skill chips with vibrant gradients and custom colors
  const techSkills = [
    {
      name: 'React',
      icon: <Code className="w-5 h-5" />,
      gradient: 'from-blue-500 to-blue-600',
      shadowColor: 'rgba(59, 130, 246, 0.4)'
    },
    {
      name: 'TypeScript',
      icon: <FileCode className="w-5 h-5" />,
      gradient: 'from-blue-600 to-blue-700',
      shadowColor: 'rgba(37, 99, 235, 0.4)'
    },
    {
      name: 'Node.js',
      icon: <Server className="w-5 h-5" />,
      gradient: 'from-green-500 to-green-600',
      shadowColor: 'rgba(34, 197, 94, 0.4)'
    },
    {
      name: 'AWS',
      icon: <Cloud className="w-5 h-5" />,
      gradient: 'from-orange-400 to-orange-500',
      shadowColor: 'rgba(251, 146, 60, 0.4)'
    },
    {
      name: 'UI/UX',
      icon: <Smartphone className="w-5 h-5" />,
      gradient: 'from-purple-500 to-purple-600',
      shadowColor: 'rgba(168, 85, 247, 0.4)'
    },
    {
      name: 'GraphQL',
      icon: <Globe className="w-5 h-5" />,
      gradient: 'from-pink-500 to-pink-600',
      shadowColor: 'rgba(236, 72, 153, 0.4)'
    },
    {
      name: 'MongoDB',
      icon: <Database className="w-5 h-5" />,
      gradient: 'from-green-600 to-green-700',
      shadowColor: 'rgba(22, 163, 74, 0.4)'
    },
    {
      name: 'Docker',
      icon: <Layers className="w-5 h-5" />,
      gradient: 'from-blue-600 to-blue-700',
      shadowColor: 'rgba(37, 99, 235, 0.4)'
    },
    {
      name: 'Next.js',
      icon: <Cpu className="w-5 h-5" />,
      gradient: 'from-gray-800 to-black',
      shadowColor: 'rgba(0, 0, 0, 0.4)'
    },
    {
      name: 'TailwindCSS',
      icon: <Cpu className="w-5 h-5" />,
      gradient: 'from-teal-500 to-teal-600',
      shadowColor: 'rgba(20, 184, 166, 0.4)'
    },
    {
      name: 'Git',
      icon: <GitBranch className="w-5 h-5" />,
      gradient: 'from-red-500 to-red-600',
      shadowColor: 'rgba(239, 68, 68, 0.4)'
    },
    {
      name: 'Figma',
      icon: <Figma className="w-5 h-5" />,
      gradient: 'from-purple-600 to-purple-700',
      shadowColor: 'rgba(147, 51, 234, 0.4)'
    }
  ];

  // Typing effect for the "I'm a..." headline
  useEffect(() => {
    const skill = skills[currentSkill];
    const type = () => {
      if (isDeleting) {
        setText(skill.substring(0, text.length - 1));
      } else {
        setText(skill.substring(0, text.length + 1));
      }

      if (!isDeleting && text === skill) {
        setDelta(2000);
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCurrentSkill((prev) => (prev + 1) % skills.length);
        setDelta(150);
      } else {
        setDelta(isDeleting ? 50 : 150);
      }
    };

    const ticker = setTimeout(type, delta);
    return () => clearTimeout(ticker);
  }, [text, delta, currentSkill, isDeleting]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for heading
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 50,
            rotationX: -90,
            transformOrigin: '50% 50%'
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            delay: 0.2
          }
        );
      }

      // Animate subheading
      if (subheadingRef.current) {
        gsap.fromTo(
          subheadingRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power3.out'
          }
        );
      }

      // Animate CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            delay: 1.2,
            ease: 'elastic.out(1, 0.5)'
          }
        );
      }

      // Floating shapes animation
      if (floatingShapesRef.current) {
        const shapes = floatingShapesRef.current.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
          // Continuous floating animation
          gsap.to(shape, {
            y: `${Math.random() * 40 - 20}`,
            x: `${Math.random() * 40 - 20}`,
            rotation: `${Math.random() * 360}`,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
          });

          // Initial animation
          gsap.fromTo(
            shape,
            { opacity: 0, scale: 0 },
            {
              opacity: 0.6,
              scale: 1,
              duration: 1,
              delay: 0.5 + index * 0.1,
              ease: 'back.out(1.7)'
            }
          );
        });
      }

      // 3D skill cards animation
      if (skillCardsRef.current) {
        const cards = skillCardsRef.current.querySelectorAll('.skill-card');

        // Initial entrance animation
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            z: -200,
            rotationY: -180,
          },
          {
            opacity: 1,
            z: 0,
            rotationY: 0,
            duration: 1,
            stagger: {
              each: 0.08,
              from: 'start'
            },
            delay: 1.5,
            ease: 'power2.out'
          }
        );

        // Continuous 3D rotation effect
        cards.forEach((card, index) => {
          const cardElement = card as HTMLElement;

          // Hover effect
          cardElement.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.1,
              rotationY: 15,
              z: 50,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          cardElement.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          // Subtle continuous animation
          gsap.to(card, {
            y: Math.sin(index) * 10,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.1
          });
        });
      }

      // Parallax effect on scroll
      if (heroRef.current) {
        gsap.to('.parallax-slow', {
          y: 100,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to('.parallax-medium', {
          y: 200,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to('.parallax-fast', {
          y: 300,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-cyberpunk-grid dark:bg-cyberpunk-grid bg-[size:40px_40px] opacity-10"></div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-20"></div>

      {/* Floating geometric shapes */}
      <div ref={floatingShapesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circle - top left */}
        <div
          className="floating-shape parallax-slow absolute top-20 left-20 w-96 h-96 rounded-full border-2 border-black/20 dark:border-white/20"
          style={{ transform: 'translateZ(0)' }}
        />

        {/* Square - top right */}
        <div
          className="floating-shape parallax-medium absolute top-40 right-32 w-64 h-64 border-2 border-black/20 dark:border-white/20"
          style={{ transform: 'translateZ(0) rotate(45deg)' }}
        />

        {/* Triangle - bottom left */}
        <div
          className="floating-shape parallax-fast absolute bottom-32 left-40 w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[250px] border-b-black/10 dark:border-b-white/10"
          style={{ transform: 'translateZ(0)' }}
        />

        {/* Small circle - bottom right */}
        <div
          className="floating-shape parallax-medium absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10"
          style={{ transform: 'translateZ(0)' }}
        />

        {/* Hexagon - center */}
        <div
          className="floating-shape parallax-slow absolute top-1/2 left-1/3 w-40 h-40"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            transform: 'translateZ(0)'
          }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 z-10 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading with split text animation */}
          <h1
            ref={headingRef}
            className="font-mono text-6xl md:text-8xl lg:text-9xl font-bold text-black dark:text-white mb-8"
            style={{ perspective: '1000px' }}
          >
            {'TAHEER'.split('').map((char, index) => (
              <span
                key={index}
                className="char inline-block"
                style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Subheading with typing effect */}
          <div
            ref={subheadingRef}
            className="text-2xl md:text-4xl font-mono text-black/80 dark:text-white/80 mb-6 h-16 flex items-center justify-center"
          >
            <span className="text-green-600 dark:text-green-400 mr-3">{'>'} </span>
            <span className="text-blue-600 dark:text-blue-400">{text}</span>
            <motion.span
              className="inline-block w-3 h-8 bg-black dark:bg-white ml-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-black/70 dark:text-white/70 max-w-3xl mx-auto mb-12 font-mono leading-relaxed">
            <span className="text-gray-500 dark:text-gray-500">// </span>
            Crafting digital experiences with precision and creativity.
            <br />
            <span className="text-gray-500 dark:text-gray-500">// </span>
            Turning complex problems into elegant solutions.
          </p>

          {/* Tech skills - 3D cards */}
          <div
            ref={skillCardsRef}
            className="mb-16"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            <h3 className="font-mono text-sm tracking-wider text-black/60 dark:text-white/60 mb-6">
              &lt; TECH_STACK /&gt;
            </h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {techSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`skill-card bg-gradient-to-r ${skill.gradient} text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 cursor-pointer`}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: `0 4px 20px ${skill.shadowColor}`
                  }}
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons with magnetic effect */}
          <div ref={ctaRef} className="flex flex-wrap gap-6 justify-center">
            <button
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-mono font-bold text-lg rounded-lg overflow-hidden group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-mono font-bold text-lg rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              DOWNLOAD CV
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator with animation */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-black/60 dark:text-white/60 z-20"
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        whileHover={{
          scale: 1.2,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-mono">SCROLL</span>
          <ArrowDown className="w-6 h-6" />
        </div>
      </motion.a>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-black/20 dark:border-white/20"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-black/20 dark:border-white/20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-black/20 dark:border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-black/20 dark:border-white/20"></div>
    </section>
  );
};
