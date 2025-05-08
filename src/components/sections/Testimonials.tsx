import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { testimonials } from '../../data/testimonials';
import { ChevronLeft, ChevronRight, Quote, Terminal, Code, Braces } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-black relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-cyberpunk-grid dark:bg-cyberpunk-grid bg-[size:40px_40px] opacity-10"></div>
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      {/* Terminal-like line accents */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      {/* <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div> */}
      
      {/* Code elements as background decoration */}
      <Braces className="absolute top-20 left-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <Terminal className="absolute top-1/2 -translate-y-1/2 left-20 text-black/10 dark:text-white/10 w-12 h-12 hidden lg:block" />
      <Code className="absolute bottom-20 right-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionTitle 
          title="<Testimonials />" 
          subtitle="// What others say about working with me"
          align="center" 
        />
        
        <div className="relative max-w-4xl mx-auto">
          {/* Monochrome code-style quote marks */}
          <div className="absolute -top-6 -left-6 w-24 h-24 text-black dark:text-white opacity-10 animate-glitch">
            <Quote size={96} />
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 text-black dark:text-white opacity-10 transform rotate-180 animate-glitch">
            <Quote size={96} />
          </div>
          
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
                <Card className="w-full max-w-3xl px-8 py-12 bg-white dark:bg-black backdrop-blur-sm border border-black/30 dark:border-white/30 shadow-sm dark:shadow-code-block dark:shadow-inner-glow transition-colors duration-300 hover:border-blue-300 dark:hover:border-blue-700" interactive={false}>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                      <div className="w-full h-full rounded-none overflow-hidden border-2 border-black dark:border-white">
                        <img 
                          src={testimonials[activeIndex].image} 
                          alt={testimonials[activeIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 border-2 border-black dark:border-white opacity-50 animate-glitch"></div>
                    </div>
                    
                    <div>
                      <blockquote className="text-black/80 dark:text-white/80 text-lg mb-6 font-mono border-l-2 border-black/20 dark:border-white/20 pl-4">
                        <span className="font-mono text-black/50 dark:text-white/50">/*</span> {testimonials[activeIndex].text} <span className="font-mono text-black/50 dark:text-white/50">*/</span>
                      </blockquote>
                      
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-black dark:text-white text-lg">
                          const author = "{testimonials[activeIndex].name}";
                        </span>
                        <span className="text-black/70 dark:text-white/70 font-mono text-sm">
                          // {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation controls - terminal style */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              className="p-3 bg-white dark:bg-black border border-black/50 dark:border-white/50 shadow-sm dark:shadow-code-block dark:shadow-inner-glow hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
            </button>
            
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 ${index === activeIndex 
                    ? 'bg-black dark:bg-white' 
                    : 'border border-black/50 dark:border-white/50'}`}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              className="p-3 bg-white dark:bg-black border border-black/50 dark:border-white/50 shadow-sm dark:shadow-code-block dark:shadow-inner-glow hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-black dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};