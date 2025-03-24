import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // If there's a hash, scroll to that element instead
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    
    // Otherwise scroll to top
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  
  return null; // This component doesn't render anything
}

export default ScrollToTop; 