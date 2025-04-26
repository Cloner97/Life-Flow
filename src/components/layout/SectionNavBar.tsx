
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SectionNavItem {
  name: string;
  path: string;
  emoji: string;
}

interface SectionNavBarProps {
  items: SectionNavItem[];
  baseRoute: string;
}

export function SectionNavBar({ items, baseRoute }: SectionNavBarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Default to the first item if we're at the base route
  const activeItem = currentPath === baseRoute 
    ? `${baseRoute}/${items[0].path}` 
    : currentPath;
  
  return (
    <div className="w-full overflow-x-auto mb-6">
      <div className="flex space-x-2 rtl:space-x-reverse pb-2 px-1">
        {items.map((item) => {
          const fullPath = `${baseRoute}/${item.path}`;
          const isActive = activeItem === fullPath;
          
          return (
            <Link
              key={item.path}
              to={fullPath}
              className={cn(
                "flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors",
                isActive 
                  ? "bg-lifeos-primary text-white" 
                  : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              <span className="mr-2">{item.emoji}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
