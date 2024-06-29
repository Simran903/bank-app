import React, { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealSectionProps {
  children: ReactNode;
}

const RevealSection: React.FC<RevealSectionProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 300 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default RevealSection;