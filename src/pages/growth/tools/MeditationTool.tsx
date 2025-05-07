
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Headphones, Music } from 'lucide-react';

const growthNavItems = [
  { name: "روتین‌ها", path: "routines", emoji: "🔄" },
  { name: "ابزارها", path: "tools", emoji: "🔧" },
];

// Sample meditation data
const meditationData = [
  { day: 'شنبه', minutes: 15 },
  { day: 'یکشنبه', minutes: 20 },
  { day: 'دوشنبه', minutes: 10 },
  { day: 'سه‌شنبه', minutes: 25 },
  { day: 'چهارشنبه', minutes: 30 },
  { day: 'پنج‌شنبه', minutes: 15 },
  { day: 'جمعه', minutes: 20 },
];

// Meditation types
const meditationTypes = [
  {
    id: 1,
    title: 'مدیتیشن تنفسی',
    description: 'تمرکز روی تنفس برای آرامش ذهن',
    duration: 10,
    color: 'bg-lifeos-soft-blue',
  },
  {
    id: 2,
    title: 'مدیتیشن ذهن آگاهی',
    description: 'بودن در لحظه و توجه به افکار بدون قضاوت',
    duration: 15,
    color: 'bg-lifeos-soft-purple',
  },
  {
    id: 3,
    title: 'مدیتیشن تجسم',
    description: 'تجسم مناظر و تصاویر آرامش‌بخش',
    duration: 20,
    color: 'bg-lifeos-soft-green',
  },
];

// Relaxing sounds
const relaxingSounds = [
  {
    id: 1,
    title: 'باران',
    icon: <Music className="w-5 h-5" />,
    color: 'bg-lifeos-soft-blue',
  },
  {
    id: 2,
    title: 'طبیعت',
    icon: <Headphones className="w-5 h-5" />,
    color: 'bg-lifeos-soft-green',
  },
  {
    id: 3,
    title: 'اقیانوس',
    icon: <Music className="w-5 h-5" />,
    color: 'bg-lifeos-soft-indigo',
  },
  {
    id: 4,
    title: 'آتش',
    icon: <Music className="w-5 h-5" />,
    color: 'bg-lifeos-soft-orange',
  },
];

// Meditation stats
const meditationStats = {
  totalSessions: 24,
  totalMinutes: 320,
  longestStreak: 7,
  avgDuration: 13,
};

export default function MeditationTool() {
  const [activeSound, setActiveSound] = useState<number | null>(null);

  const handleSoundToggle = (id: number) => {
    setActiveSound(activeSound === id ? null : id);
  };

  const chartConfig = {
    minutes: {
      label: 'دقیقه',
      color: '#9b87f5',
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">رشد فردی</h1>
      </div>
      
      <SectionNavBar items={growthNavItems} baseRoute="/growth" />
      
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">مدیتیشن و تمرکز</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="report" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="report">گزارش</TabsTrigger>
              <TabsTrigger value="meditations">مدیتیشن‌ها</TabsTrigger>
              <TabsTrigger value="sounds">صداهای آرامش‌بخش</TabsTrigger>
            </TabsList>
            
            <TabsContent value="report" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-lifeos-soft-purple">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm font-medium text-gray-700">جلسات</p>
                    <h3 className="text-3xl font-bold">{meditationStats.totalSessions}</h3>
                  </CardContent>
                </Card>
                <Card className="bg-lifeos-soft-blue">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm font-medium text-gray-700">دقیقه کل</p>
                    <h3 className="text-3xl font-bold">{meditationStats.totalMinutes}</h3>
                  </CardContent>
                </Card>
                <Card className="bg-lifeos-soft-green">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm font-medium text-gray-700">بیشترین تداوم</p>
                    <h3 className="text-3xl font-bold">{meditationStats.longestStreak} روز</h3>
                  </CardContent>
                </Card>
                <Card className="bg-lifeos-soft-teal">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm font-medium text-gray-700">میانگین</p>
                    <h3 className="text-3xl font-bold">{meditationStats.avgDuration} دقیقه</h3>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">مدت مدیتیشن در هفته گذشته</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ChartContainer 
                    className="h-[300px] p-4"
                    config={chartConfig}
                  >
                    <BarChart
                      data={meditationData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 25,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip />
                      <Bar dataKey="minutes" name="دقیقه" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="meditations" className="space-y-4">
              <h3 className="text-lg font-medium mb-4">انواع مدیتیشن</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {meditationTypes.map((meditation) => (
                  <Card key={meditation.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className={`${meditation.color} py-3`}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{meditation.title}</CardTitle>
                        <span className="text-sm font-medium">{meditation.duration} دقیقه</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-600 mb-4">{meditation.description}</p>
                      <Button className="w-full">شروع</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sounds" className="space-y-4">
              <h3 className="text-lg font-medium mb-4">صداهای آرامش‌بخش</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relaxingSounds.map((sound) => (
                  <Card 
                    key={sound.id} 
                    className={`overflow-hidden cursor-pointer transition-all ${
                      activeSound === sound.id ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}
                    onClick={() => handleSoundToggle(sound.id)}
                  >
                    <CardContent className={`${sound.color} p-6 flex flex-col items-center justify-center text-center`}>
                      <div className="text-3xl mb-2">
                        {sound.icon}
                      </div>
                      <p className="font-medium">{sound.title}</p>
                      <div className="mt-2 text-xs">
                        {activeSound === sound.id ? 'در حال پخش' : 'برای پخش کلیک کنید'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
