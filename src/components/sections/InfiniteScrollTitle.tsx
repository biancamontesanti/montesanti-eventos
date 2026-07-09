import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const InfiniteScrollTitle = () => {
  const { scrollY } = useScroll();
  const [scrollLimit, setScrollLimit] = useState(500);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const updateScrollLimit = () => {
      setScrollLimit(window.innerHeight * 0.72);
    };

    updateScrollLimit();
    window.addEventListener('resize', updateScrollLimit);
    
    return () => window.removeEventListener('resize', updateScrollLimit);
  }, []);

  // Create a smooth scrolling effect
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform the title position
  const y = useTransform(
    smoothScrollY,
    [0, scrollLimit],
    ['32vh', '38vh'],
    { clamp: true }
  );

  const scale = useTransform(
    smoothScrollY,
    [0, scrollLimit],
    [1, 0.82], // Scale down as it scrolls
    { clamp: true }
  );

  const opacity = useTransform(
    smoothScrollY,
    [0, scrollLimit * 0.38, scrollLimit * 0.62],
    [1, 0.35, 0],
    { clamp: true }
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div
        style={{
          y,
          scale,
          opacity,
          position: 'fixed',
          left: '50%',
          x: '-50%', // Center horizontally
        }}
        className="w-full"
      >
        <div className="py-8 text-center">
          <h1 className="font-brand-script px-4 text-[clamp(3.45rem,15vw,5rem)] leading-[0.8] text-white drop-shadow-[0_12px_34px_rgba(0,0,0,0.95)] md:text-[clamp(5.2rem,9.5vw,9.25rem)] md:leading-[0.78]">
            <span className="block md:inline">Montesanti</span>
            <span className="block md:inline md:ml-5">Eventos</span>
          </h1>
        </div>
      </motion.div>
    </div>
  );
};

export default InfiniteScrollTitle;
