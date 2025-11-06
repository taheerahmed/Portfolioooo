import React from 'react';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  skill: string;
  level?: number;
  icon?: React.ReactNode;
  delay?: number;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  level = 0,
  icon,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 200,
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative px-6 py-3 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 dark:via-gray-700/50 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />

        {/* Content */}
        <div className="relative flex items-center gap-3">
          {icon && (
            <span className="text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform">
              {icon}
            </span>
          )}
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {skill}
          </span>
        </div>

        {/* Level indicator */}
        {level > 0 && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};
