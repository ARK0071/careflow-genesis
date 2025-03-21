
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  status: 'stable' | 'critical' | 'improving' | 'worsening';
  doctor: string;
  lastUpdated: string;
  mrn: string; // Medical Record Number
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Anil Sharma',
    age: 48,
    gender: 'M',
    condition: 'Hypertension',
    status: 'stable',
    doctor: 'Dr. Rajesh Kapoor',
    lastUpdated: '1 hour ago',
    mrn: 'MRN23456789',
  },
  {
    id: '2',
    name: 'Priya Patel',
    age: 36,
    gender: 'F',
    condition: 'Type 2 Diabetes',
    status: 'improving',
    doctor: 'Dr. Anjali Singh',
    lastUpdated: '2 hours ago',
    mrn: 'MRN23456790',
  },
  {
    id: '3',
    name: 'Suresh Kumar',
    age: 62,
    gender: 'M',
    condition: 'Acute Myocardial Infarction',
    status: 'critical',
    doctor: 'Dr. Rajesh Kapoor',
    lastUpdated: '30 mins ago',
    mrn: 'MRN23456791',
  },
  {
    id: '4',
    name: 'Deepa Reddy',
    age: 29,
    gender: 'F',
    condition: 'Pregnancy (32 weeks)',
    status: 'stable',
    doctor: 'Dr. Meera Sharma',
    lastUpdated: '3 hours ago',
    mrn: 'MRN23456792',
  },
  {
    id: '5',
    name: 'Rahul Verma',
    age: 55,
    gender: 'M',
    condition: 'COPD Exacerbation',
    status: 'worsening',
    doctor: 'Dr. Vikram Mehta',
    lastUpdated: '45 mins ago',
    mrn: 'MRN23456793',
  },
];

const getStatusBadge = (status: Patient['status']) => {
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

interface PatientListProps {
  showViewAll?: boolean;
  limit?: number;
  className?: string;
}

const PatientList = ({ showViewAll = true, limit = 5, className }: PatientListProps) => {
  const navigate = useNavigate();
  const displayPatients = mockPatients.slice(0, limit);
  
  const handleRowClick = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayPatients.map((patient) => (
              <TableRow 
                key={patient.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => handleRowClick(patient.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/placeholder.svg`} alt={patient.name} />
                      <AvatarFallback className="text-xs">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{patient.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {patient.age} yrs, {patient.gender} • {patient.mrn}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{patient.condition}</span>
                </TableCell>
                <TableCell>{getStatusBadge(patient.status)}</TableCell>
                <TableCell>{patient.doctor}</TableCell>
                <TableCell>
                  <span className="text-muted-foreground">{patient.lastUpdated}</span>
                </TableCell>
                <TableCell>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate(`/patients/${patient.id}`)}>
                          View Patient
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/clinical/${patient.id}`)}>
                          Clinical Records
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/prescriptions/${patient.id}`)}>
                          E-Prescriptions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => alert('Add note functionality')}>
                          Add Note
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {showViewAll && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={() => navigate('/patients')} className="w-full sm:w-auto">
            View All Patients <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientList;
