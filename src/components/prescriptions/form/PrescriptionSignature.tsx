
import React from 'react';
import { Button } from '@/components/ui/button';
import { Signature } from 'lucide-react';

interface PrescriptionSignatureProps {
  signed: boolean;
  onSign: () => void;
  onUnsign: () => void;
}

const PrescriptionSignature: React.FC<PrescriptionSignatureProps> = ({ 
  signed, 
  onSign, 
  onUnsign 
}) => {
  return (
    <div className="pt-4 border-t flex flex-wrap gap-4 justify-between">
      {!signed ? (
        <>
          <Button type="button" variant="outline" onClick={onSign}>
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
            <Button type="button" variant="outline" onClick={onUnsign}>
              Unsign
            </Button>
            <Button type="submit">
              Save Prescription
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PrescriptionSignature;
