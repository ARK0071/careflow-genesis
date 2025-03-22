
import React from 'react';
import { Medication } from '@/models/prescription';
import MedicationItem from '../MedicationItem';

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
      <div className="text-center p-6 border border-dashed rounded-md">
        <p className="text-muted-foreground">No medications added yet. Click "Add Medication" to begin.</p>
      </div>
    );
  }

  return (
    <div>
      {medications.map((med, index) => (
        <MedicationItem 
          key={index}
          medication={med}
          onRemove={() => onRemoveMedication(index)}
          isEditable={isEditable}
        />
      ))}
    </div>
  );
};

export default MedicationsList;
