import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Prescription, Medication, PRESCRIPTION_TEMPLATES, MEDICATIONS_DATABASE, checkInteractions } from '@/models/prescription';
import { Plus, MessageCircle, Clock, Signature, AlertCircle, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import MedicationItem from './MedicationItem';
import { useToast } from '@/hooks/use-toast';

interface PrescriptionFormProps {
  patientId?: string;
  patientName?: string;
  onSave: (prescription: Partial<Prescription>) => void;
  initialData?: Partial<Prescription>;
}

const PrescriptionForm = ({ patientId, patientName, onSave, initialData }: PrescriptionFormProps) => {
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>(initialData?.medications || []);
  const [showMedicationDialog, setShowMedicationDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialData?.template || 'general');
  const [filteredMedications, setFilteredMedications] = useState(MEDICATIONS_DATABASE);
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({});
  const [signed, setSigned] = useState(initialData?.status === 'signed');
  
  const form = useForm<Partial<Prescription>>({
    defaultValues: {
      patientId: patientId || initialData?.patientId || '',
      patientName: patientName || initialData?.patientName || '',
      doctorId: 'doc1', // Mock doctor ID
      doctorName: 'Dr. Rajesh Kapoor', // Mock doctor name
      diagnosis: initialData?.diagnosis || '',
      notes: initialData?.notes || '',
      template: initialData?.template || 'general',
      status: initialData?.status || 'draft'
    },
  });
  
  useEffect(() => {
    setFilteredMedications(
      MEDICATIONS_DATABASE.filter(med => 
        selectedTemplate === 'general' ? true : med.category === selectedTemplate
      )
    );
  }, [selectedTemplate]);
  
  useEffect(() => {
    if (medications.length >= 2) {
      const medicationNames = medications.map(med => med.name);
      const interactionResult = checkInteractions(medicationNames);
      
      if (interactionResult.hasInteraction) {
        const updatedMedications = medications.map(med => {
          if (interactionResult.details?.includes(med.name)) {
            return {
              ...med,
              hasInteraction: true,
              interactionDetails: interactionResult.details
            };
          }
          return med;
        });
        
        setMedications(updatedMedications);
        
        toast({
          title: "Medication Interaction Detected",
          description: interactionResult.details,
          variant: "destructive",
        });
      }
    }
  }, [medications]);
  
  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.frequency || !newMedication.duration) {
      toast({
        title: "Incomplete Medication",
        description: "Please fill in all required fields for the medication.",
        variant: "destructive",
      });
      return;
    }
    
    const newMed: Medication = {
      id: `rx${Date.now()}`,
      name: newMedication.name as string,
      dosage: newMedication.dosage as string,
      frequency: newMedication.frequency as string,
      duration: newMedication.duration as string,
      instructions: newMedication.instructions,
    };
    
    setMedications([...medications, newMed]);
    setNewMedication({});
    setShowMedicationDialog(false);
  };
  
  const handleRemoveMedication = (index: number) => {
    const newMedications = [...medications];
    newMedications.splice(index, 1);
    setMedications(newMedications);
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
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    onSave(prescription);
  };
  
  const handleSign = () => {
    setSigned(true);
    toast({
      title: "Prescription Signed",
      description: "Your digital signature has been applied to this prescription.",
    });
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
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Medications</h3>
                  <Dialog open={showMedicationDialog} onOpenChange={setShowMedicationDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Medication
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Medication</DialogTitle>
                        <DialogDescription>
                          Enter the details for the medication you want to prescribe.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <FormLabel htmlFor="medication">Medication Name</FormLabel>
                          <Select 
                            onValueChange={(value) => setNewMedication({...newMedication, name: value})}
                            value={newMedication.name}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select medication" />
                            </SelectTrigger>
                            <SelectContent>
                              {filteredMedications.map((med) => (
                                <SelectItem key={med.id} value={med.name}>
                                  {med.name} {med.hasInteractions && <span className="ml-1 text-orange-500">(!)</span>}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <FormLabel htmlFor="dosage">Dosage</FormLabel>
                            <Input 
                              id="dosage" 
                              placeholder="e.g. 500mg" 
                              value={newMedication.dosage || ''}
                              onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <FormLabel htmlFor="frequency">Frequency</FormLabel>
                            <Input 
                              id="frequency" 
                              placeholder="e.g. Twice daily" 
                              value={newMedication.frequency || ''}
                              onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <FormLabel htmlFor="duration">Duration</FormLabel>
                          <Input 
                            id="duration" 
                            placeholder="e.g. 7 days" 
                            value={newMedication.duration || ''}
                            onChange={(e) => setNewMedication({...newMedication, duration: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <FormLabel htmlFor="instructions">Special Instructions</FormLabel>
                          <Textarea 
                            id="instructions" 
                            placeholder="e.g. Take after meals" 
                            value={newMedication.instructions || ''}
                            onChange={(e) => setNewMedication({...newMedication, instructions: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setShowMedicationDialog(false)}>
                          Cancel
                        </Button>
                        <Button type="button" onClick={handleAddMedication}>
                          Add Medication
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {medications.length === 0 ? (
                  <div className="text-center p-6 border border-dashed rounded-md">
                    <p className="text-muted-foreground">No medications added yet. Click "Add Medication" to begin.</p>
                  </div>
                ) : (
                  <div>
                    {medications.map((med, index) => (
                      <MedicationItem 
                        key={index}
                        medication={med}
                        onRemove={() => handleRemoveMedication(index)}
                        isEditable={!signed}
                      />
                    ))}
                  </div>
                )}
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
              
              <div className="pt-4 border-t flex flex-wrap gap-4 justify-between">
                {!signed ? (
                  <>
                    <Button type="button" variant="outline" onClick={handleSign}>
                      <Signature className="h-4 w-4 mr-2" />
                      Sign Prescription
                    </Button>
                    <div>
                      <Button type="submit">
                        Save as Draft
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Signature className="h-4 w-4 mr-2" />
                      <span>Signed by Dr. Rajesh Kapoor</span>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => setSigned(false)}>
                        Unsign
                      </Button>
                      <Button type="submit">
                        Save Prescription
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {PRESCRIPTION_TEMPLATES.map((template) => (
              <Card key={template.id} className={cn(selectedTemplate === template.id ? "border-primary" : "")}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant={selectedTemplate === template.id ? "default" : "outline"} 
                    onClick={() => setSelectedTemplate(template.id)}
                    className="w-full"
                  >
                    {selectedTemplate === template.id ? "Selected" : "Use Template"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrescriptionForm;
