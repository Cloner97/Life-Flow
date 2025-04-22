
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const modules = [
  {
    id: 'finance',
    name: 'امور مالی',
    description: 'مدیریت مالی شخصی',
    emoji: '💰',
    color: 'bg-lifeos-soft-yellow',
    path: '/finance'
  },
  {
    id: 'health',
    name: 'سلامتی',
    description: 'سلامت جسمی و روحی',
    emoji: '💪',
    color: 'bg-lifeos-soft-orange',
    path: '/health'
  },
  {
    id: 'growth',
    name: 'رشد فردی',
    description: 'اهداف و یادگیری',
    emoji: '📈',
    color: 'bg-lifeos-soft-purple',
    path: '/growth'
  },
  {
    id: 'relationships',
    name: 'روابط',
    description: 'مدیریت روابط شخصی',
    emoji: '👥',
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
                <span className="text-xl">🏠</span>
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
                  <span className="text-xl">{module.emoji}</span>
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
