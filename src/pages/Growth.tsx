
import { useState, useEffect } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { Button } from "@/components/ui/button";
import { BackButton } from '@/components/ui/BackButton';
import { RoutineCard } from '@/components/growth/RoutineCard';
import { AddRoutineDialog, RoutineData } from '@/components/growth/AddRoutineDialog';
import { Plus } from 'lucide-react';

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const persianWeekDays = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];

// Sample routine data
const initialRoutines: RoutineData[] = [
  {
    id: '1',
    title: 'وبلاگ نویسی',
    date: new Date(),
    repeat: 'daily',
    timeType: 'all-day',
    tag: 'work',
    icon: '🔊',
    color: 'bg-blue-100'
  },
  {
    id: '2',
    title: 'قدم زدن با سگ',
    date: new Date(),
    repeat: 'daily',
    timeType: 'all-day',
    tag: 'habit',
    icon: '🐕',
    color: 'bg-green-100'
  },
  {
    id: '3',
    title: 'ورزش',
    date: new Date(),
    repeat: 'daily',
    timeType: 'all-day',
    tag: 'health',
    icon: '🥇',
    color: 'bg-pink-100'
  },
  {
    id: '4',
    title: 'کار',
    date: new Date(),
    repeat: 'weekdays',
    timeType: 'all-day',
    tag: 'work',
    icon: '🌓',
    color: 'bg-pink-200'
  }
];

// Tags for filtering
const tags = [
  { id: 'all', name: 'همه', color: 'bg-lifeos-soft-purple' },
  { id: 'habit', name: 'عادت', color: 'bg-white' },
  { id: 'health', name: 'سلامتی', color: 'bg-white' },
  { id: 'work', name: 'کار', color: 'bg-white' }
];

export default function Growth() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTag, setSelectedTag] = useState('all');
  const [routines, setRoutines] = useState<RoutineData[]>(initialRoutines);
  const [completedRoutines, setCompletedRoutines] = useState<Record<string, boolean>>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Get start of the week (Monday)
  const getMondayOfCurrentWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const mondayOfWeek = getMondayOfCurrentWeek(new Date(selectedDate));
  
  // Generate week days
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(mondayOfWeek, i));
  
  // Filter routines by selected date and tag
  const filteredRoutines = routines.filter(routine => {
    const sameDay = isSameDay(routine.date, selectedDate);
    const matchesTag = selectedTag === 'all' || routine.tag === selectedTag;
    return sameDay && matchesTag;
  });

  const handleAddRoutine = (routine: RoutineData) => {
    setRoutines([...routines, routine]);
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

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      
      {/* Header with date display */}
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
      
      {/* Date display section */}
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
            
            // Check if the date has a special mark (gold star in the example image)
            const hasSpecialMark = i === 2; // Just for demo, Wednesday has a special mark
            
            return (
              <div key={`date-${i}`} className="relative">
                {hasSpecialMark && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 translate-y-0">
                    <span className="text-xl">💎</span>
                  </div>
                )}
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
      
      {/* Tags filter */}
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
      
      {/* Routines list */}
      <div className="space-y-1">
        {filteredRoutines.length > 0 ? (
          filteredRoutines.map(routine => (
            <RoutineCard
              key={routine.id}
              title={routine.title}
              timeType={routine.timeType === 'all-day' ? 'All-Day' : routine.time || ''}
              icon={routine.icon}
              color={routine.color}
              isCompleted={!!completedRoutines[routine.id]}
              onToggleComplete={() => handleToggleComplete(routine.id)}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            هیچ روتینی برای این روز تعریف نشده است.
          </div>
        )}
      </div>
      
      {/* Add routine dialog */}
      <AddRoutineDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddRoutine={handleAddRoutine}
        selectedDate={selectedDate}
      />
    </div>
  );
}
