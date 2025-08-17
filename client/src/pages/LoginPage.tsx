import { useState } from 'react';
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Play, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../App';
import { useToast } from '../hooks/use-toast';
import { apiRequest } from '../lib/queryClient';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [, navigate] = useLocation();
  const { setUser } = useAuth();
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      return apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },
    onSuccess: (data) => {
      setUser(data.user);
      navigate('/dashboard');
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.name}!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate({ username, password });
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
            <Link href="/">
              <a className="flex items-center text-blue-200 hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Homepage
              </a>
            </Link>
            
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
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter your username"
                disabled={loginMutation.isPending}
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
                  disabled={loginMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                  disabled={loginMutation.isPending}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? (
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
                  disabled={loginMutation.isPending}
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
  );
}