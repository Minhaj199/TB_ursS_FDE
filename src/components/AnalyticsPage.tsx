import React from 'react';
import { TrendingUp, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {type UrlItem } from '../types'; 
import { mockAnalyticsData } from '../mokeData'; 
import { Navbar } from './Navbar';

interface AnalyticsPageProps {
  selectedUrl: UrlItem | null;
  onBackToDashboard: () => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ selectedUrl, onBackToDashboard }) => {
  if (!selectedUrl) return null;

  const totalClicks = mockAnalyticsData.dailyClicks.reduce((sum, day) => sum + day.clicks, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        title="Analytics"
        showBackButton={true}
        onBackClick={onBackToDashboard}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* URL Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedUrl.shortUrl}</h2>
          <p className="text-gray-600 mb-4">{selectedUrl.longUrl}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{totalClicks}</div>
              <div className="text-sm text-gray-600">Total Clicks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{selectedUrl.createdAt}</div>
              <div className="text-sm text-gray-600">Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{selectedUrl.expiresAt}</div>
              <div className="text-sm text-gray-600">Expires</div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Clicks Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">Daily Clicks</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalyticsData.dailyClicks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="clicks" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockAnalyticsData.geoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ country, percent=0}) => `${country} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="clicks"
                >
                  {mockAnalyticsData.geoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
