import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill bars on scroll
      if (skillsRef.current) {
        const bars = skillsRef.current.querySelectorAll('.skill-bar');
        bars.forEach((bar) => {
          const level = bar.getAttribute('data-level');
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${level}%`,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            I'm a passionate software engineer with 6+ years of experience building scalable web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column - Description */}
          <div>
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
              <p>
                I specialize in creating robust, scalable applications using modern technologies.
                My journey in tech started with a Computer Science degree, but my love for solving
                complex problems through code has driven me to continuously learn and master new
                technologies.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new frameworks, contributing to
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <div className="text-4xl font-bold text-black dark:text-white mb-2">6+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-black dark:text-white mb-2">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-black dark:text-white mb-2">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Right column - Skills */}
          <div ref={skillsRef}>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8">
              Technical Skills
            </h3>

            <div className="space-y-6">
              {skills.slice(0, 6).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-500">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="skill-bar h-full bg-black dark:bg-white rounded-full"
                      data-level={skill.level}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
