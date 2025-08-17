import React from 'react';
import DashboardOverview from './components/DashboardOverview';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import DealsManagement from './components/DealsManagement';
import UserManagement from './components/UserManagement';
import DataCenter from './components/DataCenter';
import TargetManagement from './components/TargetManagement';
import NotificationsCenter from './components/NotificationsCenter';
import ReportsPage from './components/ReportsPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';

interface ManagerDashboardProps {
  activePage: string;
}

export default function ManagerDashboard({ activePage }: ManagerDashboardProps) {
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardOverview userRole="manager" />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'deals':
        return <DealsManagement userRole="manager" />;
      case 'users':
        return <UserManagement />;
      case 'data-center':
        return <DataCenter userRole="manager" />;
      case 'targets':
        return <TargetManagement />;
      case 'notifications':
        return <NotificationsCenter />;
      case 'reports':
        return <ReportsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardOverview userRole="manager" />;
    }
  };

  return <div className="space-y-6">{renderPage()}</div>;
}