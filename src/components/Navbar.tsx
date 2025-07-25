import React from 'react';
import { Link2, LogOut } from 'lucide-react';

interface NavbarProps {
  title?: string;
  dailyUsage?: number;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  title = "LinkShort", 
  dailyUsage, 
  showBackButton = false, 
  onBackClick, 
  onLogout 
}) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {showBackButton ? (
            <button
              onClick={onBackClick}
              className="text-indigo-600 hover:text-indigo-700"
            >
              ← Back to Dashboard
            </button>
          ) : (
            <>
              <Link2 className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {dailyUsage !== undefined && (
            <span className="text-sm text-gray-600">
              Daily usage: {dailyUsage}/100
            </span>
          )}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};