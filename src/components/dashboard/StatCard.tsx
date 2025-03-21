
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  tooltipText?: string;
  className?: string;
  iconClassName?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  change,
  tooltipText,
  className,
  iconClassName,
}: StatCardProps) => {
  return (
    <Card className={cn("p-4 h-full flex flex-col transition-all duration-300", className)}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-1.5">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {tooltipText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground/70 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className={cn("p-2 rounded-md bg-background", iconClassName)}>
          {icon}
        </div>
      </div>
      <div className="flex flex-col mt-auto">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        {change && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs font-medium",
                change.isPositive ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {change.isPositive ? "+" : "-"}{Math.abs(change.value)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">vs. last week</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
