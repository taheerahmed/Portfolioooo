import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    const node = nodeRef.current;
    const controls = { value: 0 };

    gsap.to(controls, {
      value: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (node) {
          node.textContent = `${prefix}${Math.floor(controls.value)}${suffix}`;
        }
      },
    });
  }, [isInView, end, duration, prefix, suffix]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
};
