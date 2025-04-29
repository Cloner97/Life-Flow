
import { useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Button } from "@/components/ui/button";
import { RoutineCard } from '@/components/growth/RoutineCard';
import { AddRoutineDialog, RoutineData } from '@/components/growth/AddRoutineDialog';
import { Plus, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const growthNavItems = [
  { name: "روتین‌ها", path: "routines", emoji: "🔄" },
  { name: "ابزارها", path: "tools", emoji: "🔧" },
  { name: "امروز", path: "today", emoji: "📅" },
];

const defaultRoutines = [
  {
    category: "سلامتی",
    routines: [
      {
        id: 'health-1',
        title: 'ورزش صبحگاهی',
        date: new Date(),
        repeat: 'daily',
        timeType: 'all-day',
        tag: 'health',
        icon: '🏃‍♂️',
        color: 'bg-lifeos-soft-green'
      },
      {
        id: 'health-2',
        title: 'مدیتیشن',
        date: new Date(),
        repeat: 'daily',
        timeType: 'all-day',
        tag: 'health',
        icon: '🧘‍♂️',
        color: 'bg-lifeos-soft-orange'
      }
    ]
  },
  {
    category: "کار و مطالعه",
    routines: [
      {
        id: 'study-1',
        title: 'مطالعه',
        date: new Date(),
        repeat: 'daily',
        timeType: 'all-day',
        tag: 'study',
        icon: '📚',
        color: 'bg-lifeos-soft-purple'
      },
      {
        id: 'work-1',
        title: 'برنامه‌ریزی روزانه',
        date: new Date(),
        repeat: 'daily',
        timeType: 'all-day',
        tag: 'work',
        icon: '📝',
        color: 'bg-lifeos-soft-blue'
      }
    ]
  },
  {
    category: "توسعه شخصی",
    routines: [
      {
        id: 'personal-1',
        title: 'نوشتن ژورنال',
        date: new Date(),
        repeat: 'daily',
        timeType: 'all-day',
        tag: 'habit',
        icon: '✍️',
        color: 'bg-lifeos-soft-yellow'
      },
      {
        id: 'personal-2',
        title: 'قدردانی روزانه',
        date: new Date(),
        repeat: 'daily',
        timeType: 'all-day',
        tag: 'habit',
        icon: '🙏',
        color: 'bg-lifeos-soft-pink'
      }
    ]
  }
];

const tools = [
  {
    title: "دفترچه اهداف",
    description: "ثبت و پیگیری اهداف شخصی",
    icon: "📝",
    path: "/growth/tools/goal-journal"
  },
  {
    title: "ردیاب عادت‌ها",
    description: "پیگیری عادت‌های روزانه",
    icon: "⏱️",
    path: "/growth/tools/habit-tracker"
  },
  {
    title: "بازبینی هفتگی",
    description: "ارزیابی عملکرد هفتگی",
    icon: "📊",
    path: "/growth/tools/weekly-review"
  },
  {
    title: "بیشتر...",
    description: "مشاهده همه ابزارها",
    icon: "🔍",
    path: "/growth/tools"
  }
];

export default function Today() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeRoutines, setActiveRoutines] = useState<RoutineData[]>([]);
  const [completedRoutines, setCompletedRoutines] = useState<Record<string, boolean>>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getMondayOfCurrentWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const mondayOfWeek = getMondayOfCurrentWeek(new Date(selectedDate));
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(mondayOfWeek, i));
  const persianWeekDays = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];

  const handleAddDefaultRoutine = (routine: RoutineData) => {
    const newRoutine = {
      ...routine,
      id: Date.now().toString(), // Generate a new ID for the added routine
      date: selectedDate
    };
    setActiveRoutines(prev => [...prev, newRoutine]);
  };

  const handleAddCustomRoutine = (routine: RoutineData) => {
    setActiveRoutines(prev => [...prev, routine]);
    setIsAddDialogOpen(false);
  };

  const handleToggleComplete = (routineId: string) => {
    setCompletedRoutines(prev => ({
      ...prev,
      [routineId]: !prev[routineId]
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">رشد فردی</h1>
        <Button 
          className="bg-lifeos-primary hover:bg-lifeos-secondary"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="ml-1" />
          روتین جدید
        </Button>
      </div>

      <div className="text-gray-600 mb-6">
        اینجا فضاییه برای تعیین اهداف، ساختن عادت‌های خوب، و پیگیری روند یادگیری‌ت؛ جایی برای ساختن نسخه‌ی بهتر از خودت هر روز.
      </div>
      
      <SectionNavBar items={growthNavItems} baseRoute="/growth" />
      
      {/* Calendar and Active Routines Section */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <CalendarDays className="w-5 h-5 ml-2" />
            <span>هفته جاری</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-lifeos-soft-purple bg-opacity-20 rounded-2xl p-4 mb-6">
            <div className="flex justify-center mb-2">
              <h2 className="text-xl font-bold">
                {format(selectedDate, "yyyy/MM/dd") === format(new Date(), "yyyy/MM/dd") 
                  ? "امروز" 
                  : format(selectedDate, "yyyy/MM/dd")}
              </h2>
            </div>
            
            <div className="grid grid-cols-7 text-center gap-1">
              {persianWeekDays.map((day, i) => (
                <div key={`day-${i}`} className="text-sm text-gray-500">{day}</div>
              ))}
              
              {weekDates.map((date, i) => {
                const isToday = isSameDay(date, new Date());
                const isSelected = isSameDay(date, selectedDate);
                
                return (
                  <div key={`date-${i}`} className="relative">
                    <button
                      className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm
                        ${isSelected ? 'bg-lifeos-soft-purple text-black' : ''}
                        ${isToday && !isSelected ? 'border border-lifeos-primary' : ''}
                      `}
                      onClick={() => setSelectedDate(date)}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">روتین‌های روز {format(selectedDate, "yyyy/MM/dd") === format(new Date(), "yyyy/MM/dd") ? "امروز" : "انتخاب شده"}</h3>
          <div className="space-y-4">
            {activeRoutines.length > 0 ? (
              activeRoutines
                .filter(routine => isSameDay(routine.date, selectedDate))
                .map(routine => (
                  <RoutineCard
                    key={routine.id}
                    id={routine.id}
                    title={routine.title}
                    timeType={routine.timeType === 'all-day' ? 'All-Day' : routine.time || ''}
                    icon={routine.icon}
                    color={routine.color}
                    isCompleted={!!completedRoutines[routine.id]}
                    onToggleComplete={() => handleToggleComplete(routine.id)}
                  />
                ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                هنوز هیچ روتینی برای این روز اضافه نکرده‌اید.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Default Routines Section */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>روتین‌های پیشنهادی</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            می‌توانید از بین این روتین‌های پیشنهادی انتخاب کنید و به برنامه روزانه خود اضافه کنید.
          </p>
          
          <div className="space-y-6">
            {defaultRoutines.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-3">
                <h3 className="font-semibold text-lg">{category.category}</h3>
                <div className="space-y-3">
                  {category.routines.map((routine) => (
                    <div key={routine.id} className="flex items-center justify-between">
                      <RoutineCard
                        id={routine.id}
                        title={routine.title}
                        timeType={routine.timeType === 'all-day' ? 'All-Day' : routine.time || ''}
                        icon={routine.icon}
                        color={routine.color}
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleAddDefaultRoutine(routine)}
                        className="mr-4"
                      >
                        افزودن به روتین‌ها
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tools Section */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>ابزارهای رشد فردی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <Card key={index} className="group hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tool.icon}</span>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-lifeos-primary group-hover:text-white transition-colors"
                    onClick={() => window.location.href = tool.path}
                  >
                    شروع
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddRoutineDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddRoutine={handleAddCustomRoutine}
        selectedDate={selectedDate}
      />
    </div>
  );
}
