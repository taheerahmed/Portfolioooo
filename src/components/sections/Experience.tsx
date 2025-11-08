import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../../data/experience';
import { Calendar, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
      cards.forEach((card: any, index) => {
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
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className="experience-card max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column - Meta */}
              <div className="lg:col-span-4 space-y-6">
                {/* Number */}
                <div className="text-[100px] md:text-[140px] lg:text-[180px] font-black text-black/5 dark:text-white/5 leading-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Company Logo */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-black dark:border-white">
                  <img
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Meta Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-5 h-5 flex-shrink-0" />
                    <span className="text-base md:text-lg">{experience.duration}</span>
                  </div>
                  {experience.location && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-5 h-5 flex-shrink-0" />
                      <span className="text-base md:text-lg">{experience.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="lg:col-span-8 space-y-6 md:space-y-8">
                {/* Role & Company */}
                <div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white mb-3 leading-tight tracking-tight">
                    {experience.role}
                  </h3>
                  <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                    {experience.company}
                  </div>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
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
                        className="achievement-item flex items-start gap-3 text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-black dark:text-white font-bold flex-shrink-0 text-lg">→</span>
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
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-tag px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm lg:text-base bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg border-2 border-black dark:border-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider (except for last item) */}
            {index < experiences.length - 1 && (
              <div className="mt-12 md:mt-20 border-t border-gray-200 dark:border-gray-800" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
