import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, X } from 'lucide-react';
import { projects } from '../data/projects';
import gsap from 'gsap';

export const AllProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.project-card');

    // GSAP stagger animation
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
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
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-3 text-black dark:text-white hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            {projects.length} Projects
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto">
          {/* Title Section */}
          <div className="mb-16 md:mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-black dark:text-white mb-6 tracking-tight"
            >
              All Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl"
            >
              A comprehensive collection of my work spanning web development, AI integration, and digital experiences.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card opacity-0"
              >
                <motion.div
                  onClick={() => setSelectedProject(index)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>

                  {/* Number */}
                  <div className="absolute top-4 right-4 text-4xl font-black text-white/10">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-md uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-2xl">→</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal - Same as Projects section */}
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
    </div>
  );
};
