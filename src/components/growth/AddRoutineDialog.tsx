
import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, Bell, Tag, List, Timer } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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
  hasQuantity: boolean;
  quantity?: number;
  quantityUnit?: string;
  trackMissed?: boolean;
  monthlyGoal?: number;
  progress?: number;
}

interface AddRoutineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRoutine: (routine: RoutineData) => void;
  selectedDate?: Date;
  editingRoutine?: RoutineData | null;
}

export function AddRoutineDialog({ 
  isOpen, 
  onClose, 
  onAddRoutine, 
  selectedDate = new Date(),
  editingRoutine 
}: AddRoutineDialogProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [repeat, setRepeat] = useState('daily');
  const [timeType, setTimeType] = useState('all-day');
  const [time, setTime] = useState('');
  const [reminder, setReminder] = useState(false);
  const [tag, setTag] = useState('habit');
  const [hasQuantity, setHasQuantity] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityUnit, setQuantityUnit] = useState('hour');
  const [trackMissed, setTrackMissed] = useState(false);
  const [monthlyGoal, setMonthlyGoal] = useState<number>(0);

  useEffect(() => {
    if (editingRoutine) {
      setTitle(editingRoutine.title);
      setDate(editingRoutine.date);
      setRepeat(editingRoutine.repeat);
      setTimeType(editingRoutine.timeType);
      setTime(editingRoutine.time || '');
      setReminder(editingRoutine.reminder || false);
      setTag(editingRoutine.tag);
      setHasQuantity(editingRoutine.hasQuantity || false);
      setQuantity(editingRoutine.quantity || 1);
      setQuantityUnit(editingRoutine.quantityUnit || 'hour');
      setTrackMissed(editingRoutine.trackMissed || false);
      setMonthlyGoal(editingRoutine.monthlyGoal || 0);
    } else {
      setTitle('');
      setDate(selectedDate);
      setRepeat('daily');
      setTimeType('all-day');
      setTime('');
      setReminder(false);
      setTag('habit');
      setHasQuantity(false);
      setQuantity(1);
      setQuantityUnit('hour');
      setTrackMissed(false);
      setMonthlyGoal(0);
    }
  }, [editingRoutine, selectedDate]);

  const tagSettings: Record<string, {icon: string, color: string}> = {
    'habit': {icon: '🔄', color: 'bg-lifeos-soft-blue'},
    'health': {icon: '💪', color: 'bg-lifeos-soft-orange'},
    'work': {icon: '💼', color: 'bg-lifeos-soft-pink'},
    'study': {icon: '📚', color: 'bg-lifeos-soft-purple'},
    'social': {icon: '👥', color: 'bg-lifeos-soft-yellow'},
  };

  const handleSubmit = () => {
    if (!title || !date) return;
    
    const routineData: RoutineData = {
      id: editingRoutine?.id || Date.now().toString(),
      title,
      date,
      repeat,
      timeType,
      time: timeType !== 'all-day' ? time : undefined,
      reminder,
      tag,
      icon: tagSettings[tag]?.icon || '📝',
      color: tagSettings[tag]?.color || 'bg-gray-100',
      hasQuantity,
      quantity: hasQuantity ? quantity : undefined,
      quantityUnit: hasQuantity ? quantityUnit : undefined,
      trackMissed,
      monthlyGoal: hasQuantity ? monthlyGoal : undefined,
      progress: editingRoutine?.progress || 0
    };
    
    onAddRoutine(routineData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingRoutine ? 'ویرایش روتین' : 'افزودن روتین جدید'}
          </DialogTitle>
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
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right flex gap-2 items-center">
              <Timer className="h-4 w-4" />
              مقدار دهی
            </Label>
            <div className="flex items-center space-x-2 rtl:space-x-reverse col-span-3">
              <Switch 
                id="has-quantity"
                checked={hasQuantity}
                onCheckedChange={setHasQuantity}
              />
              <Label htmlFor="has-quantity">فعال</Label>
            </div>
          </div>
          
          {hasQuantity && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">مقدار</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="col-span-1"
                />
                <Select value={quantityUnit} onValueChange={setQuantityUnit}>
                  <SelectTrigger className="col-span-2">
                    <SelectValue placeholder="واحد" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hour">ساعت</SelectItem>
                    <SelectItem value="minute">دقیقه</SelectItem>
                    <SelectItem value="count">تعداد</SelectItem>
                    <SelectItem value="page">صفحه</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="monthly-goal" className="text-right">هدف ماهانه</Label>
                <Input
                  id="monthly-goal"
                  type="number"
                  min="0"
                  value={monthlyGoal}
                  onChange={(e) => setMonthlyGoal(Number(e.target.value))}
                  className="col-span-1"
                />
                <span className="col-span-2 text-gray-500 text-sm">{quantityUnit}</span>
              </div>
            </>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">پیگیری روتین‌های از دست رفته</Label>
            <div className="flex items-center space-x-2 rtl:space-x-reverse col-span-3">
              <Switch 
                id="track-missed"
                checked={trackMissed}
                onCheckedChange={setTrackMissed}
              />
              <Label htmlFor="track-missed">فعال</Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>انصراف</Button>
          <Button 
            onClick={handleSubmit}
            className="bg-lifeos-primary hover:bg-lifeos-secondary"
          >
            {editingRoutine ? 'به‌روزرسانی' : 'ذخیره'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
