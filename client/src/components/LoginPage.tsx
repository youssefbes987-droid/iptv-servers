import React, { useState } from 'react';
import { ArrowLeft, Play, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onBack: () => void;
}

export default function LoginPage({ onBack }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
    setLoading(false);
  };

  const demoAccounts = [
    { role: 'Manager', username: 'admin', desc: 'Full system access' },
    { role: 'Salesman', username: 'sales1', desc: 'Sales focused dashboard' },
    { role: 'Customer Service', username: 'cs1', desc: 'Support operations' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-blue-200 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </button>
            
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Vmax IPTV</h1>
                <p className="text-blue-200 text-sm">Management System</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-blue-200">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Demo Accounts */}
        <div className="lg:pl-8">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Demo Accounts</h3>
            <p className="text-blue-200 mb-6">
              Try different user roles to explore the system features
            </p>
          </div>

          <div className="space-y-4">
            {demoAccounts.map((account, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setUsername(account.username);
                  setPassword('password');
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-semibold text-white">{account.role}</h4>
                  <div className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">
                    Click to use
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Username:</span>
                    <span className="text-white font-mono">{account.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Password:</span>
                    <span className="text-white font-mono">password</span>
                  </div>
                  <p className="text-blue-300 text-xs mt-2">{account.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-blue-400/30">
            <div className="text-blue-300 text-sm">
              <strong>Quick Start:</strong> Click any demo account card above to auto-fill the login form, then click "Sign In" to experience that user role's dashboard.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}