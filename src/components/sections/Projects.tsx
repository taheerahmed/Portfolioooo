import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { projects } from '../../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;

    // Setup horizontal scroll
    const scrollWidth = container.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    tl.to(container, {
      x: () => -scrollWidth,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative bg-white dark:bg-black overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Header - Fixed positioning, better spacing */}
        <div className="absolute top-6 md:top-8 left-6 md:left-12 z-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white">
            Selected Work
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
            {projects.length} Projects
          </p>
        </div>

        {/* Horizontal scroll container - adjusted positioning */}
        <div
          ref={containerRef}
          className="absolute top-0 left-0 flex items-center h-full pt-24 md:pt-28"
          style={{ paddingLeft: '50vw', paddingRight: '50vw' }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 px-4 md:px-6"
              style={{ width: '85vw', maxWidth: '750px' }}
            >
              <motion.div
                onClick={() => setSelectedProject(index)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-900"
                style={{ height: 'calc(100vh - 180px)', maxHeight: '600px' }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>

                {/* Number */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 text-6xl md:text-7xl font-black text-white/10">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 text-sm md:text-base mb-4 max-w-xl line-clamp-2">
                    {project.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-white text-xs md:text-sm font-medium uppercase tracking-wider">
                    <span>View Project</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 md:bottom-8 right-6 md:right-12 z-20">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between z-10">
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  {projects[selectedProject].title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="rounded-xl overflow-hidden mb-8">
                  <img
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    className="w-full"
                  />
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  {projects[selectedProject].longDescription || projects[selectedProject].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[selectedProject].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {projects[selectedProject].link && (
                    <a
                      href={projects[selectedProject].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:scale-105 transition-transform"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Project
                    </a>
                  )}
                  {projects[selectedProject].github && (
                    <a
                      href={projects[selectedProject].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-lg font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
