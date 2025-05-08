import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';
import { ExternalLink, Github, Code, Terminal, FileCode, Cpu, Server, GitMerge } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { projects } from '../../data/projects';
import { staggerContainer, fadeIn } from '../../utils/motion';

type Filter = 'all' | 'featured' | string;

export const Projects: React.FC = () => {
  // State for hover effect
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" });
  
  // Terminal animation effect
  useEffect(() => {
    if (isInView) {
      const lines = [
        'Loading projects...',
        'Initializing project database...',
        'Fetching project metadata...',
        'Applying filters...',
        'Rendering project cards...',
        'Done! Projects loaded successfully.'
      ];
      
      setTerminalLines([]);
      
      lines.forEach((line, index) => {
        setTimeout(() => {
          setTerminalLines(prev => [...prev, line]);
        }, index * 500);
      });
    }
  }, [isInView]);
  
  // Extract unique tags from all projects
  const uniqueTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).slice(0, 5);
  
  // Filter projects based on active filter
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.tags.includes(activeFilter);
  });
  
  // Variants for terminal cursor
  const cursorVariants: Variants = {
    blink: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  // Handle filter click with enhanced animation
  const handleFilterClick = (filter: Filter) => {
    setActiveFilter(filter);
    
    setTerminalLines(prev => [
      ...prev, 
      `> Applying filter: ${filter} [${new Date().toLocaleTimeString()}]`
    ]);
  };
  
  // Handle project click to view details
  const handleProjectClick = (id: number) => {
    setSelectedProject(id);
  };
  
  // Close project details modal
  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section ref={sectionRef} id="projects" className="py-12 bg-white dark:bg-black relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-cyberpunk-grid dark:bg-cyberpunk-grid bg-[size:40px_40px] opacity-10"></div>
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      {/* Terminal-like line accents */}
      {/* <div className="absolute top-0 left-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div> */}
      {/* <div className="absolute top-0 right-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div> */}
      {/* <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div> */}
      {/* <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div> */}
      
      {/* Code icons as background elements */}
      <Terminal className="absolute top-20 left-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <Code className="absolute bottom-20 right-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <FileCode className="absolute top-1/2 -translate-y-1/2 right-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <Server className="absolute top-1/3 -translate-y-1/2 left-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <GitMerge className="absolute bottom-1/3 translate-y-1/2 right-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="<Projects />"
          subtitle="// A showcase of my recent work and experiments"
          align="center" 
        />
        
        {/* Filter Section with Terminal Style */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16"
        >
          <h3 className="text-2xl font-mono font-bold text-black dark:text-white mb-6 relative inline-block">
            &lt;ProjectFilters /&gt;
            <motion.span 
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </h3>
          
          <div className="flex flex-wrap gap-3 relative mb-8">
            {/* Terminal-like decorative lines */}
            <div className="absolute h-[1px] bg-gradient-to-r from-black/30 via-black/50 dark:from-white/30 dark:via-white/50 to-transparent w-full -bottom-4"></div>
            
            {/* Filter Pills */}
            {['all', 'featured', ...uniqueTags].map((filter, index) => (
              <motion.button
                key={filter}
                variants={fadeIn('up', 'spring', index * 0.05, 0.75)}
                onClick={() => handleFilterClick(filter as Filter)}
                className={`px-4 py-2 transition-all duration-300 text-sm font-mono font-medium capitalize ${activeFilter === filter 
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-code-block dark:shadow-inner-glow border border-black dark:border-white' 
                  : 'bg-transparent hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white border border-black/50 dark:border-white/50 backdrop-blur-sm'
                }`}
                whileHover={{ y: -3, x: 3, transition: { duration: 0.3, type: 'spring' } }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  {filter === 'all' ? 'all()' : filter === 'featured' ? 'featured()' : `${filter}()`}
                </span>
              </motion.button>
            ))}
          </div>
          
          {/* Terminal output showing current filter */}
          <div className="font-mono text-sm text-black/70 dark:text-white/70 border-l-2 border-black/20 dark:border-white/20 pl-3 py-1">
            <span className="text-green-600 dark:text-green-400">$ </span>
            <span>filter.apply(</span>
            <span className="text-blue-600 dark:text-blue-400">"{activeFilter}"</span>
            <span>);</span>
            <motion.span 
              className="inline-block w-2 h-4 bg-black dark:bg-white ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
        
        {/* Projects Grid with Terminal Style */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h3 className="text-2xl font-mono font-bold text-black dark:text-white mb-6 relative inline-block">
            &lt;ProjectsShowcase /&gt;
            <motion.span 
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
          >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                
                <motion.div 
                  onClick={() => handleProjectClick(project.id)}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                   
                  <Card 
                    className="overflow-hidden h-full flex flex-col transition-colors duration-300 bg-white dark:bg-black backdrop-blur-sm shadow-code-block dark:shadow-inner-glow border border-black/50 dark:border-white/50 hover:border-blue-300 dark:hover:border-blue-700"
                    interactive={false}
                  >
                    {project.featured && (
                        <div className="absolute top-5 right-5 z-10">
                          <Badge 
                            variant="outline" 
                            className="bg-black/90 dark:bg-blue-900/90 text-blue-200 dark:text-blue-100 border-blue-500 dark:border-blue-400 shadow-lg backdrop-blur-sm font-mono text-xs animate-pulse"
                          >
                            <span className="text-blue-400 dark:text-blue-300">★</span> featured
                          </Badge>
                        </div>
                      )}
                    <div className="relative h-52 overflow-hidden">
                      
                      <div className="absolute inset-0 mt-6">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      
                     
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-mono font-bold text-black dark:text-white mb-2 inline-block">
                        {`<${project.title} />`}
                      </h3>
                      
                      <p className="text-black/80 dark:text-white/80 text-sm mb-4 flex-grow border-l-2 border-black/30 dark:border-white/30 pl-2 font-mono">
                        {`// ${project.description.substring(0, 100)}...`}
                      </p>
                      
                      <div className="mt-auto">
                        <div className="font-mono text-black/70 dark:text-white/70 text-xs mb-2">{`technologies: [`}</div>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline" 
                              className="text-xs bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge 
                              variant="outline"
                              className="text-xs bg-black/80 dark:bg-white/80 text-white dark:text-black border-black dark:border-white"
                            >
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="font-mono text-black/70 dark:text-white/70 text-xs mt-2">{`]`}</div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-black/20 dark:border-white/20">
                        <div className="font-mono text-xs text-black/70 dark:text-white/70 flex items-center">
                          <Code className="w-4 h-4 mr-1 animate-glitch" />
                          <span>Click to view details</span>
                          <motion.span 
                            className="inline-block w-1 h-3 bg-black dark:bg-white ml-1"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Project Details Modal */}
        <AnimatePresence mode="wait">
          {selectedProject !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div 
                className="bg-white dark:bg-black w-full max-w-4xl shadow-code-block dark:shadow-inner-glow overflow-hidden relative border-2 border-black dark:border-white max-h-[90vh] flex flex-col"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 15 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Terminal-like header */}
                <div className="bg-black dark:bg-white text-white dark:text-black p-3 flex items-center sticky top-0 z-10">
                  <div className="flex gap-1.5 mr-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={closeModal}></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="font-mono text-sm opacity-80">project_details.tsx</div>
                </div>
                
                {/* Terminal-like line accents */}
                <div className="absolute top-12 left-0 w-[2px] h-[calc(100%-48px)] bg-black/20 dark:bg-white/20"></div>
                <div className="absolute top-12 right-0 w-[2px] h-[calc(100%-48px)] bg-black/20 dark:bg-white/20"></div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/20 dark:bg-white/20"></div>
                <div className="overflow-y-auto flex-1">
                {(() => {
                  const project = projects.find(p => p.id === selectedProject);
                  if (!project) return null;
                  
                  return (
                    <>
                      <div className="relative overflow-hidden">
                        <div className="p-6 pt-8">
                          <h2 className="text-2xl font-mono font-bold text-black dark:text-white mb-2 relative inline-block">
                            {`<${project.title} />`}
                            <motion.span 
                              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2, duration: 0.8 }}
                            />
                          </h2>
                          
                          {project.featured && (
                            <div className="mt-2 mb-4">
                              <Badge 
                                variant="outline" 
                                className="bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-md font-mono"
                              >
                                featured: true
                              </Badge>
                            </div>
                          )}
                          
                          <div className="mt-6 mb-8 relative overflow-hidden rounded-md border border-black/50 dark:border-white/50">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="md:col-span-2">
                            <h3 className="font-mono font-bold text-black dark:text-white mb-4 relative inline-block">
                              &lt;ProjectDescription /&gt;
                              <motion.span 
                                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                              />
                            </h3>
                            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-6 border-l-2 border-black/30 dark:border-white/30 pl-3 font-mono text-sm">
                              {`// ${project.description}`}
                            </p>
                            
                            <h3 className="font-mono font-bold text-black dark:text-white mb-4 relative inline-block">
                              &lt;Technologies /&gt;
                              <motion.span 
                                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                              />
                            </h3>
                            
                            <div className="mt-4">
                              <div className="font-mono text-black/70 dark:text-white/70 text-sm mb-2">{`const technologies = [`}</div>
                              <div className="flex flex-wrap gap-2 mt-auto pl-4">
                                {project.tags.map(tag => (
                                  <Badge 
                                    key={tag} 
                                    variant="outline"
                                    className="text-sm bg-black dark:bg-white text-white dark:text-black border-black dark:border-white px-2 py-1 mb-2"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="font-mono text-black/70 dark:text-white/70 text-sm">{`];`}</div>
                            </div>
                          </div>
                          
                          <div className="md:border-l border-black/20 dark:border-white/20 md:pl-8">
                            <h3 className="font-mono font-bold text-black dark:text-white mb-4 relative inline-block">
                              &lt;ProjectLinks /&gt;
                              <motion.span 
                                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                              />
                            </h3>
                            
                            <div className="flex flex-col gap-4">
                              {project.github && (
                                <Button 
                                  icon={<Github size={18} />}
                                  className="w-full justify-center group relative overflow-hidden bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white"
                                  onClick={() => window.open(project.github, '_blank')}
                                >
                                  <span className="relative z-10 font-mono">github.open()</span>
                                  <motion.span 
                                    className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.4 }}
                                  />
                                </Button>
                              )}
                              {project.demo && (
                                <Button 
                                  variant="outline"
                                  icon={<ExternalLink size={18} />}
                                  className="w-full justify-center border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                                  onClick={() => window.open(project.demo, '_blank')}
                                >
                                  <span className="font-mono">demo.launch()</span>
                                </Button>
                              )}
                            </div>
                            
                            {/* Additional metrics */}
                            <div className="mt-8 pt-6 border-t border-black/20 dark:border-white/20">
                              <div className="flex justify-between mb-3 font-mono text-sm">
                                <span className="text-black/70 dark:text-white/70">const year =</span>
                                <span className="text-blue-600 dark:text-blue-400">"{new Date().getFullYear()}";</span>
                              </div>
                              <div className="flex justify-between font-mono text-sm">
                                <span className="text-black/70 dark:text-white/70">const role =</span>
                                <span className="text-blue-600 dark:text-blue-400">"Lead Developer";</span>
                              </div>
                            </div>
                            
                            <div className="mt-6 pt-4 border-t border-black/20 dark:border-white/20">
                              <button 
                                className="w-full py-2 border border-black/50 dark:border-white/50 text-black dark:text-white font-mono text-sm flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                onClick={closeModal}
                              >
                                <span>modal.close()</span>
                                <motion.span 
                                  className="inline-block w-1 h-3 bg-black dark:bg-white ml-1"
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};