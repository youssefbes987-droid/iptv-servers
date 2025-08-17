import React, { useState, useEffect } from 'react';
import { Play, Shield, Users, TrendingUp, ChevronRight, Star, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Management",
      description: "Role-based access control with enterprise-grade security"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Seamless coordination between sales teams and customer service"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Real-time insights and comprehensive reporting dashboard"
    }
  ];

  const stats = [
    { number: "500+", label: "Active Channels" },
    { number: "10K+", label: "Satisfied Customers" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Vmax IPTV</span>
          </div>
          <button
            onClick={onLogin}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Login</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Premium IPTV
              <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Sales Management
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your IPTV service sales with our comprehensive management system. 
              Track performance, manage deals, and deliver exceptional customer experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onLogin}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Access Management System
              </button>
              <button className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/5 backdrop-blur-sm border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose Our Management System?
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Built specifically for IPTV service providers to maximize efficiency and growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Management System Overview */}
      <div className="bg-white/5 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                Complete Sales Management Solution
              </h2>
              <div className="space-y-6">
                {[
                  "Role-based dashboards for Managers, Sales teams, and Customer Service",
                  "Real-time sales tracking and performance analytics",
                  "Automated notifications and target management",
                  "Comprehensive deal management and data assignment",
                  "Excel integration for bulk operations",
                  "Advanced filtering and reporting capabilities"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
                    <span className="text-blue-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">Manager</div>
                    <div className="text-sm text-blue-200">Full Control</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">Salesman</div>
                    <div className="text-sm text-blue-200">Deal Focused</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">Customer Service</div>
                    <div className="text-sm text-blue-200">Support Focused</div>
                  </div>
                  <div className="bg-orange-500/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">Analytics</div>
                    <div className="text-sm text-orange-200">Real-time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your IPTV Business?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Join the future of IPTV service management with our comprehensive platform
          </p>
          <button
            onClick={onLogin}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Get Started Today
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-orange-600 rounded flex items-center justify-center">
              <Play className="w-3 h-3 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Vmax IPTV</span>
          </div>
          <p className="text-blue-200">&copy; 2025 Vmax IPTV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}