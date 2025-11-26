'use client';

import { motion, Variants } from 'framer-motion';

const pathVariants: Variants = {
  hidden: {
    opacity: 0,
    pathLength: 0
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      // numeric cubic-bezier easing array is accepted by framer-motion's Easing type
      ease: [0.42, 0.0, 0.58, 1.0]
    }
  }
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 1.5,
      duration: 0.8
    }
  }
};

export function AnimatedLogo() {
  return (
    <div className="flex items-center space-x-3">
      <motion.div initial="hidden" animate="visible" className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-[#5156D2]">
          <motion.path
            d="M20 5 L35 20 L20 35 L5 20 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            variants={pathVariants}
          />
          <motion.path
            d="M20 12 L28 20 L20 28 L12 20 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={pathVariants}
          />
          <motion.text
            x="20"
            y="22"
            textAnchor="middle"
            fill="currentColor"
            fontSize="10"
            fontFamily="Arial"
            variants={pathVariants}
          >
            S
          </motion.text>
        </svg>

        {/* Floating particles */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-[#E6B84A] rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
      </motion.div>

      <motion.div variants={textVariants} initial="hidden" animate="visible" className="flex flex-col">
        <motion.span
          className="text-xl font-bold bg-gradient-to-r from-[#5156D2] to-[#E6B84A] bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          ShopSphere
        </motion.span>
        <motion.span className="text-xs text-gray-500 -mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          Premium Store
        </motion.span>
      </motion.div>
    </div>
  );
}