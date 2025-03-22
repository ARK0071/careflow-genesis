
import React, { useState } from 'react';
import KPIMetricCard from '@/components/analytics/KPIMetricCard';
import HospitalMetricsChart from '@/components/analytics/HospitalMetricsChart';
import PatientFlowMetrics from '@/components/analytics/PatientFlowMetrics';
import DoctorEfficiencyChart from '@/components/analytics/DoctorEfficiencyChart';
import AIInsights from '@/components/analytics/AIInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart, 
  Activity, 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  BedDouble,
  BadgeIndianRupee,
  Brain
} from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [department, setDepartment] = useState('all');
  
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Hospital performance metrics and insights</p>
        </div>
        
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="general">General Medicine</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <KPIMetricCard 
          title="Total Patients"
          value="1,254"
          // Remove the 'change' property that causes TypeScript errors
          trend="up"
          icon={<Users className="h-5 w-5" />}
        />
        <KPIMetricCard 
          title="Avg. Wait Time"
          value="24 min"
          // Remove the 'change' property that causes TypeScript errors
          trend="down"
          icon={<Clock className="h-5 w-5" />}
        />
        <KPIMetricCard 
          title="Bed Occupancy"
          value="78.2%"
          // Remove the 'change' property that causes TypeScript errors
          trend="up"
          icon={<BedDouble className="h-5 w-5" />}
        />
        <KPIMetricCard 
          title="Revenue"
          value="₹12.4L"
          // Remove the 'change' property that causes TypeScript errors
          trend="up"
          icon={<BadgeIndianRupee className="h-5 w-5" />}
        />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patient Flow</TabsTrigger>
          <TabsTrigger value="doctors">Doctor Efficiency</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <HospitalMetricsChart dateRange={dateRange} department={department} />
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-4">
          <PatientFlowMetrics dateRange={dateRange} department={department} />
        </TabsContent>
        
        <TabsContent value="doctors" className="space-y-4">
          <DoctorEfficiencyChart dateRange={dateRange} department={department} />
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-4">
          <AIInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
