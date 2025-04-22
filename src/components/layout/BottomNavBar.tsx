
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  {
    id: 'dashboard',
    name: 'داشبورد',
    path: '/',
    emoji: '🏠'
  },
  {
    id: 'finance',
    name: 'مالی',
    path: '/finance',
    emoji: '💰'
  },
  {
    id: 'health',
    name: 'سلامتی',
    path: '/health',
    emoji: '💪'
  },
  {
    id: 'growth',
    name: 'رشد',
    path: '/growth',
    emoji: '📈'
  },
  {
    id: 'relationships',
    name: 'روابط',
    path: '/relationships',
    emoji: '👥'
  }
];

export function BottomNavBar() {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(location.pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-10 md:hidden">
      {navItems.map((item) => {
        const isActive = activeNav === item.path;
        
        return (
          <Link
            key={item.id}
            to={item.path}
            className={cn(
              "flex flex-col items-center p-1 min-w-[60px]",
              isActive ? "text-lifeos-primary" : "text-gray-500"
            )}
            onClick={() => setActiveNav(item.path)}
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
