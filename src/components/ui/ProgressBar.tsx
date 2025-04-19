
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  color = 'bg-lifeos-primary',
  size = 'md',
  showLabel = false,
  className
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, value));
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-xs">
          <span className="text-gray-600">پیشرفت</span>
          <span className="font-medium">{percentage}%</span>
        </div>
      )}
      <div className={cn('progress-bar', sizes[size])}>
        <div
          className={cn('progress-value', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
