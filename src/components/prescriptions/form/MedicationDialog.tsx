
import React, { useState } from 'react';
import { Medication } from '@/models/prescription';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { FormLabel } from '@/components/ui/form';
import { Plus, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MedicationDialogProps {
  filteredMedications: Array<{ id: string; name: string; category?: string; hasInteractions?: boolean }>;
  onAddMedication: (medication: Medication) => void;
}

// Preset medications for common conditions
const MEDICATION_PRESETS = {
  diabetes: [
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days', instructions: 'Take with meals' },
    { name: 'Glimepiride', dosage: '2mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take before breakfast' }
  ],
  hypertension: [
    { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take in the morning' },
    { name: 'Losartan', dosage: '50mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take at the same time each day' }
  ],
  fever: [
    { name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours as needed', duration: '5 days', instructions: 'Take after meals' },
    { name: 'Ibuprofen', dosage: '400mg', frequency: 'Every 8 hours as needed', duration: '5 days', instructions: 'Take with food' }
  ],
  infection: [
    { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days', instructions: 'Complete full course even if feeling better' },
    { name: 'Azithromycin', dosage: '500mg', frequency: 'Once daily', duration: '5 days', instructions: 'Take 1 hour before or 2 hours after meals' }
  ],
  allergy: [
    { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '7 days', instructions: 'May cause drowsiness' },
    { name: 'Fexofenadine', dosage: '120mg', frequency: 'Once daily', duration: '7 days', instructions: 'Non-drowsy antihistamine' }
  ]
};

const MedicationDialog: React.FC<MedicationDialogProps> = ({ 
  filteredMedications, 
  onAddMedication 
}) => {
  const { toast } = useToast();
  const [showMedicationDialog, setShowMedicationDialog] = React.useState(false);
  const [newMedication, setNewMedication] = React.useState<Partial<Medication>>({});
  const [activeTab, setActiveTab] = useState<'manual' | 'presets'>('manual');

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
    
    onAddMedication(newMed);
    setNewMedication({});
    setShowMedicationDialog(false);
  };

  const handleSelectPreset = (conditionKey: keyof typeof MEDICATION_PRESETS) => {
    const medications = MEDICATION_PRESETS[conditionKey];
    
    // Add all medications from the preset
    medications.forEach(med => {
      const medication: Medication = {
        id: `rx${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        duration: med.duration,
        instructions: med.instructions,
      };
      
      onAddMedication(medication);
    });
    
    toast({
      title: "Preset Added",
      description: `Added ${medications.length} medications for ${conditionKey}`,
    });
    
    setShowMedicationDialog(false);
  };

  return (
    <Dialog open={showMedicationDialog} onOpenChange={setShowMedicationDialog}>
      <div className="flex gap-2">
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </DialogTrigger>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Presets
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleSelectPreset('diabetes')}>
              Diabetes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectPreset('hypertension')}>
              Hypertension
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectPreset('fever')}>
              Fever & Pain
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectPreset('infection')}>
              Infection
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectPreset('allergy')}>
              Allergy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Medication</DialogTitle>
          <DialogDescription>
            Enter the details for the medication you want to prescribe.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'manual' | 'presets')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="presets" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(MEDICATION_PRESETS).map(([condition, meds]) => (
                <Button 
                  key={condition} 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => handleSelectPreset(condition as keyof typeof MEDICATION_PRESETS)}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium capitalize">{condition}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {meds.map(m => m.name).join(', ')}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {activeTab === 'manual' && (
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowMedicationDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddMedication}>
              Add Medication
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MedicationDialog;
