import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimpleImageCarouselProps {
  images: string[];
  height?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  preloadCount?: number; // Number of images to preload on each side
}

const SimpleImageCarousel: React.FC<SimpleImageCarouselProps> = ({
  images,
  height = '400px',
  className = '',
  autoPlay = false,
  autoPlaySpeed = 5000,
}) => {
  // Helper function to get images with wrap-around for building the buffer
  const getImageWithWrap = (index: number) => {
    // Ensure we always get a valid index by wrapping around the array
    const wrappedIndex = ((index % images.length) + images.length) % images.length;
    return images[wrappedIndex];
  };
  
  // Number of buffer images at each end
  const bufferCount = 3;
  
  // Create extended array with 3 clones at each end for smoother infinite scrolling
  const extendedImages = [
    getImageWithWrap(images.length - 3),
    getImageWithWrap(images.length - 2),
    getImageWithWrap(images.length - 1),
    ...images,
    getImageWithWrap(0),
    getImageWithWrap(1),
    getImageWithWrap(2)
  ];
  
  const [currentIndex, setCurrentIndex] = useState(bufferCount); // Start at first real image (after buffer)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // For touch/swipe handling
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Add state to track if carousel is in viewport
  const [isInView, setIsInView] = useState(false);
  
  // Initialize to show the first real slide and preload adjacent images
  useEffect(() => {
    if (sliderRef.current) {
      // Initially disable transitions so first slide appears instantly
      sliderRef.current.style.transition = 'none';
      setCurrentIndex(bufferCount);
      
      // Re-enable transitions after initial positioning
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'transform 500ms ease-in-out';
          setIsTransitioning(false);
        }
      }, 50);
    }
  }, [bufferCount, extendedImages.length]);
  
  const handleSlideChange = (newIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      
      // Handle the loop when reaching buffer thresholds
      if (newIndex < bufferCount) {
        // We've scrolled into the start buffer, jump to the corresponding slide at the end
        sliderRef.current!.style.transition = 'none';
        const jumpToIndex = images.length + newIndex;
        setCurrentIndex(jumpToIndex);
        
        // Re-enable transitions after the jump
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.style.transition = 'transform 500ms ease-in-out';
            }
          }, 10);
        });
      } 
      else if (newIndex >= bufferCount + images.length) {
        // We've scrolled into the end buffer, jump to the corresponding slide at the start
        sliderRef.current!.style.transition = 'none';
        const jumpToIndex = (newIndex - images.length);
        setCurrentIndex(jumpToIndex);
        
        // Re-enable transitions after the jump
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.style.transition = 'transform 500ms ease-in-out';
            }
          }, 10);
        });
      }
    }, 500);
  };

  const nextSlide = () => {
    handleSlideChange(currentIndex + 1);
  };

  const prevSlide = () => {
    handleSlideChange(currentIndex - 1);
  };

  // Handle autoplay
  useEffect(() => {
    if (!autoPlay || isTransitioning) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlaySpeed);
    
    return () => clearInterval(interval);
  }, [autoPlay, autoPlaySpeed, isTransitioning, currentIndex]);

  // Calculate the transform to center the current slide
  const calculateTransform = () => {
    if (!containerRef.current || !slideRefs.current[currentIndex]) return 'translateX(0)';
    
    const containerWidth = containerRef.current.offsetWidth;
    const slideElement = slideRefs.current[currentIndex];
    const slideOffset = slideElement ? slideElement.offsetLeft : 0;
    
    // Center the current slide in the container
    const centerPosition = slideOffset - (containerWidth - (slideElement?.offsetWidth || 0)) / 2;
    
    return `translateX(-${centerPosition}px)`;
  };

  // Reset slide refs array when images change
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, extendedImages.length);
  }, [extendedImages.length]);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 50; // Minimum distance to register as a swipe
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe right -> go to previous slide
        prevSlide();
      } else {
        // Swipe left -> go to next slide
        nextSlide();
      }
    }
    
    // Reset touch coordinates
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Set up intersection observer to detect when carousel enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When carousel enters viewport, set isInView to true
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once we've seen it, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        // Start animation when 10% of the carousel is visible
        threshold: 0.1,
        // Add some rootMargin to trigger a bit earlier
        rootMargin: '50px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden relative", 
        className, 
        isInView ? 'animate-carousel-fade-in' : 'opacity-0'
      )}
      style={{ height }} 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full overflow-visible">
        <div 
          ref={sliderRef}
          className="flex h-full"
          style={{ 
            width: `${extendedImages.length * 100}%`,
            transform: calculateTransform(),
            transition: 'transform 500ms ease-in-out' 
          }}
        >
          {extendedImages.map((image, idx) => {
            // Determine if this is a real slide or a buffer slide
            const isBuffer = idx < bufferCount || idx >= bufferCount + images.length;
            
            return (
              <div 
                key={`${image}-${idx}`}
                ref={el => {
                  slideRefs.current[idx] = el;
                }}
                className="flex-shrink-0 h-full flex items-center justify-center w-fit"
              >
                <img 
                   src={image} 
                   alt={`Slide ${isBuffer ? 'buffer' : idx - bufferCount + 1}`}
                   className="h-full" 
                   aria-hidden={isBuffer ? 'true' : 'false'}
                 />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation Areas - Left 45% width */}
      <div 
        onClick={prevSlide}
        className="absolute left-0 top-0 w-[45%] h-full flex items-center cursor-pointer z-10 transition-colors duration-300 opacity-0 hover:opacity-20 transition-opacity touch-manipulation"
        aria-label="Previous slide"
      >
        <div className="ml-4">
          <ChevronLeft className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
      </div>
      
      {/* Navigation Areas - Right 45% width */}
      <div 
        onClick={nextSlide}
        className="absolute right-0 top-0 w-[45%] h-full flex items-center justify-end cursor-pointer z-10 transition-colors duration-300 opacity-0 hover:opacity-20 transition-opacity touch-manipulation"
        aria-label="Next slide"
      >
        <div className="mr-4">
          <ChevronRight className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default SimpleImageCarousel;