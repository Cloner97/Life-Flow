
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';

const growthNavItems = [
  { name: "امروز", path: "today", emoji: "📅" },
  { name: "ابزارها", path: "tools", emoji: "🔧" },
  { name: "روتین‌ها", path: "routines", emoji: "🔄" },
];

export default function Today() {
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">رشد فردی</h1>
      </div>
      
      <SectionNavBar items={growthNavItems} baseRoute="/growth" />
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">امروز</h2>
          <p>وظایف و فعالیت‌های امروز شما</p>
          
          <div className="mt-4 text-center py-10 text-gray-500">
            برنامه‌های امروز شما اینجا نمایش داده می‌شود...
          </div>
        </div>
      </div>
    </div>
  );
}
