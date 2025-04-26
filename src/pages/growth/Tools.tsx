
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Calendar, Clock, Star, Edit, Heart, List, FileText, PenIcon } from "lucide-react";

const growthNavItems = [
  { name: "امروز", path: "today", emoji: "📅" },
  { name: "ابزارها", path: "tools", emoji: "🔧" },
  { name: "روتین‌ها", path: "routines", emoji: "🔄" },
];

const tools = [
  {
    category: "برنامه‌ریزی و پیشرفت",
    items: [
      {
        title: "دفترچه اهداف",
        description: "ثبت روزانه پیشرفت‌ها و تعیین قدم‌های بعدی",
        icon: <Book className="w-6 h-6" />,
        color: "bg-lifeos-soft-blue",
        href: "/growth/tools/goal-journal"
      },
      {
        title: "ردیاب عادت‌ها",
        description: "پیگیری عادت‌های روزانه به صورت بازی‌وار",
        icon: <Star className="w-6 h-6" />,
        color: "bg-lifeos-soft-yellow",
        href: "/growth/tools/habit-tracker"
      },
      {
        title: "بولت ژورنال",
        description: "مدیریت کارها، ایده‌ها و حالات روحی",
        icon: <PenIcon className="w-6 h-6" />,
        color: "bg-lifeos-soft-purple",
        href: "/growth/tools/bullet-journal"
      }
    ]
  },
  {
    category: "یادگیری و خلاقیت",
    items: [
      {
        title: "نقشه ذهنی",
        description: "سازماندهی ایده‌ها و مسیر یادگیری",
        icon: <FileText className="w-6 h-6" />,
        color: "bg-lifeos-soft-green",
        href: "/growth/tools/mind-mapping"
      },
      {
        title: "یادگیری میکرو",
        description: "خلاصه کتاب‌های رشد فردی در زمان کوتاه",
        icon: <Book className="w-6 h-6" />,
        color: "bg-lifeos-soft-orange",
        href: "/growth/tools/microlearning"
      },
      {
        title: "سیستم تصمیم‌گیری 5-5-5",
        description: "بررسی تاثیر تصمیمات در بازه‌های زمانی مختلف",
        icon: <Clock className="w-6 h-6" />,
        color: "bg-lifeos-soft-red",
        href: "/growth/tools/decision-making"
      }
    ]
  },
  {
    category: "بازبینی و تامل",
    items: [
      {
        title: "گزارش هفتگی",
        description: "مرور موفقیت‌ها، چالش‌ها و درس‌های آموخته شده",
        icon: <List className="w-6 h-6" />,
        color: "bg-lifeos-soft-indigo",
        href: "/growth/tools/weekly-review"
      },
      {
        title: "مدیتیشن و تمرکز",
        description: "تمرینات آرامش ذهنی و افزایش تمرکز",
        icon: <Heart className="w-6 h-6" />,
        color: "bg-lifeos-soft-pink",
        href: "/growth/tools/meditation"
      },
      {
        title: "چالش ۳۰ روزه",
        description: "ایجاد عادت‌های جدید در یک ماه",
        icon: <Calendar className="w-6 h-6" />,
        color: "bg-lifeos-soft-teal",
        href: "/growth/tools/thirty-day-challenge"
      },
      {
        title: "امتیازدهی روزانه",
        description: "ارزیابی و ثبت کیفیت هر روز",
        icon: <Edit className="w-6 h-6" />,
        color: "bg-lifeos-soft-purple",
        href: "/growth/tools/daily-score"
      }
    ]
  }
];

export default function Tools() {
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">رشد فردی</h1>
      </div>
      
      <SectionNavBar items={growthNavItems} baseRoute="/growth" />
      
      <div className="space-y-8">
        {tools.map((category, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((tool, toolIndex) => (
                <Card key={toolIndex} className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tool.color}`}>
                        {tool.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-lifeos-primary group-hover:text-white transition-colors"
                    >
                      شروع
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
