import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
  useOriginalCharsOnly?: boolean;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  characters?: string;
  parentClassName?: string;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = '',
  speed = 50,
  maxIterations = 10,
  useOriginalCharsOnly = false,
  sequential = false,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  parentClassName = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const iterationsRef = useRef<number[]>([]);

  useEffect(() => {
    // Initialize iterations array
    iterationsRef.current = new Array(text.length).fill(0);
    setDisplayText(text.split('').map(() => ' ').join(''));
    setIsComplete(false);

    let currentIndex = 0;
    const chars = useOriginalCharsOnly ? text.split('').filter((c, i, arr) => arr.indexOf(c) === i).join('') : characters;

    const getRandomChar = (originalChar: string) => {
      if (originalChar === ' ') return ' ';
      return chars[Math.floor(Math.random() * chars.length)];
    };

    const decrypt = () => {
      let newText = text.split('');
      let allComplete = true;

      if (sequential) {
        // Sequential decryption
        for (let i = 0; i <= currentIndex && i < text.length; i++) {
          if (iterationsRef.current[i] < maxIterations) {
            newText[i] = getRandomChar(text[i]);
            iterationsRef.current[i]++;
            allComplete = false;
          } else {
            newText[i] = text[i];
          }
        }

        if (iterationsRef.current[currentIndex] >= maxIterations) {
          currentIndex++;
        }

        if (currentIndex >= text.length) {
          allComplete = true;
        }
      } else {
        // Simultaneous decryption
        for (let i = 0; i < text.length; i++) {
          if (iterationsRef.current[i] < maxIterations) {
            newText[i] = getRandomChar(text[i]);
            iterationsRef.current[i]++;
            allComplete = false;
          } else {
            newText[i] = text[i];
          }
        }
      }

      setDisplayText(newText.join(''));

      if (allComplete) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsComplete(true);
      }
    };

    intervalRef.current = setInterval(decrypt, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed, maxIterations, useOriginalCharsOnly, sequential, characters]);

  return (
    <motion.div
      className={parentClassName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className={`font-mono ${className} ${isComplete ? 'opacity-100' : 'opacity-90'}`}>
        {displayText}
      </span>
    </motion.div>
  );
};
