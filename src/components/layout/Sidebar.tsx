
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, ListTodo, ChartPie, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

const modules = [
  {
    id: 'projects',
    name: 'پروژه‌ها',
    description: 'مدیریت پروژه‌های شخصی',
    icon: ListTodo,
    color: 'bg-lifeos-soft-green',
    path: '/projects'
  },
  {
    id: 'finance',
    name: 'امور مالی',
    description: 'مدیریت مالی شخصی',
    icon: ChartPie,
    color: 'bg-lifeos-soft-yellow',
    path: '/finance'
  },
  {
    id: 'health',
    name: 'سلامتی',
    description: 'سلامت جسمی و روحی',
    icon: Timer,
    color: 'bg-lifeos-soft-orange',
    path: '/health'
  },
  {
    id: 'growth',
    name: 'رشد فردی',
    description: 'اهداف و یادگیری',
    icon: CalendarDays,
    color: 'bg-lifeos-soft-purple',
    path: '/growth'
  },
  {
    id: 'relationships',
    name: 'روابط',
    description: 'مدیریت روابط شخصی',
    icon: Clock,
    color: 'bg-lifeos-soft-pink',
    path: '/relationships'
  }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'h-screen bg-white border-l border-gray-200 transition-all duration-300 flex flex-col',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {!collapsed && (
          <h1 className="text-xl font-bold text-lifeos-primary">زندگی او اس</h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="rounded-full p-2 hover:bg-gray-100"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <span className="p-2 rounded-lg bg-lifeos-soft-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </span>
              {!collapsed && <span className="mr-3">داشبورد</span>}
            </Link>
          </li>
          
          {modules.map((module) => (
            <li key={module.id}>
              <Link
                to={module.path}
                className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <span className={cn("p-2 rounded-lg", module.color)}>
                  <module.icon className="text-gray-800" size={20} />
                </span>
                {!collapsed && <span className="mr-3">{module.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-lifeos-primary text-white flex items-center justify-center">
            <span>ک</span>
          </div>
          {!collapsed && (
            <div className="mr-3">
              <div className="text-sm font-medium">کاربر</div>
              <div className="text-xs text-gray-500">تنظیمات</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
