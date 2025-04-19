
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  color: string;
  stats?: {
    label: string;
    value: string | number;
  }[];
}

export function ModuleCard({ title, description, path, icon: Icon, color, stats }: ModuleCardProps) {
  return (
    <Link to={path} className="block">
      <div className="module-card hover:scale-[1.01] transition-transform">
        <div className="flex items-start">
          <div className={cn("p-3 rounded-lg", color)}>
            <Icon className="text-gray-800" size={22} />
          </div>
          <div className="mr-3 flex-1">
            <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          </div>
        </div>
        
        {stats && (
          <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="font-semibold text-gray-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
