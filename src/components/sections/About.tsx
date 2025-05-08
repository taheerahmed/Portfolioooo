import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { skills } from '../../data/skills';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { Code, Server, Cpu, Bug, GitMerge, Users } from 'lucide-react';

// Personality traits with their icons
const traits = [
  { title: 'Problem Solver', description: 'Solving complex issues with elegant solutions', icon: <Bug className="w-6 h-6" /> },
  { title: 'Clean Coder', description: 'Writing maintainable, efficient, and documented code', icon: <Code className="w-6 h-6" /> },
  { title: 'System Architect', description: 'Designing scalable and robust architectures', icon: <Server className="w-6 h-6" /> },
  { title: 'Team Collaborator', description: 'Working effectively in diverse teams', icon: <Users className="w-6 h-6" /> },
  { title: 'Continuous Learner', description: 'Always adapting to new technologies', icon: <Cpu className="w-6 h-6" /> },
  { title: 'Quality Focused', description: 'Ensuring high standards through testing', icon: <GitMerge className="w-6 h-6" /> },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-white dark:bg-black relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-cyberpunk-grid dark:bg-cyberpunk-grid bg-[size:40px_40px] opacity-10"></div>
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      {/* Terminal-like line accents */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div>
      {/* <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div> */}
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="<About />"
          subtitle="// Get to know more about my skills and personality"
          align="center" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Image and description */}
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="relative">
              <div className="w-full h-80 md:h-96 lg:h-[450px] rounded-xl overflow-hidden">
                {/* Terminal header */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 dark:bg-gray-900 flex items-center px-4 z-10">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 font-mono text-xs text-white/80">developer_profile.tsx</div>
                </div>
                
                {/* Terminal-style border with glowing effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-black/70 dark:border-white/70 overflow-hidden pointer-events-none">
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 opacity-50 animate-pulse"
                    animate={{ left: ['0%', '100%', '0%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  ></motion.div>
                </div>
                
                {/* Enhanced code background with syntax highlighting */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black pt-8">
                  {/* Matrix-like code lines with improved visibility */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={`code-line-${i}`}
                      className="absolute font-mono text-xs leading-5 whitespace-nowrap"
                      style={{ 
                        top: `${8 + (i + 1) * 8}%`, 
                        left: i % 2 === 0 ? '5%' : '35%',
                        color: [
                          'rgb(130, 170, 255)', // blue - variables
                          'rgb(240, 140, 140)', // red - strings
                          'rgb(150, 200, 150)', // green - comments
                          'rgb(220, 180, 120)', // yellow - keywords
                          'rgb(180, 160, 240)', // purple - functions
                          'rgb(140, 200, 200)'  // cyan - types
                        ][i % 6]
                      }}
                      animate={{ 
                        opacity: [0.6, 0.9, 0.6], 
                        x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0] 
                      }}
                      transition={{ duration: 8 + (i * 1.5), repeat: Infinity }}
                    >
                      {i % 6 === 0 && <span className="text-gray-500 dark:text-gray-400">{i + 1}</span>} 
                      {i % 6 === 0 && <span className="text-blue-500 dark:text-blue-400">const </span>}
                      {i % 6 === 0 && <span className="text-purple-500 dark:text-purple-400">{['user', 'profile', 'skills', 'dev', 'code', 'github'][i % 6]}</span>}
                      {i % 6 === 0 && <span className="text-gray-500 dark:text-gray-400"> = </span>}
                      {i % 6 === 0 && <span className="text-yellow-500 dark:text-yellow-400">{['{...}', '[]', 'true', '100', '"developer"', 'function() {}'][i % 6]}</span>}
                      {i % 6 === 0 && <span className="text-gray-500 dark:text-gray-400">;</span>}
                      
                      {i % 6 === 1 && <span className="text-gray-500 dark:text-gray-400">{i + 1}</span>}
                      {i % 6 === 1 && <span className="text-green-500 dark:text-green-400">// Developer profile configuration</span>}
                      
                      {i % 6 === 2 && <span className="text-gray-500 dark:text-gray-400">{i + 1}</span>}
                      {i % 6 === 2 && <span className="text-blue-500 dark:text-blue-400">function </span>}
                      {i % 6 === 2 && <span className="text-yellow-500 dark:text-yellow-400">Developer</span>}
                      {i % 6 === 2 && <span className="text-gray-500 dark:text-gray-400">() {'{'}</span>}
                      
                      {i % 6 === 3 && <span className="text-gray-500 dark:text-gray-400">{i + 1}</span>}
                      {i % 6 === 3 && <span className="text-gray-500 dark:text-gray-400">  return {'{'}</span>}
                      
                      {i % 6 === 4 && <span className="text-gray-500 dark:text-gray-400">{i + 1}</span>}
                      {i % 6 === 4 && <span className="text-gray-500 dark:text-gray-400">    </span>}
                      {i % 6 === 4 && <span className="text-purple-500 dark:text-purple-400">name</span>}
                      {i % 6 === 4 && <span className="text-gray-500 dark:text-gray-400">: </span>}
                      {i % 6 === 4 && <span className="text-red-500 dark:text-red-400">"Taheer Ahmed"</span>}
                      {i % 6 === 4 && <span className="text-gray-500 dark:text-gray-400">,</span>}
                      
                      {i % 6 === 5 && <span className="text-gray-500 dark:text-gray-400">{i + 1}</span>}
                      {i % 6 === 5 && <span className="text-gray-500 dark:text-gray-400">    </span>}
                      {i % 6 === 5 && <span className="text-purple-500 dark:text-purple-400">role</span>}
                      {i % 6 === 5 && <span className="text-gray-500 dark:text-gray-400">: </span>}
                      {i % 6 === 5 && <span className="text-red-500 dark:text-red-400">"Software Engineer"</span>}
                    </motion.div>
                  ))}
                </div>
                
                {/* Improved profile display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                  <div className="relative z-20 bg-white/90 dark:bg-black/90 backdrop-blur-md p-6 rounded-lg border-2 border-black/20 dark:border-white/20 shadow-lg dark:shadow-glow-sm transform hover:scale-105 transition-all duration-300">
                    <motion.div 
                      className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2"
                      animate={{ 
                        textShadow: [
                          '0 0 8px rgba(0, 0, 0, 0)', 
                          '0 0 15px rgba(101, 116, 205, 0.5)', 
                          '0 0 8px rgba(0, 0, 0, 0)'
                        ] 
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="relative inline-block">
                        Taheer Ahmed
                        <motion.span 
                          className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      </span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-center space-x-2 mt-3 text-lg font-mono tracking-wide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <span className="text-gray-800 dark:text-gray-200">Software_Engineer</span>
                      <span className="text-blue-600 dark:text-blue-400 animate-pulse">|</span>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-glow-sm max-w-xs transform hover:-translate-y-1 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              >
                <p className="text-gray-700 dark:text-gray-300 font-mono text-sm relative pl-4">
                  <span className="absolute left-0 top-0 text-blue-500 dark:text-blue-400 font-bold">"</span>
                  I believe in crafting code that not only works well but is also a joy to maintain and extend.
                  <span className="absolute right-0 bottom-0 text-blue-500 dark:text-blue-400 font-bold">"</span>
                </p>
              </motion.div>
            </div>
            
            <div className="mt-12">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  I'm a passionate software engineer with over <span className="text-dark-primary font-medium">6 years of experience</span> building web applications and distributed systems. I specialize in creating robust, scalable applications using modern technologies.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  My journey in tech started with a Computer Science degree, but my love for solving complex problems through code has driven me to continuously learn and master new technologies and approaches.
                </p>
                
                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-dark-surface/50 shadow-sm">
                    <div className="text-dark-primary text-3xl font-bold">6+</div>
                    <div className="text-gray-700 dark:text-gray-400 text-sm mt-1">Years Exp.</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-dark-surface/50 shadow-sm">
                    <div className="text-dark-primary text-3xl font-bold">50+</div>
                    <div className="text-gray-700 dark:text-gray-400 text-sm mt-1">Projects</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-dark-surface/50 shadow-sm">
                    <div className="text-dark-primary text-3xl font-bold">15+</div>
                    <div className="text-gray-700 dark:text-gray-400 text-sm mt-1">Clients</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right column - Skills and traits */}
          <div>
            {/* Skills */}
            <motion.div
              variants={staggerContainer()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              className="mb-12"
            >
              <h3 className="text-2xl font-mono font-bold text-black dark:text-white mb-6 relative inline-block">
                &lt;TechnicalSkills /&gt;
                <motion.span 
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
              </h3>
              
              <div className="space-y-6">
                {skills.slice(0, 6).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                      <span className="text-dark-primary font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full h-3 bg-white dark:bg-black rounded-none overflow-hidden border border-black dark:border-white">
                      <motion.div
                        className="h-full bg-black dark:bg-white relative"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      >
                        {/* Terminal-like cursor effect */}
                        <motion.div 
                          className="absolute top-0 right-0 h-full w-2 bg-white dark:bg-black"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Personality Traits */}
            <motion.div
              variants={staggerContainer()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
            >
              <h3 className="text-2xl font-mono font-bold text-black dark:text-white mb-6 relative inline-block">
                &lt;PersonalityTraits /&gt;
                <motion.span 
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {traits.map((trait, index) => (
                  <motion.div
                    key={trait.title}
                    variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                    className="flex items-start space-x-4 p-5 bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-sm dark:shadow-glow-sm border border-gray-200 dark:border-gray-700 group hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-300"
                    whileHover={{ y: -5, x: 5, transition: { duration: 0.3, type: 'spring' } }}
                  >
                    <div className="bg-black dark:bg-white p-3 text-white dark:text-black group-hover:scale-110 transition-all duration-300 animate-glitch">
                      {trait.icon}
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-black dark:text-white group-hover:scale-105 transition-transform duration-300 inline-block">
                        {`<${trait.title} />`}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 font-mono text-xs mt-1 border-l-2 border-black/30 dark:border-white/30 pl-2">
                        {`// ${trait.description}`}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};