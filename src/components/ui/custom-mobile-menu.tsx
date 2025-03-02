import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
}

export function CustomMobileMenu({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <div className="relative md:hidden">
      <button 
        onClick={toggleMenu}
        className="p-2 rounded-md hover:bg-gray-100"
      >
        <Menu className="h-6 w-6" />
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200"
          style={{ marginTop: '0.5rem' }}
        >
          <div className="p-2">
            <div className="flex items-center justify-between pb-2 mb-2 border-b">
              <span className="text-sm font-medium">菜单</span>
              <button 
                onClick={toggleMenu}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="py-1">
              {items.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-4 py-2 text-sm rounded-md",
                    location.pathname === item.path
                      ? "bg-pink-50 text-pink-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 