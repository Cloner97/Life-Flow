
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, Bell, Tag, List } from "lucide-react";

export interface RoutineData {
  id: string;
  title: string;
  date: Date;
  repeat: string;
  timeType: string;
  time?: string;
  reminder?: boolean;
  tag: string;
  icon: string;
  color: string;
}

interface AddRoutineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRoutine: (routine: RoutineData) => void;
  selectedDate?: Date;
}

export function AddRoutineDialog({ isOpen, onClose, onAddRoutine, selectedDate = new Date() }: AddRoutineDialogProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [repeat, setRepeat] = useState('daily');
  const [timeType, setTimeType] = useState('all-day');
  const [time, setTime] = useState('');
  const [reminder, setReminder] = useState(false);
  const [tag, setTag] = useState('habit');

  // Tag to icon and color mapping
  const tagSettings: Record<string, {icon: string, color: string}> = {
    'habit': {icon: '🔄', color: 'bg-lifeos-soft-blue'},
    'health': {icon: '💪', color: 'bg-lifeos-soft-orange'},
    'work': {icon: '💼', color: 'bg-lifeos-soft-pink'},
    'study': {icon: '📚', color: 'bg-lifeos-soft-purple'},
    'social': {icon: '👥', color: 'bg-lifeos-soft-yellow'},
  };

  const handleSubmit = () => {
    if (!title || !date) return;
    
    const newRoutine: RoutineData = {
      id: Date.now().toString(),
      title,
      date,
      repeat,
      timeType,
      time: timeType !== 'all-day' ? time : undefined,
      reminder,
      tag,
      icon: tagSettings[tag]?.icon || '📝',
      color: tagSettings[tag]?.color || 'bg-gray-100'
    };
    
    onAddRoutine(newRoutine);
    onClose();
    
    // Reset form
    setTitle('');
    setRepeat('daily');
    setTimeType('all-day');
    setTime('');
    setReminder(false);
    setTag('habit');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>افزودن روتین جدید</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">عنوان</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right flex gap-2 items-center">
              <CalendarIcon className="h-4 w-4" />
              تاریخ
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                  >
                    {date ? format(date, "PPP") : "انتخاب تاریخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right flex gap-2 items-center">
              <List className="h-4 w-4" />
              تکرار
            </Label>
            <Select value={repeat} onValueChange={setRepeat}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="انتخاب تکرار" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">روزانه</SelectItem>
                <SelectItem value="weekly">هفتگی</SelectItem>
                <SelectItem value="monthly">ماهانه</SelectItem>
                <SelectItem value="custom">سفارشی</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right flex gap-2 items-center">
              <Clock className="h-4 w-4" />
              زمان
            </Label>
            <Select value={timeType} onValueChange={setTimeType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="نوع زمان" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-day">تمام روز</SelectItem>
                <SelectItem value="specific-time">زمان مشخص</SelectItem>
                <SelectItem value="time-range">بازه زمانی</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {timeType !== 'all-day' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">ساعت</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right flex gap-2 items-center">
              <Bell className="h-4 w-4" />
              یادآور
            </Label>
            <Select 
              value={reminder ? "yes" : "no"} 
              onValueChange={(val) => setReminder(val === "yes")}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="یادآور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">فعال</SelectItem>
                <SelectItem value="no">غیرفعال</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right flex gap-2 items-center">
              <Tag className="h-4 w-4" />
              تگ
            </Label>
            <Select value={tag} onValueChange={setTag}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="انتخاب تگ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="habit">عادت</SelectItem>
                <SelectItem value="health">سلامتی</SelectItem>
                <SelectItem value="work">کار</SelectItem>
                <SelectItem value="study">مطالعه</SelectItem>
                <SelectItem value="social">اجتماعی</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>انصراف</Button>
          <Button 
            onClick={handleSubmit}
            className="bg-lifeos-primary hover:bg-lifeos-secondary"
          >
            ذخیره
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
