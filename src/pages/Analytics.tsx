
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  Download, 
  Calendar,
  FileText,
  ClipboardList
} from 'lucide-react';
import KPIMetricCard from '@/components/analytics/KPIMetricCard';
import HospitalMetricsChart from '@/components/analytics/HospitalMetricsChart';
import PatientFlowMetrics from '@/components/analytics/PatientFlowMetrics';
import DoctorEfficiencyChart from '@/components/analytics/DoctorEfficiencyChart';
import AIInsights from '@/components/analytics/AIInsights';
import DashboardCard from '@/components/dashboard/DashboardCard';

const Analytics = () => {
  return (
    <div className="container py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Hospital Metrics</h1>
          <p className="text-muted-foreground mt-1">
            Key performance indicators and insights for hospital management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <KPIMetricCard
          title="Average Length of Stay"
          value="3.2 days"
          trend="down"
          trendValue="8%"
          trendLabel="vs last month"
          icon={<Users className="h-5 w-5 text-primary" />}
          description="Average time patients spend in the hospital"
        />
        
        <KPIMetricCard
          title="Patient Satisfaction"
          value="92%"
          trend="up"
          trendValue="3%"
          trendLabel="vs last month"
          icon={<Activity className="h-5 w-5 text-primary" />}
          description="Based on post-discharge surveys"
        />
        
        <KPIMetricCard
          title="Bed Occupancy Rate"
          value="78%"
          trend="up"
          trendValue="5%"
          trendLabel="vs last month"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          description="Current hospital capacity utilization"
        />
        
        <KPIMetricCard
          title="Readmission Rate"
          value="4.1%"
          trend="down"
          trendValue="1.2%"
          trendLabel="vs last month"
          icon={<AlertCircle className="h-5 w-5 text-primary" />}
          description="30-day patient readmissions"
        />
      </div>

      <Tabs defaultValue="hospital" className="w-full mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="hospital">Hospital Metrics</TabsTrigger>
          <TabsTrigger value="patient">Patient Flow</TabsTrigger>
          <TabsTrigger value="doctor">Doctor Efficiency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hospital" className="mt-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Hospital Metrics Trends</CardTitle>
              <CardDescription>Key indicators over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <HospitalMetricsChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patient" className="mt-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Patient Flow Metrics</CardTitle>
              <CardDescription>Admission to discharge cycle analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <PatientFlowMetrics />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="doctor" className="mt-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Doctor Efficiency Tracking</CardTitle>
              <CardDescription>Patients seen and documentation time</CardDescription>
            </CardHeader>
            <CardContent>
              <DoctorEfficiencyChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard
            title="AI-Generated Hospital Insights"
            description="Data-driven recommendations for operational improvements"
          >
            <AIInsights />
          </DashboardCard>
        </div>
        
        <div className="space-y-6">
          <DashboardCard
            title="Top Departments by Patient Volume"
            description="Last 30 days activity"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-8 bg-blue-500 rounded-sm mr-3"></div>
                  <div>
                    <h4 className="font-medium">General Medicine</h4>
                    <p className="text-sm text-muted-foreground">152 patients</p>
                  </div>
                </div>
                <span className="text-blue-600 font-medium">27%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-8 bg-emerald-500 rounded-sm mr-3"></div>
                  <div>
                    <h4 className="font-medium">Cardiology</h4>
                    <p className="text-sm text-muted-foreground">98 patients</p>
                  </div>
                </div>
                <span className="text-emerald-600 font-medium">18%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-8 bg-amber-500 rounded-sm mr-3"></div>
                  <div>
                    <h4 className="font-medium">Orthopedics</h4>
                    <p className="text-sm text-muted-foreground">87 patients</p>
                  </div>
                </div>
                <span className="text-amber-600 font-medium">16%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-8 bg-purple-500 rounded-sm mr-3"></div>
                  <div>
                    <h4 className="font-medium">Pediatrics</h4>
                    <p className="text-sm text-muted-foreground">64 patients</p>
                  </div>
                </div>
                <span className="text-purple-600 font-medium">12%</span>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Recent Documents"
            description="Latest clinical documentation"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium text-sm">Discharge Summary</h4>
                  <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer">
                <ClipboardList className="h-5 w-5 text-emerald-500" />
                <div>
                  <h4 className="font-medium text-sm">Quarterly Staff Report</h4>
                  <p className="text-xs text-muted-foreground">Yesterday, 4:15 PM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer">
                <FileText className="h-5 w-5 text-amber-500" />
                <div>
                  <h4 className="font-medium text-sm">Monthly Metrics Summary</h4>
                  <p className="text-xs text-muted-foreground">Oct 1, 2023</p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
