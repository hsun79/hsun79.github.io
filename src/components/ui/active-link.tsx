import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ActiveLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export const ActiveLink = ({ 
  to, 
  children, 
  className = "",
  activeClassName = "bg-accent text-accent-foreground"
}: ActiveLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        className,
        isActive && activeClassName
      )}
    >
      {children}
    </Link>
  );
}; 