import React from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface DashboardOverviewProps {
  userRole: 'manager' | 'salesman' | 'customer-service';
}

export default function DashboardOverview({ userRole }: DashboardOverviewProps) {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (userRole) {
      case 'manager':
        return [
          { label: 'Total Sales', value: '$125,430', change: '+12.5%', icon: DollarSign, color: 'green' },
          { label: 'Active Deals', value: '48', change: '+5', icon: Briefcase, color: 'blue' },
          { label: 'Team Performance', value: '87%', change: '+3.2%', icon: TrendingUp, color: 'purple' },
          { label: 'Active Users', value: '156', change: '+12', icon: Users, color: 'orange' },
        ];
      case 'salesman':
        return [
          { label: 'My Sales', value: '$18,430', change: '+8.5%', icon: DollarSign, color: 'green' },
          { label: 'Active Deals', value: '12', change: '+2', icon: Briefcase, color: 'blue' },
          { label: 'Target Progress', value: '64%', change: '+5%', icon: Target, color: 'purple' },
          { label: 'This Month', value: '32/50', change: 'deals', icon: Calendar, color: 'orange' },
        ];
      case 'customer-service':
        return [
          { label: 'Support Cases', value: '23', change: '+4', icon: AlertTriangle, color: 'orange' },
          { label: 'Resolved Today', value: '15', change: '+3', icon: CheckCircle, color: 'green' },
          { label: 'Pending', value: '8', change: '-2', icon: Clock, color: 'yellow' },
          { label: 'Customer Satisfaction', value: '94%', change: '+2%', icon: TrendingUp, color: 'purple' },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    
    switch (userRole) {
      case 'manager':
        return `${greeting}, ${user?.name}! Here's your team's performance overview.`;
      case 'salesman':
        return `${greeting}, ${user?.name}! Ready to close some deals today?`;
      case 'customer-service':
        return `${greeting}, ${user?.name}! Let's help our customers succeed.`;
      default:
        return `${greeting}, ${user?.name}!`;
    }
  };

  const getRecentActivities = () => {
    switch (userRole) {
      case 'manager':
        return [
          { type: 'success', message: 'New deal closed by Mike Salesman', time: '5 min ago' },
          { type: 'info', message: 'Weekly report generated', time: '1 hour ago' },
          { type: 'warning', message: 'Target review needed for Q1', time: '2 hours ago' },
          { type: 'success', message: 'New customer onboarded', time: '3 hours ago' },
        ];
      case 'salesman':
        return [
          { type: 'success', message: 'Deal with ABC Corp closed', time: '10 min ago' },
          { type: 'info', message: 'New lead assigned', time: '1 hour ago' },
          { type: 'warning', message: 'Follow-up required with XYZ Ltd', time: '2 hours ago' },
          { type: 'success', message: 'Target 60% achieved', time: '1 day ago' },
        ];
      case 'customer-service':
        return [
          { type: 'success', message: 'Support case #1234 resolved', time: '15 min ago' },
          { type: 'info', message: 'New support request received', time: '30 min ago' },
          { type: 'warning', message: 'Escalation needed for case #1230', time: '1 hour ago' },
          { type: 'success', message: 'Customer satisfaction survey: 5/5', time: '2 hours ago' },
        ];
      default:
        return [];
    }
  };

  const activities = getRecentActivities();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{getWelcomeMessage()}</h1>
        <p className="opacity-90">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            green: 'bg-green-500',
            blue: 'bg-blue-500',
            purple: 'bg-purple-500',
            orange: 'bg-orange-500',
            yellow: 'bg-yellow-500',
          };

          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const colors = {
              success: 'bg-green-100 text-green-800',
              info: 'bg-blue-100 text-blue-800',
              warning: 'bg-yellow-100 text-yellow-800',
            };

            return (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-500' : activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{activity.message}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userRole === 'manager' && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">Generate Report</h3>
              <p className="text-gray-600 text-sm">Create comprehensive sales and performance reports</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">Assign Targets</h3>
              <p className="text-gray-600 text-sm">Set new sales targets for your team members</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">Send Notification</h3>
              <p className="text-gray-600 text-sm">Broadcast important updates to your team</p>
            </div>
          </>
        )}
        
        {userRole === 'salesman' && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">New Deal</h3>
              <p className="text-gray-600 text-sm">Create a new sales opportunity</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">Request Data</h3>
              <p className="text-gray-600 text-sm">Get fresh leads from the data center</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">View Performance</h3>
              <p className="text-gray-600 text-sm">Check your sales performance metrics</p>
            </div>
          </>
        )}
        
        {userRole === 'customer-service' && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">New Support Case</h3>
              <p className="text-gray-600 text-sm">Create a new customer support ticket</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">Update Deal Status</h3>
              <p className="text-gray-600 text-sm">Modify customer deal information</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">Escalate Issue</h3>
              <p className="text-gray-600 text-sm">Forward complex cases to management</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}