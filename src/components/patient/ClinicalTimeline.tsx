
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Pill, 
  Flask, 
  HeartPulse, 
  Calendar, 
  Stethoscope, 
  ChevronRight, 
  MoreHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type TimelineEventType = 
  | 'note' 
  | 'prescription' 
  | 'lab' 
  | 'vitals' 
  | 'appointment' 
  | 'diagnosis';

interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  date: string;
  description?: string;
  provider: string;
  status?: string;
  highlight?: boolean;
  details?: Record<string, any>;
}

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: '1',
    type: 'note',
    title: 'Progress Note',
    date: 'Today, 10:30 AM',
    description: 'Patient presented with chest pain. ECG shows normal sinus rhythm.',
    provider: 'Dr. Rajesh Kapoor',
    highlight: true,
  },
  {
    id: '2',
    type: 'prescription',
    title: 'New Prescription',
    date: 'Today, 11:15 AM',
    description: 'Amlodipine 5mg, once daily',
    provider: 'Dr. Rajesh Kapoor',
    details: {
      medications: [
        { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' },
        { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days' }
      ]
    }
  },
  {
    id: '3',
    type: 'lab',
    title: 'Lab Results',
    date: 'Yesterday, 2:45 PM',
    description: 'Complete Blood Count, Lipid Profile, Kidney Function',
    provider: 'Metro Labs',
    status: 'Abnormal',
    highlight: true,
  },
  {
    id: '4',
    type: 'appointment',
    title: 'Cardiology Consultation',
    date: '3 days ago',
    description: 'Follow-up on hypertension management',
    provider: 'Dr. Rajesh Kapoor',
  },
  {
    id: '5',
    type: 'vitals',
    title: 'Vitals Recorded',
    date: '3 days ago',
    description: 'BP: 142/92, HR: 78, Temp: 98.2°F',
    provider: 'Nurse Divya',
    status: 'Abnormal',
  },
  {
    id: '6',
    type: 'diagnosis',
    title: 'New Diagnosis',
    date: '1 week ago',
    description: 'Essential Hypertension (I10)',
    provider: 'Dr. Rajesh Kapoor',
  },
];

const getEventIcon = (type: TimelineEventType) => {
  switch (type) {
    case 'note':
      return <FileText className="h-5 w-5 text-indigo-500" />;
    case 'prescription':
      return <Pill className="h-5 w-5 text-teal-500" />;
    case 'lab':
      return <Flask className="h-5 w-5 text-amber-500" />;
    case 'vitals':
      return <HeartPulse className="h-5 w-5 text-rose-500" />;
    case 'appointment':
      return <Calendar className="h-5 w-5 text-sky-500" />;
    case 'diagnosis':
      return <Stethoscope className="h-5 w-5 text-purple-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

interface ClinicalTimelineProps {
  patientId: string;
  className?: string;
  limit?: number;
}

const ClinicalTimeline = ({ patientId, className, limit = 6 }: ClinicalTimelineProps) => {
  const navigate = useNavigate();
  const displayEvents = mockTimelineEvents.slice(0, limit);
  
  return (
    <div className={cn("space-y-4", className)}>
      {displayEvents.map((event) => (
        <div 
          key={event.id} 
          className={cn(
            "flex gap-4 p-3 rounded-lg border transition-all hover:shadow-sm",
            event.highlight && "border-clinical/30 bg-clinical-muted/30"
          )}
        >
          <div className="flex-shrink-0 mt-1">
            {getEventIcon(event.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{event.title}</h3>
                  {event.status && (
                    <Badge 
                      variant="outline" 
                      className={cn(
                        event.status === 'Abnormal' 
                          ? "bg-rose-50 text-rose-700 border-rose-200" 
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      )}
                    >
                      {event.status}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {event.date} • {event.provider}
                </p>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/clinical/${patientId}/${event.id}`)}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>Print</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {event.description && (
              <p className="text-sm mt-1">{event.description}</p>
            )}
            
            {event.type === 'prescription' && event.details?.medications && (
              <div className="mt-2 space-y-1">
                {event.details.medications.map((med: any, index: number) => (
                  <div key={index} className="text-sm bg-background p-2 rounded border">
                    <span className="font-medium">{med.name}</span> {med.dosage}, {med.frequency} • {med.duration}
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 h-7 text-xs text-primary"
              onClick={() => navigate(`/clinical/${patientId}/${event.id}`)}
            >
              View details <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
      
      {limit < mockTimelineEvents.length && (
        <Button 
          variant="outline" 
          className="w-full mt-2"
          onClick={() => navigate(`/clinical/${patientId}`)}
        >
          View Complete History
        </Button>
      )}
    </div>
  );
};

export default ClinicalTimeline;
