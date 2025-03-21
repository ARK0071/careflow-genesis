
import React, { useState } from 'react';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Users, 
  Clock, 
  Building, 
  Calendar,
  RefreshCw, 
  Download,
  Filter,
  Sparkles
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardCard from '@/components/dashboard/DashboardCard';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HospitalMetricsChart from '@/components/analytics/HospitalMetricsChart';
import PatientFlowMetrics from '@/components/analytics/PatientFlowMetrics';
import DoctorEfficiencyChart from '@/components/analytics/DoctorEfficiencyChart';
import AIInsights from '@/components/analytics/AIInsights';
import KPIMetricCard from '@/components/analytics/KPIMetricCard';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [department, setDepartment] = useState('all');
  
  const refreshAnalytics = () => {
    // Simulated refresh of analytics data
    console.log('Refreshing analytics data...');
  };
  
  return (
    <div className="container animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Hospital Metrics</h1>
            <p className="text-muted-foreground mt-1">Track hospital performance metrics and insights</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Select
              value={dateRange}
              onValueChange={setDateRange}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={department}
              onValueChange={setDepartment}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={refreshAnalytics}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPIMetricCard
            title="Avg. Length of Stay"
            value="4.2 days"
            trend="down"
            trendValue="0.3"
            trendLabel="vs last period"
            icon={<Clock className="h-5 w-5" />}
            description="Average time patients spend in hospital"
          />
          
          <KPIMetricCard
            title="Bed Occupancy"
            value="76%"
            trend="up"
            trendValue="5%"
            trendLabel="vs last period"
            icon={<Building className="h-5 w-5" />}
            description="Current hospital bed utilization"
          />
          
          <KPIMetricCard
            title="Patient Readmissions"
            value="8.1%"
            trend="down"
            trendValue="1.4%"
            trendLabel="vs last period"
            icon={<RefreshCw className="h-5 w-5" />}
            description="30-day readmission rate"
          />
          
          <KPIMetricCard
            title="OPD Consultations"
            value="342"
            trend="up"
            trendValue="12%"
            trendLabel="vs last period"
            icon={<Users className="h-5 w-5" />}
            description="Outpatient visits this week"
          />
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patient-flow">Patient Flow</TabsTrigger>
            <TabsTrigger value="doctor-metrics">Doctor Metrics</TabsTrigger>
            <TabsTrigger value="department">Department Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DashboardCard 
                  title="Hospital Metrics Trends" 
                  description="Performance over time"
                  action={
                    <Select defaultValue="admissions">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admissions">Admissions</SelectItem>
                        <SelectItem value="discharges">Discharges</SelectItem>
                        <SelectItem value="average_stay">Average Stay</SelectItem>
                        <SelectItem value="bed_occupancy">Bed Occupancy</SelectItem>
                      </SelectContent>
                    </Select>
                  }
                >
                  <HospitalMetricsChart dateRange={dateRange} department={department} />
                </DashboardCard>
              </div>
              
              <div>
                <DashboardCard 
                  title="AI-Generated Insights" 
                  description="Actionable recommendations"
                  icon={<Sparkles className="h-5 w-5 text-blue-500" />}
                >
                  <AIInsights />
                </DashboardCard>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="patient-flow" className="pt-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              <DashboardCard 
                title="Patient Flow Efficiency" 
                description="Admission to discharge cycle"
              >
                <PatientFlowMetrics dateRange={dateRange} department={department} />
              </DashboardCard>
            </div>
          </TabsContent>
          
          <TabsContent value="doctor-metrics" className="pt-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              <DashboardCard 
                title="Doctor Efficiency Tracking" 
                description="Patients seen per day and consultation time"
              >
                <DoctorEfficiencyChart dateRange={dateRange} department={department} />
              </DashboardCard>
            </div>
          </TabsContent>
          
          <TabsContent value="department" className="pt-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardCard 
                title="Department Utilization" 
                description="Resource utilization by department"
              >
                <div className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Department analysis view will be implemented soon</p>
                </div>
              </DashboardCard>
              
              <DashboardCard 
                title="Department KPIs" 
                description="Key performance indicators by department"
              >
                <div className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Department KPIs will be implemented soon</p>
                </div>
              </DashboardCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
