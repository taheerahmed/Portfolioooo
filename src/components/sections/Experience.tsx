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
      // Heading animation with split reveal
      gsap.fromTo(
        '.experience-heading',
        {
          opacity: 0,
          y: 60,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.experience-heading',
            start: 'top 80%',
          },
        }
      );

      // Animate timeline line with liquid effect
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          {
            scaleY: 0,
            transformOrigin: 'top center',
          },
          {
            scaleY: 1,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );

        // Add glow effect that follows scroll
        gsap.to(timelineRef.current, {
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      }

      // Animate experience cards with advanced effects
      const cards = gsap.utils.toArray('.experience-card');

      cards.forEach((card: any, index) => {
        const isLeft = index % 2 === 0;

        // Create timeline for complex animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        // Card entrance with 3D rotation and slide
        tl.fromTo(
          card,
          {
            x: isLeft ? -150 : 150,
            opacity: 0,
            rotationY: isLeft ? -45 : 45,
            scale: 0.9,
          },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          }
        );

        // Animate timeline dot with pulse
        const dot = card.querySelector('.timeline-dot');
        if (dot) {
          tl.fromTo(
            dot,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'elastic.out(1.2, 0.5)',
            },
            '-=0.5'
          );

          // Add continuous pulse animation
          gsap.to(dot, {
            scale: 1.3,
            opacity: 0.7,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // Animate logo with 3D flip and scale
        const logo = card.querySelector('.company-logo');
        if (logo) {
          tl.fromTo(
            logo,
            {
              rotationY: 180,
              rotationX: 90,
              opacity: 0,
              scale: 0.5,
            },
            {
              rotationY: 0,
              rotationX: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'back.out(1.4)',
            },
            '-=0.7'
          );

          // Add hover effect
          logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
              rotationY: 360,
              scale: 1.1,
              duration: 0.8,
              ease: 'power2.out',
            });
          });
        }

        // Stagger content elements
        const contentElements = card.querySelectorAll('.content-element');
        tl.fromTo(
          contentElements,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.5'
        );

        // Parallax effect on scroll
        gsap.to(card, {
          y: isLeft ? 50 : -50,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // Card content reveal on scroll
        const cardContent = card.querySelector('.card-content');
        if (cardContent) {
          gsap.fromTo(
            cardContent,
            {
              clipPath: 'inset(0% 0% 100% 0%)',
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.2,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
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
        <div className="max-w-3xl mb-20" style={{ perspective: '1000px' }}>
          <h2 className="experience-heading text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            Experience
          </h2>
          <p className="experience-heading text-xl text-gray-600 dark:text-gray-400">
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
                    <div
                      className="card-content bg-white dark:bg-black p-8 rounded-2xl shadow-lg"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className="flex items-start gap-6 mb-6 content-element">
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

                      <p className="content-element text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
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
                        className="content-element mt-6 flex items-center gap-2 text-black dark:text-white hover:gap-3 transition-all"
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
