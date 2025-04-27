
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { Button } from "@/components/ui/button";
import { RoutineCard } from '@/components/growth/RoutineCard';
import { AddRoutineDialog, RoutineData } from '@/components/growth/AddRoutineDialog';
import { Plus } from 'lucide-react';

const growthNavItems = [
  { name: "امروز", path: "today", emoji: "📅" },
  { name: "ابزارها", path: "tools", emoji: "🔧" },
  { name: "روتین‌ها", path: "routines", emoji: "🔄" },
];

const defaultRoutines: RoutineData[] = [
  {
    id: 'default-1',
    title: 'مطالعه',
    date: new Date(),
    repeat: 'daily',
    timeType: 'all-day',
    tag: 'study',
    icon: '📚',
    color: 'bg-lifeos-soft-purple'
  },
  {
    id: 'default-2',
    title: 'مدیتیشن',
    date: new Date(),
    repeat: 'daily',
    timeType: 'all-day',
    tag: 'health',
    icon: '🧘‍♂️',
    color: 'bg-lifeos-soft-orange'
  },
  {
    id: 'default-3',
    title: 'ورزش صبحگاهی',
    date: new Date(),
    repeat: 'daily',
    timeType: 'all-day',
    tag: 'health',
    icon: '🏃‍♂️',
    color: 'bg-lifeos-soft-green'
  },
  {
    id: 'default-4',
    title: 'برنامه‌ریزی روزانه',
    date: new Date(),
    repeat: 'daily',
    timeType: 'all-day',
    tag: 'habit',
    icon: '📝',
    color: 'bg-lifeos-soft-blue'
  }
];

export default function Today() {
  const [activeRoutines, setActiveRoutines] = useState<RoutineData[]>([]);
  const [completedRoutines, setCompletedRoutines] = useState<Record<string, boolean>>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddDefaultRoutine = (routine: RoutineData) => {
    const newRoutine = {
      ...routine,
      id: Date.now().toString(), // Generate a new ID for the added routine
      date: new Date()
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
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">روتین‌های امروز</h2>
          <div className="space-y-4">
            {activeRoutines.length > 0 ? (
              activeRoutines.map(routine => (
                <RoutineCard
                  key={routine.id}
                  id={routine.id}
                  title={routine.title}
                  timeType={routine.timeType}
                  icon={routine.icon}
                  color={routine.color}
                  isCompleted={!!completedRoutines[routine.id]}
                  onToggleComplete={() => handleToggleComplete(routine.id)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                هنوز هیچ روتینی برای امروز اضافه نکرده‌اید.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">روتین‌های پیشنهادی</h2>
          <p className="text-gray-600 mb-4">
            می‌توانید از بین این روتین‌های پیشنهادی انتخاب کنید و به برنامه روزانه خود اضافه کنید.
          </p>
          <div className="space-y-4">
            {defaultRoutines.map(routine => (
              <div key={routine.id} className="flex items-center justify-between">
                <RoutineCard
                  id={routine.id}
                  title={routine.title}
                  timeType={routine.timeType}
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
      </div>

      <AddRoutineDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddRoutine={handleAddCustomRoutine}
        selectedDate={new Date()}
      />
    </div>
  );
}
