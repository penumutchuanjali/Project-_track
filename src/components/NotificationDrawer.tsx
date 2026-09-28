import React, { useState } from 'react';
import { X, Bell, AlertTriangle, AlertCircle, CheckCircle, Info, ArrowRight, Check } from 'lucide-react';
import { AlertItem } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: AlertItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onSelectProject: (projectId: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onMarkAsRead,
  onMarkAllAsRead,
  onSelectProject
}) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  if (!isOpen) return null;

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'all') return true;
    if (filterSeverity === 'unread') return !a.isRead;
    return a.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />;
      case 'High':
        return <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />;
      default:
        return <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-white shadow-2xl h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">Project Alerts & Directives</h2>
            <span className="text-xs font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
              {alerts.filter(a => !a.isRead).length} unread
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-3 border-b border-slate-200 bg-white flex items-center justify-between gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1">
            {['all', 'unread', 'critical', 'high'].map((item) => (
              <button
                key={item}
                onClick={() => setFilterSeverity(item)}
                className={`px-2.5 py-1 rounded-md font-medium capitalize whitespace-nowrap transition-colors ${
                  filterSeverity === item
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] font-medium text-blue-700 hover:text-blue-900 flex items-center gap-1 shrink-0"
          >
            <Check className="h-3 w-3" /> Mark all read
          </button>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-emerald-500 opacity-60" />
              <p>No notifications match this filter.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg border p-3.5 text-xs transition-all ${
                  alert.isRead
                    ? 'bg-white border-slate-200 opacity-75'
                    : 'bg-blue-50/40 border-blue-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {getAlertIcon(alert.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-semibold text-blue-700">
                        {alert.projectId}
                      </span>
                      <span className="text-[11px] text-slate-400">{alert.date}</span>
                    </div>

                    <p className="font-semibold text-slate-900 mt-0.5 leading-snug">
                      {alert.title}
                    </p>

                    <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                      {alert.description}
                    </p>

                    {alert.actionRequired && (
                      <div className="mt-2 rounded bg-amber-50 border border-amber-200/80 p-2 text-[11px] text-amber-900">
                        <span className="font-semibold">Action Required: </span>
                        {alert.actionRequired}
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          onMarkAsRead(alert.id);
                          onSelectProject(alert.projectId);
                          onClose();
                        }}
                        className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 text-[11px]"
                      >
                        Inspect Project <ArrowRight className="h-3 w-3" />
                      </button>

                      {!alert.isRead && (
                        <button
                          onClick={() => onMarkAsRead(alert.id)}
                          className="text-slate-400 hover:text-slate-600 text-[11px]"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
