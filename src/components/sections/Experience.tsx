import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../../data/experience';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const container = containerRef.current;
    const section = sectionRef.current;
    const panels = gsap.utils.toArray('.experience-panel');

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.experience-heading',
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.experience-heading',
            start: 'top 80%',
          },
        }
      );

      // Horizontal scroll animation
      const totalWidth = (panels.length - 1) * window.innerWidth;

      gsap.to(container, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Animate each panel's content on entry
      panels.forEach((panel: any, index) => {
        const content = panel.querySelectorAll('.panel-content');
        const skills = panel.querySelectorAll('.skill-tag');
        const achievements = panel.querySelectorAll('.achievement-item');

        gsap.fromTo(
          content,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getProperty(container, 'x') !== undefined ? ScrollTrigger.getById('main') : undefined,
              start: 'left center',
              end: 'right center',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          skills,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getProperty(container, 'x') !== undefined ? ScrollTrigger.getById('main') : undefined,
              start: 'left 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          achievements,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getProperty(container, 'x') !== undefined ? ScrollTrigger.getById('main') : undefined,
              start: 'left 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) {
          st.id = 'main';
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-white dark:bg-black overflow-hidden"
    >
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="experience-heading text-5xl md:text-7xl lg:text-8xl font-black text-black dark:text-white mb-6 tracking-tight leading-[0.9]">
            Experience
          </h2>
          <p className="experience-heading text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Scroll horizontally through my professional journey
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="h-screen flex items-center">
        <div
          ref={containerRef}
          className="flex"
        >
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="experience-panel w-screen h-screen flex items-center justify-center px-6 md:px-12 flex-shrink-0"
            >
              <div className="panel-content max-w-6xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column - Number & Meta */}
                  <div className="lg:col-span-4 space-y-8">
                    {/* Large Number */}
                    <div className="text-[140px] md:text-[200px] font-black text-black/5 dark:text-white/5 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Company Logo */}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-black dark:border-white">
                      <img
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-5 h-5" />
                        <span className="text-lg">{experience.duration}</span>
                      </div>
                      {experience.location && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <MapPin className="w-5 h-5" />
                          <span className="text-lg">{experience.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Navigation Hint */}
                    <div className="hidden lg:flex items-center gap-3 text-gray-400 dark:text-gray-600">
                      <span className="text-sm uppercase tracking-widest">Scroll</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Right Column - Content */}
                  <div className="lg:col-span-8 space-y-8 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
                    {/* Role & Company */}
                    <div>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-4 leading-tight tracking-tight">
                        {experience.role}
                      </h3>
                      <div className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 font-medium">
                        {experience.company}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4 font-medium">
                        Key Achievements
                      </h4>
                      <div className="space-y-3">
                        {experience.achievements.map((achievement, i) => (
                          <div
                            key={i}
                            className="achievement-item flex items-start gap-3 text-base md:text-lg text-gray-700 dark:text-gray-300"
                          >
                            <span className="text-black dark:text-white font-bold flex-shrink-0 text-xl">→</span>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4 font-medium">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {experience.skills.map((skill) => (
                          <span
                            key={skill}
                            className="skill-tag px-4 py-2 text-sm md:text-base bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl border-2 border-black dark:border-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {experiences.map((_, index) => (
          <div
            key={index}
            className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden"
          >
            <div className="progress-bar h-full bg-black dark:bg-white" />
          </div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
};
