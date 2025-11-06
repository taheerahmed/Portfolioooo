import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('home');
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar entrance animation
      gsap.fromTo(
        navRef.current,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      // Animate nav items
      gsap.fromTo(
        '.nav-item',
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out',
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Animate indicator to active item
  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.href.substring(1) === activeSection);
    const activeItem = itemRefs.current[activeIndex];

    if (activeItem && indicatorRef.current) {
      const navLeft = navRef.current?.getBoundingClientRect().left || 0;
      const itemLeft = activeItem.getBoundingClientRect().left;
      const itemWidth = activeItem.offsetWidth;

      gsap.to(indicatorRef.current, {
        x: itemLeft - navLeft,
        width: itemWidth,
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, [activeSection]);

  const scrollToSection = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
    >
      <div className="relative bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-full px-6 py-3 shadow-lg">
        {/* Animated indicator */}
        <div
          ref={indicatorRef}
          className="absolute top-3 left-6 h-10 bg-black/5 dark:bg-white/5 rounded-full transition-all pointer-events-none"
          style={{ width: 0 }}
        />

        {/* Nav items */}
        <div className="relative flex items-center gap-2">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              href={item.href}
              onClick={(e) => scrollToSection(item.href, e)}
              className={`
                nav-item relative px-5 py-2.5 text-sm font-medium rounded-full
                transition-all duration-300
                ${
                  activeSection === item.href.substring(1)
                    ? 'text-black dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              {item.name}
            </a>
          ))}

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2" />

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            className="nav-item p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-white" />
              ) : (
                <Sun className="w-5 h-5 text-black" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.nav>
  );
};
