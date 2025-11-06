import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled = false,
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary:
      'bg-black/90 dark:bg-white/90 text-white dark:text-black backdrop-blur-lg border border-white/20 dark:border-black/20 hover:bg-black dark:hover:bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
    secondary:
      'bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-black/10 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20 text-black dark:text-white',
    ghost:
      'bg-transparent border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group rounded-full font-medium
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
      </div>

      {/* Content */}
      <span className="relative flex items-center gap-2 justify-center">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};
