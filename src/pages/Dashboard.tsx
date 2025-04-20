import { Link } from 'react-router-dom';
import { CalendarDays, ListTodo, ChartPie, Timer, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const modules = [
  {
    id: 'projects',
    title: 'پروژه‌ها',
    description: 'مدیریت پروژه‌های شخصی',
    icon: ListTodo,
    color: 'bg-lifeos-soft-green',
    path: '/projects'
  },
  {
    id: 'finance',
    title: 'امور مالی',
    description: 'مدیریت مالی شخصی',
    icon: ChartPie,
    color: 'bg-lifeos-soft-yellow',
    path: '/finance'
  },
  {
    id: 'health',
    title: 'سلامتی',
    description: 'سلامت جسمی و روحی',
    icon: Timer,
    color: 'bg-lifeos-soft-orange',
    path: '/health'
  },
  {
    id: 'growth',
    title: 'رشد فردی',
    description: 'اهداف و یادگیری',
    icon: CalendarDays,
    color: 'bg-lifeos-soft-purple',
    path: '/growth'
  },
  {
    id: 'relationships',
    title: 'روابط',
    description: 'مدیریت روابط شخصی',
    icon: Clock,
    color: 'bg-lifeos-soft-pink',
    path: '/relationships'
  }
];

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">زندگی او اس</h1>
        <p className="text-gray-600 mt-2">خوش آمدید</p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
        {modules.map((module) => (
          <Link
            key={module.id}
            to={module.path}
            className="group"
          >
            <div className={cn(
              "aspect-square rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300",
              "hover:scale-[1.02] hover:shadow-lg",
              module.color
            )}>
              <module.icon className="w-12 h-12 mb-3 text-gray-800" />
              <h3 className="font-bold text-gray-900">{module.title}</h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{module.description}</p>
            </div>
          </Link>
        ))}

        {[...Array(15)].map((_, index) => (
          <div 
            key={`empty-${index}`}
            className="aspect-square rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
