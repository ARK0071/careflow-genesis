
import { useState, useEffect } from 'react';
import { Medication, MEDICATIONS_DATABASE, checkInteractions } from '@/models/prescription';
import { useToast } from '@/hooks/use-toast';

export const usePrescriptionMedications = (initialMedications: Medication[] = [], selectedTemplate: string = 'general') => {
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [filteredMedications, setFilteredMedications] = useState(MEDICATIONS_DATABASE);

  // Filter medications based on selected template
  useEffect(() => {
    setFilteredMedications(
      MEDICATIONS_DATABASE.filter(med => 
        selectedTemplate === 'general' ? true : med.category === selectedTemplate
      )
    );
  }, [selectedTemplate]);

  // Check for medication interactions
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
  }, [medications, toast]);

  const addMedication = (medication: Medication) => {
    setMedications([...medications, medication]);
  };

  const removeMedication = (index: number) => {
    const newMedications = [...medications];
    newMedications.splice(index, 1);
    setMedications(newMedications);
  };

  return {
    medications,
    filteredMedications,
    addMedication,
    removeMedication
  };
};
