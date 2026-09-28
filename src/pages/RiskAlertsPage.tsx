import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Clock,
  TrendingUp,
  FileWarning,
  CheckCircle2,
  Calendar,
  Send,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  Flame,
  Scale
} from 'lucide-react';
import { AlertItem, Project } from '../types';
import { formatCrores } from '../utils/formatters';

interface RiskAlertsPageProps {
  alerts: AlertItem[];
  projects: Project[];
  onAcknowledgeAlert: (id: string) => void;
  onSelectProject: (projectId: string) => void;
}

export const RiskAlertsPage: React.FC<RiskAlertsPageProps> = ({
  alerts,
  projects,
  onAcknowledgeAlert,
  onSelectProject
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [acknowledgedMessage, setAcknowledgedMessage] = useState<string | null>(null);

  // Categorize alerts automatically
  const categorized = useMemo(() => {
    return {
      overdueMilestone: alerts.filter(a => a.type === 'OVERDUE_MILESTONE'),
      expenseSpike: alerts.filter(a => a.type === 'EXPENSE_SPIKE'),
      behindSchedule: alerts.filter(a => a.type === 'DELAY'),
      costOverrun: alerts.filter(a => a.type === 'COST_OVERRUN'),
      deadlineApproaching: alerts.filter(a => a.type === 'DEADLINE_APPROACHING'),
      criticalCount: alerts.filter(a => a.severity === 'Critical').length,
      highCount: alerts.filter(a => a.severity === 'High').length,
      unacknowledgedCount: alerts.filter(a => !a.acknowledged).length
    };
  }, [alerts]);

  const filteredAlerts = alerts.filter(alert => {
    const matchSeverity = selectedSeverity === 'All' || alert.severity === selectedSeverity;
    const matchType = selectedType === 'All' || alert.type === selectedType;
    return matchSeverity && matchType;
  });

  const handleAcknowledge = (id: string, title: string) => {
    onAcknowledgeAlert(id);
    setAcknowledgedMessage(`Notice acknowledged & memo queued for "${title}"`);
    setTimeout(() => {
      setAcknowledgedMessage(null);
    }, 3000);
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'OVERDUE_MILESTONE':
        return { label: 'Milestone Overdue', icon: Clock, color: 'text-amber-800 bg-amber-50 border-amber-200' };
      case 'EXPENSE_SPIKE':
        return { label: 'Expenditure Spike', icon: TrendingUp, color: 'text-rose-800 bg-rose-50 border-rose-200' };
      case 'DEADLINE_APPROACHING':
        return { label: 'Deadline Approaching', icon: Calendar, color: 'text-red-800 bg-red-50 border-red-200' };
      case 'COST_OVERRUN':
        return { label: 'Cost Overrun Risk', icon: Scale, color: 'text-orange-800 bg-orange-50 border-orange-200' };
      case 'DELAY':
        return { label: 'Behind Schedule', icon: AlertTriangle, color: 'text-amber-800 bg-amber-50 border-amber-200' };
      default:
        return { label: 'Statutory Notice', icon: FileWarning, color: 'text-blue-800 bg-blue-50 border-blue-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Early Warning & Risk Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated intelligence identifying delays, expenditure breaches, overdue milestones, and critical path bottlenecks.
          </p>
        </div>
      </div>

      {/* ACTION BANNER IF ANY ACKNOWLEDGEMENT */}
      {acknowledgedMessage && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{acknowledgedMessage}</span>
        </div>
      )}

      {/* 5 AUTOMATIC EARLY WARNING INDICATOR CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* 1. Behind Schedule */}
        <div
          onClick={() => setSelectedType(selectedType === 'DELAY' ? 'All' : 'DELAY')}
          className={`cursor-pointer rounded-xl border p-4 transition-all ${
            selectedType === 'DELAY'
              ? 'border-amber-500 ring-2 ring-amber-200 bg-amber-50/40'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Behind Schedule</span>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-bold font-mono text-amber-700">
            {categorized.behindSchedule.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Physical gap &gt; 10%</p>
        </div>

        {/* 2. Rapid Expenditure */}
        <div
          onClick={() => setSelectedType(selectedType === 'EXPENSE_SPIKE' ? 'All' : 'EXPENSE_SPIKE')}
          className={`cursor-pointer rounded-xl border p-4 transition-all ${
            selectedType === 'EXPENSE_SPIKE'
              ? 'border-rose-500 ring-2 ring-rose-200 bg-rose-50/40'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Expenditure Spike</span>
            <TrendingUp className="h-4 w-4 text-rose-600" />
          </div>
          <p className="mt-2 text-2xl font-bold font-mono text-rose-700">
            {categorized.expenseSpike.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Crossed 80% budget</p>
        </div>

        {/* 3. Overdue Milestone */}
        <div
          onClick={() => setSelectedType(selectedType === 'OVERDUE_MILESTONE' ? 'All' : 'OVERDUE_MILESTONE')}
          className={`cursor-pointer rounded-xl border p-4 transition-all ${
            selectedType === 'OVERDUE_MILESTONE'
              ? 'border-red-500 ring-2 ring-red-200 bg-red-50/40'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Milestone Overdue</span>
            <Clock className="h-4 w-4 text-red-600" />
          </div>
          <p className="mt-2 text-2xl font-bold font-mono text-red-700">
            {categorized.overdueMilestone.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Target date lapsed</p>
        </div>

        {/* 4. Cost Overrun Risk */}
        <div
          onClick={() => setSelectedType(selectedType === 'COST_OVERRUN' ? 'All' : 'COST_OVERRUN')}
          className={`cursor-pointer rounded-xl border p-4 transition-all ${
            selectedType === 'COST_OVERRUN'
              ? 'border-orange-500 ring-2 ring-orange-200 bg-orange-50/40'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Cost Overrun</span>
            <Scale className="h-4 w-4 text-orange-600" />
          </div>
          <p className="mt-2 text-2xl font-bold font-mono text-orange-700">
            {categorized.costOverrun.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Variations pending</p>
        </div>

        {/* 5. Deadline Approaching */}
        <div
          onClick={() => setSelectedType(selectedType === 'DEADLINE_APPROACHING' ? 'All' : 'DEADLINE_APPROACHING')}
          className={`cursor-pointer rounded-xl border p-4 transition-all ${
            selectedType === 'DEADLINE_APPROACHING'
              ? 'border-rose-600 ring-2 ring-rose-200 bg-rose-50/40'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Deadline Near</span>
            <Flame className="h-4 w-4 text-rose-600" />
          </div>
          <p className="mt-2 text-2xl font-bold font-mono text-rose-700">
            {categorized.deadlineApproaching.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">&lt; 90 days to close</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-700">Filter Severity:</span>
          {['All', 'Critical', 'High', 'Medium', 'Info'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                selectedSeverity === sev
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {selectedType !== 'All' && (
            <button
              onClick={() => setSelectedType('All')}
              className="text-blue-700 hover:text-blue-900 font-medium underline text-[11px]"
            >
              Clear type filter ({selectedType})
            </button>
          )}
          <span className="text-slate-400">
            Showing <strong className="text-slate-800">{filteredAlerts.length}</strong> alerts
          </span>
        </div>
      </div>

      {/* NOTIFICATION & WARNING CARDS LIST */}
      <div className="space-y-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
            <p className="font-medium text-slate-700">No active alerts match selected criteria.</p>
            <p className="text-xs text-slate-400 mt-1">All monitoring thresholds within acceptable tolerances.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const badge = getTypeBadge(alert.type);
            const BadgeIcon = badge.icon;
            const project = projects.find(p => p.id === alert.projectId);

            return (
              <div
                key={alert.id}
                className={`rounded-xl border p-5 shadow-xs transition-all ${
                  alert.severity === 'Critical'
                    ? 'border-rose-300 bg-white ring-1 ring-rose-200/50'
                    : alert.severity === 'High'
                    ? 'border-amber-300 bg-white ring-1 ring-amber-200/50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    {/* Tag Row */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
                        <BadgeIcon className="h-3 w-3" />
                        {badge.label}
                      </span>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        alert.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.severity} Severity
                      </span>

                      <span className="font-mono font-bold text-blue-700">
                        {alert.projectId}
                      </span>

                      <span className="text-slate-400">·</span>
                      <span className="text-[11px] text-slate-500 font-mono">{alert.date}</span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {alert.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {alert.description}
                    </p>

                    {/* Project context strip if matched */}
                    {project && (
                      <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/80 flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
                        <span><strong>Project:</strong> {project.name}</span>
                        <span>·</span>
                        <span><strong>Budget:</strong> {formatCrores(project.approvedCost)}</span>
                        <span>·</span>
                        <span><strong>Physical:</strong> {project.physicalProgress}%</span>
                        <span>·</span>
                        <span><strong>Delay:</strong> {project.delayMonths} months</span>
                      </div>
                    )}

                    {/* Recommended Action */}
                    {alert.actionRequired && (
                      <div className="rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900">
                        <span className="font-bold">Required Statutory Action: </span>
                        {alert.actionRequired}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex sm:flex-col items-center lg:items-end gap-2 shrink-0 pt-2 lg:pt-0">
                    <button
                      onClick={() => onSelectProject(alert.projectId)}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 text-xs font-semibold shadow-xs transition-colors"
                    >
                      <span>Inspect Project</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    {!alert.acknowledged ? (
                      <button
                        onClick={() => handleAcknowledge(alert.id, alert.title)}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 text-xs font-medium transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Acknowledge Notice</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 py-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        Acknowledged
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
