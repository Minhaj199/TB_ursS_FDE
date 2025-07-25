

// App.tsx
import React, { useState } from 'react';
import {type User,type UrlItem,type PageType } from './types'  
import { LoginPage } from './components/LoginPage'; 
import { Dashboard } from './components/Dashboard'; 
import { AnalyticsPage } from './components/AnalyticsPage'; 

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [user, setUser] = useState<User | null>({email:'minhaj@gmail.com',id:1});
  const [selectedUrl, setSelectedUrl] = useState<UrlItem | null>(null);

  const handleLogin = (userData: User): void => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = (): void => {
    setUser(null);
    setCurrentPage('login');
  };

  const handleViewAnalytics = (url: UrlItem): void => {
    setSelectedUrl(url);
    setCurrentPage('analytics');
  };

  const handleBackToDashboard = (): void => {
    setCurrentPage('dashboard');
  };

  return (
    <div>
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'dashboard' && user && (
        <Dashboard 
          user={user}
          onLogout={handleLogout}
          onViewAnalytics={handleViewAnalytics}
        />
      )}
      {currentPage === 'analytics' && (
        <AnalyticsPage 
          selectedUrl={selectedUrl}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default App;