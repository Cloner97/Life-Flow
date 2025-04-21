
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, Clock, ChartPie, Timer, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    id: 'dashboard',
    name: 'داشبورد',
    path: '/',
    icon: Home
  },
  {
    id: 'finance',
    name: 'مالی',
    path: '/finance',
    icon: ChartPie
  },
  {
    id: 'health',
    name: 'سلامتی',
    path: '/health',
    icon: Timer
  },
  {
    id: 'growth',
    name: 'رشد',
    path: '/growth',
    icon: CalendarDays
  },
  {
    id: 'relationships',
    name: 'روابط',
    path: '/relationships',
    icon: Clock
  }
];

export function BottomNavBar() {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(location.pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-10 md:hidden">
      {navItems.map((item) => {
        const isActive = activeNav === item.path;
        const Icon = item.icon;
        
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
            <Icon className={cn("h-5 w-5", isActive ? "text-lifeos-primary" : "text-gray-500")} />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
