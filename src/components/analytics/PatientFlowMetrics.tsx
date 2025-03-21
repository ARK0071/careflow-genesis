
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface PatientFlowMetricsProps {
  dateRange: string;
  department: string;
}

const PatientFlowMetrics = ({ dateRange, department }: PatientFlowMetricsProps) => {
  const cycleTimeData = [
    { name: 'Admission to Doctor', current: 45, target: 30, unit: 'min' },
    { name: 'Doctor to Diagnosis', current: 120, target: 90, unit: 'min' },
    { name: 'Diagnosis to Treatment', current: 75, target: 60, unit: 'min' },
    { name: 'Treatment to Discharge', current: 180, target: 150, unit: 'min' },
  ];
  
  const waitTimeData = [
    { name: 'Emergency', current: 12, target: 10, unit: 'min' },
    { name: 'OPD', current: 38, target: 20, unit: 'min' },
    { name: 'Radiology', current: 55, target: 40, unit: 'min' },
    { name: 'Laboratory', current: 30, target: 25, unit: 'min' },
    { name: 'Pharmacy', current: 22, target: 15, unit: 'min' },
  ];

  const bottlenecksData = [
    { name: 'Discharge Process', value: 47, issue: 'Administrative delays' },
    { name: 'Lab Results', value: 32, issue: 'Equipment limitations' },
    { name: 'Doctor Rounds', value: 28, issue: 'Staff availability' },
    { name: 'Medication Administration', value: 24, issue: 'Verification process' },
    { name: 'Room Turnover', value: 18, issue: 'Cleaning staff shortage' },
  ];
  
  const chartConfig = {
    current: {
      theme: {
        light: '#0ea5e9',
        dark: '#0ea5e9',
      },
      label: 'Current',
    },
    target: {
      theme: {
        light: '#a1a1aa',
        dark: '#a1a1aa',
      },
      label: 'Target',
    },
    value: {
      theme: {
        light: '#f97316',
        dark: '#f97316',
      },
      label: 'Frequency',
    },
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="cycle-time">
        <TabsList>
          <TabsTrigger value="cycle-time">Cycle Time</TabsTrigger>
          <TabsTrigger value="wait-time">Wait Time</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cycle-time" className="mt-4">
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={cycleTimeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="current" fill="var(--color-current)" name="Current" />
                <Bar dataKey="target" fill="var(--color-target)" name="Target" />
                <Legend />
              </BarChart>
            </ChartContainer>
          </div>
          
          <div className="mt-4 border rounded-md p-4 bg-blue-50 border-blue-100 text-blue-800">
            <h4 className="text-sm font-semibold mb-2">AI Analysis</h4>
            <p className="text-sm">The cycle time from Doctor to Diagnosis is <strong>33%</strong> above target, suggesting process improvement opportunities in diagnostic workflows.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="wait-time" className="mt-4">
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={waitTimeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="current" fill="var(--color-current)" name="Current" />
                <Bar dataKey="target" fill="var(--color-target)" name="Target" />
                <Legend />
              </BarChart>
            </ChartContainer>
          </div>
          
          <div className="mt-4 border rounded-md p-4 bg-amber-50 border-amber-100 text-amber-800">
            <h4 className="text-sm font-semibold mb-2">AI Analysis</h4>
            <p className="text-sm">OPD wait times are <strong>90%</strong> over target. Our AI suggests implementing a staggered appointment system to reduce waiting room congestion.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="bottlenecks" className="mt-4">
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={bottlenecksData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" name="Frequency" />
                <Legend />
              </BarChart>
            </ChartContainer>
          </div>
          
          <div className="mt-4 border rounded-md p-4 bg-red-50 border-red-100 text-red-800">
            <h4 className="text-sm font-semibold mb-2">AI-Identified Bottlenecks</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {bottlenecksData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-white text-red-800 border-red-200">
                    {item.name}
                  </Badge>
                  <span className="text-xs">{item.issue}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientFlowMetrics;
