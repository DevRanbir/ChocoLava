"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LottieFlies } from "./lottie-flies";

interface PageLoaderProps {
  children: React.ReactNode;
  showLoader?: boolean;
}

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  in: { 
    opacity: 1, 
    y: 0,
    scale: 1
  },
  out: { 
    opacity: 0, 
    y: -20,
    scale: 1.02
  }
};

const loaderVariants = {
  initial: { opacity: 0 },
  in: { 
    opacity: 1
  },
  out: { 
    opacity: 0
  }
};

const pageTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const
};

const loaderTransition = {
  duration: 0.3
};

export function PageLoader({ children, showLoader = true }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(showLoader);

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Show loader for 3 seconds for consistent experience

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [showLoader]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          variants={loaderVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={loaderTransition}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        >
          {/* Lottie animation */}
          <div className="flex items-center justify-center w-full">
            <div className="w-[80vw] max-w-[600px] h-[80vw] max-h-[600px]">
              <LottieFlies />
            </div>
          </div>

          {/* Loading text */}
          <div className="-mt-16 text-sm sm:text-base text-gray-700 font-medium text-center" role="status" aria-live="polite">
            Loading...
          </div>
        </motion.div>

      ) : (
        <motion.div
          key="content"
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={pageTransition}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}