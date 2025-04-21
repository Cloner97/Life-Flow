
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
      {/* منوی ماژول‌ها در بالا */}
      <div className="overflow-x-auto pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={module.path}
              className="group"
            >
              <div className={cn(
                "aspect-square rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300",
                "hover:scale-[1.05] hover:shadow-lg",
                module.color
              )}>
                <module.icon className="w-10 h-10 mb-3 text-gray-800" />
                <h3 className="font-bold text-gray-900">{module.title}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{module.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* بخش گزارشات (به صورت دمو و قابل جایگزینی با گزارشات واقعی) */}
      <div className="mt-8">
        <div className="text-lg font-bold text-gray-800 mb-4">گزارشات کلی</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="ios-card p-4">
            <div className="font-semibold mb-2 text-purple-700">گزارش پیشرفت پروژه‌ها</div>
            <div className="text-gray-600 text-sm">در اینجا می‌توانید خلاصه‌ای از پیشرفت پروژه‌های خود را مشاهده کنید.</div>
          </div>
          <div className="ios-card p-4">
            <div className="font-semibold mb-2 text-green-700">وضعیت مالی</div>
            <div className="text-gray-600 text-sm">نمای کلی از بودجه‌بندی، درآمد و هزینه‌های شما.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
