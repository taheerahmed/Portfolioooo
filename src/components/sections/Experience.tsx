import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../../data/experience';
import { Calendar, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

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

      // Card stack animation
      cards.forEach((card, index) => {
        // Skip the last card as it doesn't need to scale out
        if (index < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top top',
              end: '+=100%',
              pin: true,
              pinSpacing: false,
              scrub: 1,
            },
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(8px)',
            transformOrigin: 'center center',
            ease: 'none',
          });
        } else {
          // Pin the last card
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: true,
          });
        }

        // Parallax effect on card content
        const content = card.querySelector('.card-content');
        if (content) {
          gsap.to(content, {
            y: -50,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }

        // Fade in animation when card comes into view
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Animate skills tags
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
            Journey through my professional career, building impactful products and leading talented teams.
          </p>
        </motion.div>
      </div>

      {/* Stacked Cards */}
      <div className="relative">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="sticky top-0 min-h-screen flex items-center py-20"
            style={{
              zIndex: experiences.length - index,
            }}
          >
            <div className="container mx-auto px-6 md:px-12">
              <div className="card-content max-w-6xl mx-auto">
                <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
                  {/* Header Section */}
                  <div className="mb-8 md:mb-12">
                    {/* Company Logo & Number */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-black dark:border-white flex-shrink-0">
                        <img
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-6xl md:text-8xl font-black text-black/5 dark:text-white/5 leading-none">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Role & Company */}
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-4 leading-tight tracking-tight">
                      {experience.role}
                    </h3>
                    <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4 font-medium">
                      {experience.company}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-500 dark:text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                      {experience.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-4xl">
                    {experience.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-8 md:mb-12">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-6 font-medium">
                      Key Achievements
                    </h4>
                    <div className="space-y-4">
                      {experience.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="achievement-item flex items-start gap-3 text-base md:text-lg text-gray-700 dark:text-gray-300"
                        >
                          <span className="text-black dark:text-white font-bold flex-shrink-0">→</span>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-6 font-medium">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {experience.skills.map((skill) => (
                        <span
                          key={skill}
                          className="skill-tag px-4 py-2 text-sm md:text-base bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg"
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
    </section>
  );
};
