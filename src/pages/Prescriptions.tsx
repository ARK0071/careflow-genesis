
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, Search, Filter, MessageCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PrescriptionForm from '@/components/prescriptions/PrescriptionForm';
import PrescriptionPreview from '@/components/prescriptions/PrescriptionPreview';
import PrescriptionList from '@/components/prescriptions/PrescriptionList';
import { MOCK_PRESCRIPTIONS, Prescription } from '@/models/prescription';
import PatientHeader from '@/components/patient/PatientHeader';

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

const Prescriptions = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [newPrescription, setNewPrescription] = useState<Partial<Prescription> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter prescriptions based on search query and status filter
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medications.some(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // If patientId is provided, filter prescriptions for that patient and set up a new prescription
  useEffect(() => {
    if (patientId) {
      // Find patient name from the mock data
      const patientName = patientId === '1' ? mockPatientData.name : 'Unknown Patient';
      
      // Set up new prescription for this patient
      setNewPrescription({
        patientId,
        patientName,
        status: 'draft'
      });
      
      // If there are existing prescriptions for this patient, show them
      const patientPrescriptions = prescriptions.filter(p => p.patientId === patientId);
      if (patientPrescriptions.length > 0) {
        setActiveTab('prescriptions');
      } else {
        // If no existing prescriptions, go straight to the new prescription form
        setActiveTab('new');
      }
    }
  }, [patientId]);
  
  const handleSelectPrescription = (id: string) => {
    const prescription = prescriptions.find(p => p.id === id) || null;
    setSelectedPrescription(prescription);
    setIsPreview(true);
  };
  
  const handleCreateNew = () => {
    setSelectedPrescription(null);
    setNewPrescription({
      status: 'draft',
      patientId: patientId || '',
      patientName: patientId === '1' ? mockPatientData.name : '',
    });
    setActiveTab('new');
    setIsPreview(false);
  };
  
  const handleSavePrescription = (prescription: Partial<Prescription>) => {
    // In a real app, this would save to a database
    const isNewPrescription = !prescription.id;
    
    if (isNewPrescription) {
      const newId = `${prescriptions.length + 1}`;
      const saved = {
        ...prescription,
        id: newId,
      } as Prescription;
      
      setPrescriptions([...prescriptions, saved]);
      setSelectedPrescription(saved);
      
      toast({
        title: "Prescription Saved",
        description: prescription.status === 'signed' 
          ? "The prescription has been signed and saved."
          : "The prescription has been saved as a draft.",
      });
    } else {
      const updated = prescriptions.map(p => 
        p.id === prescription.id ? { ...p, ...prescription } as Prescription : p
      );
      setPrescriptions(updated);
      setSelectedPrescription({ ...selectedPrescription, ...prescription } as Prescription);
      
      toast({
        title: "Prescription Updated",
        description: "The prescription has been updated successfully.",
      });
    }
    
    setIsPreview(true);
  };
  
  return (
    <div className="container pb-8 animate-fade-in">
      {patientId === '1' && (
        <PatientHeader patient={mockPatientData} className="mb-6" />
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="prescriptions">All Prescriptions</TabsTrigger>
            <TabsTrigger value="new">New Prescription</TabsTrigger>
          </TabsList>
          
          {activeTab === 'prescriptions' && !isPreview && (
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search prescriptions..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Drafts</SelectItem>
                  <SelectItem value="signed">Signed</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={handleCreateNew}>
                <Plus className="mr-2 h-4 w-4" />
                New Prescription
              </Button>
            </div>
          )}
        </div>
        
        <TabsContent value="prescriptions" className="animate-fade-in">
          {isPreview && selectedPrescription ? (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setIsPreview(false);
                    setSelectedPrescription(null);
                  }}
                >
                  ← Back to All Prescriptions
                </Button>
                
                {selectedPrescription.status === 'draft' && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setNewPrescription(selectedPrescription);
                      setActiveTab('new');
                      setIsPreview(false);
                    }}
                  >
                    Edit Prescription
                  </Button>
                )}
              </div>
              
              <PrescriptionPreview prescription={selectedPrescription} />
              
              {selectedPrescription.status === 'signed' && (
                <div className="mt-4 p-4 border rounded-md bg-blue-50 flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-700">Send to Patient</h3>
                    <p className="text-sm text-blue-600">
                      Use the WhatsApp or SMS buttons above to send this prescription directly to the patient's phone.
                    </p>
                  </div>
                </div>
              )}
              
              {selectedPrescription.medications.some(med => med.hasInteraction) && (
                <div className="mt-4 p-4 border rounded-md bg-orange-50 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-orange-700">Medication Interactions Detected</h3>
                    <p className="text-sm text-orange-600">
                      This prescription contains medications with potential interactions. Please review before sending to the patient.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <PrescriptionList 
              prescriptions={filteredPrescriptions}
              onSelectPrescription={handleSelectPrescription}
            />
          )}
        </TabsContent>
        
        <TabsContent value="new" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Create Prescription</h2>
              <PrescriptionForm
                patientId={newPrescription?.patientId}
                patientName={newPrescription?.patientName}
                initialData={newPrescription || {}}
                onSave={handleSavePrescription}
              />
            </div>
            
            <div className="hidden lg:block">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <PrescriptionPreview 
                prescription={newPrescription || {}}
              />
              
              <div className="mt-4 p-4 border rounded-md bg-muted/50">
                <h3 className="font-medium">About E-Prescriptions</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Electronic prescriptions help reduce medication errors and improve patient safety. Sign your prescription to enable direct sending via WhatsApp or SMS.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Prescriptions;
