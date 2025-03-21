
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ClipboardEdit, 
  MoreHorizontal, 
  MessageCircle,
  Pill,
  FileText,
  AlertCircle,
  Phone,
  Calendar
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface PatientHeaderProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    mrn: string;
    status: 'stable' | 'critical' | 'improving' | 'worsening';
    condition?: string;
    phone?: string;
    email?: string;
    address?: string;
    bloodGroup?: string;
  };
  className?: string;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'stable':
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Stable</Badge>;
    case 'critical':
      return <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">Critical</Badge>;
    case 'improving':
      return <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">Improving</Badge>;
    case 'worsening':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Worsening</Badge>;
    default:
      return null;
  }
};

const PatientHeader = ({ patient, className }: PatientHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className={cn("bg-background p-4 rounded-lg border animate-fade-in", className)}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
            <AvatarImage src={`/placeholder.svg`} alt={patient.name} />
            <AvatarFallback className="text-lg">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl font-semibold">{patient.name}</h2>
              {getStatusBadge(patient.status)}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-3 mt-1 text-sm text-muted-foreground">
              <span>{patient.age} years, {patient.gender}</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-mono">{patient.mrn}</span>
              {patient.bloodGroup && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>Blood: {patient.bloodGroup}</span>
                </>
              )}
            </div>
            
            {patient.condition && (
              <div className="mt-1">
                <Badge variant="secondary" className="font-normal">
                  {patient.condition}
                </Badge>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          <Button onClick={() => navigate(`/appointments/new?patientId=${patient.id}`)} size="sm" variant="outline">
            <Calendar className="mr-1.5 h-4 w-4" />
            Schedule
          </Button>
          
          <Button onClick={() => navigate(`/messages/new?patientId=${patient.id}`)} size="sm" variant="outline">
            <MessageCircle className="mr-1.5 h-4 w-4" />
            Message
          </Button>
          
          <Button onClick={() => navigate(`/clinical/${patient.id}`)} size="sm" variant="default" className="bg-clinical text-clinical-foreground hover:bg-clinical/90">
            <ClipboardEdit className="mr-1.5 h-4 w-4" />
            Add Note
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Patient Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`/prescriptions/new?patientId=${patient.id}`)}>
                <Pill className="mr-2 h-4 w-4" />
                New Prescription
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/lab-test/order?patientId=${patient.id}`)}>
                <FileText className="mr-2 h-4 w-4" />
                Order Lab Tests
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <AlertCircle className="mr-2 h-4 w-4" />
                Flag for Review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {(patient.phone || patient.email || patient.address) && (
        <>
          <Separator className="my-3" />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {patient.phone && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>{patient.phone}</span>
              </div>
            )}
            {patient.email && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm14 3.5v.75a.75.75 0 0 1-1.5 0V5.5l-4.5 3-4.5-3v.75a.75.75 0 0 1-1.5 0V5.5l6 4 6-4z" />
                </svg>
                <span>{patient.email}</span>
              </div>
            )}
            {patient.address && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0a7.87 7.87 0 0 0-8 7.75c0 4.29 8 12.25 8 12.25s8-7.96 8-12.25A7.87 7.87 0 0 0 10 0zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <span>{patient.address}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PatientHeader;
