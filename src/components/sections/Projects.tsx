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

      {/* Modal - Full Screen Minimalistic Design */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-black z-50 overflow-y-auto"
          >
            {/* Close Button - Minimalistic */}
            <button
              onClick={() => setSelectedProject(null)}
              className="fixed top-6 md:top-8 right-6 md:right-12 z-20 w-12 h-12 flex items-center justify-center text-black dark:text-white hover:opacity-50 transition-opacity"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="min-h-screen px-6 md:px-12 lg:px-20 py-16 md:py-24">
              {/* Project Number */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4"
              >
                Project {String(selectedProject + 1).padStart(2, '0')}
              </motion.div>

              {/* Project Title - Massive */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-black dark:text-white mb-8 md:mb-12 leading-[0.95] tracking-tight max-w-5xl"
              >
                {projects[selectedProject].title}
              </motion.h2>

              {/* Tags - Minimalistic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-12 md:mb-16"
              >
                {projects[selectedProject].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-16 md:mb-20 max-w-3xl leading-relaxed"
              >
                {projects[selectedProject].longDescription || projects[selectedProject].description}
              </motion.p>

              {/* Image - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-16 md:mb-20 overflow-hidden"
              >
                <img
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].title}
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Links - Minimalistic Text Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-8 md:gap-12 mb-20"
              >
                {projects[selectedProject].link && (
                  <a
                    href={projects[selectedProject].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-black dark:text-white"
                  >
                    <span className="text-lg font-medium">Visit Project</span>
                    <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                )}
                {projects[selectedProject].github && (
                  <a
                    href={projects[selectedProject].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-black dark:text-white"
                  >
                    <span className="text-lg font-medium">View Source</span>
                    <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </a>
                )}
              </motion.div>

              {/* Scroll Indicator */}
              <div className="text-center pb-8">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
