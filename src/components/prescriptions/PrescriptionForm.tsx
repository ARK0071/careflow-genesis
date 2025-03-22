
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Prescription } from '@/models/prescription';
import { useToast } from '@/hooks/use-toast';
import { usePrescriptionMedications } from '@/hooks/usePrescriptionMedications';

// Import refactored components
import MedicationDialog from './form/MedicationDialog';
import MedicationsList from './form/MedicationsList';
import PrescriptionTemplates from './form/PrescriptionTemplates';
import PrescriptionSignature from './form/PrescriptionSignature';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PrescriptionFormProps {
  patientId?: string;
  patientName?: string;
  onSave: (prescription: Partial<Prescription>) => void;
  initialData?: Partial<Prescription>;
}

const PrescriptionForm = ({ patientId, patientName, onSave, initialData }: PrescriptionFormProps) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialData?.template || 'general');
  const [signed, setSigned] = useState(initialData?.status === 'signed');
  const [language, setLanguage] = useState<'english' | 'hindi' | 'both'>(initialData?.language || 'english');
  
  // Use custom hook for medications management
  const { 
    medications, 
    filteredMedications, 
    addMedication, 
    removeMedication 
  } = usePrescriptionMedications(initialData?.medications || [], selectedTemplate);
  
  const form = useForm<Partial<Prescription>>({
    defaultValues: {
      patientId: patientId || initialData?.patientId || '',
      patientName: patientName || initialData?.patientName || '',
      doctorId: 'doc1', // Mock doctor ID
      doctorName: 'Dr. Rajesh Kapoor', // Mock doctor name
      diagnosis: initialData?.diagnosis || '',
      notes: initialData?.notes || '',
      template: initialData?.template || 'general',
      status: initialData?.status || 'draft',
      language: initialData?.language || 'english'
    },
  });
  
  const handleSign = () => {
    setSigned(true);
    toast({
      title: "Prescription Signed",
      description: "Your digital signature has been applied to this prescription.",
    });
  };
  
  const handleSubmit = (data: Partial<Prescription>) => {
    if (medications.length === 0) {
      toast({
        title: "No Medications",
        description: "Please add at least one medication to the prescription.",
        variant: "destructive",
      });
      return;
    }
    
    const prescription: Partial<Prescription> = {
      ...data,
      medications,
      template: selectedTemplate,
      status: signed ? 'signed' : 'draft',
      language: language,
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    onSave(prescription);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="prescription" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="prescription">Prescription Details</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prescription" className="space-y-4 mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Patient name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="diagnosis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diagnosis</FormLabel>
                      <FormControl>
                        <Input placeholder="Primary diagnosis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel>Language</FormLabel>
                  <Select 
                    value={language} 
                    onValueChange={(value) => setLanguage(value as 'english' | 'hindi' | 'both')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="both">Bilingual (English & Hindi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Medications</h3>
                  <MedicationDialog 
                    filteredMedications={filteredMedications}
                    onAddMedication={addMedication}
                  />
                </div>
                
                <MedicationsList 
                  medications={medications}
                  onRemoveMedication={removeMedication}
                  isEditable={!signed}
                />
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional instructions or notes for the patient"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <PrescriptionSignature 
                signed={signed}
                onSign={handleSign}
                onUnsign={() => setSigned(false)}
              />
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-4">
          <PrescriptionTemplates 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrescriptionForm;
