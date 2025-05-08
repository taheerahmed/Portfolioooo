import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, interactive = true, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Removed motion values for hover effect
  
  // Removed mouse event handlers for hover effect
  const handleMouseMove = () => {};
  const handleMouseLeave = () => {};

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-lg bg-dark-surface border-flow",
        "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/5 before:to-transparent",
        "shadow-sm dark:shadow-sharp dark:shadow-inner-glow",
        interactive && "cursor-pointer",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
};