
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  UserPlus, 
  FileText, 
  CalendarClock, 
  Pill, 
  Activity,
  Heart,
  MoreHorizontal,
  Filter,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock patient data
const mockPatients = [
  {
    id: '1',
    name: 'Anil Sharma',
    age: 48,
    gender: 'M',
    mrn: 'MRN23456789',
    phone: '+91 98765 43210',
    address: 'A-12, Sector 62, Noida',
    condition: 'Hypertension',
    lastVisit: '3 days ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Priya Patel',
    age: 36,
    gender: 'F',
    mrn: 'MRN23456790',
    phone: '+91 87654 32109',
    address: 'C-45, Vasant Kunj, Delhi',
    condition: 'Upper Respiratory Infection',
    lastVisit: '1 week ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'Rajiv Mehta',
    age: 62,
    gender: 'M',
    mrn: 'MRN23456791',
    phone: '+91 76543 21098',
    address: 'D-78, Mayur Vihar, Delhi',
    condition: 'Diabetes Type 2',
    lastVisit: '2 weeks ago',
    status: 'critical',
  },
  {
    id: '4',
    name: 'Sunita Gupta',
    age: 54,
    gender: 'F',
    mrn: 'MRN23456792',
    phone: '+91 65432 10987',
    address: 'E-23, Rajouri Garden, Delhi',
    condition: 'Arthritis',
    lastVisit: '1 month ago',
    status: 'stable',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    age: 42,
    gender: 'M',
    mrn: 'MRN23456793',
    phone: '+91 54321 09876',
    address: 'F-56, Pitampura, Delhi',
    condition: 'Migraine',
    lastVisit: '2 months ago',
    status: 'stable',
  },
];

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter patients based on search query and active tab
  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && patient.status === activeTab;
  });
  
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">Manage and view all patient records</p>
        </div>
        
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          New Patient
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Patients</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="stable">Stable</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredPatients.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-xl text-muted-foreground">No patients found</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}>
                Clear filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredPatients.map(patient => (
            <Card key={patient.id} className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <CardDescription>
                      {patient.age} years • {patient.gender} • {patient.mrn}
                    </CardDescription>
                  </div>
                  
                  <Badge 
                    variant={
                      patient.status === 'critical' ? 'destructive' : 
                      (patient.status === 'active' ? 'default' : 'outline')
                    }
                  >
                    {patient.status === 'critical' ? 'Critical' : 
                     (patient.status === 'active' ? 'Active' : 'Stable')}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <p>{patient.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{patient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Visit</p>
                    <p>{patient.lastVisit}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/clinical/${patient.id}`}>
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      Clinical Notes
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/prescriptions/${patient.id}`}>
                      <Pill className="h-3.5 w-3.5 mr-1" />
                      Prescriptions
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/appointments?patient=${patient.id}`}>
                      <CalendarClock className="h-3.5 w-3.5 mr-1" />
                      Appointments
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/vitals/${patient.id}`}>
                      <Activity className="h-3.5 w-3.5 mr-1" />
                      Vitals
                    </Link>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Patient Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Heart className="h-4 w-4 mr-2" />
                        Add to Favorites
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        View Documents
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Edit Patient
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Patients;
