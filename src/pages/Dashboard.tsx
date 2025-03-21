
import React from 'react';
import { 
  Users, 
  CalendarClock, 
  BedDouble, 
  Activity, 
  FileText,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import StatCard from '@/components/dashboard/StatCard';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PatientList from '@/components/dashboard/PatientList';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Welcome, Dr. Rajesh</h1>
          <p className="text-muted-foreground mt-1">
            Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate('/appointments/new')}
          >
            <CalendarClock className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
          <Button 
            variant="default"
            className="bg-clinical text-clinical-foreground hover:bg-clinical/90"
            onClick={() => navigate('/patients/new')}
          >
            <Users className="mr-2 h-4 w-4" />
            New Patient
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Patients" 
          value="142" 
          icon={<Users className="h-4 w-4" />}
          change={{ value: 12, isPositive: true }}
          tooltipText="Total number of active patients under your care"
          iconClassName="bg-blue-50 text-blue-500"
        />
        <StatCard 
          title="Today's Appointments" 
          value="8" 
          icon={<CalendarClock className="h-4 w-4" />}
          change={{ value: 2, isPositive: true }}
          tooltipText="Scheduled appointments for today"
          iconClassName="bg-indigo-50 text-indigo-500"
        />
        <StatCard 
          title="Bed Occupancy" 
          value="87%" 
          icon={<BedDouble className="h-4 w-4" />}
          change={{ value: 5, isPositive: false }}
          tooltipText="Current bed occupancy rate in your department"
          iconClassName="bg-emerald-50 text-emerald-500"
        />
        <StatCard 
          title="Critical Patients" 
          value="3" 
          icon={<Activity className="h-4 w-4" />}
          change={{ value: 1, isPositive: false }}
          tooltipText="Patients requiring critical care attention"
          iconClassName="bg-rose-50 text-rose-500"
        />
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2 space-y-6">
          <DashboardCard 
            title="Recent Patients"
            footer={
              <Button 
                variant="ghost" 
                className="w-full mt-2 text-primary"
                onClick={() => navigate('/patients')}
              >
                View All Patients <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            }
          >
            <PatientList showViewAll={false} />
          </DashboardCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Today's Schedule">
              <div className="space-y-3">
                {[1, 2, 3].map((_, i) => (
                  <Card key={i} className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">
                          {['Cardiology Consultation', 'Follow-up Checkup', 'Pre-op Assessment'][i]}
                        </div>
                        <div className="text-sm text-muted-foreground mt-0.5">
                          {['10:30 AM', '2:00 PM', '4:30 PM'][i]} • {['Anil Sharma', 'Priya Patel', 'Rahul Verma'][i]}
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
                        {['In 30m', 'In 4h', 'In 6h'][i]}
                      </Badge>
                    </div>
                  </Card>
                ))}
                <Button variant="ghost" className="w-full text-primary">
                  View Full Schedule <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Department Status">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="text-sm font-medium">ICU Capacity</div>
                    <div className="text-sm">92%</div>
                  </div>
                  <Progress value={92} className="h-2 bg-gray-100" indicatorClassName="bg-rose-500" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="text-sm font-medium">General Ward</div>
                    <div className="text-sm">78%</div>
                  </div>
                  <Progress value={78} className="h-2 bg-gray-100" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="text-sm font-medium">OPD Load</div>
                    <div className="text-sm">65%</div>
                  </div>
                  <Progress value={65} className="h-2 bg-gray-100" indicatorClassName="bg-emerald-500" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="text-sm font-medium">Operating Rooms</div>
                    <div className="text-sm">85%</div>
                  </div>
                  <Progress value={85} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
                </div>
                
                <div className="pt-2">
                  <Tabs defaultValue="alerts">
                    <TabsList className="w-full">
                      <TabsTrigger value="alerts" className="flex-1">Alerts</TabsTrigger>
                      <TabsTrigger value="capacity" className="flex-1">Capacity</TabsTrigger>
                    </TabsList>
                    <TabsContent value="alerts" className="pt-2">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 p-2 rounded-md bg-rose-50 text-rose-800 text-sm">
                          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span>ICU approaching full capacity (92%)</span>
                        </div>
                        <div className="flex items-start gap-2 p-2 rounded-md bg-amber-50 text-amber-800 text-sm">
                          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span>Staff shortage in General Ward</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="capacity" className="pt-2">
                      <div className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>Available ICU Beds:</span>
                          <span className="font-medium">1/12</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Available General Beds:</span>
                          <span className="font-medium">18/82</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Available Operating Rooms:</span>
                          <span className="font-medium">2/8</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </DashboardCard>
          </div>
          
          <DashboardCard 
            title="Recent Documents"
            description="Clinical notes, prescriptions, and documents"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card 
                  key={i} 
                  className="p-4 hover:shadow-sm transition-all cursor-pointer hover:border-clinical/40"
                  onClick={() => alert(`Opening document ${i}`)}
                >
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-clinical" />
                    <div>
                      <div className="font-medium">
                        {
                          ['Progress Note', 'Prescription', 'Lab Report', 
                           'Discharge Summary', 'Radiology Report', 'Consultation Note'][i-1]
                        }
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {`${i} ${i === 1 ? 'hour' : 'hours'} ago`} • {['Anil Sharma', 'Priya Patel', 'Suresh Kumar', 'Deepa Reddy', 'Rahul Verma', 'Meena Devi'][i-1]}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DashboardCard>
        </div>
        
        <div className="space-y-6">
          <DashboardCard 
            title="Activity Feed" 
            description="Recent updates and notifications"
            className="h-full"
          >
            <ActivityFeed />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
