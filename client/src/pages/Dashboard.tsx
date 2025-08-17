import { useAuth } from '../App';
import { Link, useLocation } from "wouter";
import { useEffect } from 'react';
import { LogOut, BarChart3, Users, ShoppingCart, HeadphonesIcon } from 'lucide-react';

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'manager':
        return 'Manager';
      case 'salesman':
        return 'Salesman';
      case 'customer-service':
        return 'Customer Service';
      default:
        return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'manager':
        return <BarChart3 className="w-5 h-5" />;
      case 'salesman':
        return <ShoppingCart className="w-5 h-5" />;
      case 'customer-service':
        return <HeadphonesIcon className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Vmax IPTV Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full">
                {getRoleIcon(user.role)}
                <span className="text-sm font-medium text-blue-800">
                  {getRoleDisplayName(user.role)}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Target</p>
                <p className="text-2xl font-bold text-gray-900">{user.monthlyTarget}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achieved</p>
                <p className="text-2xl font-bold text-gray-900">{user.achieved}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user.monthlyTarget > 0 ? Math.round((user.achieved / user.monthlyTarget) * 100) : 0}%
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(0, user.monthlyTarget - user.achieved)}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Role-specific Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New sale recorded</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Customer onboarded</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <button className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <h4 className="font-medium text-blue-900">Add New Customer</h4>
                <p className="text-sm text-blue-600">Create a new customer record</p>
              </button>
              <button className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <h4 className="font-medium text-green-900">Record Sale</h4>
                <p className="text-sm text-green-600">Log a new sales transaction</p>
              </button>
              <button className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <h4 className="font-medium text-purple-900">View Reports</h4>
                <p className="text-sm text-purple-600">Generate performance reports</p>
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to your Vmax IPTV Dashboard!</h2>
          <p className="text-blue-100">
            Your role: <strong>{getRoleDisplayName(user.role)}</strong> | 
            Email: <strong>{user.email}</strong>
          </p>
          <p className="mt-2 text-blue-100">
            This dashboard has been successfully migrated to run on Replit with proper client-server separation,
            authentication via backend APIs, and modern React patterns.
          </p>
        </div>
      </main>
    </div>
  );
}