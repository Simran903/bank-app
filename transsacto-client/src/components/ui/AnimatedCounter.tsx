import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ 
  end, 
  start = 0, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  className = '',
  decimals = 0
}) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (start === end) return;

    const startTime = Date.now();
    const difference = end - start;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = start + (difference * easeOutExpo);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [start, end, duration]);

  const formatNumber = (num) => {
    return decimals > 0 ? num.toFixed(decimals) : Math.floor(num);
  };

  return (
    <span className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default AnimatedCounter;