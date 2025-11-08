import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start animation on route change
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false), 1200);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isAnimating && (
          <motion.div
            key={`transition-${location.pathname}`}
            className="fixed inset-0 z-[100]"
            style={{ pointerEvents: 'none' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            {/* Window Panes */}
            <div className="relative w-full h-full">
              {/* Top Pane */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-black dark:bg-white origin-top"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 1, transition: { duration: 0.01 } }}
                exit={{ scaleY: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
              />

              {/* Bottom Pane */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1/2 bg-black dark:bg-white origin-bottom"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 1, transition: { duration: 0.01 } }}
                exit={{ scaleY: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
              />

              {/* TAHEER Text - Positioned like Hero */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 w-full">
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden max-w-6xl"
                  >
                    <span className="text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[140px] font-black text-white dark:text-black tracking-tighter leading-[0.9]">
                      TAHEER
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
