import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
  disabled?: boolean;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = '',
  shimmerWidth = 100,
  disabled = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative inline-block ${className}`}
      style={
        {
          '--shimmer-width': `${shimmerWidth}px`,
        } as CSSProperties
      }
    >
      <span
        className={`
          relative bg-clip-text text-transparent bg-gradient-to-r
          ${
            disabled
              ? 'from-gray-400 to-gray-600'
              : 'from-black via-gray-700 to-black dark:from-white dark:via-gray-300 dark:to-white'
          }
          ${!disabled && 'animate-shimmer bg-[length:200%_100%]'}
        `}
      >
        {text}
      </span>
    </motion.div>
  );
};
