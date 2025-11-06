import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { socialLinks } from '../../data/social';
import { cn } from '../../utils/cn';

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

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  mail: <Mail className="h-5 w-5" />,
};

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // Add isScrolling state to optimize animations during scroll
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Ref for tracking collapse delay timer
  const collapseTimerRef = useRef<number | null>(null);
  const lastScrollDirectionRef = useRef<'up' | 'down' | null>(null);
  
  // Mobile menu ref for detecting outside clicks
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu on larger screens
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Function to handle scroll events with performance optimization
  useEffect(() => {
    // Track if we're actively scrolling to simplify animations
    const handleScrollStart = () => {
      setIsScrolling(true);
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a timeout to detect when scrolling has stopped
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };
    
    // Main scroll handler with requestAnimationFrame for performance
    const handleScroll = () => {
      // Flag scrolling state immediately
      handleScrollStart();
      
      // Use requestAnimationFrame to optimize UI updates
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Basic scrolled state (for styling)
        setIsScrolled(currentScrollY > 10);
        
        // Determine scroll direction
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        
        // Handle navbar collapse/expand with delay
        // Only collapse on desktop, not on mobile
        if (currentScrollY > 100 && windowWidth >= 768) {
          if (scrollDirection === 'down') {
            // Clear any pending expand timer
            if (collapseTimerRef.current !== null) {
              window.clearTimeout(collapseTimerRef.current);
              collapseTimerRef.current = null;
            }
            // Collapse navbar immediately when scrolling down
            setIsCollapsed(true);
          } else if (scrollDirection === 'up' && lastScrollDirectionRef.current === 'down') {
            // Only start expand timer when direction changes from down to up
            if (collapseTimerRef.current === null) {
              collapseTimerRef.current = window.setTimeout(() => {
                setIsCollapsed(false);
                collapseTimerRef.current = null;
              }, 2000); // 2-second delay before expanding when scrolling up
            }
          }
        } else {
          // At the top - always expanded
          if (collapseTimerRef.current !== null) {
            window.clearTimeout(collapseTimerRef.current);
            collapseTimerRef.current = null;
          }
          setIsCollapsed(false);
        }
        
        // Save scroll direction for next comparison
        lastScrollDirectionRef.current = scrollDirection;
        
        // Update last scroll position
        setLastScrollY(currentScrollY);
        
        // Determine active section based on scroll position
        const sections = navItems.map(item => item.href.substring(1));
        const scrollPosition = currentScrollY + 300; // Offset for better UX
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              setActiveSection(section);
              break;
            }
          }
        }
      });
    };
    
    // Passive true for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up all timeouts
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      if (collapseTimerRef.current !== null) {
        window.clearTimeout(collapseTimerRef.current);
      }
    };
  }, [lastScrollY, windowWidth]); // Add windowWidth as dependency

  // Determine if logo/name should be shown on mobile (only hide when collapse AND on mobile)
  const showLogoOnMobile = !isCollapsed || windowWidth >= 768;
  // Determine if right section should be shown (only hide when collapse AND on mobile)
  const showRightSection = !isCollapsed || windowWidth >= 768;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all',
        isScrolled
          ? 'py-2 sm:py-3'
          : 'py-3 sm:py-5'
      )}
      style={{ willChange: 'transform, padding', transitionDuration: isScrolling ? '200ms' : '400ms' }}
    >
      <div className="container mx-auto px-4 flex justify-center">
        {/* Professional, centered pill navbar */}
        <motion.div 
          className={cn(
            'flex items-center justify-between backdrop-blur-md rounded-full w-full',
            isScrolled
              ? 'bg-white/95 dark:bg-black/75 shadow-md border border-white/20 dark:border-white/20'
              : 'bg-white/90 dark:bg-black/60 shadow-lg border border-white/30 dark:border-white/30',
          )}
          initial={{ y: -100 }}
          style={{ willChange: 'transform, width, padding' }}
          animate={{
            y: 0,
            width: windowWidth < 768 ? '100%' : (isCollapsed ? 'auto' : '100%'),
            maxWidth: windowWidth < 768 ? '100%' : (isCollapsed ? 'auto' : '1000px'),
            paddingLeft: windowWidth < 768 ? '1rem' : (isCollapsed ? '0.625rem' : '1.5rem'),
            paddingRight: windowWidth < 768 ? '1rem' : (isCollapsed ? '0.625rem' : '1.5rem'),
            paddingTop: windowWidth < 768 ? '0.5rem' : (isCollapsed ? '0.375rem' : '0.55rem'),
            paddingBottom: windowWidth < 768 ? '0.5rem' : (isCollapsed ? '0.375rem' : '0.55rem'),
          }}
          transition={{
            type: isScrolling ? 'tween' : 'spring', 
            stiffness: 150, 
            damping: 25, 
            mass: 1, 
            duration: isScrolling ? 0.1 : 0.5
          }}
          whileHover={{ y: isCollapsed && windowWidth >= 768 ? -3 : 0, transition: { duration: 0.2 } }}
        >
          {/* Logo/Name section - always visible on mobile */}
          <motion.div 
            className={cn(
              "flex-1",
              windowWidth < 768 && !showLogoOnMobile ? "hidden" : "block"
            )}
            style={{ willChange: 'opacity, transform' }}
            animate={{ 
              opacity: windowWidth < 768 ? 1 : (isCollapsed ? 0 : 1),
              scale: windowWidth < 768 ? 1 : (isCollapsed ? 0 : 1),
              width: windowWidth < 768 ? 'auto' : (isCollapsed ? 0 : 'auto'),
              flexBasis: windowWidth < 768 ? '40%' : (isCollapsed ? '0%' : '35%'),
              height: windowWidth < 768 ? 'auto' : (isCollapsed ? 0 : 'auto'),
            }}
            transition={{ 
              duration: isScrolling ? 0.1 : 0.4, 
              ease: 'easeInOut',
              opacity: { duration: isScrolling ? 0.1 : 0.3 }
            }}
          >
            <motion.a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                const homeSection = document.getElementById('home');
                if (homeSection) {
                  homeSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative font-display font-bold text-gray-900 dark:text-white/80 group text-lg sm:text-xl md:text-2xl"
            >
              <span className="bg-gradient-to-r from-black to-black/80 dark:from-white/80 dark:to-white/80 bg-clip-text text-transparent truncate">Taheer Ahmed</span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-white/20 to-black/20 group-hover:w-full transition-all duration-300"
                whileHover={{ width: '100%' }}
              />
            </motion.a>
          </motion.div>

          {/* Desktop Nav - Pill Style - Only on desktop */}
          <motion.div 
            className={cn(
              "items-center rounded-full overflow-hidden flex-shrink-0 mx-auto",
              windowWidth < 768 ? "hidden" : "flex"
            )}
            style={{ willChange: 'transform' }}
            animate={{ 
              padding: '0.375rem',
              scale: isCollapsed ? 1.03 : 1
            }}
            transition={{ 
              duration: isScrolling ? 0.1 : 0.4, 
              ease: 'easeInOut'  
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = item.href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={cn(
                    'relative rounded-full font-medium transition-all',
                    isActive
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
                    isCollapsed 
                      ? 'px-3 sm:px-4 py-1.5 text-sm font-semibold'
                      : 'px-3 sm:px-4 py-1.5 text-sm'
                  )}
                  whileHover={{ scale: isActive ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.span 
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-black/80 to-gray-800/70 dark:from-white/50 dark:to-white/30 -z-10"
                      layoutId="navbar-pill"
                      style={{ willChange: 'transform' }}
                      transition={{ 
                        type: isScrolling ? 'tween' : 'spring', 
                        stiffness: 300, 
                        damping: 30, 
                        mass: 0.8,
                        duration: isScrolling ? 0.1 : 0.3 
                      }}
                    />
                  )}
                  {item.name}
                </motion.a>
              );
            })}
          </motion.div>

          {/* Right section - conditionally shown based on mobile/desktop */}
          <motion.div 
            className={cn(
              "flex justify-end",
              windowWidth < 768 && !showRightSection ? "flex-1" : "flex-1"
            )}
            style={{ willChange: 'opacity, transform' }}
            animate={{ 
              opacity: windowWidth < 768 ? 1 : (isCollapsed ? 0 : 1),
              scale: windowWidth < 768 ? 1 : (isCollapsed ? 0 : 1),
              width: windowWidth < 768 ? 'auto' : (isCollapsed ? 0 : 'auto'),
              flexBasis: windowWidth < 768 ? '60%' : (isCollapsed ? '0%' : '25%'),
            }}
            transition={{ 
              duration: isScrolling ? 0.1 : 0.4, 
              ease: 'easeInOut',
              opacity: { duration: isScrolling ? 0.1 : 0.3 }
            }}
          >
            {/* Right-side container with social links and buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 justify-end w-full">
              {/* Social Links - hidden on mobile */}
              <div className="hidden md:flex items-center space-x-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="rounded-full text-black dark:text-yellow-600 backdrop-blur-sm shadow-md flex items-center justify-center p-1.5 sm:p-2"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>

              {/* Mobile Menu Button - only show on mobile */}
              <motion.button
                className="rounded-full md:hidden bg-gray-100/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 backdrop-blur-sm shadow-md flex items-center justify-center p-1.5 sm:p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu - Pill Styled */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute left-0 right-0 mt-2 mx-12 bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 z-50"
          >
            <div className="p-4 sm:p-5">
              <nav className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const targetId = item.href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                          targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        'py-2.5 px-2 font-medium transition-all duration-300',
                        isActive
                          ? 'text-dark-primary dark:text-dark-primary'
                          : 'text-gray-800 dark:text-gray-300'
                      )}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {isActive && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-dark-primary dark:from-dark-primary to-dark-secondary dark:to-dark-secondary"
                          />
                        )}
                      </div>
                    </motion.a>
                  );
                })}

                <motion.div 
                  className="flex space-x-4 pt-4 mt-2 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100/80 dark:bg-gray-800/80 rounded-full text-gray-700 dark:text-gray-300 hover:text-dark-primary dark:hover:text-dark-primary transition-colors"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      whileHover={{ y: -2, scale: 1.1 }}
                    >
                      {iconMap[link.icon]}
                    </motion.a>
                  ))}
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};