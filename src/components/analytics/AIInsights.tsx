
import React from 'react';
import { Sparkles, ArrowRight, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AIInsights = () => {
  const insights = [
    {
      type: 'efficiency',
      title: 'OPD Bottleneck Detected',
      description: 'Cardiology OPD is experiencing longer wait times (38 min avg) than other departments. Consider adding an additional doctor on Mondays and Wednesdays.',
      impact: 'Could reduce wait times by 40%',
      icon: <Clock className="h-4 w-4 text-amber-500" />,
      severity: 'medium',
    },
    {
      type: 'readmission',
      title: 'Rising Readmission Pattern',
      description: 'Patients discharged from Pulmonology have a 15% higher readmission rate in the last 30 days. Primary reason: incomplete medication adherence.',
      impact: 'Affecting hospital quality metrics',
      icon: <AlertCircle className="h-4 w-4 text-rose-500" />,
      severity: 'high',
    },
    {
      type: 'resource',
      title: 'Staff Scheduling Opportunity',
      description: 'ICU night shift is overstaffed by 2 nurses on weekdays based on current patient load and acuity levels.',
      impact: 'Potential monthly savings: ₹48,000',
      icon: <TrendingUp className="h-4 w-4 text-emerald-500" />,
      severity: 'low',
    },
  ];
  
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 pb-1">
        <Sparkles className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium text-blue-700">AI-Generated Insights</span>
      </div>
      
      {insights.map((insight, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Separator />}
          <div className="py-2">
            <div className="flex items-start">
              <div className={`flex-shrink-0 rounded-full p-1.5 mr-2 
                ${insight.severity === 'high' ? 'bg-rose-100' : 
                  insight.severity === 'medium' ? 'bg-amber-100' : 'bg-emerald-100'}`}
              >
                {insight.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium">{insight.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{insight.description}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium
                    ${insight.severity === 'high' ? 'text-rose-600' : 
                      insight.severity === 'medium' ? 'text-amber-600' : 'text-emerald-600'}`}
                  >
                    {insight.impact}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      
      <div className="pt-2">
        <Button variant="outline" size="sm" className="w-full gap-1 h-8 text-muted-foreground">
          View All Insights
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default AIInsights;
