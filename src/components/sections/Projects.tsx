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
  const horizontalRef = useRef<HTMLDivElement>(null);

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
      // Horizontal scroll effect
      if (horizontalRef.current) {
        const scrollWidth = horizontalRef.current.scrollWidth - window.innerWidth;

        gsap.to(horizontalRef.current, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Parallax effect on images
        const images = horizontalRef.current.querySelectorAll('.project-image');
        images.forEach((img) => {
          gsap.to(img, {
            xPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              containerAnimation: gsap.to(horizontalRef.current!, { x: -scrollWidth }),
              start: 'left right',
              end: 'right left',
              scrub: 1,
            },
          });
        });
      }

      // Fade in filters
      gsap.fromTo(
        '.filter-button',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section ref={sectionRef} id="projects" className="bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-32">
        {/* Section header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            Selected Work
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A showcase of projects I've built.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-16">
          {['all', 'featured', ...uniqueTags].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as Filter)}
              className={`filter-button px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal scrolling projects */}
      <div ref={horizontalRef} className="flex gap-8 pl-4 md:pl-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] group cursor-pointer"
            onClick={() => setSelectedProject(project.id)}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-900 aspect-[4/3]">
              <div className="project-image absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {project.featured && (
                <div className="absolute top-6 right-6 bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-full text-xs font-medium">
                  Featured
                </div>
              )}

              {/* Hover overlay with info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-32" /> {/* Spacer */}

      {/* Project modal */}
      <AnimatePresence mode="wait">
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white dark:bg-black w-full max-w-5xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
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
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center hover:scale-110 transition-transform text-2xl"
                      >
                        ×
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
                              className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
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
                            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium flex items-center gap-2 hover:shadow-xl transition-shadow"
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
                            className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white rounded-full font-medium flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
