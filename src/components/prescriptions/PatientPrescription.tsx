
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Prescription, translateToHindi } from '@/models/prescription';
import { format } from 'date-fns';
import { Printer, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PatientPrescriptionProps {
  prescription: Partial<Prescription>;
  className?: string;
}

const PatientPrescription = ({ prescription, className }: PatientPrescriptionProps) => {
  const isHindi = prescription.language === 'hindi';
  const isBilingual = prescription.language === 'both';
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'dd MMM yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const renderText = (english: string, sameInBoth: boolean = false) => {
    if (isHindi) {
      return translateToHindi(english);
    }
    
    if (isBilingual) {
      return (
        <>
          <span className="block">{english}</span>
          {!sameInBoth && <span className="block text-sm mt-0.5 text-muted-foreground">{translateToHindi(english)}</span>}
        </>
      );
    }
    
    return english;
  };
  
  return (
    <Card className={cn("shadow-sm prescription-card", className)}>
      <CardHeader className="border-b bg-muted/30">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl leading-tight">
              {renderText('Prescription', true)}
            </CardTitle>
            <p className="text-sm mt-1 text-muted-foreground">
              {formatDate(prescription.createdDate)}
            </p>
          </div>
          
          <div className="text-right">
            <p className="font-medium">{prescription.doctorName}</p>
            {prescription.clinicName && (
              <p className="text-sm text-muted-foreground">{prescription.clinicName}</p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Patient Info Section */}
          <div className="bg-blue-50/50 p-4 rounded-md border border-blue-100">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {renderText('Patient')}:
                </p>
                <p className="font-medium">{prescription.patientName}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {renderText('Age')}/{renderText('Gender')}:
                </p>
                <p className="font-medium">
                  {prescription.patientAge || '-'} / {prescription.patientGender || '-'}
                </p>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-sm font-medium text-muted-foreground">
                {renderText('Diagnosis')}:
              </p>
              <p className="font-medium">{prescription.diagnosis}</p>
            </div>
            
            {prescription.vitals && (
              <div className="mt-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {renderText('Vitals')}:
                </p>
                <p className="font-medium">{prescription.vitals}</p>
              </div>
            )}
          </div>
          
          {/* Medications Section */}
          <div>
            <h3 className="text-base font-medium mb-3 flex items-center">
              <span className="inline-flex items-center justify-center bg-primary/10 text-primary w-6 h-6 rounded-full text-xs mr-2">Rx</span>
              {isHindi ? 'दवाइयां' : (isBilingual ? 'Medications / दवाइयां' : 'Medications')}
            </h3>
            
            <div className="space-y-4">
              {prescription.medications?.map((medication, index) => (
                <div key={index} className="p-3 border rounded-md bg-background">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{medication.name}</p>
                      <p className="text-sm">
                        {medication.dosage} • {
                          isHindi ? translateToHindi(medication.frequency) : 
                          (isBilingual ? 
                            `${medication.frequency} / ${translateToHindi(medication.frequency)}` : 
                            medication.frequency)
                        }
                      </p>
                      
                      <div className="mt-1 text-sm text-muted-foreground">
                        <span className="inline-block mr-2">
                          {isHindi ? translateToHindi('for') : 'for'} {medication.duration}
                        </span>
                        
                        {medication.timing && (
                          <span className="inline-block">
                            {isHindi ? 
                              translateToHindi(medication.timing) : 
                              (isBilingual ? 
                                `${medication.timing} / ${translateToHindi(medication.timing)}` : 
                                medication.timing)}
                          </span>
                        )}
                      </div>
                      
                      {medication.instructions && (
                        <p className="mt-2 text-sm italic">
                          {isHindi ? 
                            translateToHindi(medication.instructions) : 
                            (isBilingual ? 
                              <>
                                <span className="block">{medication.instructions}</span>
                                <span className="block text-muted-foreground">{translateToHindi(medication.instructions)}</span>
                              </> : 
                              medication.instructions)}
                        </p>
                      )}
                    </div>
                    
                    <div className="text-right text-sm whitespace-nowrap ml-4">
                      <span className="block font-medium">{medication.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Notes & Instructions Section */}
          {prescription.notes && (
            <div className="p-4 border rounded-md bg-muted/30">
              <h3 className="text-base font-medium mb-2">
                {isHindi ? 'निर्देश' : (isBilingual ? 'Instructions / निर्देश' : 'Instructions')}
              </h3>
              <p className="text-sm">
                {isHindi ? 
                  translateToHindi(prescription.notes) : 
                  (isBilingual ? 
                    <>
                      <span className="block">{prescription.notes}</span>
                      <span className="block text-muted-foreground">{translateToHindi(prescription.notes)}</span>
                    </> : 
                    prescription.notes)}
              </p>
            </div>
          )}
          
          {/* Follow-up Section */}
          {prescription.followUpDate && (
            <div className="flex items-center p-3 border rounded-md bg-green-50/50 border-green-100">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-green-800">
                  {isHindi ? 'फॉलो-अप अपॉइंटमेंट' : (isBilingual ? 'Follow-up Appointment / फॉलो-अप अपॉइंटमेंट' : 'Follow-up Appointment')}
                </h3>
                <p className="text-sm mt-1">
                  {formatDate(prescription.followUpDate)}
                </p>
              </div>
            </div>
          )}
          
          {/* Digital Signature Section */}
          <div className="mt-6 pt-4 border-t border-dashed">
            <div className="flex items-end justify-end">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {isHindi ? translateToHindi('Doctor') : (isBilingual ? 'Doctor / डॉक्टर' : 'Doctor')}
                </p>
                <p className="font-medium">{prescription.doctorName}</p>
                <div className="h-12 mt-2 flex items-center justify-end">
                  <div className="italic text-blue-800 border-b border-blue-800 px-2 font-signature text-xl">
                    Rajesh Kapoor
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isHindi ? 'डिजिटल हस्ताक्षर' : (isBilingual ? 'Digital Signature / डिजिटल हस्ताक्षर' : 'Digital Signature')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-muted/20 flex-wrap gap-2 pt-4">
        <Button variant="outline" className="gap-1 flex-1">
          <Printer className="h-4 w-4 mr-1" />
          {isHindi ? 'प्रिंट करें' : 'Print'}
        </Button>
        <Button variant="outline" className="gap-1 flex-1">
          <Download className="h-4 w-4 mr-1" />
          {isHindi ? 'पीडीएफ डाउनलोड करें' : 'Download PDF'}
        </Button>
        <Button variant="default" className="gap-1 flex-1 bg-green-600 hover:bg-green-700">
          <Share2 className="h-4 w-4 mr-1" />
          WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PatientPrescription;
