import React, { useState } from 'react';
import { Search, Filter, Plus, Clock, CheckCircle, AlertTriangle, MessageCircle } from 'lucide-react';

export default function SupportCases() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockCases = [
    {
      id: 'CS001',
      title: 'Service Connection Issues',
      customer: 'ABC Corporation',
      priority: 'high',
      status: 'open',
      assignedTo: 'Sarah Support',
      createdDate: '2025-01-20',
      lastUpdate: '2025-01-20',
      description: 'Customer experiencing intermittent connection drops during peak hours'
    },
    {
      id: 'CS002',
      title: 'Billing Inquiry',
      customer: 'XYZ Restaurant',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Sarah Support',
      createdDate: '2025-01-19',
      lastUpdate: '2025-01-20',
      description: 'Questions about monthly subscription charges and additional fees'
    },
    {
      id: 'CS003',
      title: 'Channel Package Upgrade',
      customer: 'Tech Startup LLC',
      priority: 'low',
      status: 'resolved',
      assignedTo: 'Sarah Support',
      createdDate: '2025-01-18',
      lastUpdate: '2025-01-19',
      description: 'Request to upgrade from basic to premium channel package'
    },
    {
      id: 'CS004',
      title: 'Equipment Replacement',
      customer: 'Local Gym',
      priority: 'high',
      status: 'escalated',
      assignedTo: 'Sarah Support',
      createdDate: '2025-01-17',
      lastUpdate: '2025-01-19',
      description: 'Set-top box malfunction reported, requires immediate replacement'
    },
  ];

  const filteredCases = mockCases.filter(supportCase => {
    const matchesSearch = supportCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supportCase.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supportCase.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || supportCase.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <MessageCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'escalated': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Cases</h1>
          <p className="text-gray-600">Manage customer support requests and inquiries</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Case</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {filteredCases.filter(c => c.status === 'open').length}
              </div>
              <div className="text-sm text-blue-600">Open</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Open Cases</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-yellow-500 text-white">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {filteredCases.filter(c => c.status === 'in-progress').length}
              </div>
              <div className="text-sm text-yellow-600">In Progress</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Active Cases</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {filteredCases.filter(c => c.status === 'resolved').length}
              </div>
              <div className="text-sm text-green-600">Resolved</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">This Week</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-500 text-white">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {filteredCases.filter(c => c.status === 'escalated').length}
              </div>
              <div className="text-sm text-red-600">Escalated</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Needs Attention</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cases..."
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
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((supportCase) => (
          <div key={supportCase.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(supportCase.status)}
                  <span className="font-medium text-gray-900">{supportCase.id}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(supportCase.status)}`}>
                  {supportCase.status.replace('-', ' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(supportCase.priority)}`}>
                  {supportCase.priority} priority
                </span>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>Created: {new Date(supportCase.createdDate).toLocaleDateString()}</div>
                <div>Updated: {new Date(supportCase.lastUpdate).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{supportCase.title}</h3>
              <p className="text-gray-600 mb-2">{supportCase.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Customer: <strong className="text-gray-900">{supportCase.customer}</strong></span>
                <span>Assigned to: <strong className="text-gray-900">{supportCase.assignedTo}</strong></span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                Update Status
              </button>
              {supportCase.status !== 'escalated' && supportCase.priority === 'high' && (
                <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Escalate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-100">
          <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No support cases found</h3>
          <p className="text-gray-600">No cases match your current search criteria.</p>
        </div>
      )}
    </div>
  );
}