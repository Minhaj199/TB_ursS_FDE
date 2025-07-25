import React, { useState } from 'react';
import {type UrlItem, type User } from '../types';
import { Navbar } from './Navbar';
import { UrlCreationForm } from './UrlCreationForm';
import { UrlsList } from './UrlsList';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onViewAnalytics: (url: UrlItem) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({  onLogout, onViewAnalytics }) => {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [dailyUsage, setDailyUsage] = useState<number>(0);

  const handleCreateUrl = (newUrl: UrlItem): void => {
    setUrls([newUrl, ...urls]);
    setDailyUsage(dailyUsage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        dailyUsage={dailyUsage} 
        onLogout={onLogout}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <UrlCreationForm 
          dailyUsage={dailyUsage}
          onCreateUrl={handleCreateUrl}
        />
        
        <UrlsList 
          urls={urls}
          onViewAnalytics={onViewAnalytics}
        />
      </div>
    </div>
  );
};