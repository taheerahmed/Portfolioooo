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

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        const items = sectionRef.current.querySelectorAll('.experience-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
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

  return (
    <section ref={sectionRef} id="experience" className="py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            My journey in the tech industry, building products and leading teams.
          </p>
        </div>

        {/* Experience items */}
        <div className="max-w-4xl space-y-12">
          {experiences.map((experience) => (
            <div key={experience.id} className="experience-item">
              <div className="bg-white dark:bg-black rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-900 flex-shrink-0">
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
                    <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                      {experience.company}
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {experience.duration}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {experience.description}
                    </p>

                    <AnimatePresence>
                      {expandedId === experience.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6"
                        >
                          <h4 className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">
                            Key Achievements
                          </h4>
                          <ul className="space-y-2 mb-6">
                            {experience.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="text-gray-700 dark:text-gray-300 pl-6 relative before:content-['→'] before:absolute before:left-0"
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
                                className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-sm"
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
                      className="mt-6 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                    >
                      {expandedId === experience.id ? 'Show less' : 'Show more'}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedId === experience.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
