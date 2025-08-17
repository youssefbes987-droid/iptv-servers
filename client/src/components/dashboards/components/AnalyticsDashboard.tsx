import React from 'react';
import { TrendingUp, DollarSign, Users, Target, Calendar } from 'lucide-react';

export default function AnalyticsDashboard() {
  // Mock chart data
  const chartData = {
    salesData: [
      { month: 'Jan', sales: 45000, deals: 23 },
      { month: 'Feb', sales: 52000, deals: 28 },
      { month: 'Mar', sales: 61000, deals: 35 },
      { month: 'Apr', sales: 48000, deals: 25 },
      { month: 'May', sales: 67000, deals: 38 },
      { month: 'Jun', sales: 73000, deals: 42 },
    ],
    teamPerformance: [
      { name: 'Mike Salesman', sales: 18430, deals: 12, target: 20000 },
      { name: 'John Sales', sales: 15200, deals: 9, target: 18000 },
      { name: 'Sarah Sales', sales: 22100, deals: 15, target: 25000 },
      { name: 'Alex Sales', sales: 19800, deals: 13, target: 22000 },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">$346K</div>
              <div className="text-sm text-green-600">+15.3% from last month</div>
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
              <div className="text-2xl font-bold text-gray-900">191</div>
              <div className="text-sm text-blue-600">+22 this month</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Total Deals</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500 text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">89.2%</div>
              <div className="text-sm text-purple-600">+5.1% improvement</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Success Rate</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-500 text-white">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-orange-600">+89 new customers</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Active Customers</h3>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.salesData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-1000 ease-out"
                    style={{ height: `${(data.sales / 75000) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-center">
                  <div className="text-xs text-gray-600">{data.month}</div>
                  <div className="text-xs font-semibold text-gray-900">${data.sales / 1000}K</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Performance</h3>
          <div className="space-y-4">
            {chartData.teamPerformance.map((member, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{member.name}</span>
                  <span className="text-sm text-gray-600">
                    ${member.sales.toLocaleString()} / ${member.target.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((member.sales / member.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {member.deals} deals • {Math.round((member.sales / member.target) * 100)}% of target
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Period</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Sales</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Deals</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Conversion</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-900">This Week</td>
                  <td className="py-3 text-sm font-semibold text-gray-900">$18,450</td>
                  <td className="py-3 text-sm text-gray-600">12</td>
                  <td className="py-3 text-sm text-gray-600">68%</td>
                  <td className="py-3 text-sm text-green-600">+12%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-900">Last Week</td>
                  <td className="py-3 text-sm font-semibold text-gray-900">$16,200</td>
                  <td className="py-3 text-sm text-gray-600">9</td>
                  <td className="py-3 text-sm text-gray-600">64%</td>
                  <td className="py-3 text-sm text-yellow-600">-3%</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm text-gray-900">This Month</td>
                  <td className="py-3 text-sm font-semibold text-gray-900">$73,800</td>
                  <td className="py-3 text-sm text-gray-600">42</td>
                  <td className="py-3 text-sm text-gray-600">71%</td>
                  <td className="py-3 text-sm text-green-600">+18%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performers</h3>
          <div className="space-y-4">
            {chartData.teamPerformance
              .sort((a, b) => b.sales - a.sales)
              .slice(0, 3)
              .map((member, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{member.name}</div>
                  <div className="text-xs text-gray-600">${member.sales.toLocaleString()} • {member.deals} deals</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}