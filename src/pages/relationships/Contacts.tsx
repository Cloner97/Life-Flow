
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { CreateEventDialog } from '@/components/relationships/CreateEventDialog';
import { Users } from 'lucide-react';

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
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <CreateEventDialog />
        </div>
      </div>
      
      <div className="text-gray-600 mb-6">
        مرکزی برای مراقبت از روابطت؛ ثبت اطلاعات افراد مهم، یادآوری رویدادها و مناسبت‌ها و ساختن روابط قوی و معنادار با اطرافیان.
      </div>
      
      <SectionNavBar items={relationshipsNavItems} baseRoute="/relationships" />
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <Users className="mr-2 h-5 w-5 text-lifeos-primary" />
            <h2 className="text-xl font-semibold">مخاطبین</h2>
          </div>
          <p>مدیریت مخاطبین و دوستان</p>
          
          <div className="mt-4 text-center py-10 text-gray-500">
            لیست مخاطبین شما اینجا نمایش داده می‌شود...
          </div>
        </div>
      </div>
    </div>
  );
}
