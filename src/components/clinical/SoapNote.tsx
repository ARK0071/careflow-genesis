import React, { useState } from 'react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Sparkles, Save, Copy, Clock, Ban } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SoapNoteProps {
  patientId: string;
  patientName: string;
  onSave?: (data: any) => void;
  className?: string;
}

const SoapNote = ({ patientId, patientName, onSave, className }: SoapNoteProps) => {
  const [activeTab, setActiveTab] = useState('soap');
  const [isSaving, setIsSaving] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  
  const form = useForm({
    defaultValues: {
      subjective: '',
      objective: '',
      assessment: '',
      plan: '',
      chiefComplaint: '',
      diagnosisCodes: '',
      followupNotes: '',
      medicationNotes: '',
    },
  });
  
  const handleSave = (data: any) => {
    setIsSaving(true);
    
    setTimeout(() => {
      console.log('Saving note:', data);
      
      if (onSave) {
        onSave(data);
      }
      
      toast.success('Clinical note saved successfully');
      setIsSaving(false);
    }, 1500);
  };
  
  const generateWithAI = (section: 'subjective' | 'objective' | 'assessment' | 'plan') => {
    setAiGenerating(true);
    
    setTimeout(() => {
      let generatedText = '';
      
      switch (section) {
        case 'subjective':
          generatedText = '48-year-old male presenting with a 3-day history of chest pain. Pain is described as pressure-like, intermittent, and worsening with exertion. Patient reports mild shortness of breath during episodes. No radiation to arm or jaw. No associated nausea, vomiting, or diaphoresis. Reports high stress at work recently. Has history of hypertension.';
          break;
        case 'objective':
          generatedText = 'Vitals: BP 142/92, HR 78, RR 16, Temp 98.2°F, SpO2 98% on RA\nPhysical Exam: Alert and oriented. Lungs clear to auscultation bilaterally. Heart RRR, no murmurs/gallops/rubs. No JVD or peripheral edema. Abdomen soft, non-tender.\nECG: Normal sinus rhythm, no ST changes.\nLabs: Troponin negative, CMP within normal limits except mild hyperglycemia (fasting glucose 126 mg/dL).';
          break;
        case 'assessment':
          generatedText = '1. Chest pain, likely musculoskeletal vs. early coronary artery disease, given risk factors of hypertension and stress\n2. Hypertension, inadequately controlled\n3. Impaired fasting glucose, likely prediabetes';
          break;
        case 'plan':
          generatedText = '1. Follow up with stress test to rule out cardiac etiology\n2. Increase amlodipine from 5mg to 10mg daily for better BP control\n3. Lifestyle modifications: DASH diet, moderate exercise program starting with 20 min walking daily\n4. HbA1c to evaluate for diabetes\n5. Schedule follow-up in 2 weeks to review stress test results';
          break;
      }
      
      form.setValue(section, generatedText);
      setAiGenerating(false);
      toast.success(`Generated ${section} content with AI`);
    }, 2000);
  };
  
  return (
    <div className={cn(className)}>
      <Card className="border-clinical/30">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <CardTitle className="text-lg">New Clinical Note</CardTitle>
              <CardDescription>
                For {patientName} • {new Date().toLocaleDateString()}
              </CardDescription>
            </div>
            <Badge 
              variant="outline" 
              className="bg-clinical-muted text-clinical-muted-foreground border-clinical/20"
            >
              <Clock className="mr-1 h-3 w-3" />
              Draft
            </Badge>
          </div>
        </CardHeader>
        
        <Tabs defaultValue="soap" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="soap" className="flex-1 sm:flex-none">SOAP Note</TabsTrigger>
              <TabsTrigger value="additional" className="flex-1 sm:flex-none">Additional Info</TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 mt-2">
                <TabsContent value="soap" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="subjective"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-base">Subjective</FormLabel>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs gap-1 text-clinical"
                            onClick={() => generateWithAI('subjective')}
                            disabled={aiGenerating}
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            Generate with AI
                          </Button>
                        </div>
                        <FormDescription>
                          Patient's reported symptoms and concerns
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Enter patient's subjective information, history, symptoms, complaints..."
                            className="min-h-[100px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="objective"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-base">Objective</FormLabel>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs gap-1 text-clinical"
                            onClick={() => generateWithAI('objective')}
                            disabled={aiGenerating}
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            Generate with AI
                          </Button>
                        </div>
                        <FormDescription>
                          Physical examination findings, vital signs, test results
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Enter objective data, vitals, physical examination findings, lab results..."
                            className="min-h-[100px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="assessment"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-base">Assessment</FormLabel>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs gap-1 text-clinical"
                            onClick={() => generateWithAI('assessment')}
                            disabled={aiGenerating}
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            Generate with AI
                          </Button>
                        </div>
                        <FormDescription>
                          Medical diagnosis and clinical impression
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Enter assessment, diagnoses, differential diagnoses..."
                            className="min-h-[100px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-base">Plan</FormLabel>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs gap-1 text-clinical"
                            onClick={() => generateWithAI('plan')}
                            disabled={aiGenerating}
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            Generate with AI
                          </Button>
                        </div>
                        <FormDescription>
                          Treatment plan, medications, follow-up instructions
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Enter treatment plan, medications, follow-up schedule, patient education..."
                            className="min-h-[100px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="additional" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="chiefComplaint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chief Complaint</FormLabel>
                        <FormControl>
                          <Input placeholder="Primary reason for visit" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="diagnosisCodes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis Codes (ICD-10)</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., I10, E11.9" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="followupNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follow-up Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Details for follow-up care, referrals..."
                            className="min-h-[80px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="medicationNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medication Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Additional notes about medications, dosage adjustments..."
                            className="min-h-[80px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <Separator />
                
                <CardFooter className="px-0 pb-0 pt-2 flex flex-wrap justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="bg-clinical text-clinical-foreground hover:bg-clinical/90"
                    >
                      {isSaving ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Note
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline">
                      <Copy className="mr-2 h-4 w-4" />
                      Save as Template
                    </Button>
                  </div>
                  <Button type="button" variant="ghost" className="text-muted-foreground">
                    <Ban className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default SoapNote;
