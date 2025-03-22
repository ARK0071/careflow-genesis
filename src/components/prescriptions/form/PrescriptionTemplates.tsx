
import React from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PRESCRIPTION_TEMPLATES } from '@/models/prescription';
import { cn } from '@/lib/utils';

interface PrescriptionTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const PrescriptionTemplates: React.FC<PrescriptionTemplatesProps> = ({ 
  selectedTemplate, 
  onSelectTemplate 
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {PRESCRIPTION_TEMPLATES.map((template) => (
        <Card key={template.id} className={cn(selectedTemplate === template.id ? "border-primary" : "")}>
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button 
              variant={selectedTemplate === template.id ? "default" : "outline"} 
              onClick={() => onSelectTemplate(template.id)}
              className="w-full"
            >
              {selectedTemplate === template.id ? "Selected" : "Use Template"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PrescriptionTemplates;
