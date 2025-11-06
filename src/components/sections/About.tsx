import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DecryptedText } from '../ui/DecryptedText';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { GlowingCard } from '../ui/GlowingCard';
import { SkillBadge } from '../ui/SkillBadge';
import { Code2, Rocket, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.about-heading',
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-heading',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 6, suffix: '+', label: 'Years Experience', icon: <Zap size={24} /> },
    { value: 50, suffix: '+', label: 'Projects Completed', icon: <Code2 size={24} /> },
    { value: 15, suffix: '+', label: 'Happy Clients', icon: <Users size={24} /> },
    { value: 100, suffix: '%', label: 'Client Satisfaction', icon: <Rocket size={24} /> },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-white dark:bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-4xl mb-20 about-heading">
          <DecryptedText
            text="About Me"
            className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-8"
            speed={30}
            sequential={true}
          />
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            I'm a passionate software engineer with extensive experience building scalable web applications
            and creating exceptional digital experiences.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlowingCard
                className="h-full"
                glowColor={
                  index === 0
                    ? 'rgba(59, 130, 246, 0.3)'
                    : index === 1
                    ? 'rgba(168, 85, 247, 0.3)'
                    : index === 2
                    ? 'rgba(236, 72, 153, 0.3)'
                    : 'rgba(34, 197, 94, 0.3)'
                }
              >
                <div className="p-6 text-center">
                  <div className="flex justify-center mb-4 text-gray-700 dark:text-gray-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.5} />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left column - About */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlowingCard glowColor="rgba(59, 130, 246, 0.2)">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                  <Code2 className="text-gray-700 dark:text-gray-300" />
                  My Journey
                </h3>
                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    I specialize in creating robust, scalable applications using modern technologies.
                    My journey in tech started with a Computer Science degree, but my love for solving
                    complex problems through code has driven me to continuously learn and master new
                    technologies.
                  </p>
                  <p>
                    With a focus on user experience and performance, I bring ideas to life through clean
                    code and innovative solutions. Every project is an opportunity to push boundaries
                    and create something exceptional.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new frameworks, contributing to
                    open-source projects, or sharing knowledge with the developer community.
                  </p>
                </div>
              </div>
            </GlowingCard>
          </motion.div>

          {/* Right column - Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlowingCard glowColor="rgba(168, 85, 247, 0.2)">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                  <Rocket className="text-gray-700 dark:text-gray-300" />
                  What I Do
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black dark:text-white mb-1">
                        Full-Stack Development
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Building end-to-end web applications with modern frameworks and best practices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black dark:text-white mb-1">
                        UI/UX Design
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Creating beautiful, intuitive interfaces that users love to interact with
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black dark:text-white mb-1">
                        Performance Optimization
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Ensuring applications are fast, efficient, and scalable for the best user experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black dark:text-white mb-1">
                        Mentorship & Collaboration
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Guiding teams and sharing knowledge to build better products together
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlowingCard>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-black dark:text-white mb-10 text-center">
            Technical Expertise
          </h3>
          <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <SkillBadge
                key={skill.name}
                skill={skill.name}
                level={skill.level}
                delay={index * 0.05}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
