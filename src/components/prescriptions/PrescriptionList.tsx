
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Prescription } from '@/models/prescription';
import { Eye, ChevronRight, Pill } from 'lucide-react';

interface PrescriptionListProps {
  prescriptions: Prescription[];
  onSelectPrescription: (id: string) => void;
}

const PrescriptionList = ({ prescriptions, onSelectPrescription }: PrescriptionListProps) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'signed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Signed</Badge>;
      case 'sent':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Sent</Badge>;
      default:
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Draft</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      {prescriptions.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center">
              <Pill className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Prescriptions</h3>
              <p className="text-muted-foreground mb-6">
                There are no prescriptions available.
              </p>
              <Button onClick={() => navigate('/prescriptions/new')}>
                Create New Prescription
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        prescriptions.map((prescription) => (
          <Card key={prescription.id} className="hover:border-primary/50 transition-colors">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{prescription.patientName}</CardTitle>
                  <CardDescription>
                    {prescription.createdDate} • {prescription.doctorName}
                  </CardDescription>
                </div>
                {getStatusBadge(prescription.status)}
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Diagnosis:</span>
                  <span className="ml-2">{prescription.diagnosis}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Medications:</span>
                  <span className="ml-2">
                    {prescription.medications.map(med => med.name).join(', ')}
                  </span>
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary"
                    onClick={() => onSelectPrescription(prescription.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Prescription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PrescriptionList;
