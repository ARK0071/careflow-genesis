
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardCard from '@/components/dashboard/DashboardCard';
import SoapNote from '@/components/clinical/SoapNote';
import PatientHeader from '@/components/patient/PatientHeader';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Filter, 
  Plus, 
  Sparkles,
  Search,
  Calendar,
  User,
  ChevronDown
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock patient data
const mockPatientData = {
  id: '1',
  name: 'Anil Sharma',
  age: 48,
  gender: 'M',
  mrn: 'MRN23456789',
  phone: '+91 98765 43210',
  email: 'anil.sharma@example.com',
  address: 'A-12, Sector 62, Noida, UP 201301',
  bloodGroup: 'B+',
  status: 'stable' as const,
  condition: 'Hypertension',
};

// Mock clinical notes data
const mockClinicalNotes = [
  {
    id: '1',
    type: 'Progress Note',
    date: 'Today, 10:30 AM',
    provider: 'Dr. Rajesh Kapoor',
    department: 'Cardiology',
    content: 'Patient presented with chest pain. ECG shows normal sinus rhythm.',
    tags: ['Follow-up', 'Chest Pain'],
  },
  {
    id: '2',
    type: 'Initial Consultation',
    date: '2 weeks ago',
    provider: 'Dr. Rajesh Kapoor',
    department: 'Cardiology',
    content: 'First presentation with symptoms of hypertension. Started on amlodipine 5mg daily.',
    tags: ['Initial Visit', 'Hypertension'],
  },
  {
    id: '3',
    type: 'Emergency Note',
    date: '1 month ago',
    provider: 'Dr. Vikram Mehta',
    department: 'Emergency Medicine',
    content: 'Patient presented with severe headache and BP 180/100. Treated with IV labetalol.',
    tags: ['Emergency', 'Hypertensive Crisis'],
  },
  {
    id: '4',
    type: 'Phone Encounter',
    date: '6 weeks ago',
    provider: 'Dr. Anjali Singh',
    department: 'General Medicine',
    content: 'Patient called with concerns about medication side effects. Advised to continue and monitor.',
    tags: ['Phone Call', 'Medication'],
  },
  {
    id: '5',
    type: 'Annual Physical',
    date: '3 months ago',
    provider: 'Dr. Anjali Singh',
    department: 'General Medicine',
    content: 'Complete physical examination. All systems within normal limits except BP 150/95.',
    tags: ['Preventive', 'Physical Exam'],
  },
];

const ClinicalDocumentation = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [activeTab, setActiveTab] = useState('notes');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter notes based on search query
  const filteredNotes = mockClinicalNotes.filter(note => 
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="container animate-fade-in">
      <PatientHeader patient={mockPatientData} className="mb-6" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
            <TabsTrigger value="new">New Note</TabsTrigger>
          </TabsList>
          
          {activeTab === 'notes' && (
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[220px]">
                  <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Date Range
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Provider
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    Note Type
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button onClick={() => setActiveTab('new')}>
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </div>
          )}
        </div>
        
        <TabsContent value="notes" className="animate-fade-in">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg border">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">No Clinical Notes Found</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                We couldn't find any notes matching your search criteria.
              </p>
              <Button onClick={() => setSearchQuery('')} variant="outline">
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <DashboardCard
                  key={note.id}
                  title={note.type}
                  description={`${note.date} • ${note.provider} • ${note.department}`}
                >
                  <div>
                    <p className="mb-3">{note.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground">
                          View Full Note
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground">
                          Print
                        </Button>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            More <ChevronDown className="ml-1 h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Summary
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Create Follow-up
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            Add to Problem List
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </DashboardCard>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="new" className="animate-fade-in">
          <SoapNote patientId={patientId || '1'} patientName={mockPatientData.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicalDocumentation;
