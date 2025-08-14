import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Calendar, DollarSign } from 'lucide-react';

interface Deal {
  id: string;
  customerName: string;
  service: string;
  value: number;
  status: 'new' | 'in-progress' | 'closed' | 'cancelled';
  assignedTo: string;
  createdDate: string;
  closeDate?: string;
}

interface DealsManagementProps {
  userRole: 'manager' | 'salesman' | 'customer-service';
}

export default function DealsManagement({ userRole }: DealsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewDealModal, setShowNewDealModal] = useState(false);

  // Mock deals data
  const mockDeals: Deal[] = [
    {
      id: '1',
      customerName: 'ABC Corporation',
      service: 'Premium IPTV Package',
      value: 2500,
      status: 'in-progress',
      assignedTo: 'Mike Salesman',
      createdDate: '2025-01-15',
    },
    {
      id: '2',
      customerName: 'XYZ Restaurant',
      service: 'Basic IPTV Package',
      value: 899,
      status: 'closed',
      assignedTo: 'Mike Salesman',
      createdDate: '2025-01-10',
      closeDate: '2025-01-18',
    },
    {
      id: '3',
      customerName: 'Tech Startup LLC',
      service: 'Enterprise IPTV Solution',
      value: 5000,
      status: 'new',
      assignedTo: 'Sarah Support',
      createdDate: '2025-01-20',
    },
    {
      id: '4',
      customerName: 'Local Gym',
      service: 'Sports Package',
      value: 1200,
      status: 'in-progress',
      assignedTo: 'Mike Salesman',
      createdDate: '2025-01-12',
    },
  ];

  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;
    
    // Role-based filtering
    if (userRole === 'salesman') {
      return matchesSearch && matchesStatus && deal.assignedTo === 'Mike Salesman';
    }
    if (userRole === 'customer-service') {
      return matchesSearch && matchesStatus && (deal.status === 'closed' || deal.assignedTo === 'Sarah Support');
    }
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPageTitle = () => {
    switch (userRole) {
      case 'manager': return 'All Deals';
      case 'salesman': return 'My Deals';
      case 'customer-service': return 'Assigned Deals';
      default: return 'Deals';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-gray-600">
            {userRole === 'manager' && 'Manage all deals across your organization'}
            {userRole === 'salesman' && 'Track and manage your sales opportunities'}
            {userRole === 'customer-service' && 'Handle customer deals and support cases'}
          </p>
        </div>
        
        {(userRole === 'manager' || userRole === 'salesman') && (
          <button
            onClick={() => setShowNewDealModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Deal</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Customer</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Service</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Value</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Assigned To</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Date</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal, index) => (
                <tr key={deal.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{deal.customerName}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{deal.service}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-gray-900 font-semibold">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {deal.value.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(deal.status)}`}>
                      {deal.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{deal.assignedTo}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(deal.createdDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {(userRole === 'manager' || userRole === 'salesman') && (
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {userRole === 'manager' && (
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600">Total Deals</h3>
          <div className="text-2xl font-bold text-gray-900 mt-1">{filteredDeals.length}</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600">Total Value</h3>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            ${filteredDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600">Closed Deals</h3>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {filteredDeals.filter(deal => deal.status === 'closed').length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600">In Progress</h3>
          <div className="text-2xl font-bold text-yellow-600 mt-1">
            {filteredDeals.filter(deal => deal.status === 'in-progress').length}
          </div>
        </div>
      </div>

      {/* New Deal Modal */}
      {showNewDealModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Deal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Basic IPTV Package</option>
                  <option>Premium IPTV Package</option>
                  <option>Enterprise IPTV Solution</option>
                  <option>Sports Package</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewDealModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewDealModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}