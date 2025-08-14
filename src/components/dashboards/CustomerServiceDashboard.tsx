import React from 'react';
import DashboardOverview from './components/DashboardOverview';
import DealsManagement from './components/DealsManagement';
import DataCenter from './components/DataCenter';
import NotificationsCenter from './components/NotificationsCenter';
import ProfilePage from './components/ProfilePage';
import SupportCases from './components/SupportCases';

interface CustomerServiceDashboardProps {
  activePage: string;
}

export default function CustomerServiceDashboard({ activePage }: CustomerServiceDashboardProps) {
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardOverview userRole="customer-service" />;
      case 'deals':
        return <DealsManagement userRole="customer-service" />;
      case 'data-center':
        return <DataCenter userRole="customer-service" />;
      case 'support':
        return <SupportCases />;
      case 'notifications':
        return <NotificationsCenter />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardOverview userRole="customer-service" />;
    }
  };

  return <div className="space-y-6">{renderPage()}</div>;
}