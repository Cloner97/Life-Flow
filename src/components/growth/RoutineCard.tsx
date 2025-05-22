
import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

interface RoutineCardProps {
  id: string;
  title: string;
  timeType: string;
  icon: string;
  color: string;
  isCompleted?: boolean;
  hasQuantity?: boolean;
  quantity?: number;
  quantityUnit?: string;
  progress?: number;
  monthlyGoal?: number;
  onToggleComplete?: () => void;
  onEdit?: (id: string) => void;
  onProgressUpdate?: (id: string, progress: number) => void;
}

export function RoutineCard({ 
  id,
  title, 
  timeType, 
  icon, 
  color,
  isCompleted = false,
  hasQuantity = false,
  quantity = 0,
  quantityUnit = 'hour',
  progress = 0,
  monthlyGoal = 0,
  onToggleComplete,
  onEdit,
  onProgressUpdate
}: RoutineCardProps) {
  const [progressValue, setProgressValue] = useState<number>(progress);
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setProgressValue(value);
    onProgressUpdate?.(id, value);
  };

  const getUnitLabel = (unit: string, count: number) => {
    switch(unit) {
      case 'hour':
        return count === 1 ? 'ساعت' : 'ساعت';
      case 'minute':
        return count === 1 ? 'دقیقه' : 'دقیقه';  
      case 'count':
        return count === 1 ? 'بار' : 'بار';
      case 'page':
        return count === 1 ? 'صفحه' : 'صفحه';
      default:
        return '';
    }
  };
  
  const progressPercentage = monthlyGoal > 0 ? Math.min(100, (progress / monthlyGoal) * 100) : 0;

  return (
    <div 
      className={`${color} rounded-xl p-4 mb-3`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{icon}</span>
          <div>
            <p className="text-sm text-gray-600">زمان: {timeType}</p>
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
      
      {hasQuantity && (
        <div className="mt-2">
          {monthlyGoal > 0 && (
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>پیشرفت ماهانه</span>
                <span>
                  {progress} از {monthlyGoal} {getUnitLabel(quantityUnit || 'hour', monthlyGoal)}
                  ({progressPercentage.toFixed(0)}%)
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
          
          <div className="flex items-center mt-2">
            <Timer className="h-4 w-4 ml-2" />
            <span className="text-sm ml-2">انجام شده:</span>
            <Input
              type="number"
              min="0"
              value={progressValue}
              onChange={handleProgressChange}
              className="w-20 h-8 text-sm ml-2"
            />
            <span className="text-sm">
              {getUnitLabel(quantityUnit || 'hour', quantity || 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
