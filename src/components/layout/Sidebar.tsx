
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ClipboardList, 
  FileText, 
  Pill, 
  HeartPulse, 
  Settings,
  BarChart3,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Beaker
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: number;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon, label, to, badge, isCollapsed }: SidebarItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          "flex items-center px-3 py-2 rounded-lg transition-all duration-200 group",
          isActive 
            ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )
      }
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <span className="mr-3 flex-shrink-0">{icon}</span>
          {!isCollapsed && (
            <span className="whitespace-nowrap transition-opacity duration-200">
              {label}
            </span>
          )}
        </div>
        {!isCollapsed && badge && (
          <Badge variant="outline" className="bg-alert/10 text-alert-foreground ml-auto">
            {badge}
          </Badge>
        )}
      </div>
    </NavLink>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />
      
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-sidebar pt-16 flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-20"
        )}
      >
        <div className="absolute right-0 top-20 transform translate-x-1/2 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-6 w-6 rounded-full border border-sidebar-border bg-background shadow-sm hidden lg:flex"
          >
            {isOpen ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
        </div>
        
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <SidebarItem 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            label="Dashboard" 
            to="/" 
            isCollapsed={!isOpen} 
          />
          <SidebarItem 
            icon={<Users className="h-5 w-5" />} 
            label="Patients" 
            to="/patients" 
            badge={12}
            isCollapsed={!isOpen} 
          />
          <SidebarItem 
            icon={<Calendar className="h-5 w-5" />} 
            label="Appointments" 
            to="/appointments" 
            isCollapsed={!isOpen} 
          />
          <SidebarItem 
            icon={<ClipboardList className="h-5 w-5" />} 
            label="Clinical Records" 
            to="/clinical" 
            isCollapsed={!isOpen} 
          />
          <SidebarItem 
            icon={<Beaker className="h-5 w-5" />} 
            label="Lab & Tests" 
            to="/lab-test" 
            badge={3}
            isCollapsed={!isOpen} 
          />
          <SidebarItem 
            icon={<Pill className="h-5 w-5" />} 
            label="E-Prescriptions" 
            to="/prescriptions" 
            isCollapsed={!isOpen} 
          />
          <SidebarItem 
            icon={<HeartPulse className="h-5 w-5" />} 
            label="Vitals" 
            to="/vitals" 
            isCollapsed={!isOpen} 
          />
          <SidebarItem 
            icon={<FileText className="h-5 w-5" />} 
            label="Documents" 
            to="/documents" 
            isCollapsed={!isOpen} 
          />
          
          <Separator className="my-4 bg-sidebar-border/60" />
          
          <SidebarItem 
            icon={<BarChart3 className="h-5 w-5" />} 
            label="Analytics" 
            to="/analytics" 
            isCollapsed={!isOpen} 
          />
          <SidebarItem 
            icon={<MessageSquare className="h-5 w-5" />} 
            label="Messages" 
            to="/messages" 
            badge={5}
            isCollapsed={!isOpen} 
          />
        </div>
        
        <div className="p-3 mt-auto border-t border-sidebar-border/60">
          <SidebarItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
            to="/settings" 
            isCollapsed={!isOpen} 
          />
          <SidebarItem 
            icon={<HelpCircle className="h-5 w-5" />} 
            label="Help & Support" 
            to="/help" 
            isCollapsed={!isOpen} 
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
