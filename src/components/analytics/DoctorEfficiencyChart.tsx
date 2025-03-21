
import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface DoctorEfficiencyChartProps {
  dateRange: string;
  department: string;
}

interface DoctorData {
  name: string;
  patientsPerDay: number;
  avgConsultTime: number;
  department: string;
  efficiency: 'high' | 'medium' | 'low';
  specialization: string;
}

const doctorEfficiencyData: DoctorData[] = [
  { name: 'Dr. Sharma', patientsPerDay: 28, avgConsultTime: 12, department: 'cardiology', efficiency: 'high', specialization: 'Interventional Cardiology' },
  { name: 'Dr. Patel', patientsPerDay: 24, avgConsultTime: 15, department: 'cardiology', efficiency: 'medium', specialization: 'Non-invasive Cardiology' },
  { name: 'Dr. Reddy', patientsPerDay: 18, avgConsultTime: 22, department: 'neurology', efficiency: 'medium', specialization: 'General Neurology' },
  { name: 'Dr. Gupta', patientsPerDay: 32, avgConsultTime: 8, department: 'emergency', efficiency: 'high', specialization: 'Emergency Medicine' },
  { name: 'Dr. Singh', patientsPerDay: 15, avgConsultTime: 25, department: 'neurology', efficiency: 'low', specialization: 'Neurophysiology' },
  { name: 'Dr. Kumar', patientsPerDay: 22, avgConsultTime: 14, department: 'orthopedics', efficiency: 'medium', specialization: 'Joint Replacement' },
  { name: 'Dr. Agarwal', patientsPerDay: 12, avgConsultTime: 30, department: 'orthopedics', efficiency: 'low', specialization: 'Spine Surgery' },
  { name: 'Dr. Joshi', patientsPerDay: 26, avgConsultTime: 10, department: 'pediatrics', efficiency: 'high', specialization: 'General Pediatrics' },
  { name: 'Dr. Mehta', patientsPerDay: 20, avgConsultTime: 18, department: 'pediatrics', efficiency: 'medium', specialization: 'Neonatology' },
  { name: 'Dr. Verma', patientsPerDay: 16, avgConsultTime: 20, department: 'emergency', efficiency: 'medium', specialization: 'Trauma' },
];

const DoctorEfficiencyChart = ({ dateRange, department }: DoctorEfficiencyChartProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  
  // Filter data based on department
  const filteredData = department === 'all' 
    ? doctorEfficiencyData 
    : doctorEfficiencyData.filter(doc => doc.department === department);
  
  const getEfficiencyColor = (efficiency: 'high' | 'medium' | 'low') => {
    return efficiency === 'high' 
      ? '#10b981' // green
      : efficiency === 'medium' 
        ? '#f59e0b' // amber
        : '#ef4444'; // red
  };
  
  const getEfficiencyBadge = (efficiency: 'high' | 'medium' | 'low') => {
    return (
      <Badge variant="outline" className={`
        ${efficiency === 'high' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : ''}
        ${efficiency === 'medium' ? 'bg-amber-50 text-amber-800 border-amber-200' : ''}
        ${efficiency === 'low' ? 'bg-red-50 text-red-800 border-red-200' : ''}
      `}>
        {efficiency === 'high' ? 'High' : efficiency === 'medium' ? 'Medium' : 'Low'}
      </Badge>
    );
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="chart">
        <TabsList>
          <TabsTrigger value="chart">Efficiency Chart</TabsTrigger>
          <TabsTrigger value="table">Efficiency Table</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart" className="mt-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  type="number" 
                  dataKey="avgConsultTime" 
                  name="Avg. Consult Time" 
                  unit="min"
                  label={{ value: 'Avg. Consultation Time (min)', position: 'bottom', offset: 0 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="patientsPerDay" 
                  name="Patients Per Day"
                  label={{ value: 'Patients Per Day', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as DoctorData;
                      return (
                        <div className="rounded-lg border bg-card shadow-md p-2 text-sm">
                          <p className="font-semibold">{data.name}</p>
                          <p>Patients: {data.patientsPerDay} per day</p>
                          <p>Consult Time: {data.avgConsultTime} min</p>
                          <p>Specialization: {data.specialization}</p>
                          <div className="mt-1 flex items-center gap-2">
                            Efficiency: {getEfficiencyBadge(data.efficiency)}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Doctors" data={filteredData} fill="#8884d8">
                  {filteredData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getEfficiencyColor(entry.efficiency)}
                      stroke="#fff"
                      strokeWidth={1}
                      r={selectedDoctor === entry.name ? 8 : 6}
                      cursor="pointer"
                      onClick={() => setSelectedDoctor(
                        selectedDoctor === entry.name ? null : entry.name
                      )}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-1 border rounded-md p-4 bg-emerald-50 border-emerald-100 text-emerald-800">
              <h4 className="text-sm font-semibold mb-1">High Efficiency</h4>
              <p className="text-xs">Doctors who see many patients with appropriate consultation times.</p>
            </div>
            
            <div className="col-span-1 border rounded-md p-4 bg-amber-50 border-amber-100 text-amber-800">
              <h4 className="text-sm font-semibold mb-1">Medium Efficiency</h4>
              <p className="text-xs">Balanced number of patients and consultation duration.</p>
            </div>
            
            <div className="col-span-1 border rounded-md p-4 bg-red-50 border-red-100 text-red-800">
              <h4 className="text-sm font-semibold mb-1">Low Efficiency</h4>
              <p className="text-xs">Long consultation times with fewer patients per day.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="table" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead className="text-right">Patients/Day</TableHead>
                  <TableHead className="text-right">Avg Time (min)</TableHead>
                  <TableHead>Efficiency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((doc) => (
                  <TableRow key={doc.name}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>{doc.specialization}</TableCell>
                    <TableCell className="text-right">{doc.patientsPerDay}</TableCell>
                    <TableCell className="text-right">{doc.avgConsultTime}</TableCell>
                    <TableCell>{getEfficiencyBadge(doc.efficiency)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 border rounded-md p-4 bg-blue-50 border-blue-100 text-blue-800">
            <h4 className="text-sm font-semibold mb-2">AI Analysis</h4>
            <p className="text-sm">Doctors who maintain a balance of 18-24 patients per day with 12-18 minute consultations have the best patient satisfaction while maintaining good efficiency.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorEfficiencyChart;
