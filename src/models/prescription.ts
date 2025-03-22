
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  hasInteraction?: boolean;
  interactionDetails?: string;
  timing?: string; // When to take (e.g., before meals)
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  patientAge?: string;
  patientGender?: string;
  doctorId: string;
  doctorName: string;
  clinicName?: string;
  medications: Medication[];
  diagnosis: string;
  vitals?: string;
  createdDate: string;
  notes?: string;
  followUpDate?: string;
  status: 'draft' | 'signed' | 'sent';
  template?: string;
  language?: 'english' | 'hindi' | 'both';
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
    patientAge: '48',
    patientGender: 'M',
    doctorId: 'doc1',
    doctorName: 'Dr. Rajesh Kapoor',
    clinicName: 'Sunshine Medical Center',
    medications: [
      { id: 'rx1', name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', timing: 'Morning' },
      { id: 'rx2', name: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily at bedtime', duration: '30 days' }
    ],
    diagnosis: 'Hypertension, Hyperlipidemia',
    vitals: 'BP 142/88, HR 76, RR 16',
    createdDate: '2023-10-15',
    followUpDate: '2023-11-15',
    status: 'sent',
    template: 'cardiology',
    language: 'english'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Priya Patel',
    patientAge: '36',
    patientGender: 'F',
    doctorId: 'doc1',
    doctorName: 'Dr. Rajesh Kapoor',
    clinicName: 'Sunshine Medical Center',
    medications: [
      { id: 'rx3', name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours as needed', duration: '5 days', timing: 'After meals' },
      { id: 'rx4', name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '7 days', timing: 'At bedtime' }
    ],
    diagnosis: 'Acute upper respiratory infection',
    vitals: 'Temp 99.8°F, BP 110/70, HR 88',
    createdDate: '2023-10-10',
    followUpDate: '2023-10-17',
    status: 'sent',
    template: 'general',
    language: 'both'
  }
];

// Hindi translations for common prescription phrases
export const HINDI_TRANSLATIONS = {
  // Patient info
  'Patient': 'रोगी',
  'Age': 'उम्र',
  'Gender': 'लिंग',
  'Diagnosis': 'निदान',
  'Vitals': 'महत्वपूर्ण लक्षण',
  
  // Medication instructions
  'Take': 'लें',
  'tablet': 'गोली',
  'capsule': 'कैप्सूल',
  'syrup': 'सिरप',
  'injection': 'इंजेक्शन',
  'after meals': 'खाने के बाद',
  'before meals': 'खाने से पहले',
  'with meals': 'खाने के साथ',
  'morning': 'सुबह',
  'afternoon': 'दोपहर',
  'evening': 'शाम',
  'night': 'रात',
  'daily': 'रोज़',
  'twice daily': 'दिन में दो बार',
  'three times a day': 'दिन में तीन बार',
  'four times a day': 'दिन में चार बार',
  'as needed': 'जरूरत पड़ने पर',
  'for': 'के लिए',
  'days': 'दिन',
  'weeks': 'सप्ताह',
  'months': 'महीने',
  
  // Instructions
  'Take with food': 'खाने के साथ लें',
  'Drink plenty of water': 'पर्याप्त पानी पियें',
  'Avoid alcohol': 'शराब से परहेज करें',
  'Store in a cool, dry place': 'ठंडी और सूखी जगह पर रखें',
  'Keep out of reach of children': 'बच्चों की पहुंच से दूर रखें',
  
  // Follow-up
  'Follow-up appointment': 'फॉलो-अप अपॉइंटमेंट',
  'Contact in case of emergency': 'आपातकाल में संपर्क करें',
  'Doctor': 'डॉक्टर',
  'Clinic': 'क्लिनिक',
  'Date': 'तारीख',
  'Signature': 'हस्ताक्षर',
  
  // Common messages
  'Please complete the full course of medication': 'कृपया दवा का पूरा कोर्स पूरा करें',
  'Contact immediately if symptoms worsen': 'लक्षण बिगड़ने पर तुरंत संपर्क करें',
  'Rest and hydration recommended': 'आराम और हाइड्रेशन की सलाह दी जाती है',
  'Digital Prescription': 'डिजिटल प्रिस्क्रिप्शन',
  'Prescription': 'प्रिस्क्रिप्शन',
  'WhatsApp for any concerns': 'किसी भी चिंता के लिए WhatsApp करें',
};

// Simple translation helper function
export const translateToHindi = (text: string): string => {
  return HINDI_TRANSLATIONS[text as keyof typeof HINDI_TRANSLATIONS] || text;
};
