
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  hasInteraction?: boolean;
  interactionDetails?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  medications: Medication[];
  diagnosis: string;
  createdDate: string;
  notes?: string;
  status: 'draft' | 'signed' | 'sent';
  template?: string;
}

export const PRESCRIPTION_TEMPLATES = [
  { id: 'general', name: 'General Practice', description: 'Standard prescription template for general consultations' },
  { id: 'cardiology', name: 'Cardiology', description: 'Template with common cardiac medications and follow-up instructions' },
  { id: 'nephrology', name: 'Nephrology', description: 'Specialized for kidney-related conditions with dosage adjustments' },
  { id: 'pediatrics', name: 'Pediatrics', description: 'Age-appropriate dosing and child-friendly instructions' },
  { id: 'orthopedics', name: 'Orthopedics', description: 'Template with pain management and physical therapy instructions' },
];

// Mock medications database with some common medications
export const MEDICATIONS_DATABASE = [
  // Cardiology medications
  { id: 'med1', name: 'Atorvastatin', category: 'cardiology' },
  { id: 'med2', name: 'Metoprolol', category: 'cardiology' },
  { id: 'med3', name: 'Amlodipine', category: 'cardiology' },
  { id: 'med4', name: 'Lisinopril', category: 'cardiology' },
  
  // Nephrology medications
  { id: 'med5', name: 'Furosemide', category: 'nephrology' },
  { id: 'med6', name: 'Spironolactone', category: 'nephrology' },
  
  // General medications
  { id: 'med7', name: 'Paracetamol', category: 'general' },
  { id: 'med8', name: 'Ibuprofen', category: 'general' },
  { id: 'med9', name: 'Amoxicillin', category: 'general' },
  { id: 'med10', name: 'Cetirizine', category: 'general' },
  
  // With interactions
  { id: 'med11', name: 'Warfarin', category: 'cardiology', hasInteractions: true },
  { id: 'med12', name: 'Ciprofloxacin', category: 'general', hasInteractions: true },
];

// Function to check for medication interactions (simplified mock)
export const checkInteractions = (medications: string[]): { hasInteraction: boolean, details?: string } => {
  // Mock interaction checking
  if (medications.includes('Warfarin') && medications.includes('Ibuprofen')) {
    return {
      hasInteraction: true,
      details: 'Warfarin + Ibuprofen: Increased risk of bleeding. Consider alternative pain reliever.'
    };
  }
  
  if (medications.includes('Lisinopril') && medications.includes('Spironolactone')) {
    return {
      hasInteraction: true,
      details: 'Lisinopril + Spironolactone: Monitor for hyperkalemia. Consider reducing dosage.'
    };
  }
  
  return { hasInteraction: false };
};

// Mock prescriptions data
export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Anil Sharma',
    doctorId: 'doc1',
    doctorName: 'Dr. Rajesh Kapoor',
    medications: [
      { id: 'rx1', name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' },
      { id: 'rx2', name: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily at bedtime', duration: '30 days' }
    ],
    diagnosis: 'Hypertension, Hyperlipidemia',
    createdDate: '2023-10-15',
    status: 'sent',
    template: 'cardiology'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Priya Patel',
    doctorId: 'doc1',
    doctorName: 'Dr. Rajesh Kapoor',
    medications: [
      { id: 'rx3', name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours as needed', duration: '5 days' },
      { id: 'rx4', name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '7 days' }
    ],
    diagnosis: 'Acute upper respiratory infection',
    createdDate: '2023-10-10',
    status: 'sent',
    template: 'general'
  }
];
