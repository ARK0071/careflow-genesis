
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface HospitalMetricsChartProps {
  dateRange: string;
  department: string;
}

const HospitalMetricsChart = ({ dateRange, department }: HospitalMetricsChartProps) => {
  // Generate mock data based on date range and department
  const data = generateMockData(dateRange, department);
  
  const chartConfig = {
    admissions: {
      theme: {
        light: '#0ea5e9',
        dark: '#0ea5e9',
      },
      label: 'Admissions',
    },
    discharges: {
      theme: {
        light: '#10b981',
        dark: '#10b981',
      },
      label: 'Discharges',
    },
    emergencies: {
      theme: {
        light: '#f97316',
        dark: '#f97316',
      },
      label: 'Emergencies',
    },
    outpatients: {
      theme: {
        light: '#8b5cf6',
        dark: '#8b5cf6',
      },
      label: 'Outpatients',
    },
  };
  
  return (
    <div className="h-80 w-full">
      <ChartContainer
        config={chartConfig}
        className="h-full"
      >
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="admissions" stroke="var(--color-admissions)" fill="var(--color-admissions)" fillOpacity={0.3} />
          <Area type="monotone" dataKey="discharges" stroke="var(--color-discharges)" fill="var(--color-discharges)" fillOpacity={0.3} />
          <Area type="monotone" dataKey="emergencies" stroke="var(--color-emergencies)" fill="var(--color-emergencies)" fillOpacity={0.3} />
          <Area type="monotone" dataKey="outpatients" stroke="var(--color-outpatients)" fill="var(--color-outpatients)" fillOpacity={0.3} />
          <Legend />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

// Helper function to generate mock data based on dateRange and department
function generateMockData(dateRange: string, department: string) {
  const daysInRange = dateRange === '7d' 
    ? 7 
    : dateRange === '30d' 
      ? 30 
      : dateRange === '90d' 
        ? 90 
        : 365;
  
  const data = [];
  const now = new Date();
  
  // Generate data points for each day
  for (let i = daysInRange; i > 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Base values
    let baseFactor = 1.0;
    
    // Department affects the volume
    if (department !== 'all') {
      // Each department has different patterns
      if (department === 'emergency') baseFactor = 1.3;
      if (department === 'cardiology') baseFactor = 0.8;
      if (department === 'orthopedics') baseFactor = 0.9;
      if (department === 'neurology') baseFactor = 0.7;
      if (department === 'pediatrics') baseFactor = 1.1;
    }
    
    // Day of week affects volume (weekends lower)
    const dayOfWeek = date.getDay();
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1.0;
    
    // Random factor for natural variation
    const randomFactor = 0.8 + Math.random() * 0.4;
    
    // Seasonal trend (higher in winter months)
    const month = date.getMonth();
    const winterFactor = (month >= 10 || month <= 2) ? 1.2 : 1.0;
    
    // Calculate metrics with factors applied
    const factor = baseFactor * weekendFactor * randomFactor * winterFactor;
    
    // Format date for display
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    
    data.push({
      date: formattedDate,
      admissions: Math.round(25 * factor),
      discharges: Math.round(23 * factor),
      emergencies: Math.round(12 * factor),
      outpatients: Math.round(75 * factor),
    });
  }
  
  return data;
}

export default HospitalMetricsChart;
