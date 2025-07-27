import React from "react";
import { Link2, LogOut } from "lucide-react";
import type { NavbarProps } from "../types";

export const Navbar: React.FC<NavbarProps> = ({
  title = "LinkShort",
  dailyUsage,
  showBackButton = false,
  onBackClick,
  onLogout,
}) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex items-center justify-between sm:justify-start space-x-3">
          {showBackButton ? (
            <button
              onClick={onBackClick}
              className="text-indigo-600 hover:text-indigo-700 text-sm sm:text-base"
            >
              ← Back to Dashboard
            </button>
          ) : (
            <>
              <Link2 className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                {title}
              </h1>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm sm:text-base gap-2 sm:gap-0">
          {dailyUsage !== undefined && (
            <span className="text-gray-600 text-center sm:text-left">
              Daily usage: {dailyUsage}/{import.meta.env.VITE_DAILY_LIMIT || 1}
            </span>
          )}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900"
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
