import { useState, useEffect } from 'react';

export const useBottomNavHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      // Calculate navigation height including safe area
      const safeAreaBottom = window.getComputedStyle(document.documentElement)
        .getPropertyValue('env(safe-area-inset-bottom)') || '0px';
      
      // Base navigation height (approximately 80px) + safe area
      const baseHeight = 80;
      const safeAreaHeight = parseInt(safeAreaBottom) || 0;
      
      setHeight(baseHeight + safeAreaHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return height;
};