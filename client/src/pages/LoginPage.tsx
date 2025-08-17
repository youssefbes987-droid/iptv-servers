import { useState } from 'react';
import { Link } from "wouter";
import { ArrowLeft, Play, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/use-auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }
    login({ username, password });
  };

  const demoAccounts = [
    { role: 'Manager', username: 'admin', desc: 'Full system access' },
    { role: 'Salesman', username: 'sales1', desc: 'Sales dashboard & deals' },
    { role: 'Support', username: 'cs1', desc: 'Customer support tools' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/">
          <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </Link>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full">
          {/* Left Side - Login Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Vmax IPTV
                </h1>
              </div>
              <p className="text-blue-200">Sign in to your sales dashboard</p>
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your username"
                  disabled={isLoading}
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm pr-12"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
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
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Demo Accounts</h3>
            <p className="text-blue-200 mb-6">Try the system with these demo accounts:</p>
            
            <div className="space-y-4">
              {demoAccounts.map((account, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-white">{account.role}</h4>
                    <span className="text-orange-400 text-sm font-mono">@{account.username}</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-3">{account.desc}</p>
                  <button
                    onClick={() => {
                      setUsername(account.username);
                      setPassword('password');
                    }}
                    className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                    disabled={isLoading}
                  >
                    Use this account →
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-400/20">
              <p className="text-blue-200 text-sm">
                <strong className="text-white">Password:</strong> password (for all demo accounts)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}