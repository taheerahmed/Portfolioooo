import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className,
  children,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300";
  
  const variantStyles = {
    primary: "bg-white text-black hover:shadow-neon",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-neon",
    outline: "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:shadow-neon",
    ghost: "bg-transparent text-white hover:bg-white/10 hover:shadow-neon"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3"
  };

  return (
    <motion.button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "before:absolute before:inset-0 before:bg-cyber-grid before:bg-[length:10px_10px] before:opacity-20 before:z-0",
        "after:absolute after:inset-0 after:border after:border-white/10 after:z-0",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10 flex items-center">
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {icon && !isLoading && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};