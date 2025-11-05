import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../data/experience';
import { Calendar, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animate experience cards
      const cards = gsap.utils.toArray('.experience-card');

      cards.forEach((card: any, index) => {
        const isLeft = index % 2 === 0;

        // Card slide in
        gsap.fromTo(
          card,
          {
            x: isLeft ? -100 : 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Animate timeline dot
        const dot = card.querySelector('.timeline-dot');
        if (dot) {
          gsap.fromTo(
            dot,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Animate logo
        const logo = card.querySelector('.company-logo');
        if (logo) {
          gsap.fromTo(
            logo,
            {
              rotationY: 180,
              opacity: 0,
            },
            {
              rotationY: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            My professional journey in tech.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center line */}
          <div
            ref={timelineRef}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2 origin-top hidden md:block"
          />

          {/* Experience items */}
          <div className="space-y-16">
            {experiences.map((experience, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={experience.id}
                  className={`experience-card relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                    isLeft ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-black dark:bg-white rounded-full border-4 border-gray-50 dark:border-gray-950 z-10 hidden md:block" />

                  {/* Content card */}
                  <div className={isLeft ? 'md:pr-12' : 'md:pl-12 md:col-start-2'}>
                    <div className="bg-white dark:bg-black p-8 rounded-2xl shadow-lg">
                      <div className="flex items-start gap-6 mb-6">
                        <div
                          className="company-logo w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-900 flex-shrink-0"
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <img
                            src={experience.logo}
                            alt={`${experience.company} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                            {experience.role}
                          </h3>
                          <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                            {experience.company}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {experience.duration}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {experience.description}
                      </p>

                      <AnimatePresence>
                        {expandedId === experience.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800"
                          >
                            <h4 className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">
                              Key Achievements
                            </h4>
                            <ul className="space-y-3 mb-6">
                              {experience.achievements.map((achievement, i) => (
                                <li
                                  key={i}
                                  className="text-gray-700 dark:text-gray-300 pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-black before:dark:text-white"
                                >
                                  {achievement}
                                </li>
                              ))}
                            </ul>

                            <h4 className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {experience.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => toggleExpand(experience.id)}
                        className="mt-6 flex items-center gap-2 text-black dark:text-white hover:gap-3 transition-all"
                      >
                        <span>{expandedId === experience.id ? 'Show less' : 'Show more'}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            expandedId === experience.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Empty column for spacing */}
                  <div className={isLeft ? 'md:col-start-2' : 'md:col-start-1'} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
