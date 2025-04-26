
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';

const relationshipsNavItems = [
  { name: "مخاطبین", path: "contacts", emoji: "👥" },
  { name: "رویدادها", path: "events", emoji: "🎉" },
];

export default function Contacts() {
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">روابط</h1>
      </div>
      
      <SectionNavBar items={relationshipsNavItems} baseRoute="/relationships" />
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">مخاطبین</h2>
          <p>مدیریت مخاطبین و دوستان</p>
          
          <div className="mt-4 text-center py-10 text-gray-500">
            لیست مخاطبین شما اینجا نمایش داده می‌شود...
          </div>
        </div>
      </div>
    </div>
  );
}
