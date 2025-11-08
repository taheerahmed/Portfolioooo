import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../data/experience';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper to parse duration into dates
const parseDuration = (duration: string) => {
  const parts = duration.split(' - ');
  return {
    start: parts[0].trim(),
    end: parts[1]?.trim() || 'Present',
  };
};

// Color palette for different experiences
const glowColors = [
  { from: 'from-blue-500', to: 'to-cyan-500', shadow: 'shadow-blue-500/50' },
  { from: 'from-purple-500', to: 'to-pink-500', shadow: 'shadow-purple-500/50' },
  { from: 'from-orange-500', to: 'to-red-500', shadow: 'shadow-orange-500/50' },
  { from: 'from-green-500', to: 'to-emerald-500', shadow: 'shadow-green-500/50' },
  { from: 'from-yellow-500', to: 'to-amber-500', shadow: 'shadow-yellow-500/50' },
];

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredDate, setHoveredDate] = useState<{ id: number; type: 'start' | 'end' } | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

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

      // Animate each experience card
      const cards = gsap.utils.toArray('.experience-card');
      cards.forEach((card: any) => {
        // Card entrance animation
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Animate skills
        const skills = card.querySelectorAll('.skill-tag');
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
              trigger: card,
              start: 'top 70%',
            },
          }
        );

        // Animate achievements
        const achievements = card.querySelectorAll('.achievement-item');
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
              trigger: card,
              start: 'top 60%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-white dark:bg-black py-20 md:py-32"
    >
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-20 md:mb-32">
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
            My professional journey building impactful products
          </p>
        </motion.div>
      </div>

      {/* Experience Cards */}
      <div className="container mx-auto px-6 md:px-12 space-y-12 md:space-y-20">
        {experiences.map((experience, index) => {
          const dates = parseDuration(experience.duration);
          const colors = glowColors[index % glowColors.length];
          const isExpanded = expandedId === experience.id;

          return (
            <div
              key={experience.id}
              className="experience-card max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column - Dates */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Start Date with Glow */}
                  <motion.div
                    className="relative group cursor-default"
                    onMouseEnter={() => setHoveredDate({ id: experience.id, type: 'start' })}
                    onMouseLeave={() => setHoveredDate(null)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-2 font-medium">
                      Started
                    </div>
                    <div className={`text-6xl md:text-7xl lg:text-8xl font-black text-black dark:text-white leading-none transition-all duration-500 ${
                      hoveredDate?.id === experience.id && hoveredDate?.type === 'start'
                        ? `bg-gradient-to-r ${colors.from} ${colors.to} bg-clip-text text-transparent`
                        : ''
                    }`}>
                      {dates.start}
                    </div>
                    {/* Glow Effect */}
                    {hoveredDate?.id === experience.id && hoveredDate?.type === 'start' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`absolute inset-0 bg-gradient-to-r ${colors.from} ${colors.to} opacity-20 blur-3xl -z-10`}
                      />
                    )}
                  </motion.div>

                  {/* Separator */}
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
                    <span className="text-gray-400 dark:text-gray-600 text-sm">to</span>
                    <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
                  </div>

                  {/* End Date with Glow */}
                  <motion.div
                    className="relative group cursor-default"
                    onMouseEnter={() => setHoveredDate({ id: experience.id, type: 'end' })}
                    onMouseLeave={() => setHoveredDate(null)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-2 font-medium">
                      {dates.end === 'Present' ? 'Current' : 'Ended'}
                    </div>
                    <div className={`text-6xl md:text-7xl lg:text-8xl font-black text-black dark:text-white leading-none transition-all duration-500 ${
                      hoveredDate?.id === experience.id && hoveredDate?.type === 'end'
                        ? `bg-gradient-to-r ${colors.from} ${colors.to} bg-clip-text text-transparent`
                        : ''
                    }`}>
                      {dates.end}
                    </div>
                    {/* Glow Effect */}
                    {hoveredDate?.id === experience.id && hoveredDate?.type === 'end' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`absolute inset-0 bg-gradient-to-r ${colors.from} ${colors.to} opacity-20 blur-3xl -z-10`}
                      />
                    )}
                  </motion.div>

                  {/* Company Logo & Location */}
                  <motion.div
                    className="space-y-4"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-black dark:border-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <img
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {experience.location && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{experience.location}</span>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Right Column - Content */}
                <div className="lg:col-span-8 space-y-6 md:space-y-8">
                  {/* Role & Company */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white mb-3 leading-tight tracking-tight">
                      {experience.role}
                    </h3>
                    <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                      {experience.company}
                    </div>
                  </motion.div>

                  {/* Description */}
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    {experience.description}
                  </p>

                  {/* View More Toggle */}
                  <motion.button
                    onClick={() => setExpandedId(isExpanded ? null : experience.id)}
                    className="group flex items-center gap-2 text-black dark:text-white font-medium hover:gap-3 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{isExpanded ? 'View Less' : 'View More'}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </motion.button>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 md:space-y-8 overflow-hidden"
                      >
                        {/* Achievements */}
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4 font-medium">
                            Key Achievements
                          </h4>
                          <div className="space-y-3">
                            {experience.achievements.map((achievement, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="achievement-item flex items-start gap-3 text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300"
                              >
                                <span className="text-black dark:text-white font-bold flex-shrink-0 text-lg">→</span>
                                <span>{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4 font-medium">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2 md:gap-3">
                            {experience.skills.map((skill, i) => (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="skill-tag px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm lg:text-base bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg border-2 border-black dark:border-white cursor-default"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Divider (except for last item) */}
              {index < experiences.length - 1 && (
                <div className="mt-12 md:mt-20 border-t border-gray-200 dark:border-gray-800" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
