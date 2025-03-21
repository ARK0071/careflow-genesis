
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientHeader from '@/components/patient/PatientHeader';
import ClinicalTimeline from '@/components/patient/ClinicalTimeline';
import DashboardCard from '@/components/dashboard/DashboardCard';
import SoapNote from '@/components/clinical/SoapNote';
import { 
  Activity, 
  Heart, 
  AlarmClock, 
  Pill, 
  ThumbsUp, 
  AlertCircle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockPatientData = {
  id: '1',
  name: 'Anil Sharma',
  age: 48,
  gender: 'M',
  mrn: 'MRN23456789',
  phone: '+91 98765 43210',
  email: 'anil.sharma@example.com',
  address: 'A-12, Sector 62, Noida, UP 201301',
  bloodGroup: 'B+',
  status: 'stable' as const,
  condition: 'Hypertension',
  vitals: {
    bp: '142/92',
    pulse: 78,
    temp: 98.2,
    respRate: 16,
    spo2: 98,
  },
  riskScores: {
    readmission: 35,
    cardiac: 70,
    diabetes: 65,
  },
  allergies: ['Penicillin', 'Aspirin'],
  medications: [
    { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
    { name: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily at night' },
  ],
};

const PatientView = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState<typeof mockPatientData | null>(null);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPatient(mockPatientData);
      setIsLoading(false);
    }, 1000);
  }, [patientId]);
  
  if (isLoading) {
    return (
      <div className="container py-8 animate-pulse">
        <div className="h-36 bg-gray-200 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
          <div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!patient) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Patient Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The patient you're looking for doesn't exist or you don't have permission to view it.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container animate-fade-in">
      <PatientHeader patient={patient} className="mb-6" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="clinical" className="flex-1">Clinical Records</TabsTrigger>
              <TabsTrigger value="new-note" className="flex-1">New Note</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-6 space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                  title="Vital Signs"
                  description="Last recorded: Today, 10:30 AM"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center p-3 rounded-lg border bg-card/50">
                      <Activity className="h-10 w-10 text-rose-500 mr-3" />
                      <div>
                        <div className="text-sm text-muted-foreground">Blood Pressure</div>
                        <div className="text-xl font-semibold">{patient.vitals.bp}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg border bg-card/50">
                      <Heart className="h-10 w-10 text-rose-500 mr-3" />
                      <div>
                        <div className="text-sm text-muted-foreground">Heart Rate</div>
                        <div className="text-xl font-semibold">{patient.vitals.pulse} bpm</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg border bg-card/50">
                      <AlarmClock className="h-10 w-10 text-amber-500 mr-3" />
                      <div>
                        <div className="text-sm text-muted-foreground">Respiratory Rate</div>
                        <div className="text-xl font-semibold">{patient.vitals.respRate} bpm</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg border bg-card/50">
                      <div className="h-10 w-10 flex items-center justify-center text-sky-500 mr-3">
                        <svg fill="currentColor" className="h-8 w-8" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                          <path d="M288 72c-57.4 0-104 46.6-104 104s46.6 104 104 104 104-46.6 104-104S345.4 72 288 72zm0 160c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56zm75.2-161.6L325.6 32c-18.8-12.5-43.5-12.5-62.4 0L225.6 70.4C191.4 95.9 169.8 134 164.1 176H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h100.9c-51.6 183.3 29.6 265.2 164.5 296.7 6.3 1.5 13 1.5 19.2 0 134.8-31.6 216.1-113.5 164.5-296.7H560c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H411.9c-5.7-42-27.3-80.1-61.5-105.6zM288 432c-68.5 0-118.2-38.7-118.9-109.1l57.2-28.6c4-2 6.7-6.2 6.7-10.8 0-6.6-5.4-12-12-12h-84c-6.6 0-12 5.4-12 12v84c0 6.6 5.4 12 12 12 4.6 0 8.8-2.6 10.8-6.7l30.3-60.6c21.3 90.7 97.6 112.5 169.6 93.7 26-6.8 48.2-22.2 63.3-44.3 13.1-19 20.1-42.7 20.1-68.8 0-5.5-4.4-9.9-9.9-9.9-4.9 0-9 3.6-9.8 8.4-2.4 14.1-7.2 28-15.2 39.7-10 14.6-25 26.2-43.7 31.2-43.6 11.7-87.2-3.5-105-54v-7.1l80.8 40.4c4 2 8.8 2 12.8 0l106.4-53.2c4-2 6.7-6.2 6.7-10.8 0-6.6-5.4-12-12-12h-55.3c-3.5 27.3-14.9 47.7-32.9 59.9-21.4 14.5-51 18.7-79.9 8.9-28.1-9.5-49.8-32-57.6-71.6-3.5-17.8.9-36.9 12.8-53.7 11.5-16.2 28.9-28.1 49.9-32.9 40.5-9.4 82.3 9.7 92.1 48 8.5-6.4 18.7-10.5 30.1-10.5 16.5 0 31.3 8.2 40.3 20.7v-35c-19.9-16.8-47.3-19.8-72.8-13.7-52.1 12.1-89.5 64-85.3 116.8z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">SpO2</div>
                        <div className="text-xl font-semibold">{patient.vitals.spo2}%</div>
                      </div>
                    </div>
                  </div>
                </DashboardCard>
                
                <DashboardCard
                  title="Risk Assessment"
                  description="AI-generated risk scores"
                >
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="text-sm font-medium flex items-center">
                          <svg className="h-4 w-4 mr-1.5 text-rose-500" fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                            <path d="M232 116a116 116 0 0 1-228 32.2c0-.1 0-.1 0-.2a52 52 0 0 1 52-52h20a12 12 0 0 1 12 12v24a12 12 0 0 1-12 12h-9.2c9.6 26.5 35 44 63.2 44 38.7 0 70-35.4 70-76a120.2 120.2 0 0 0-1.1-16h-12.7a12 12 0 0 1-12-12V60a12 12 0 0 1 12-12h34a12 12 0 0 1 11.3 8 121.6 121.6 0 0 1 0 60z" />
                          </svg>
                          Cardiac Risk
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold">{patient.riskScores.cardiac}%</span>
                          <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">High</Badge>
                        </div>
                      </div>
                      <Progress value={patient.riskScores.cardiac} className="h-2 bg-gray-100" indicatorClassName="bg-rose-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="text-sm font-medium flex items-center">
                          <svg className="h-4 w-4 mr-1.5 text-amber-500" fill="currentColor" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M544 272h-64V150.627l35.313-35.313c6.249-6.248 6.249-16.379 0-22.627-6.248-6.248-16.379-6.248-22.627 0L457.373 128H417C417 57.26 359.751 0 289 0c-70.74 0-128 57.249-128 128h-42.373L75.314 92.687c-6.248-6.248-16.379-6.248-22.627 0-6.248 6.248-6.248 16.379 0 22.627L96 150.627V272H32c-8.836 0-16 7.163-16 16 0 8.836 7.164 16 16 16h64v24c0 36.634 11.256 70.686 30.484 98.889l-25.797 64.493c-7.997 19.994 18.67 35.561 33.399 19.911l38.551-40.741c19.353 11.29 41.577 18.698 65.363 20.31V352c0-8.837-7.164-16-16-16h-16c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h64v48h-16c-8.837 0-16 7.163-16 16v138.860c23.786-1.612 46.01-9.020 65.363-20.31l38.551 40.741c14.639 15.554 41.566.243 33.399-19.911l-25.796-64.492C398.744 378.686 410 344.634 410 308v-24h64c8.837 0 16-7.164 16-16 0-8.837-7.163-16-16-16zm-128-32V128c0-53.019 42.981-96 96-96 53.019 0 96 42.981 96 96H384zM289 128c-22.056 0-40-17.944-40-40 0-4.411-3.589-8-8-8s-8 3.589-8 8c0 24.766 17.461 45.447 40.618 50.466-8.644 11.335-11.086 25.996-5.478 39.339C273.961 190.307 290.331 200 306.128 200H352v-16c0-30.928-25.072-56-56-56z" />
                          </svg>
                          Diabetes Risk
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold">{patient.riskScores.diabetes}%</span>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>
                        </div>
                      </div>
                      <Progress value={patient.riskScores.diabetes} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="text-sm font-medium flex items-center">
                          <svg className="h-4 w-4 mr-1.5 text-sky-500" fill="currentColor" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M528 224H272c-8.8 0-16 7.2-16 16v144H64V144c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48h512v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V336c0-61.9-50.1-112-112-112zM592 448H64V384h528v64zm286.3-230.6L815 167.3c-9-9-21.2-14.1-33.9-14.1H557.3c-25.6 0-46.3 20.7-46.3 46.3v197c0 25.6 20.7 46.3 46.3 46.3h223.8c12.7 0 24.9-5.1 33.9-14.1l63.3-63.3c9-9 14.1-21.2 14.1-33.9v-76.8c0-12.7-5.1-24.9-14.1-33.9z" />
                          </svg>
                          Readmission Risk
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold">{patient.riskScores.readmission}%</span>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Low</Badge>
                        </div>
                      </div>
                      <Progress value={patient.riskScores.readmission} className="h-2 bg-gray-100" indicatorClassName="bg-sky-500" />
                    </div>
                    
                    <div className="p-3 rounded-md bg-blue-50 border border-blue-100 text-sm flex items-start mt-4">
                      <ThumbsUp className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">
                        AI analysis suggests keeping the patient under observation for possible cardiac issues. 
                        Consider additional tests to rule out coronary artery disease.
                      </span>
                    </div>
                  </div>
                </DashboardCard>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                  title="Medications"
                  description="Current medications and prescriptions"
                >
                  <div className="divide-y">
                    {patient.medications.map((med, i) => (
                      <div key={i} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Pill className="h-5 w-5 text-teal-500 mr-2" />
                            <span className="font-medium">{med.name}</span>
                          </div>
                          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                            Active
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 ml-7">
                          {med.dosage}, {med.frequency}
                        </div>
                      </div>
                    ))}
                    
                    <div className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="font-medium">Lisinopril</span>
                        </div>
                        <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200">
                          Discontinued
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 ml-7">
                        10mg, Once daily (Discontinued 2 weeks ago)
                      </div>
                    </div>
                  </div>
                </DashboardCard>
                
                <DashboardCard
                  title="Allergies & Alerts"
                  description="Important medical alerts"
                >
                  <div className="space-y-3">
                    {patient.allergies.map((allergy, i) => (
                      <div 
                        key={i}
                        className="flex items-start gap-2 p-3 rounded-md bg-rose-50 border border-rose-100 text-sm"
                      >
                        <AlertCircle className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-rose-800">Allergy: {allergy}</span>
                          <p className="text-rose-700 mt-0.5">
                            Patient has reported {allergy === 'Penicillin' ? 'anaphylactic' : 'severe'} reaction.
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex items-start gap-2 p-3 rounded-md bg-amber-50 border border-amber-100 text-sm">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-amber-800">Hypertension Alert</span>
                        <p className="text-amber-700 mt-0.5">
                          Patient has consistently elevated blood pressure readings.
                        </p>
                      </div>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </TabsContent>
            
            <TabsContent value="clinical" className="pt-6 animate-fade-in">
              <DashboardCard
                title="Clinical Timeline"
                description="Complete patient history"
              >
                <ClinicalTimeline patientId={patient.id} />
              </DashboardCard>
            </TabsContent>
            
            <TabsContent value="new-note" className="pt-6 animate-fade-in">
              <SoapNote patientId={patient.id} patientName={patient.name} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <DashboardCard
            title="Lab Results"
            description="Recent laboratory reports"
            className="mb-6"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">HbA1c</TableCell>
                  <TableCell className="text-rose-600 font-medium">6.9%</TableCell>
                  <TableCell className="text-muted-foreground text-sm">&lt;5.7%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Cholesterol</TableCell>
                  <TableCell className="text-amber-600 font-medium">210 mg/dL</TableCell>
                  <TableCell className="text-muted-foreground text-sm">&lt;200 mg/dL</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">LDL</TableCell>
                  <TableCell className="text-amber-600 font-medium">140 mg/dL</TableCell>
                  <TableCell className="text-muted-foreground text-sm">&lt;100 mg/dL</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">HDL</TableCell>
                  <TableCell>42 mg/dL</TableCell>
                  <TableCell className="text-muted-foreground text-sm">&gt;40 mg/dL</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Creatinine</TableCell>
                  <TableCell>0.9 mg/dL</TableCell>
                  <TableCell className="text-muted-foreground text-sm">0.7-1.3 mg/dL</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DashboardCard>
          
          <DashboardCard
            title="Recent Visits"
            description="Past consultations and admissions"
          >
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                  <div className="font-medium">{['Cardiology OPD', 'Emergency Visit', 'General Checkup'][i-1]}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {['2 weeks ago', '1 month ago', '3 months ago'][i-1]} • {['Dr. Rajesh Kapoor', 'Dr. Vikram Mehta', 'Dr. Anjali Singh'][i-1]}
                  </div>
                  <div className="text-sm mt-1">
                    {['Follow-up for hypertension management', 'Severe chest pain, ECG normal', 'Routine annual checkup'][i-1]}
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default PatientView;
