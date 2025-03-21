
import React from 'react';
import { XIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Medication } from '@/models/prescription';

interface MedicationItemProps {
  medication: Medication;
  onRemove: () => void;
  isEditable?: boolean;
}

const MedicationItem = ({ medication, onRemove, isEditable = true }: MedicationItemProps) => {
  return (
    <div className={cn(
      "p-3 border rounded-md relative mb-3 bg-card", 
      medication.hasInteraction ? "border-orange-300 bg-orange-50" : ""
    )}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h4 className="font-medium text-md">{medication.name}</h4>
            {medication.hasInteraction && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="h-4 w-4 ml-2 text-orange-500" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{medication.interactionDetails}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <div className="flex flex-wrap gap-x-3 text-sm text-muted-foreground mt-1">
            <span>{medication.dosage}</span>
            <span>•</span>
            <span>{medication.frequency}</span>
            <span>•</span>
            <span>For {medication.duration}</span>
          </div>
          
          {medication.instructions && (
            <p className="text-sm mt-2 text-muted-foreground">
              <span className="font-medium">Instructions:</span> {medication.instructions}
            </p>
          )}
        </div>
        
        {isEditable && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={onRemove}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {medication.hasInteraction && (
        <div className="mt-2 text-sm p-2 bg-orange-100 rounded-sm text-orange-800">
          <span className="font-medium">Interaction Alert:</span> {medication.interactionDetails}
        </div>
      )}
    </div>
  );
};

export default MedicationItem;
