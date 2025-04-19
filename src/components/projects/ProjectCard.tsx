
import { CalendarDays } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  deadline?: string;
  onClick?: () => void;
}

export function ProjectCard({ title, description, progress, deadline, onClick }: ProjectCardProps) {
  return (
    <div className="ios-card p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <span className="inline-flex items-center bg-lifeos-soft-purple text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {progress}%
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <ProgressBar value={progress} />
      </div>
      
      {deadline && (
        <div className="mt-4 flex items-center text-xs text-gray-600">
          <CalendarDays size={14} />
          <span className="mr-1">موعد تحویل: {deadline}</span>
        </div>
      )}
    </div>
  );
}
