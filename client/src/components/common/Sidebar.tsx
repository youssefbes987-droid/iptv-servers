import React from 'react';
import { 
  Home, 
  Users, 
  TrendingUp, 
  Bell, 
  Database, 
  Target, 
  User, 
  Settings,
  Briefcase,
  HeadphonesIcon,
  BarChart3,
  FileText
} from 'lucide-react';

interface SidebarProps {
  userRole: 'manager' | 'salesman' | 'customer-service';
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ userRole, activePage, onPageChange }: SidebarProps) {
  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    switch (userRole) {
      case 'manager':
        return [
          ...commonItems,
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'deals', label: 'All Deals', icon: Briefcase },
          { id: 'users', label: 'Manage Users', icon: Users },
          { id: 'data-center', label: 'Data Center', icon: Database },
          { id: 'targets', label: 'Targets', icon: Target },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'salesman':
        return [
          ...commonItems,
          { id: 'deals', label: 'My Deals', icon: Briefcase },
          { id: 'data-center', label: 'Data Center', icon: Database },
          { id: 'targets', label: 'My Targets', icon: Target },
          { id: 'performance', label: 'Performance', icon: TrendingUp },
        ];
      case 'customer-service':
        return [
          ...commonItems,
          { id: 'deals', label: 'Assigned Deals', icon: Briefcase },
          { id: 'data-center', label: 'Data Center', icon: Database },
          { id: 'support', label: 'Support Cases', icon: HeadphonesIcon },
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Vmax IPTV</h2>
            <p className="text-xs text-gray-500 capitalize">{userRole.replace('-', ' ')}</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 ${
                activePage === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}