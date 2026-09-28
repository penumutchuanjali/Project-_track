import React from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  AlertTriangle,
  Building,
  FileSpreadsheet,
  MapPin,
  BellRing,
  ExternalLink,
  Info
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  unreadAlertsCount: number;
  criticalRisksCount: number;
  totalProjectsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  unreadAlertsCount,
  criticalRisksCount,
  totalProjectsCount
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderGit2,
      badge: totalProjectsCount.toString()
    },
    {
      id: 'details',
      label: 'Project Details',
      icon: FileText,
      badge: null
    },
    {
      id: 'risks',
      label: 'Risks & Alerts',
      icon: AlertTriangle,
      badge: criticalRisksCount > 0 ? `${criticalRisksCount} critical` : null,
      badgeColor: 'bg-rose-100 text-rose-700'
    },
    {
      id: 'ministry',
      label: 'Ministries / Depts',
      icon: Building,
      badge: null
    },
    {
      id: 'map',
      label: 'Interactive Map',
      icon: MapPin,
      badge: null
    },
    {
      id: 'reports',
      label: 'Reports & Export',
      icon: FileSpreadsheet,
      badge: null
    }
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none">
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* National Portal Indicator */}
        <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/80">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
            <span>National Infrastructure</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-900">PM GatiShakti & Mega Projects</p>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60 pt-1.5 font-mono">
            <span>Live Sync Active</span>
            <span>v4.2-NIC</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Monitoring Modules
          </p>
          <div className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`ml-2 px-1.5 py-0.5 text-[10px] font-medium rounded-md shrink-0 ${
                        item.badgeColor ? item.badgeColor : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Sidebar Footer info */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Info className="h-4 w-4 text-blue-600 shrink-0" />
          <p className="text-[11px] leading-tight text-slate-600">
            Cabinet Committee on Investment (CCI) Project Monitoring Cell
          </p>
        </div>
      </div>
    </aside>
  );
};
