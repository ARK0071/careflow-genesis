
import React from 'react';
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
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MedicationDialogProps {
  filteredMedications: Array<{ id: string; name: string; category?: string; hasInteractions?: boolean }>;
  onAddMedication: (medication: Medication) => void;
}

const MedicationDialog: React.FC<MedicationDialogProps> = ({ 
  filteredMedications, 
  onAddMedication 
}) => {
  const { toast } = useToast();
  const [showMedicationDialog, setShowMedicationDialog] = React.useState(false);
  const [newMedication, setNewMedication] = React.useState<Partial<Medication>>({});

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

  return (
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
  );
};

export default MedicationDialog;
