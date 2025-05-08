import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '../../data/social';
import { Github as GitHub, Linkedin, Twitter, Mail, ChevronUp, Terminal, Code, Server } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHub className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
};

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-white dark:bg-black text-black dark:text-white pt-16 pb-8 overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-cyberpunk-grid dark:bg-cyberpunk-grid bg-[size:40px_40px] opacity-10"></div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      {/* Terminal-like line accents */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div>

      {/* Code icons as background elements */}
      <Terminal className="absolute top-20 left-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <Code className="absolute bottom-20 right-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <Server className="absolute bottom-40 left-20 text-black/10 dark:text-white/10 w-12 h-12 hidden lg:block" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-mono font-bold mb-4 relative inline-block">
              <span className="text-dark-primary dark:text-dark-primary">&lt;Dev</span>Portfolio /&gt;
              <motion.span 
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
            </h3>
            <p className="text-black/70 dark:text-white/70 mb-6 font-mono border-l-2 border-black/30 dark:border-white/30 pl-3">
              // Crafting digital experiences with clean code and thoughtful design.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-black/10 dark:bg-white/10 rounded-full text-black/80 dark:text-white/80 hover:text-dark-primary dark:hover:text-dark-primary transition-colors"
                  aria-label={link.platform}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + (index * 0.1) }}
                  whileHover={{ y: -2, scale: 1.1 }}
                >
                  {iconMap[link.icon]}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-mono font-bold mb-4 relative inline-block">
              navigation
              <motion.span 
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
            </h4>
            <ul className="space-y-2 font-mono">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' }
              ].map((item, index) => (
                <motion.li key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                >
                  <a 
                    href={item.href} 
                    className="text-black/70 dark:text-white/70 hover:text-dark-primary dark:hover:text-dark-primary transition-colors flex items-center"
                  >
                    <span className="text-dark-primary dark:text-dark-primary mr-2">$</span>
                    <span>{item.name.toLowerCase()}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-mono font-bold mb-4 relative inline-block">
              contact
              <motion.span 
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
            </h4>
            <ul className="space-y-2 font-mono">
              <motion.li 
                className="text-black/70 dark:text-white/70"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-dark-primary dark:text-dark-primary">email:</span> hello@example.com
              </motion.li>
              <motion.li 
                className="text-black/70 dark:text-white/70"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-dark-primary dark:text-dark-primary">location:</span> San Francisco, CA
              </motion.li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-mono font-bold mb-4 relative inline-block">
              let's connect
              <motion.span 
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 animate-pulse-line"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
            </h4>
            <p className="text-black/70 dark:text-white/70 mb-4 font-mono">
              // Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
            </p>
            <motion.a
              href="#contact"
              className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-mono relative overflow-hidden group border border-black dark:border-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10">contact.connect()</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          </div>
        </div>
        
        <div className="border-t border-black/20 dark:border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black/60 dark:text-white/60 text-sm mb-4 md:mb-0 font-mono">
            <span className="text-dark-primary dark:text-dark-primary">// </span>
            &copy; {new Date().getFullYear()} DevPortfolio. All rights reserved.
          </p>
          
          <motion.button
            onClick={handleScrollToTop}
            className="flex items-center justify-center w-10 h-10 bg-black/10 dark:bg-white/10 rounded-full text-black dark:text-white hover:bg-dark-primary hover:text-white dark:hover:bg-dark-primary dark:hover:text-white transition-colors"
            aria-label="Scroll to top"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};