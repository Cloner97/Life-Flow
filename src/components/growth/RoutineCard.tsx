
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface RoutineCardProps {
  id: string;
  title: string;
  timeType: string;
  icon: string;
  color: string;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onEdit?: (id: string) => void;
}

export function RoutineCard({ 
  id,
  title, 
  timeType, 
  icon, 
  color,
  isCompleted = false,
  onToggleComplete,
  onEdit
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
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onEdit?.(id)}
          className="h-8 w-8"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Checkbox 
          checked={isCompleted}
          onCheckedChange={onToggleComplete}
          className="h-6 w-6 border-2 rounded-full"
        />
      </div>
    </div>
  );
}
