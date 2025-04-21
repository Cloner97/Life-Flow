import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ActivityCard } from '@/components/health/ActivityCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BackButton } from '@/components/ui/BackButton';
import { BottomNavBar } from '@/components/layout/BottomNavBar';

// Sample data
const activities = [
  {
    id: 1,
    title: "پیاده‌روی",
    duration: "۴۵ دقیقه",
    date: "امروز",
    category: "ورزش",
    type: "physical"
  },
  {
    id: 2,
    title: "مدیتیشن",
    duration: "۱۵ دقیقه",
    date: "دیروز",
    category: "سلامت روان",
    type: "mental"
  },
  {
    id: 3,
    title: "دویدن",
    duration: "۳۰ دقیقه",
    date: "۱۴۰۴/۰۲/۰۵",
    category: "ورزش",
    type: "physical"
  },
  {
    id: 4,
    title: "یوگا",
    duration: "۲۰ دقیقه",
    date: "۱۴۰۴/۰۲/۰۶",
    category: "ورزش",
    type: "physical"
  },
  {
    id: 5,
    title: "مطالعه کتاب",
    duration: "۶۰ دقیقه",
    date: "۱۴۰۴/۰۲/۰۴",
    category: "سلامت روان",
    type: "mental"
  },
  {
    id: 6,
    title: "تمرین تنفس",
    duration: "۱۰ دقیقه",
    date: "۱۴۰۴/۰۲/۰۷",
    category: "سلامت روان",
    type: "mental"
  }
];

export default function Health() {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredActivities = activeTab === 'all' 
    ? activities 
    : activities.filter(a => a.type === activeTab);
  
  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">سلامتی</h1>
        <Button className="bg-lifeos-primary hover:bg-lifeos-secondary">
          فعالیت جدید
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">امتیاز سلامتی</CardTitle>
            <CardDescription>وضعیت کلی سلامتی</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-lifeos-soft-green mb-2">
                <span className="text-2xl font-bold text-gray-900">87</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={87} color="bg-green-500" showLabel />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">سلامت جسمی</CardTitle>
            <CardDescription>فعالیت‌های بدنی هفتگی</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>روزهای فعالیت</span>
                <span className="font-bold">۴/۷</span>
              </div>
              <ProgressBar value={57} color="bg-lifeos-primary" showLabel />
              <div className="text-xs text-gray-500 mt-2">
                هدف: ۵ روز در هفته
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">سلامت روان</CardTitle>
            <CardDescription>وضعیت روحی و ذهنی</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>میزان استرس</span>
                <span className="font-bold">کم</span>
              </div>
              <ProgressBar value={25} color="bg-blue-500" showLabel />
              <div className="text-xs text-gray-500 mt-2">
                بهتر از هفته قبل
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>فعالیت‌های اخیر</CardTitle>
          <CardDescription>ثبت فعالیت‌های مرتبط با سلامتی</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="physical">جسمی</TabsTrigger>
              <TabsTrigger value="mental">روانی</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredActivities.map(activity => (
                  <ActivityCard
                    key={activity.id}
                    title={activity.title}
                    duration={activity.duration}
                    date={activity.date}
                    category={activity.category}
                    color={activity.type === 'mental' ? 'bg-lifeos-soft-blue' : 'bg-lifeos-soft-green'}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <BottomNavBar />
    </div>
  );
}
