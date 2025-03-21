
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPIMetricCardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  trendLabel?: string;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

const KPIMetricCard = ({
  title,
  value,
  trend,
  trendValue,
  trendLabel,
  icon,
  description,
  className
}: KPIMetricCardProps) => {
  return (
    <div className={cn("p-6 rounded-lg border bg-card shadow-sm", className)}>
      <div className="flex justify-between items-start">
        <div className="space-y-1.5">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="text-2xl font-bold">{value}</div>
        </div>
        {icon && (
          <div className="p-2 bg-muted rounded-full">
            {icon}
          </div>
        )}
      </div>
      
      {trend && trendValue && (
        <div className="mt-3 flex items-center">
          {trend === 'up' ? (
            <ArrowUp className={cn("h-4 w-4 mr-1", 
              title.toLowerCase().includes("readmission") ? "text-destructive" : "text-emerald-500"
            )} />
          ) : trend === 'down' ? (
            <ArrowDown className={cn("h-4 w-4 mr-1", 
              title.toLowerCase().includes("readmission") ? "text-emerald-500" : "text-destructive"
            )} />
          ) : null}
          <span className={cn("text-sm font-medium", 
            trend === 'up' 
              ? title.toLowerCase().includes("readmission") 
                ? "text-destructive" 
                : "text-emerald-500"
              : trend === 'down'
                ? title.toLowerCase().includes("readmission")
                  ? "text-emerald-500"
                  : "text-destructive"
                : "text-muted-foreground"
          )}>
            {trendValue}
          </span>
          {trendLabel && (
            <span className="text-xs text-muted-foreground ml-1">
              {trendLabel}
            </span>
          )}
        </div>
      )}
      
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default KPIMetricCard;
