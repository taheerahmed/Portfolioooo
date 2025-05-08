import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { experiences } from '../../data/experience';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { ExternalLink, Calendar, Award, Terminal, Code, FileCode } from 'lucide-react';

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-black relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-cyberpunk-grid dark:bg-cyberpunk-grid bg-[size:40px_40px] opacity-10"></div>
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      {/* Terminal-like line accents */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      {/* <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div> */}
      
      {/* Code icons as background elements */}
      <Terminal className="absolute top-20 left-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <Code className="absolute bottom-20 right-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <FileCode className="absolute top-1/2 -translate-y-1/2 right-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionTitle 
          title="<Experience />" 
          subtitle="// My journey in the tech industry"
        />
        
        <div className="relative">
          {/* Timeline connecting line - monochrome version */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-black dark:bg-white transform md:-translate-x-1/2 z-10"></div>
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-black/10 dark:bg-white/10 transform md:-translate-x-1/2 backdrop-blur-sm animate-pulse-line"></div>
          
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-12"
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={fadeIn(index % 2 === 0 ? 'right' : 'left', 'spring', index * 0.2, 0.75)}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot - terminal style */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-black dark:bg-white border-2 border-black dark:border-white rounded-none transform -translate-x-1/2 flex items-center justify-center z-20 shadow-code-block dark:shadow-inner-glow">
                  <span className="text-white dark:text-black font-mono font-bold">{index + 1}</span>
                </div>
                
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Card 
                    className="h-full bg-white dark:bg-black backdrop-blur-sm border border-black/30 dark:border-white/30 shadow-code-block dark:shadow-inner-glow overflow-hidden transition-colors duration-300 hover:border-blue-300 dark:hover:border-blue-700"
                    interactive={false}
                    onClick={() => toggleExpand(experience.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-none overflow-hidden bg-white dark:bg-black border border-black/50 dark:border-white/50 flex-shrink-0 shadow-code-block dark:shadow-inner-glow">
                        <img 
                          src={experience.logo} 
                          alt={`${experience.company} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-xl font-mono font-bold text-black dark:text-white border-b border-black/20 dark:border-white/20 pb-1">
                          {`function ${experience.role.replace(/\s+/g, '')}()`}
                        </h3>
                        <div className="text-black dark:text-white font-mono text-sm mt-2 mb-2">
                          {`// ${experience.company}`}
                        </div>
                        <div className="flex items-center text-black/70 dark:text-white/70 text-sm mb-4 font-mono">
                          <Calendar className="w-4 h-4 mr-2" />
                          {`const duration = "${experience.duration}";`}
                        </div>
                        
                        <p className="text-black/80 dark:text-white/80 mb-4 border-l-2 border-black/20 dark:border-white/20 pl-3 text-sm">
                          {experience.description}
                        </p>
                        
                        {expandedId === experience.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height:'100%' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                            transition={{ type: "tween", stiffness: 300 }}
                          >
                            <h4 className="font-mono font-bold text-black dark:text-white flex items-center mb-2">
                              <Award className="w-4 h-4 mr-2 text-black dark:text-white animate-glitch" />
                              {`achievements: [`}
                            </h4>
                            <ul className="space-y-2 text-black/80 dark:text-white/80 mb-4 font-mono text-sm">
                              {experience.achievements.map((achievement, i) => (
                                <li key={i} className="pl-6">{`"${achievement}"${i < experience.achievements.length-1 ? ',' : ''}`}</li>
                              ))}
                            </ul>
                            <div className="font-mono text-black dark:text-white mb-4">{`]`}</div>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              <div className="font-mono text-black dark:text-white mb-2">{`technologies: [`}</div>
                              <div className="w-full flex flex-wrap gap-2">
                                {experience.skills.map((skill, i) => (
                                  <Badge key={skill} variant="outline" className="bg-black dark:bg-white text-white dark:text-black border-black dark:border-white">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                              <div className="font-mono text-black dark:text-white mt-2">{`]`}</div>
                            </div>
                          </motion.div>
                        )}
                        
                        <button 
                          className="text-black dark:text-white flex items-center text-sm font-mono mt-4 border border-black/30 dark:border-white/30 px-3 py-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(experience.id);
                          }}
                        >
                          {expandedId === experience.id ? '_.collapse()' : '_.expand()'}
                          <Code className="w-4 h-4 ml-2 animate-glitch" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Empty div to maintain spacing for timeline */}
                <div className="hidden md:block w-full md:w-1/2"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};