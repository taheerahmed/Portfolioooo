import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            Selected Work
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A collection of projects I've built.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="filters-container flex flex-wrap gap-3 mb-20">
          {['all', 'featured', ...uniqueTags].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as Filter)}
              className={`filter-btn px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-transparent border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
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
                <h3 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.slice(0, 5).map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-black dark:text-white hover:gap-3 transition-all"
                    >
                      <Github size={20} />
                      <span>View Code</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-black dark:text-white hover:gap-3 transition-all"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                  )}
                </div>
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

                      <div className="flex gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium flex items-center gap-2 hover:shadow-xl transition-shadow"
                          >
                            <Github size={20} />
                            View Code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-medium flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          >
                            <ExternalLink size={20} />
                            Live Demo
                          </a>
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
