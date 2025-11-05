import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../../data/testimonials';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate preview cards
      const previews = gsap.utils.toArray('.preview-card');
      previews.forEach((card: any, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.1 * index,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
        ease: [0.32, 0.72, 0, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: [0.32, 0.72, 0, 1],
      },
    }),
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            Testimonials
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            What people say about working with me.
          </p>
        </div>

        {/* Main carousel */}
        <div ref={carouselRef} className="max-w-6xl mx-auto">
          <div className="relative h-[500px] mb-16 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="bg-gray-50 dark:bg-gray-950 rounded-3xl p-8 md:p-16 h-full flex flex-col justify-center">
                  {/* Quote */}
                  <div className="mb-12">
                    <div className="text-8xl text-gray-200 dark:text-gray-800 leading-none mb-8">"</div>
                    <blockquote className="text-3xl md:text-4xl text-gray-800 dark:text-gray-200 leading-relaxed font-light">
                      {testimonials[activeIndex].text}
                    </blockquote>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-black">
                        <img
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-black dark:text-white mb-1">
                        {testimonials[activeIndex].name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-lg">
                        {testimonials[activeIndex].role}
                      </div>
                      <div className="text-gray-500 dark:text-gray-500">
                        {testimonials[activeIndex].company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {/* Preview cards */}
            <div className="hidden md:flex gap-4 flex-1">
              {testimonials.slice(0, 3).map((testimonial, index) => {
                const actualIndex = (activeIndex + index) % testimonials.length;
                const isActive = index === 0;

                return (
                  <button
                    key={testimonial.id}
                    onClick={() => {
                      setDirection(actualIndex > activeIndex ? 1 : -1);
                      setActiveIndex(actualIndex);
                    }}
                    className={`preview-card flex-1 p-4 rounded-xl transition-all duration-300 text-left ${
                      isActive
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={testimonials[actualIndex].image}
                          alt={testimonials[actualIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm font-bold truncate">
                        {testimonials[actualIndex].name}
                      </div>
                    </div>
                    <div className="text-xs line-clamp-2">
                      {testimonials[actualIndex].text}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-4 md:ml-8">
              <button
                onClick={handlePrev}
                className="w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Dots indicator (mobile) */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 h-2 bg-black dark:bg-white'
                    : 'w-2 h-2 bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
