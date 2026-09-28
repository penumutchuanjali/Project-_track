import React from 'react';
import { Bell, LogOut, Search, User, ShieldCheck, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { UserSession, AlertItem } from '../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: UserSession;
  onLogout: () => void;
  alerts: AlertItem[];
  onOpenNotifications: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  user,
  onLogout,
  alerts,
  onOpenNotifications,
  searchQuery,
  onSearchChange
}) => {
  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  const pageTitles: Record<string, string> = {
    dashboard: 'Monitoring Dashboard',
    projects: 'National Projects Directory',
    details: 'Project Deep-Dive',
    risks: 'Early Warning & Risk Matrix',
    ministry: 'Ministry & Departmental Portfolios',
    reports: 'Executive Monitoring Reports',
    map: 'GIS Geo-Spatial Project Map'
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 shadow-xs">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white shadow-xs group-hover:bg-blue-800 transition-colors">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
              ProjectDrishti
            </span>
          </div>
        </button>

        {/* Quiet breadcrumb separator */}
        <div className="hidden lg:flex items-center gap-2 pl-4 text-xs text-slate-400">
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-600">
            {pageTitles[currentPage] || 'Overview'}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-400">Govt. of India</span>
        </div>
      </div>

      {/* Zone 2: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search project ID, highway, port, contractor..."
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (currentPage !== 'projects' && e.target.value.trim().length > 0) {
                onNavigate('projects');
              }
            }}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Zone 3: Notification, User & Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          aria-label="View notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Bell className="h-4 w-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* User Profile Info */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div className="text-left text-xs leading-tight">
            <p className="font-semibold text-slate-900 truncate max-w-[140px]">{user.name.split(',')[0]}</p>
            <p className="text-[11px] text-slate-500 truncate max-w-[140px]">{user.designation}</p>
          </div>
        </div>

        {/* Logout Action */}
        <button
          onClick={onLogout}
          title="Sign Out"
          className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-rose-600 transition-colors whitespace-nowrap"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
