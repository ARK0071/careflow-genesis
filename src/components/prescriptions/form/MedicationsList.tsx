
import React from 'react';
import { Medication } from '@/models/prescription';
import MedicationItem from '../MedicationItem';
import { Card } from '@/components/ui/card';

interface MedicationsListProps {
  medications: Medication[];
  onRemoveMedication: (index: number) => void;
  isEditable?: boolean;
}

const MedicationsList: React.FC<MedicationsListProps> = ({ 
  medications, 
  onRemoveMedication, 
  isEditable = true 
}) => {
  if (medications.length === 0) {
    return (
      <Card className="text-center p-6 border border-dashed rounded-md">
        <p className="text-muted-foreground">No medications added yet.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Click "Add Medication" to manually add medications or use "Presets" for common conditions.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {medications.map((med, index) => (
        <MedicationItem 
          key={index}
          medication={med}
          onRemove={() => onRemoveMedication(index)}
          isEditable={isEditable}
        />
      ))}
      <p className="text-xs text-muted-foreground mt-2">
        {medications.length} medication{medications.length !== 1 ? 's' : ''} added to prescription
      </p>
    </div>
  );
};

export default MedicationsList;
