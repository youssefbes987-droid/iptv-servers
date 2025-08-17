import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ManagerDashboard from './dashboards/ManagerDashboard';
import SalesmanDashboard from './dashboards/SalesmanDashboard';
import CustomerServiceDashboard from './dashboards/CustomerServiceDashboard';
import Sidebar from './common/Sidebar';
import Header from './common/Header';

export default function Dashboard() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case 'manager':
        return <ManagerDashboard activePage={activePage} />;
      case 'salesman':
        return <SalesmanDashboard activePage={activePage} />;
      case 'customer-service':
        return <CustomerServiceDashboard activePage={activePage} />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        userRole={user.role}
        activePage={activePage}
        onPageChange={setActivePage}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
}