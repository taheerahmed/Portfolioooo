import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isAnimating && (
          <motion.div
            key="transition"
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Window Panes */}
            <div className="relative w-full h-full">
              {/* Top Pane */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-black dark:bg-white origin-top flex items-end justify-center pb-4"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <span className="text-6xl md:text-8xl lg:text-9xl font-black text-white dark:text-black tracking-tighter">
                    TAHEER
                  </span>
                </motion.div>
              </motion.div>

              {/* Bottom Pane */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1/2 bg-black dark:bg-white origin-bottom"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};
