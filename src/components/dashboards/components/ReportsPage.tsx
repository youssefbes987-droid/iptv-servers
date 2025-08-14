import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, Users, DollarSign, Target } from 'lucide-react';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedType, setSelectedType] = useState('all');

  const reportData = {
    summary: {
      totalRevenue: 346000,
      totalDeals: 191,
      activeCustomers: 1247,
      teamPerformance: 89.2
    },
    monthlyData: [
      { month: 'Jan', revenue: 73000, deals: 42, customers: 189 },
      { month: 'Dec', revenue: 68000, deals: 38, customers: 156 },
      { month: 'Nov', revenue: 61000, deals: 35, customers: 143 },
      { month: 'Oct', revenue: 58000, deals: 32, customers: 128 },
      { month: 'Sep', revenue: 52000, deals: 28, customers: 121 },
      { month: 'Aug', revenue: 48000, deals: 25, customers: 115 }
    ]
  };

  const quickReports = [
    {
      title: 'Monthly Sales Report',
      description: 'Comprehensive overview of monthly sales performance',
      type: 'sales',
      format: 'PDF',
      lastGenerated: '2025-01-20'
    },
    {
      title: 'Team Performance Analysis',
      description: 'Individual and team performance metrics',
      type: 'performance',
      format: 'Excel',
      lastGenerated: '2025-01-19'
    },
    {
      title: 'Customer Satisfaction Report',
      description: 'Customer feedback and satisfaction ratings',
      type: 'customer',
      format: 'PDF',
      lastGenerated: '2025-01-18'
    },
    {
      title: 'Financial Summary',
      description: 'Revenue, expenses, and profit analysis',
      type: 'financial',
      format: 'Excel',
      lastGenerated: '2025-01-17'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive reports and insights</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Generate Custom Report</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${(reportData.summary.totalRevenue / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-green-600">+15.3% from last period</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{reportData.summary.totalDeals}</div>
              <div className="text-sm text-blue-600">+22 this month</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Total Deals</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500 text-white">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{reportData.summary.activeCustomers}</div>
              <div className="text-sm text-purple-600">+89 new customers</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Active Customers</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-500 text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{reportData.summary.teamPerformance}%</div>
              <div className="text-sm text-orange-600">+5.1% improvement</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Team Performance</h3>
        </div>
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Reports</option>
                <option value="sales">Sales Reports</option>
                <option value="performance">Performance Reports</option>
                <option value="customer">Customer Reports</option>
                <option value="financial">Financial Reports</option>
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">6-Month Performance Overview</h3>
        <div className="h-64 flex items-end justify-between space-x-4">
          {reportData.monthlyData.reverse().map((data, index) => {
            const maxRevenue = Math.max(...reportData.monthlyData.map(d => d.revenue));
            const height = (data.revenue / maxRevenue) * 100;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative mb-2" style={{ height: '200px' }}>
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
                    style={{ 
                      height: `${height}%`,
                      position: 'absolute',
                      bottom: '0'
                    }}
                  ></div>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    ${(data.revenue / 1000).toFixed(0)}K
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{data.month}</div>
                  <div className="text-xs text-gray-500">{data.deals} deals</div>
                  <div className="text-xs text-gray-500">{data.customers} customers</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Reports */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Quick Reports</h3>
          <span className="text-sm text-gray-500">Pre-configured report templates</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {quickReports.map((report, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{report.title}</h4>
                  <p className="text-gray-600 text-sm">{report.description}</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {report.format}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                </div>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  <Download className="w-4 h-4" />
                  <span>Generate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <FileText className="w-6 h-6 text-gray-400" />
            <span className="font-medium text-gray-600">Export to PDF</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <FileText className="w-6 h-6 text-gray-400" />
            <span className="font-medium text-gray-600">Export to Excel</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
            <FileText className="w-6 h-6 text-gray-400" />
            <span className="font-medium text-gray-600">Export to CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}