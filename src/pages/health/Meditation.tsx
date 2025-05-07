
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Headphones, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const healthNavItems = [
  { name: "خواب", path: "sleep", emoji: "😴" },
  { name: "غذا", path: "food", emoji: "🍎" },
  { name: "مدیتیشن", path: "meditation", emoji: "🧘" },
  { name: "پزشکی", path: "medical", emoji: "🏥" },
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
];

// Weekly meditation minutes
const weeklyMeditationMinutes = [5, 10, 15, 0, 20, 10, 15];
const totalMinutes = weeklyMeditationMinutes.reduce((sum, min) => sum + min, 0);
const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];

export default function Meditation() {
  const [activeSound, setActiveSound] = useState<number | null>(null);

  const handleSoundToggle = (id: number) => {
    setActiveSound(activeSound === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">سلامتی</h1>
      </div>
      
      <SectionNavBar items={healthNavItems} baseRoute="/health" />
      
      <Card>
        <CardHeader className="border-b pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">مدیتیشن</CardTitle>
            <Button variant="outline" asChild>
              <Link to="/growth/tools/meditation">
                ابزار کامل مدیتیشن
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">گزارش هفتگی</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">مجموع این هفته</span>
                <span className="text-xl font-bold">{totalMinutes} دقیقه</span>
              </div>
              <div className="flex items-center justify-between gap-1">
                {weeklyMeditationMinutes.map((minutes, index) => (
                  <div key={index} className="flex flex-col items-center w-full">
                    <div className="relative w-full">
                      <div 
                        className="bg-lifeos-soft-purple rounded-t-sm"
                        style={{ 
                          height: `${Math.max(minutes * 4, minutes ? 8 : 0)}px`, 
                          opacity: minutes ? 1 : 0.3 
                        }}
                      ></div>
                    </div>
                    <span className="text-xs mt-1 text-gray-500">{weekDays[index].substring(0, 1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="meditations" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="meditations">مدیتیشن‌ها</TabsTrigger>
              <TabsTrigger value="sounds">صداهای آرامش‌بخش</TabsTrigger>
            </TabsList>
            
            <TabsContent value="meditations" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {meditationTypes.map((meditation) => (
                  <Card key={meditation.id} className="overflow-hidden">
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
              <div className="grid grid-cols-2 gap-4">
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
