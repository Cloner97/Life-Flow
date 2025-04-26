
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';

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
          <p>مدیریت و پیگیری کیفیت خواب</p>
          
          <div className="mt-4 text-center py-10 text-gray-500">
            بخش مدیریت خواب در حال توسعه است...
          </div>
        </div>
      </div>
    </div>
  );
}
