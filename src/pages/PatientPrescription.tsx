
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_PRESCRIPTIONS } from '@/models/prescription';
import PatientPrescription from '@/components/prescriptions/PatientPrescription';
import PrescriptionPreview from '@/components/prescriptions/PrescriptionPreview';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PatientPrescriptionPage = () => {
  const { prescriptionId } = useParams<{ prescriptionId: string }>();
  const [language, setLanguage] = useState<'english' | 'hindi' | 'both'>('english');
  
  // Get the prescription data based on ID or use the first mock prescription
  const prescription = prescriptionId 
    ? MOCK_PRESCRIPTIONS.find(p => p.id === prescriptionId) 
    : MOCK_PRESCRIPTIONS[0];
  
  // Create a copy of the prescription with the selected language
  const prescriptionWithLanguage = prescription 
    ? { ...prescription, language } 
    : undefined;
  
  return (
    <div className="container py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Patient Prescription</h1>
          <Badge variant="outline" className="ml-2">
            {prescription?.status === 'signed' ? 'Signed' : 'Draft'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-sm mr-2">Language:</span>
            <Select value={language} onValueChange={(value) => setLanguage(value as 'english' | 'hindi' | 'both')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="both">Bilingual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="patient">
        <TabsList className="mb-4">
          <TabsTrigger value="patient">Patient View</TabsTrigger>
          <TabsTrigger value="doctor">Doctor View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patient" className="animate-fade-in">
          <div className="max-w-2xl mx-auto">
            {prescriptionWithLanguage ? (
              <PatientPrescription prescription={prescriptionWithLanguage} />
            ) : (
              <div className="text-center p-8 border rounded-md">
                <p>No prescription data found</p>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-muted/30 rounded-md border text-sm">
              <h3 className="font-medium mb-2">About Patient-Facing Prescriptions</h3>
              <p className="text-muted-foreground">
                This view shows how the prescription will appear to patients when sent via WhatsApp or printed. 
                Change the language option above to see the prescription in different languages.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="doctor" className="animate-fade-in">
          <div className="max-w-2xl mx-auto">
            {prescription ? (
              <PrescriptionPreview prescription={prescription} />
            ) : (
              <div className="text-center p-8 border rounded-md">
                <p>No prescription data found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientPrescriptionPage;
