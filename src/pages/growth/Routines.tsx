
import { useState, useEffect } from 'react';
import { format, addDays, isSameDay, isYesterday } from 'date-fns';
import { Button } from "@/components/ui/button";
import { BackButton } from '@/components/ui/BackButton';
import { RoutineCard } from '@/components/growth/RoutineCard';
import { AddRoutineDialog, RoutineData } from '@/components/growth/AddRoutineDialog';
import { Plus, AlertCircle } from 'lucide-react';
import { SectionNavBar } from '@/components/layout/SectionNavBar';
import { useToast } from "@/hooks/use-toast";

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const persianWeekDays = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];

const initialRoutines: RoutineData[] = [
  {
    id: '1',
    title: 'وبلاگ نویسی',
    date: new Date(),
    repeat: 'daily',
    timeType: 'all-day',
    tag: 'work',
    icon: '🔊',
    color: 'bg-blue-100',
    hasQuantity: true,
    quantity: 2,
    quantityUnit: 'hour',
    monthlyGoal: 40,
    progress: 12,
    trackMissed: true
  },
  {
    id: '2',
    title: 'قدم زدن با سگ',
    date: new Date(),
    repeat: 'daily',
    timeType: 'all-day',
    tag: 'habit',
    icon: '🐕',
    color: 'bg-green-100',
    hasQuantity: false
  },
  {
    id: '3',
    title: 'ورزش',
    date: new Date(),
    repeat: 'daily',
    timeType: 'all-day',
    tag: 'health',
    icon: '🥇',
    color: 'bg-pink-100',
    hasQuantity: true,
    quantity: 1,
    quantityUnit: 'hour',
    monthlyGoal: 30,
    progress: 8
  }
];

const growthNavItems = [
  { name: "روتین‌ها", path: "routines", emoji: "🔄" },
  { name: "ابزارها", path: "tools", emoji: "🔧" },
];

const tags = [
  { id: 'all', name: 'همه', color: 'bg-lifeos-soft-purple' },
  { id: 'habit', name: 'عادت', color: 'bg-white' },
  { id: 'health', name: 'سلامتی', color: 'bg-white' },
  { id: 'work', name: 'کار', color: 'bg-white' }
];

export default function Routines() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTag, setSelectedTag] = useState('all');
  const [routines, setRoutines] = useState<RoutineData[]>(initialRoutines);
  const [completedRoutines, setCompletedRoutines] = useState<Record<string, boolean>>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRoutineId, setEditingRoutineId] = useState<string | null>(null);
  
  const getMondayOfCurrentWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const mondayOfWeek = getMondayOfCurrentWeek(new Date(selectedDate));
  
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(mondayOfWeek, i));
  
  const filteredRoutines = routines.filter(routine => {
    const sameDay = isSameDay(routine.date, selectedDate);
    const matchesTag = selectedTag === 'all' || routine.tag === selectedTag;
    return sameDay && matchesTag;
  });

  useEffect(() => {
    // Check for missed routines from yesterday
    const yesterdayRoutines = routines.filter(routine => {
      return isYesterday(routine.date) && routine.trackMissed && !completedRoutines[routine.id];
    });
    
    if (yesterdayRoutines.length > 0) {
      yesterdayRoutines.forEach(routine => {
        toast({
          title: "روتین انجام نشده",
          description: `روتین "${routine.title}" دیروز انجام نشده است.`,
          variant: "destructive",
        });
      });
    }
  }, []);

  const handleAddRoutine = (routine: RoutineData) => {
    setRoutines([...routines, routine]);
  };

  const handleEditRoutine = (routineId: string) => {
    setEditingRoutineId(routineId);
    setIsAddDialogOpen(true);
  };

  const handleUpdateRoutine = (updatedRoutine: RoutineData) => {
    setRoutines(prevRoutines => 
      prevRoutines.map(routine => 
        routine.id === updatedRoutine.id ? updatedRoutine : routine
      )
    );
    setEditingRoutineId(null);
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setEditingRoutineId(null);
  };

  const handleToggleComplete = (routineId: string) => {
    setCompletedRoutines(prev => ({
      ...prev,
      [routineId]: !prev[routineId]
    }));
  };

  const handleSelectTag = (tagId: string) => {
    setSelectedTag(tagId);
  };
  
  const handleProgressUpdate = (routineId: string, progress: number) => {
    setRoutines(prevRoutines => 
      prevRoutines.map(routine => 
        routine.id === routineId ? { ...routine, progress } : routine
      )
    );
  };

  const editingRoutine = editingRoutineId 
    ? routines.find(routine => routine.id === editingRoutineId)
    : null;

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
      
      <SectionNavBar items={growthNavItems} baseRoute="/growth" />
      
      <div className="bg-lifeos-soft-purple bg-opacity-20 rounded-2xl p-4">
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
      
      <div className="flex overflow-x-auto py-2 space-x-2 rtl:space-x-reverse">
        {tags.map(tag => (
          <button
            key={tag.id}
            className={`px-6 py-2 rounded-full whitespace-nowrap
              ${selectedTag === tag.id ? tag.color === 'bg-white' ? 'bg-lifeos-soft-purple' : tag.color : tag.color}
              ${tag.color === 'bg-white' ? 'border border-gray-200' : ''}
            `}
            onClick={() => handleSelectTag(tag.id)}
          >
            {tag.name}
          </button>
        ))}
      </div>
      
      <div className="space-y-1">
        {filteredRoutines.length > 0 ? (
          filteredRoutines.map(routine => (
            <RoutineCard
              key={routine.id}
              id={routine.id}
              title={routine.title}
              timeType={routine.timeType === 'all-day' ? 'All-Day' : routine.time || ''}
              icon={routine.icon}
              color={routine.color}
              isCompleted={!!completedRoutines[routine.id]}
              hasQuantity={routine.hasQuantity}
              quantity={routine.quantity}
              quantityUnit={routine.quantityUnit}
              progress={routine.progress || 0}
              monthlyGoal={routine.monthlyGoal}
              onToggleComplete={() => handleToggleComplete(routine.id)}
              onEdit={handleEditRoutine}
              onProgressUpdate={handleProgressUpdate}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            هیچ روتینی برای این روز تعریف نشده است.
          </div>
        )}
      </div>
      
      <AddRoutineDialog
        isOpen={isAddDialogOpen}
        onClose={handleDialogClose}
        onAddRoutine={editingRoutineId ? handleUpdateRoutine : handleAddRoutine}
        selectedDate={selectedDate}
        editingRoutine={editingRoutine}
      />
    </div>
  );
}
