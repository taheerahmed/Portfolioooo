import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ArrowRight } from 'lucide-react';
import { projects } from '../../data/projects';
import { Link } from 'react-router-dom';
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <>
      {/* View All Projects Link - Outside pinned section */}
      <div className="fixed top-6 md:top-8 right-6 md:right-12 z-[100] pointer-events-none">
        <Link
          to="/projects"
          className="pointer-events-auto group flex items-center gap-2 text-sm md:text-base text-black dark:text-white hover:opacity-70 transition-opacity bg-white/80 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800"
        >
          <span className="font-medium">View All Projects</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

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

      {/* Modal - Aceternity/Awwwards Style */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto max-h-[90vh]">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 p-6 md:p-10">
                  {/* Left Column - Image */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
                    >
                      <img
                        src={projects[selectedProject].image}
                        alt={projects[selectedProject].title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3"
                    >
                      <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 font-medium">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[selectedProject].tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="space-y-6 lg:space-y-8">
                    {/* Project Number */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-600"
                    >
                      Project {String(selectedProject + 1).padStart(2, '0')}
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white leading-tight tracking-tight"
                    >
                      {projects[selectedProject].title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                    >
                      {projects[selectedProject].longDescription || projects[selectedProject].description}
                    </motion.p>

                    {/* Links */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="flex flex-col sm:flex-row gap-3 pt-4"
                    >
                      {projects[selectedProject].link && (
                        <a
                          href={projects[selectedProject].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium hover:scale-[1.02] transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Visit Project</span>
                        </a>
                      )}
                      {projects[selectedProject].github && (
                        <a
                          href={projects[selectedProject].github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center gap-2 px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-xl font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                        >
                          <Github className="w-4 h-4" />
                          <span>View Source</span>
                        </a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
