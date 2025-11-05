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
  const cardsRef = useRef<HTMLDivElement>(null);

  // Extract unique tags
  const uniqueTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).slice(0, 5);

  // Filter projects
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.tags.includes(activeFilter);
  });

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in cards on scroll
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.project-card');
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section ref={sectionRef} id="projects" className="py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            Selected Work
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A collection of projects I've worked on, showcasing my expertise in web development and design.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-16">
          {['all', 'featured', ...uniqueTags].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as Filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card group cursor-pointer"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900 aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-white dark:bg-black text-black dark:text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project modal */}
        <AnimatePresence mode="wait">
          {selectedProject !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-white dark:bg-black w-full max-w-4xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const project = projects.find(p => p.id === selectedProject);
                  if (!project) return null;

                  return (
                    <>
                      <div className="relative h-80">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="p-8 md:p-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                          {project.title}
                        </h2>

                        {project.featured && (
                          <div className="inline-block bg-black dark:bg-white text-white dark:text-black px-4 py-1 rounded-full text-sm font-medium mb-6">
                            Featured Project
                          </div>
                        )}

                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                          {project.description}
                        </p>

                        <div className="mb-8">
                          <h3 className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">
                            Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
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
                              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium flex items-center gap-2 hover:shadow-xl transition-shadow"
                            >
                              <Github size={18} />
                              View Code
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-full font-medium flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                              <ExternalLink size={18} />
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
      </div>
    </section>
  );
};
