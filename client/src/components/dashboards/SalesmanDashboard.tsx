import React from 'react';
import DashboardOverview from './components/DashboardOverview';
import DealsManagement from './components/DealsManagement';
import DataCenter from './components/DataCenter';
import TargetManagement from './components/TargetManagement';
import NotificationsCenter from './components/NotificationsCenter';
import ProfilePage from './components/ProfilePage';
import PerformancePage from './components/PerformancePage';

interface SalesmanDashboardProps {
  activePage: string;
}

export default function SalesmanDashboard({ activePage }: SalesmanDashboardProps) {
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardOverview userRole="salesman" />;
      case 'deals':
        return <DealsManagement userRole="salesman" />;
      case 'data-center':
        return <DataCenter userRole="salesman" />;
      case 'targets':
        return <TargetManagement />;
      case 'performance':
        return <PerformancePage />;
      case 'notifications':
        return <NotificationsCenter />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardOverview userRole="salesman" />;
    }
  };

  return <div className="space-y-6">{renderPage()}</div>;
}