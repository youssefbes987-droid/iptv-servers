import React from 'react';
import { Target, TrendingUp, Calendar, Users } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export default function TargetManagement() {
  const { user } = useAuth();

  const mockTargets = [
    {
      id: '1',
      user: 'Mike Salesman',
      monthlyTarget: 20000,
      achieved: 18430,
      deals: { target: 25, achieved: 22 },
      period: 'January 2025'
    },
    {
      id: '2',
      user: 'John Sales',
      monthlyTarget: 18000,
      achieved: 15200,
      deals: { target: 20, achieved: 18 },
      period: 'January 2025'
    },
    {
      id: '3',
      user: 'Sarah Sales',
      monthlyTarget: 25000,
      achieved: 22100,
      deals: { target: 30, achieved: 28 },
      period: 'January 2025'
    },
  ];

  const currentUserTarget = mockTargets.find(t => t.user === user?.name) || mockTargets[0];

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.role === 'manager' ? 'Target Management' : 'My Targets'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'manager' 
              ? 'Set and monitor sales targets for your team'
              : 'Track your progress towards monthly goals'
            }
          </p>
        </div>
        
        {user?.role === 'manager' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Set New Targets
          </button>
        )}
      </div>

      {/* Current User Target (for non-managers) or Overview (for managers) */}
      {user?.role !== 'manager' ? (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Your January Target</h2>
              <p className="opacity-90">Keep pushing towards your goals!</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Target className="w-8 h-8" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Revenue Target</h3>
              <div className="text-3xl font-bold mb-2">
                ${currentUserTarget.achieved.toLocaleString()} / ${currentUserTarget.monthlyTarget.toLocaleString()}
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((currentUserTarget.achieved / currentUserTarget.monthlyTarget) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm opacity-90">
                {Math.round((currentUserTarget.achieved / currentUserTarget.monthlyTarget) * 100)}% completed
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Deals Target</h3>
              <div className="text-3xl font-bold mb-2">
                {currentUserTarget.deals.achieved} / {currentUserTarget.deals.target}
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((currentUserTarget.deals.achieved / currentUserTarget.deals.target) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm opacity-90">
                {Math.round((currentUserTarget.deals.achieved / currentUserTarget.deals.target) * 100)}% completed
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500 text-white">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(mockTargets.reduce((sum, t) => sum + (t.achieved / t.monthlyTarget), 0) / mockTargets.length * 100)}%
                </div>
                <div className="text-sm text-blue-600">Avg. Achievement</div>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Team Performance</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500 text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${mockTargets.reduce((sum, t) => sum + t.achieved, 0).toLocaleString()}
                </div>
                <div className="text-sm text-green-600">Total Sales</div>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">This Month</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-500 text-white">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {mockTargets.filter(t => (t.achieved / t.monthlyTarget) >= 0.9).length}
                </div>
                <div className="text-sm text-purple-600">Top Performers</div>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Above 90%</h3>
          </div>
        </div>
      )}

      {/* Targets List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{user?.role === 'manager' ? 'Team Targets' : 'Target Details'} - January 2025</span>
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {(user?.role === 'manager' ? mockTargets : [currentUserTarget]).map((target) => {
            const revenuePercentage = (target.achieved / target.monthlyTarget) * 100;
            const dealsPercentage = (target.deals.achieved / target.deals.target) * 100;

            return (
              <div key={target.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{target.user}</h4>
                    <p className="text-gray-600">{target.period}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Overall Progress</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round((revenuePercentage + dealsPercentage) / 2)}%
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Revenue Target */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">Revenue Target</span>
                      <span className="text-sm text-gray-600">
                        ${target.achieved.toLocaleString()} / ${target.monthlyTarget.toLocaleString()}
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-3 ${getProgressBgColor(revenuePercentage)}`}>
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor(revenuePercentage)}`}
                        style={{ width: `${Math.min(revenuePercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {Math.round(revenuePercentage)}% completed
                      {revenuePercentage >= 100 && ' 🎉'}
                    </div>
                  </div>

                  {/* Deals Target */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">Deals Target</span>
                      <span className="text-sm text-gray-600">
                        {target.deals.achieved} / {target.deals.target} deals
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-3 ${getProgressBgColor(dealsPercentage)}`}>
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor(dealsPercentage)}`}
                        style={{ width: `${Math.min(dealsPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {Math.round(dealsPercentage)}% completed
                      {dealsPercentage >= 100 && ' 🎉'}
                    </div>
                  </div>
                </div>

                {user?.role === 'manager' && (
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit Target
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}