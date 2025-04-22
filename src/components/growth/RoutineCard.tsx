
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

interface RoutineCardProps {
  title: string;
  timeType: string;
  icon: string;
  color: string;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export function RoutineCard({ 
  title, 
  timeType, 
  icon, 
  color,
  isCompleted = false,
  onToggleComplete
}: RoutineCardProps) {
  return (
    <div 
      className={`${color} rounded-xl p-4 mb-3 flex items-center justify-between`}
    >
      <div className="flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        <div>
          <p className="text-sm text-gray-600">Time: {timeType}</p>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <Checkbox 
        checked={isCompleted}
        onCheckedChange={onToggleComplete}
        className="h-6 w-6 border-2 rounded-full"
      />
    </div>
  );
}
