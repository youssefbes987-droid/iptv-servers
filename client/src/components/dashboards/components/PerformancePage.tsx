import React from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

export default function PerformancePage() {
  const performanceData = {
    monthlyStats: [
      { month: 'Jan', sales: 18430, target: 20000, deals: 12 },
      { month: 'Dec', sales: 22100, target: 20000, deals: 15 },
      { month: 'Nov', sales: 19800, target: 18000, deals: 13 },
      { month: 'Oct', sales: 16500, target: 18000, deals: 11 },
      { month: 'Sep', sales: 21200, target: 19000, deals: 14 },
      { month: 'Aug', sales: 17800, target: 18000, deals: 12 },
    ],
    achievements: [
      { title: 'Top Performer', description: 'Exceeded monthly target by 110%', date: '2025-01-15' },
      { title: 'Customer Favorite', description: '5-star rating from 95% of customers', date: '2025-01-10' },
      { title: 'Deal Closer', description: 'Closed 15 deals in a single month', date: '2024-12-30' },
      { title: 'Sales Champion', description: 'Highest revenue generator Q4 2024', date: '2024-12-31' },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Performance Dashboard</h1>
        <p className="text-gray-600">Track your sales performance and achievements</p>
      </div>

      {/* Current Performance */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Current Month Performance</h2>
            <p className="opacity-90">January 2025</p>
          </div>
          <div className="p-3 bg-white/20 rounded-lg">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">$18,430</div>
            <div className="text-sm opacity-90">Revenue Generated</div>
            <div className="text-xs opacity-75 mt-1">92% of target</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">12</div>
            <div className="text-sm opacity-90">Deals Closed</div>
            <div className="text-xs opacity-75 mt-1">48% of target</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">87%</div>
            <div className="text-sm opacity-90">Success Rate</div>
            <div className="text-xs opacity-75 mt-1">+5% from last month</div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">6-Month Performance Trend</h3>
        <div className="h-64 flex items-end justify-between space-x-4">
          {performanceData.monthlyStats.reverse().map((data, index) => {
            const percentage = (data.sales / data.target) * 100;
            const height = Math.min(percentage, 100);
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative mb-2" style={{ height: '200px' }}>
                  {/* Target line */}
                  <div className="absolute w-full border-t-2 border-dashed border-gray-300" style={{ top: '20%' }}>
                    <span className="text-xs text-gray-500 absolute -top-4 left-0">Target</span>
                  </div>
                  
                  {/* Sales bar */}
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${
                      percentage >= 100 ? 'bg-gradient-to-t from-green-500 to-green-400' : 
                      percentage >= 80 ? 'bg-gradient-to-t from-yellow-500 to-yellow-400' :
                      'bg-gradient-to-t from-red-500 to-red-400'
                    }`}
                    style={{ 
                      height: `${height}%`,
                      position: 'absolute',
                      bottom: '0'
                    }}
                  ></div>
                  
                  {/* Value label */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    ${(data.sales / 1000).toFixed(1)}K
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{data.month}</div>
                  <div className="text-xs text-gray-500">{data.deals} deals</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">92%</div>
              <div className="text-sm text-green-600">Target Achievement</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">This Month</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-blue-600">Total Deals</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">All Time</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500 text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">$234K</div>
              <div className="text-sm text-purple-600">Total Revenue</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Lifetime</h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-500 text-white">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">4.9</div>
              <div className="text-sm text-orange-600">Avg Rating</div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Customer Satisfaction</h3>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Achievements</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {performanceData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                🏆
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals for Next Month */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Goals for February 2025</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Revenue Target</h4>
              <p className="text-sm text-gray-600">Achieve $22,000 in sales</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">$22K</div>
              <div className="text-xs text-blue-500">+19% from current</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Deals Target</h4>
              <p className="text-sm text-gray-600">Close 16 deals this month</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-green-600">16</div>
              <div className="text-xs text-green-500">+4 from current</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Customer Satisfaction</h4>
              <p className="text-sm text-gray-600">Maintain 4.9+ star rating</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-purple-600">4.9+</div>
              <div className="text-xs text-purple-500">Maintain excellence</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}