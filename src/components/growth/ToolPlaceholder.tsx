
import { BackButton } from '@/components/ui/BackButton';
import { Card, CardContent } from "@/components/ui/card";
import { SectionNavBar } from '@/components/layout/SectionNavBar';

const growthNavItems = [
  { name: "امروز", path: "today", emoji: "📅" },
  { name: "ابزارها", path: "tools", emoji: "🔧" },
  { name: "روتین‌ها", path: "routines", emoji: "🔄" },
];

interface ToolPlaceholderProps {
  title: string;
  description: string;
}

export function ToolPlaceholder({ title, description }: ToolPlaceholderProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">رشد فردی</h1>
      </div>
      
      <SectionNavBar items={growthNavItems} baseRoute="/growth" />
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <p className="text-gray-600">{description}</p>
          <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
            این ابزار در حال توسعه است...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
