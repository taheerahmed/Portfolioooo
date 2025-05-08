import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Code, Server, Database, GitBranch, FileCode, Globe, Cloud, Layers, Smartphone, Cpu, Figma } from 'lucide-react';
import { Button } from '../ui/Button';
import { fadeIn, textVariant, staggerContainer } from '../../utils/motion';
import { useTheme } from '../../context/ThemeContext';

// Skills for typing animation
const skills = ['Full Stack Developer', 'React Specialist', 'Cloud Architect', 'UI/UX Enthusiast'];

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const [currentSkill, setCurrentSkill] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  // Enhanced skill chips with vibrant gradients and custom colors for the dynamic animation
  const techSkills = [
    { 
      name: 'React', 
      icon: <Code className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-blue-500 to-blue-600',
      shadowColor: 'rgba(59, 130, 246, 0.4)' 
    },
    { 
      name: 'TypeScript', 
      icon: <FileCode className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-blue-600 to-blue-700',
      shadowColor: 'rgba(37, 99, 235, 0.4)' 
    },
    { 
      name: 'Node.js', 
      icon: <Server className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-green-500 to-green-600',
      shadowColor: 'rgba(34, 197, 94, 0.4)' 
    },
    { 
      name: 'AWS', 
      icon: <Cloud className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-orange-400 to-orange-500',
      shadowColor: 'rgba(251, 146, 60, 0.4)' 
    },
    { 
      name: 'UI/UX', 
      icon: <Smartphone className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-purple-500 to-purple-600',
      shadowColor: 'rgba(168, 85, 247, 0.4)' 
    },
    { 
      name: 'GraphQL', 
      icon: <Globe className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-pink-500 to-pink-600',
      shadowColor: 'rgba(236, 72, 153, 0.4)' 
    },
    { 
      name: 'MongoDB', 
      icon: <Database className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-green-600 to-green-700',
      shadowColor: 'rgba(22, 163, 74, 0.4)' 
    },
    { 
      name: 'Docker', 
      icon: <Layers className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-blue-600 to-blue-700',
      shadowColor: 'rgba(37, 99, 235, 0.4)' 
    },
    { 
      name: 'Next.js', 
      icon: <Cpu className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-gray-800 to-black',
      shadowColor: 'rgba(0, 0, 0, 0.4)' 
    },
    { 
      name: 'TailwindCSS', 
      icon: <Cpu className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-teal-500 to-teal-600',
      shadowColor: 'rgba(20, 184, 166, 0.4)' 
    },
    { 
      name: 'Git', 
      icon: <GitBranch className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-red-500 to-red-600',
      shadowColor: 'rgba(239, 68, 68, 0.4)' 
    },
    { 
      name: 'Figma', 
      icon: <Figma className="ml-1.5 w-4 h-4 text-white" />, 
      gradient: 'from-purple-600 to-purple-700',
      shadowColor: 'rgba(147, 51, 234, 0.4)' 
    }
  ];
  
  // Company logos for the brand carousel
  const companyLogos = [
    '/assets/logos/amazon.svg',
    '/assets/logos/google.svg',
    '/assets/logos/microsoft.svg',
    '/assets/logos/netflix.svg',
    '/assets/logos/adobe.svg',
    '/assets/logos/meta.svg',
    '/assets/logos/ibm.svg',
    '/assets/logos/salesforce.svg'
  ];
  
  // For multiple dynamic skill chips
  const [activeSkillIndices, setActiveSkillIndices] = useState([
    { index: 0, showState: true },
    { index: 1, showState: true },
    { index: 2, showState: true },
    { index: 3, showState: true },
  ]);

  // Tech stack carousel effect for all skill chips with smoother transitions
  useEffect(() => {
    // Staggered intervals for each chip
    const intervals = activeSkillIndices.map((_, index) => {
      return window.setInterval(() => {
        // Update a copy of the state to avoid direct mutation
        setActiveSkillIndices(prev => {
          const newIndices = [...prev];
          
          // First hide the current chip
          newIndices[index] = { ...newIndices[index], showState: false };
          
          // After a short delay, change the index and show it again
          setTimeout(() => {
            setActiveSkillIndices(prevState => {
              const updatedIndices = [...prevState];
              const newIndex = (updatedIndices[index].index + 4) % techSkills.length;
              updatedIndices[index] = { index: newIndex, showState: true };
              return updatedIndices;
            });
          }, 300);
          
          return newIndices;
        });
      }, 3000 + (index * 900)); // Slightly longer intervals and more staggered
    });
    
    // Clean up function to clear intervals
    return () => {
      intervals.forEach(id => window.clearInterval(id));
    };
  }, []);
  
  // Typing effect for the "I'm a..." headline
  useEffect(() => {
    const skill = skills[currentSkill];
    const type = () => {
      if (isDeleting) {
        setText(skill.substring(0, text.length - 1));
      } else {
        setText(skill.substring(0, text.length + 1));
      }

      // Typing speed
      if (!isDeleting && text === skill) {
        // Wait after typing
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

  return (
    <section id="home" className="py-24relative h-screen flex items-center bg-white dark:bg-black">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-cyberpunk-grid dark:bg-cyberpunk-grid bg-[size:40px_40px] opacity-10"></div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      {/* Terminal-like line accents */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      {/* <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div> */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div>

      {/* Main content container */}
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-12">
          {/* Left column - Text content */}
          <div>
            <div className="flex flex-col items-start space-y-3">
              <motion.h1 
                className="font-mono text-5xl lg:text-7xl font-bold text-black dark:text-white relative inline-block"
                variants={textVariant(0.2)}
                initial="hidden"
                animate="show"
              >
                &lt;Hello /&gt; I'm <span className="text-dark-primary dark:text-dark-primary">Taheer</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
              </motion.h1>
              
              <motion.div 
                className="text-xl lg:text-2xl font-mono text-black/80 dark:text-white/80 h-8 flex items-center"
                variants={textVariant(0.3)}
                initial="hidden"
                animate="show"
              >
                <span className="text-green-600 dark:text-green-400 mr-2">$ </span>
                <span>role = </span>
                <span className="text-blue-600 dark:text-blue-400 mx-1">"{text}"</span>
                <motion.span 
                  className="inline-block w-2 h-5 bg-black dark:bg-white ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </div>
            
            <motion.div
              variants={fadeIn('up', 'tween', 0.3, 1)}
              initial="hidden"
              animate="show"
              className="mb-8"
            >
              <p className="text-lg text-black/80 dark:text-white/80 max-w-xl mb-4 border-l-2 border-black/30 dark:border-white/30 pl-3 font-mono">
                // Building elegant solutions to complex problems with clean code and user-centered design. Passionate about creating software that makes a difference.
              </p>
              
              {/* Skills Section */}
              <div className="mt-8">
                <h3 className="font-mono font-bold text-black dark:text-white mb-4 relative inline-block">
                  &lt;Skills /&gt;
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  />
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 mt-4">
                  {activeSkillIndices.map((activeSkill, idx) => (
                    <motion.div 
                      key={`skill-${idx}`}
                      className="relative flex justify-center items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <AnimatePresence mode="wait">
                        {activeSkill.showState && (
                          <motion.div
                            key={`skill-content-${activeSkill.index}-${idx}`}
                            className={`flex items-center justify-center space-x-1.5 w-full bg-gradient-to-r ${techSkills[activeSkill.index].gradient} text-white py-2 px-4 rounded-full text-sm font-medium backdrop-blur`}
                            style={{ 
                              height: '38px', 
                              width: '120px',
                              boxShadow: `0 4px 14px ${techSkills[activeSkill.index].shadowColor}`
                            }}
                            initial={{ rotateX: 90, opacity: 0, scale: 0.8 }}
                            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
                            exit={{ rotateX: -90, opacity: 0, scale: 0.8 }}
                            transition={{ 
                              duration: 0.6, 
                              ease: [0.19, 1, 0.22, 1],
                              opacity: { duration: 0.4 }
                            }}
                            whileHover={{ 
                              y: -5, 
                              boxShadow: `0 10px 25px ${techSkills[activeSkill.index].shadowColor}`,
                              transition: { duration: 0.2, ease: 'easeOut' } 
                            }}
                          >
                            <span className="flex items-center">
                              {techSkills[activeSkill.index].name}{techSkills[activeSkill.index].icon}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Contributions Section */}
              <div className="mt-8">
                <h3 className="font-mono font-bold text-black dark:text-white mb-4 relative inline-block">
                  &lt;Contributions /&gt;
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  />
                </h3>
                <div className="relative w-full max-w-xl overflow-hidden rounded-lg p-1 shadow-sm dark:shadow-code-block dark:shadow-inner-glow">
                  <div className='flex items-center justify-center text-lg font-mono text-black/70 dark:text-white/70 py-2'>
                    // Organisations I've contributed to
                  </div>
                  <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-black to-transparent z-10"></div>
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-black to-transparent z-10"></div>
                  
                  <motion.div
                    className="flex items-center gap-8 py-3"
                    animate={{ x: ["-10%", "-60%"] }}
                    transition={{ 
                      duration: 25, 
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear"
                    }}
                  >
                    {/* Duplicate logos to create seamless loop */}
                    {[...companyLogos, ...companyLogos].map((logo, index) => (
                      <div key={`logo-${index}`} className="w-20 h-14 flex-shrink-0 flex items-center justify-center bg-white/40 dark:bg-black/40 rounded-md p-2 transition-all duration-300 hover:shadow-md">
                        <motion.img 
                          src={logo} 
                          alt="Company logo" 
                          className="w-full h-full object-contain opacity-75 dark:opacity-90 filter grayscale hover:grayscale-0 transition-all duration-300"
                          whileHover={{ opacity: 1, scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-4"
            >
              <Button 
                variant="primary" 
                size="lg" 
                className="px-6 relative overflow-hidden group bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white"
              >
                <span className="relative z-10 font-mono">projects.view()</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-black/50 dark:border-white/50 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300"
              >
                <span className="font-mono">resume.download()</span>
              </Button>
            </motion.div>
          </div>
          
          {/* Right column - Animated profile */}
          <motion.div
            variants={fadeIn('left', 'tween', 0.5, 1)}
            initial="hidden"
            animate="show"
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-80 h-80">
              {/* Tech icons floating around */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white p-4 rounded-full shadow-sm dark:shadow-code-block animate-code-pulse"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ 
                  scale: 1.2, 
                  boxShadow: theme === 'dark' ? '0 0 20px 5px rgba(255, 255, 255, 0.3)' : '0 0 10px 2px rgba(0, 0, 0, 0.15)',
                  transition: { duration: 0.2 }
                }}
              >
                <Code className="w-8 h-8 text-white dark:text-black animate-glitch" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-10 left-0 bg-black dark:bg-white p-4 rounded-full shadow-sm dark:shadow-code-block animate-code-pulse"
                animate={{ 
                  x: [0, -15, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ 
                  x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }
                }}
                whileHover={{ 
                  scale: 1.2, 
                  boxShadow: theme === 'dark' ? '0 0 20px 5px rgba(255, 255, 255, 0.3)' : '0 0 10px 2px rgba(0, 0, 0, 0.15)',
                  transition: { duration: 0.2 }
                }}
              >
                <Server className="w-8 h-8 text-white dark:text-black animate-glitch" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/4 right-0 bg-black dark:bg-white p-4 rounded-full shadow-sm dark:shadow-code-block animate-code-pulse"
                animate={{ 
                  x: [0, 15, 0],
                  rotate: [0, 5, -5, 0], 
                }}
                transition={{ 
                  x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 },
                  rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                whileHover={{ 
                  scale: 1.2, 
                  boxShadow: theme === 'dark' ? '0 0 20px 5px rgba(255, 255, 255, 0.3)' : '0 0 10px 2px rgba(0, 0, 0, 0.15)',
                  transition: { duration: 0.2 }
                }}
              >
                <Database className="w-8 h-8 text-white dark:text-black animate-glitch" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-0 right-1/4 bg-black dark:bg-white p-4 rounded-full shadow-sm dark:shadow-code-block animate-code-pulse"
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 },
                  rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }
                }}
                whileHover={{ 
                  scale: 1.2, 
                  boxShadow: theme === 'dark' ? '0 0 20px 5px rgba(255, 255, 255, 0.3)' : '0 0 10px 2px rgba(0, 0, 0, 0.15)',
                  transition: { duration: 0.2 }
                }}
              >
                <GitBranch className="w-8 h-8 text-white dark:text-black animate-glitch" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-1/4 right-1/2 transform translate-x-1/2 bg-black dark:bg-white p-4 rounded-full shadow-sm dark:shadow-code-block animate-code-pulse"
                animate={{ 
                  y: [0, 15, 0] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: 4 
                }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
              >
                <Cloud className="w-8 h-8 text-white dark:text-black animate-glitch" />
              </motion.div>
              
              {/* Modern profile image with subtle animation */}
              <div className="absolute inset-0 m-auto w-48 h-48 rounded-full flex items-center justify-center">
                {/* Gradient background */}
                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden border-2 border-black dark:border-white"
                  animate={{
                    boxShadow: [
                      theme === 'dark' ? '0 0 10px 2px rgba(255, 255, 255, 0.25)' : '0 0 5px 1px rgba(0, 0, 0, 0.15)',
                      theme === 'dark' ? '0 0 25px 8px rgba(255, 255, 255, 0.4)' : '0 0 12px 4px rgba(0, 0, 0, 0.2)',
                      theme === 'dark' ? '0 0 10px 2px rgba(255, 255, 255, 0.25)' : '0 0 5px 1px rgba(0, 0, 0, 0.15)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 bg-black dark:bg-white"></div>
                </motion.div>
                
                {/* Elegant rings */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={`ring-${i}`}
                    className="absolute rounded-full border border-white opacity-40"
                    style={{
                      width: `${100 + (i * 30)}%`,
                      height: `${100 + (i * 30)}%`,
                    }}
                    animate={{
                      rotate: [0, 180],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 12 - (i * 3),
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
                
                <motion.div 
                  className="z-10 text-white dark:text-black text-4xl font-mono font-bold overflow-hidden whitespace-nowrap"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span>JD</span>
                  <motion.span 
                    className="inline-block w-2 h-6 bg-white dark:bg-black ml-1 align-middle"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.a
        href="#projects"
        onClick={(e) => {
          e.preventDefault();
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-gray-400"
        animate={{
          y: [0, 12, 0],
          filter: ['drop-shadow(0 0 0px rgba(255, 255, 255, 0))', 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))', 'drop-shadow(0 0 0px rgba(255, 255, 255, 0))'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        whileHover={{
          scale: 1.15,
          color: '#ffffff',
          filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))'
        }}
      >
        <motion.div
          className="relative w-6 h-6 overflow-visible"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6" />
          <motion.div 
            className="absolute inset-0 rounded-full bg-white dark:bg-white opacity-20"
            animate={{ 
              scale: [0.8, 2, 0.8], 
              opacity: [0.3, 0, 0.3] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
          />
        </motion.div>
      </motion.a>
    </section>
  );
};
