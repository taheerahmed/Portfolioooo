import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className,
  align = 'left',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div
      className={cn('mb-16 max-w-2xl relative', alignmentClasses[align], className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-x-4 -inset-y-2 bg-line-pattern opacity-10"
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <h2 className="relative font-display text-4xl md:text-5xl font-bold dark:text-white text-black mb-4">
          <span className="relative inline-block">
            {title}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-white/20"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </span>
        </h2>
        
        {subtitle && (
          <p className="relative text-gray-400 text-lg font-light tracking-wide">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="absolute left-0 bottom-0 h-px w-full">
        <div className="absolute inset-0 bg-gradient-line animate-line-flow" />
      </div>
    </motion.div>
  );
};