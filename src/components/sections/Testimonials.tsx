import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Draggable);

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D rotating cards on scroll
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.testimonial-card');

        cards.forEach((card, index) => {
          // Initial positioning
          gsap.set(card, {
            zIndex: testimonials.length - index,
          });

          // Parallax effect on scroll
          gsap.to(card, {
            y: index * 20,
            rotationY: index * 5,
            scale: 1 - index * 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          });

          // Hover effect
          (card as HTMLElement).addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              y: -10,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          (card as HTMLElement).addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1 - index * 0.05,
              y: index * 20,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      }

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
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (index: number) => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.testimonial-card');

      // Animate clicked card to front
      cards.forEach((card, cardIndex) => {
        if (cardIndex === index) {
          gsap.to(card, {
            zIndex: testimonials.length,
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        } else {
          const newIndex = cardIndex > index ? cardIndex - 1 : cardIndex + 1;
          gsap.to(card, {
            zIndex: testimonials.length - newIndex,
            scale: 1 - newIndex * 0.05,
            y: newIndex * 20,
            rotationY: newIndex * 5,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      });
    }
    setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-32 bg-gray-50 dark:bg-gray-950">
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

        {/* 3D stacked cards */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={cardsRef}
            className="relative h-[600px] md:h-[500px]"
            style={{ perspective: '2000px' }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="testimonial-card absolute inset-0 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => handleCardClick(index)}
              >
                <div className="bg-white dark:bg-black rounded-3xl p-8 md:p-12 h-full shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
                  {/* Quote */}
                  <div>
                    <div className="text-6xl text-gray-200 dark:text-gray-800 mb-6">"</div>
                    <blockquote className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                      {testimonial.text}
                    </blockquote>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-900">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Floating indicator for active card */}
                      {index === activeIndex && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 bg-black dark:bg-white rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        />
                      )}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-black dark:text-white mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                      <div className="text-gray-500 dark:text-gray-500 text-sm">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>

                  {/* Card number */}
                  <div className="absolute top-8 right-8 text-8xl font-bold text-gray-100 dark:text-gray-900">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-12 h-3 bg-black dark:bg-white'
                    : 'w-3 h-3 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
