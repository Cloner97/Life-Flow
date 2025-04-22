
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const modules = [
  {
    id: 'finance',
    title: 'امور مالی',
    description: 'مدیریت مالی شخصی',
    emoji: '💰',
    color: 'bg-lifeos-soft-yellow',
    path: '/finance'
  },
  {
    id: 'health',
    title: 'سلامتی',
    description: 'سلامت جسمی و روحی',
    emoji: '💪',
    color: 'bg-lifeos-soft-orange',
    path: '/health'
  },
  {
    id: 'growth',
    title: 'رشد فردی',
    description: 'اهداف و روتین‌ها',
    emoji: '📈',
    color: 'bg-lifeos-soft-purple',
    path: '/growth'
  },
  {
    id: 'relationships',
    title: 'روابط',
    description: 'مدیریت روابط شخصی',
    emoji: '👥',
    color: 'bg-lifeos-soft-pink',
    path: '/relationships'
  }
];

// Demo data for reports
const financeReports = {
  totalIncome: '۵,۶۵۰,۰۰۰ تومان',
  totalExpense: '۴,۳۲۰,۰۰۰ تومان',
  balance: '۱,۳۳۰,۰۰۰ تومان'
};

const healthReports = {
  steps: '۷,۸۹۰ قدم',
  sleep: '۷.۵ ساعت',
  water: '۱.۲ لیتر'
};

const growthReports = {
  completedTasks: '۱۴',
  ongoingProjects: '۳',
  learningHours: '۸.۵ ساعت'
};

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">زندگی او اس</h1>
        <p className="text-gray-600 mt-2">خوش آمدید</p>
      </div>
      
      {/* منوی ماژول‌ها در بالا */}
      <div className="overflow-x-auto pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
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
                <span className="text-3xl mb-3">{module.emoji}</span>
                <h3 className="font-bold text-gray-900">{module.title}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{module.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* بخش گزارشات با جزئیات بیشتر */}
      <div className="mt-8">
        <div className="text-lg font-bold text-gray-800 mb-4">گزارشات کلی</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="ios-card p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold mb-2 text-green-700 flex items-center">
              <span className="ml-2">💰</span>
              گزارش مالی
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">درآمد کل:</span>
                <span className="font-medium text-green-600">{financeReports.totalIncome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">هزینه کل:</span>
                <span className="font-medium text-red-600">{financeReports.totalExpense}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="text-gray-600 text-sm">مانده:</span>
                <span className="font-bold">{financeReports.balance}</span>
              </div>
            </div>
          </div>
          
          <div className="ios-card p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold mb-2 text-orange-700 flex items-center">
              <span className="ml-2">💪</span>
              گزارش سلامتی
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">قدم‌های روزانه:</span>
                <span className="font-medium">{healthReports.steps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">خواب:</span>
                <span className="font-medium">{healthReports.sleep}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">آب مصرفی:</span>
                <span className="font-medium">{healthReports.water}</span>
              </div>
            </div>
          </div>
          
          <div className="ios-card p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold mb-2 text-purple-700 flex items-center">
              <span className="ml-2">📈</span>
              گزارش رشد فردی
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">کارهای تکمیل شده:</span>
                <span className="font-medium">{growthReports.completedTasks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">روتین‌های فعال:</span>
                <span className="font-medium">{growthReports.ongoingProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">ساعات یادگیری:</span>
                <span className="font-medium">{growthReports.learningHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
