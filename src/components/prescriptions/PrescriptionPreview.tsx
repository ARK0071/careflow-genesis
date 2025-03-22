
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Prescription } from '@/models/prescription';
import { MessageCircle, Phone, Printer, Download, Edit, Eye } from 'lucide-react';
import MedicationItem from './MedicationItem';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface PrescriptionPreviewProps {
  prescription: Partial<Prescription>;
  onEdit?: () => void;
}

const PrescriptionPreview = ({ prescription, onEdit }: PrescriptionPreviewProps) => {
  const { toast } = useToast();
  
  const handleSendWhatsApp = () => {
    // In a real app, this would integrate with WhatsApp Business API
    toast({
      title: "Prescription Sent",
      description: "The prescription has been sent via WhatsApp to the patient.",
    });
  };
  
  const handleSendSMS = () => {
    // In a real app, this would integrate with an SMS service
    toast({
      title: "Prescription Sent",
      description: "The prescription has been sent via SMS to the patient.",
    });
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-muted/50 border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Prescription</CardTitle>
            <CardDescription>
              {prescription.createdDate} • {prescription.doctorName}
            </CardDescription>
          </div>
          {prescription.status === 'signed' && (
            <div className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Signed
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Patient</h3>
              <p className="font-medium">{prescription.patientName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Doctor</h3>
              <p className="font-medium">{prescription.doctorName}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Diagnosis</h3>
            <p className="font-medium">{prescription.diagnosis}</p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-3">Medications</h3>
            {prescription.medications?.map((med, index) => (
              <MedicationItem 
                key={index}
                medication={med}
                onRemove={() => {}}
                isEditable={false}
              />
            ))}
          </div>
          
          {prescription.notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Additional Notes</h3>
                <p className="mt-1">{prescription.notes}</p>
              </div>
            </>
          )}
          
          {prescription.status === 'signed' && (
            <div className="mt-4 pt-4 border-t border-dashed">
              <div className="flex items-end justify-end">
                <div className="max-w-xs">
                  <p className="text-right font-medium">{prescription.doctorName}</p>
                  <div className="h-12 mt-2 flex items-center justify-center">
                    <div className="italic text-blue-800 border-b border-blue-800 px-2 font-signature text-xl">
                      Rajesh Kapoor
                    </div>
                  </div>
                  <p className="text-right text-sm text-muted-foreground">Digital Signature</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 border-t flex-wrap gap-2">
        {prescription.status === 'signed' ? (
          <>
            <Button variant="outline" className="flex-1" onClick={handleSendWhatsApp}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Send WhatsApp
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleSendSMS}>
              <Phone className="h-4 w-4 mr-2" />
              Send SMS
            </Button>
            <Button variant="outline" className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            {prescription.id && (
              <Button variant="outline" className="flex-1" asChild>
                <Link to={`/patient-prescription/${prescription.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Patient View
                </Link>
              </Button>
            )}
          </>
        ) : (
          <>
            {onEdit && (
              <Button variant="outline" className="flex-1" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Prescription
              </Button>
            )}
            <Button variant="outline" disabled className="flex-1 opacity-50">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" disabled className="flex-1 opacity-50">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default PrescriptionPreview;
