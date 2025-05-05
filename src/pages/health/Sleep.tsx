
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { SleepClock } from '@/components/health/SleepClock';
import { SleepTips } from '@/components/health/SleepTips';
import { ActivityCard } from '@/components/health/ActivityCard';
import { Moon } from 'lucide-react';

const healthNavItems = [
  { name: "خواب", path: "sleep", emoji: "😴" },
  { name: "غذا", path: "food", emoji: "🍎" },
  { name: "مدیتیشن", path: "meditation", emoji: "🧘" },
  { name: "پزشکی", path: "medical", emoji: "🏥" },
];

export default function Sleep() {
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">سلامتی</h1>
      </div>
      
      <SectionNavBar items={healthNavItems} baseRoute="/health" />
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">خواب</h2>
          <p className="mb-6">مدیریت و پیگیری کیفیت خواب برای سلامتی بهینه</p>
          
          <SleepClock initialBedtime="00:00" initialWakeTime="07:00" />
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">سابقه خواب اخیر</h3>
            <div className="space-y-3">
              <ActivityCard
                title="خواب عمیق"
                duration="7 ساعت و 20 دقیقه"
                date="دیشب"
                category="کیفیت عالی"
                color="bg-lifeos-soft-purple"
                icon={<Moon className="text-gray-800" size={18} />}
              />
              <ActivityCard
                title="خواب با تاخیر"
                duration="6 ساعت و 45 دقیقه"
                date="2 شب پیش"
                category="کیفیت متوسط"
                color="bg-lifeos-soft-yellow"
                icon={<Moon className="text-gray-800" size={18} />}
              />
              <ActivityCard
                title="خواب آرام"
                duration="8 ساعت و 10 دقیقه"
                date="3 شب پیش"
                category="کیفیت عالی"
                color="bg-lifeos-soft-green"
                icon={<Moon className="text-gray-800" size={18} />}
              />
            </div>
          </div>
          
          <div className="mt-8">
            <SleepTips />
          </div>
        </div>
      </div>
    </div>
  );
}
