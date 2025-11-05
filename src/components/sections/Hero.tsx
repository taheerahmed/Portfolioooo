import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = ['Full Stack Developer', 'React Specialist', 'Cloud Architect', 'UI/UX Enthusiast'];

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentSkill, setCurrentSkill] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  // Typing effect
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
      // Heading animation - fade up
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }

      // Subtitle animation - fade up with delay
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.6,
            ease: 'power3.out',
          }
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1,
            ease: 'power3.out',
          }
        );
      }

      // Parallax effect on scroll
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          y: 200,
          opacity: 0.5,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
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
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

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
      className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden py-20"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:from-transparent dark:via-gray-900/30 dark:to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1
            ref={headingRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-black dark:text-white mb-8 tracking-tight"
          >
            Taheer Ahmed
          </h1>

          {/* Subtitle with typing effect */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-3xl text-gray-600 dark:text-gray-400 mb-12 h-10 flex items-center justify-center"
          >
            <span>{text}</span>
            <motion.span
              className="inline-block w-1 h-7 bg-black dark:bg-white ml-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-6 justify-center mb-20">
            <button
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-medium rounded-full hover:shadow-xl transition-shadow duration-300"
            >
              View Work
            </button>

            <button
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white text-lg font-medium rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
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
              <span className="text-sm uppercase tracking-widest">Scroll</span>
              <ArrowDown className="w-5 h-5" />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
