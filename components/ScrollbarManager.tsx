'use client';

import { useEffect } from 'react';

const ScrollbarManager = () => {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Add scrolling class to show scrollbar
      document.documentElement.classList.add('scrolling');
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set timeout to hide scrollbar after 3 seconds of no scrolling
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('scrolling');
      }, 3000);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null;
};

export default ScrollbarManager;