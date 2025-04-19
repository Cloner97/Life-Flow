
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  title: string;
  duration: string;
  date: string;
  category: string;
  color?: string;
  icon?: React.ReactNode;
}

export function ActivityCard({ title, duration, date, category, color = 'bg-lifeos-soft-green', icon }: ActivityCardProps) {
  return (
    <div className="ios-card p-4 flex items-start">
      <div className={cn("p-3 rounded-lg", color)}>
        {icon || <Clock className="text-gray-800" size={18} />}
      </div>
      <div className="mr-3 flex-1">
        <div className="flex justify-between">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <span className="text-sm text-gray-600">{duration}</span>
        </div>
        <div className="mt-1 flex text-xs text-gray-500">
          <span>{date}</span>
          <span className="mx-1">•</span>
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
}
