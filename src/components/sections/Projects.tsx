import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShinyText } from '../ui/ShinyText';
import { GlassButton } from '../ui/GlassButton';
import { AnimatedBadge } from '../ui/AnimatedBadge';

gsap.registerPlugin(ScrollTrigger);

type Filter = 'all' | 'featured' | string;

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const uniqueTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).slice(0, 5);

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.tags.includes(activeFilter);
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards with clip-path reveal
      const cards = gsap.utils.toArray('.project-card');

      cards.forEach((card: any, index) => {
        // Image reveal effect
        const image = card.querySelector('.project-image-wrapper');
        const overlay = card.querySelector('.project-overlay');

        gsap.fromTo(
          image,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Content fade up
        const content = card.querySelector('.project-content');
        gsap.fromTo(
          content,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Number reveal
        const number = card.querySelector('.project-number');
        if (number) {
          gsap.fromTo(
            number,
            {
              opacity: 0,
              scale: 0,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: 0.5,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // Filter buttons animation
      gsap.fromTo(
        '.filter-btn',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.filters-container',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section ref={sectionRef} id="projects" className="py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <ShinyText
            text="Selected Work"
            className="text-5xl md:text-7xl font-bold mb-6"
          />
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            A curated collection of projects showcasing creativity, technical expertise, and innovative solutions.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="filters-container flex flex-wrap gap-3 mb-20">
          {['all', 'featured', ...uniqueTags].map((filter) => (
            <AnimatedBadge
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter as Filter)}
              variant="outline"
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </AnimatedBadge>
          ))}
        </div>

        {/* Projects grid */}
        <div className="space-y-32">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div
                className={`relative group cursor-pointer ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="project-image-wrapper relative overflow-hidden rounded-2xl aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="project-overlay absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                </div>

                {/* Number badge */}
                <div className="project-number absolute -top-6 -right-6 w-20 h-20 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-2xl font-bold">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {project.featured && (
                  <div className="absolute top-6 left-6 bg-white dark:bg-black text-black dark:text-white px-4 py-2 text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`project-content ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <motion.h3
                  className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.h3>

                <motion.div
                  className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black rounded-xl border border-gray-200 dark:border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>

                {/* Tags */}
                <motion.div
                  className="flex flex-wrap gap-2 mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {project.tags.slice(0, 5).map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      className="px-4 py-2 text-sm rounded-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + tagIndex * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Links */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {project.github && (
                    <GlassButton
                      variant="primary"
                      size="md"
                      icon={<Github size={20} />}
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      View Code
                    </GlassButton>
                  )}
                  {project.demo && (
                    <GlassButton
                      variant="secondary"
                      size="md"
                      icon={<ExternalLink size={20} />}
                      onClick={() => window.open(project.demo, '_blank')}
                    >
                      Live Demo
                    </GlassButton>
                  )}
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project modal */}
      <AnimatePresence mode="wait">
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white dark:bg-black w-full max-w-5xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;

                return (
                  <>
                    <div className="relative h-96">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-6 right-6 w-12 h-12 bg-white dark:bg-black text-black dark:text-white flex items-center justify-center hover:scale-110 transition-transform text-2xl"
                      >
                        ×
                      </button>
                    </div>

                    <div className="p-8 md:p-12">
                      <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                        {project.title}
                      </h2>

                      {project.featured && (
                        <div className="inline-block bg-black dark:bg-white text-white dark:text-black px-4 py-1 text-sm font-medium mb-6">
                          Featured Project
                        </div>
                      )}

                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mb-8">
                        <h3 className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">
                          Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {project.github && (
                          <GlassButton
                            variant="primary"
                            size="lg"
                            icon={<Github size={20} />}
                            onClick={() => window.open(project.github, '_blank')}
                          >
                            View Code
                          </GlassButton>
                        )}
                        {project.demo && (
                          <GlassButton
                            variant="ghost"
                            size="lg"
                            icon={<ExternalLink size={20} />}
                            onClick={() => window.open(project.demo, '_blank')}
                          >
                            Live Demo
                          </GlassButton>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
