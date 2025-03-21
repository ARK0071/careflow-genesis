
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  isGlass?: boolean;
}

const DashboardCard = ({
  title,
  description,
  children,
  footer,
  className,
  isGlass = false,
}: DashboardCardProps) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 h-full",
        isGlass && "glassmorphism", 
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default DashboardCard;
