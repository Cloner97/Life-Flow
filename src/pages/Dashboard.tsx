
import { CalendarDays, ListTodo, ChartPie, Timer, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { TransactionCard } from '@/components/finance/TransactionCard';
import { ActivityCard } from '@/components/health/ActivityCard';
import { ProgressBar } from '@/components/ui/ProgressBar';

const modules = [
  {
    id: 'projects',
    title: 'پروژه‌ها',
    description: 'مدیریت پروژه‌های شخصی',
    icon: ListTodo,
    color: 'bg-lifeos-soft-green',
    path: '/projects',
    stats: [
      { label: 'پروژه فعال', value: '3' },
      { label: 'تکمیل شده', value: '12' }
    ]
  },
  {
    id: 'finance',
    title: 'امور مالی',
    description: 'مدیریت مالی شخصی',
    icon: ChartPie,
    color: 'bg-lifeos-soft-yellow',
    path: '/finance',
    stats: [
      { label: 'درآمد ماهانه', value: '۵.۲ میلیون' },
      { label: 'هزینه ماهانه', value: '۳.۸ میلیون' }
    ]
  },
  {
    id: 'health',
    title: 'سلامتی',
    description: 'سلامت جسمی و روحی',
    icon: Timer,
    color: 'bg-lifeos-soft-orange',
    path: '/health',
    stats: [
      { label: 'امتیاز سلامتی', value: '87/100' },
      { label: 'فعالیت هفتگی', value: '4/7' }
    ]
  },
  {
    id: 'growth',
    title: 'رشد فردی',
    description: 'اهداف و یادگیری',
    icon: CalendarDays,
    color: 'bg-lifeos-soft-purple',
    path: '/growth',
    stats: [
      { label: 'اهداف فعال', value: '5' },
      { label: 'عادت‌های روزانه', value: '3' }
    ]
  },
  {
    id: 'relationships',
    title: 'روابط',
    description: 'مدیریت روابط شخصی',
    icon: Clock,
    color: 'bg-lifeos-soft-pink',
    path: '/relationships',
    stats: [
      { label: 'افراد مهم', value: '8' },
      { label: 'رویدادها', value: '2' }
    ]
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">سلام، کاربر عزیز</h1>
        <p className="text-gray-600 mt-1">خوش آمدید به زندگی او اس</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            description={module.description}
            path={module.path}
            icon={module.icon}
            color={module.color}
            stats={module.stats}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">پروژه‌های اخیر</CardTitle>
            <CardDescription>پروژه‌های فعال و در حال پیشرفت</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProjectCard 
              title="طراحی وب‌سایت شخصی" 
              description="ساخت وب‌سایت نمونه کار با استفاده از React و Tailwind CSS" 
              progress={75} 
              deadline="۱۴۰۴/۰۲/۱۵"
            />
            <ProjectCard 
              title="یادگیری زبان انگلیسی" 
              description="رسیدن به سطح B2 تا پایان سال" 
              progress={40} 
              deadline="۱۴۰۴/۱۲/۲۹"
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">تراکنش‌های اخیر</CardTitle>
            <CardDescription>گزارش مالی هفته اخیر</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <TransactionCard 
              title="حقوق ماهانه" 
              amount={5200000} 
              date="۱۴۰۴/۰۱/۳۱" 
              isIncome={true} 
              category="درآمد"
            />
            <TransactionCard 
              title="خرید مواد غذایی" 
              amount={450000} 
              date="۱۴۰۴/۰۲/۰۲" 
              category="مواد غذایی"
            />
            <TransactionCard 
              title="قبض برق" 
              amount={185000} 
              date="۱۴۰۴/۰۲/۰۵" 
              category="قبوض"
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">فعالیت‌های سلامتی</CardTitle>
            <CardDescription>فعالیت‌های ورزشی و سلامتی اخیر</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ActivityCard 
              title="پیاده‌روی" 
              duration="۴۵ دقیقه" 
              date="امروز"
              category="ورزش"
            />
            <ActivityCard 
              title="مدیتیشن" 
              duration="۱۵ دقیقه" 
              date="دیروز"
              category="سلامت روان"
              color="bg-lifeos-soft-blue"
            />
            <div className="mt-4 pt-3 border-t">
              <h4 className="text-sm font-medium mb-2">خلق و خوی هفتگی</h4>
              <ProgressBar value={85} color="bg-lifeos-primary" showLabel />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
