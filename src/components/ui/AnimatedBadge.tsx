import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBadgeProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'gradient';
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  children,
  active = false,
  onClick,
  variant = 'default',
}) => {
  const variants = {
    default: active
      ? 'bg-black dark:bg-white text-white dark:text-black'
      : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800',
    outline: active
      ? 'bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white'
      : 'bg-transparent border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white',
    gradient: active
      ? 'bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black'
      : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-800 dark:hover:to-gray-700',
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-5 py-2.5 rounded-full text-sm font-medium
        transition-all duration-300 ease-out overflow-hidden
        ${variants[variant]}
      `}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-black/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
