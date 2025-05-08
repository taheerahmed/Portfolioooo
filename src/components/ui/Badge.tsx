import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'outline' | 'secondary';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
}) => {
  const variantStyles = {
    default: 'bg-dark-primary dark:bg-dark-primary text-white',
    outline: 'bg-transparent border border-dark-border dark:border-dark-primary text-gray-700 dark:text-gray-200',
    secondary: 'bg-dark-secondary dark:bg-dark-secondary text-white',
  };

  return (
    <motion.span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.span>
  );
};