import React, { useState } from 'react';
import { Database, Download, Upload, Search, Filter, RefreshCw } from 'lucide-react';

interface DataCenterProps {
  userRole: 'manager' | 'salesman' | 'customer-service';
}

export default function DataCenter({ userRole }: DataCenterProps) {
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data entries
  const dataEntries = [
    { id: '1', phone: '+1-555-0123', name: 'John Smith', location: 'New York', status: 'available', type: 'premium' },
    { id: '2', phone: '+1-555-0124', name: 'Jane Doe', location: 'California', status: 'available', type: 'basic' },
    { id: '3', phone: '+1-555-0125', name: 'Mike Johnson', location: 'Texas', status: 'assigned', type: 'premium' },
    { id: '4', phone: '+1-555-0126', name: 'Sarah Wilson', location: 'Florida', status: 'available', type: 'enterprise' },
    { id: '5', phone: '+1-555-0127', name: 'David Brown', location: 'Illinois', status: 'available', type: 'basic' },
  ];

  const filteredData = dataEntries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.phone.includes(searchTerm) ||
    entry.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectData = (id: string) => {
    setSelectedData(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const availableIds = filteredData
      .filter(entry => entry.status === 'available')
      .map(entry => entry.id);
    
    setSelectedData(
      selectedData.length === availableIds.length ? [] : availableIds
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Center</h1>
          <p className="text-gray-600">
            {userRole === 'manager' && 'Manage and assign data to team members'}
            {userRole === 'salesman' && 'Request and access leads for your sales activities'}
            {userRole === 'customer-service' && 'Access customer data for support operations'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import Excel</span>
          </button>
          {userRole === 'manager' && (
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <Database className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{dataEntries.filter(d => d.status === 'available').length}</div>
              <div className="text-sm text-green-600">Available</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Available Leads</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-yellow-500 text-white">
              <Database className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{dataEntries.filter(d => d.status === 'assigned').length}</div>
              <div className="text-sm text-yellow-600">Assigned</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Assigned Leads</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500 text-white">
              <Database className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{dataEntries.filter(d => d.type === 'premium').length}</div>
              <div className="text-sm text-purple-600">Premium</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Premium Leads</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Database className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{dataEntries.length}</div>
              <div className="text-sm text-blue-600">Total</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Total Records</h3>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Status</option>
                <option>Available</option>
                <option>Assigned</option>
                <option>Contacted</option>
              </select>
            </div>
            
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {selectedData.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
            <span className="text-sm text-blue-800">
              {selectedData.length} item{selectedData.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              {userRole === 'salesman' && (
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                  Request Selected
                </button>
              )}
              {userRole === 'manager' && (
                <>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                    Assign
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                    Remove
                  </button>
                </>
              )}
              <button 
                onClick={() => setSelectedData([])}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Data Records</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedData.length === filteredData.filter(d => d.status === 'available').length}
              onChange={handleSelectAll}
              className="rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Select all available</span>
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Select</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Phone</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Name</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Location</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={entry.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedData.includes(entry.id)}
                      onChange={() => handleSelectData(entry.id)}
                      disabled={entry.status !== 'available'}
                      className="rounded border-gray-300 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm">{entry.phone}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{entry.name}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{entry.location}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(entry.type)}`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(entry.status)}`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}