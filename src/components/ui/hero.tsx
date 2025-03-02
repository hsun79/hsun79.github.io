import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
  imageUrl: string;
  overlayContent?: React.ReactNode;
  height?: string;
  className?: string;
}

export function Hero({ 
  imageUrl, 
  overlayContent, 
  height = "100vh", 
  className 
}: HeroProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const { top, height } = heroRef.current.getBoundingClientRect();
        // Check if hero is in viewport
        if (top < window.innerHeight && top + height > 0) {
          setScrollPosition(window.scrollY * 0.5); // 0.5 controls the parallax speed
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height }}
    >
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${scrollPosition}px)`, 
          transition: 'transform 0.1s ease-out',
        }}
      />
      
      {/* Optional Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      {/* Content positioned over the background */}
      <div className="relative h-full flex items-center justify-center">
        {overlayContent}
      </div>
    </div>
  );
} 