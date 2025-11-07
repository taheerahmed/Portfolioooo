import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { projects } from '../../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current || !sectionRef.current) return;

    const container = scrollContainerRef.current;
    const section = sectionRef.current;

    // Horizontal scroll with mouse wheel
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    section.addEventListener('wheel', handleWheel, { passive: false });

    // GSAP Horizontal scroll pinning
    const ctx = gsap.context(() => {
      const totalScroll = container.scrollWidth - container.clientWidth;

      gsap.to(container, {
        scrollLeft: totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate cards on scroll
      const cards = gsap.utils.toArray('.project-card-horizontal');
      cards.forEach((card: any, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.9,
            rotateY: -15,
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: ScrollTrigger.getById('horizontal-scroll'),
              start: 'left right',
              end: 'left center',
              scrub: 1,
            },
          }
        );
      });

      // Circle transition animation
      if (circleRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: circleRef.current,
            start: 'left center',
            end: 'left left',
            scrub: 1,
          },
        });

        tl.to('.project-card-horizontal', {
          scale: 0.5,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
        })
          .to(circleRef.current, {
            scale: 5,
            opacity: 0,
            duration: 1,
          })
          .to(section, {
            opacity: 0,
            duration: 0.5,
          });
      }
    }, section);

    return () => {
      section.removeEventListener('wheel', handleWheel);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative min-h-screen bg-white dark:bg-black overflow-hidden"
      >
        {/* Section header */}
        <div className="absolute top-12 left-6 md:left-12 lg:left-16 z-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black dark:text-white tracking-tighter">
              Selected Work
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              {projects.length} Projects
            </p>
          </motion.div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center h-screen overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Spacer for header */}
          <div className="flex-shrink-0 w-screen" />

          {/* Project cards */}
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card-horizontal flex-shrink-0 px-4 md:px-8"
              style={{
                width: 'clamp(90vw, 800px, 95vw)',
                scrollSnapAlign: 'center',
              }}
            >
              <motion.div
                onClick={() => setSelectedProject(index)}
                className="group relative h-[70vh] md:h-[75vh] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-900"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project image */}
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Project number */}
                <div className="absolute top-8 right-8 text-8xl md:text-9xl font-black text-white/10">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Project content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-3">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                      {project.description}
                    </p>

                    {/* Click to view */}
                    <div className="flex items-center gap-2 text-white text-sm font-medium uppercase tracking-wide">
                      <span>Click to view</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}

          {/* Circle transition element */}
          <div className="flex-shrink-0 w-screen flex items-center justify-center">
            <div
              ref={circleRef}
              className="w-32 h-32 rounded-full border-4 border-black dark:border-white flex items-center justify-center text-4xl"
            >
              ⚡
            </div>
          </div>

          {/* End spacer */}
          <div className="flex-shrink-0 w-screen" />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 right-6 md:right-12 lg:right-16 z-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
          >
            <span className="text-sm uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl"
            >
              →
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal header */}
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

              {/* Modal content */}
              <div className="p-6 md:p-8">
                {/* Large image */}
                <div className="rounded-xl overflow-hidden mb-8">
                  <img
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    className="w-full h-auto"
                  />
                </div>

                {/* Description */}
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  {projects[selectedProject].longDescription || projects[selectedProject].description}
                </p>

                {/* Tags */}
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

                {/* Links */}
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

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};
