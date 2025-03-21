
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  AlertCircle, 
  CheckCircle, 
  FileText, 
  User, 
  Pill,
  Flask,
  HeartPulse,
  MoreHorizontal
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ActivityType = 
  | 'message' 
  | 'alert' 
  | 'task' 
  | 'document' 
  | 'patient'
  | 'prescription'
  | 'lab'
  | 'vitals';

interface Activity {
  id: string;
  type: ActivityType;
  content: string;
  time: string;
  user?: string;
  priority?: 'low' | 'medium' | 'high';
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'alert',
    content: 'Critical lab result for Suresh Kumar requires immediate attention',
    time: '30m ago',
    priority: 'high',
  },
  {
    id: '2',
    type: 'prescription',
    content: 'New prescription created for Priya Patel',
    time: '1h ago',
    user: 'Dr. Anjali Singh',
  },
  {
    id: '3',
    type: 'message',
    content: 'Dr. Vikram requested cardiology consult for Rahul Verma',
    time: '2h ago',
    user: 'Dr. Vikram Mehta',
  },
  {
    id: '4',
    type: 'lab',
    content: 'Blood work results are now available for Anil Sharma',
    time: '3h ago',
  },
  {
    id: '5',
    type: 'patient',
    content: 'New patient admitted: Meena Devi, 42F with pneumonia',
    time: '4h ago',
  },
  {
    id: '6',
    type: 'vitals',
    content: 'Abnormal vitals recorded for Rahul Verma',
    time: '5h ago',
    priority: 'medium',
  },
  {
    id: '7',
    type: 'task',
    content: 'Discharge summary completed for Rajiv Malhotra',
    time: '6h ago',
    user: 'Dr. Rajesh Kapoor',
  },
];

const getActivityIcon = (type: ActivityType, priority?: Activity['priority']) => {
  switch (type) {
    case 'message':
      return <MessageSquare className="h-5 w-5 text-sky-500" />;
    case 'alert':
      return (
        <AlertCircle 
          className={cn(
            "h-5 w-5",
            priority === 'high' ? "text-rose-500" : 
            priority === 'medium' ? "text-amber-500" : 
            "text-blue-500"
          )} 
        />
      );
    case 'task':
      return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    case 'document':
      return <FileText className="h-5 w-5 text-purple-500" />;
    case 'patient':
      return <User className="h-5 w-5 text-indigo-500" />;
    case 'prescription':
      return <Pill className="h-5 w-5 text-teal-500" />;
    case 'lab':
      return <Flask className="h-5 w-5 text-amber-500" />;
    case 'vitals':
      return <HeartPulse className="h-5 w-5 text-rose-500" />;
    default:
      return <MessageSquare className="h-5 w-5 text-gray-500" />;
  }
};

interface ActivityFeedProps {
  className?: string;
  limit?: number;
}

const ActivityFeed = ({ className, limit = 7 }: ActivityFeedProps) => {
  const displayActivities = mockActivities.slice(0, limit);
  
  return (
    <div className={cn("space-y-4", className)}>
      {displayActivities.map((activity, index) => (
        <React.Fragment key={activity.id}>
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type, activity.priority)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium break-words pr-2">{activity.content}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                    <DropdownMenuItem>Dismiss</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <span>{activity.time}</span>
                {activity.user && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{activity.user}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          {index < displayActivities.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ActivityFeed;
