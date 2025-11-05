import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../../data/testimonials';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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
      if (sectionRef.current) {
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
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        duration: 0.5,
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
            What colleagues and clients say about working with me.
          </p>
        </div>

        {/* Testimonial slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[300px] overflow-hidden">
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
                <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 md:p-12 h-full flex flex-col justify-between">
                  <div>
                    <Quote className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-6" />
                    <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
                      {testimonials[activeIndex].text}
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                      <img
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-black dark:text-white text-lg">
                        {testimonials[activeIndex].name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:shadow-xl transition-shadow"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-black dark:bg-white w-8'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:shadow-xl transition-shadow"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
