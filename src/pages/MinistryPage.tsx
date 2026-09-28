import React, { useState, useMemo } from 'react';
import {
  Building,
  Building2,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  IndianRupee,
  Layers
} from 'lucide-react';
import { Project, MinistrySummary } from '../types';
import { formatCrores, getStatusColor, getRiskColor } from '../utils/formatters';

interface MinistryPageProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

export const MinistryPage: React.FC<MinistryPageProps> = ({
  projects,
  onSelectProject
}) => {
  const [expandedMinistry, setExpandedMinistry] = useState<string | null>(null);

  // Group and calculate statistics for each ministry
  const ministrySummaries = useMemo<MinistrySummary[]>(() => {
    const map = new Map<string, Project[]>();

    projects.forEach(p => {
      const list = map.get(p.ministry) || [];
      list.push(p);
      map.set(p.ministry, list);
    });

    const summaries: MinistrySummary[] = [];

    map.forEach((pList, ministryName) => {
      const totalCost = pList.reduce((acc, p) => acc + p.approvedCost, 0);
      const totalExpenditure = pList.reduce((acc, p) => acc + p.expenditure, 0);
      const avgCompletion = Math.round(
        pList.reduce((acc, p) => acc + p.completionPercentage, 0) / pList.length
      );
      const delayedCount = pList.filter(p => p.status === 'Delayed').length;
      const atRiskCount = pList.filter(p => p.status === 'At Risk').length;
      const onTrackCount = pList.filter(p => p.status === 'On Track').length;
      const completedCount = pList.filter(p => p.status === 'Completed').length;

      // Extract short name
      let shortName = ministryName;
      if (ministryName.includes('Road Transport')) shortName = 'MoRTH';
      else if (ministryName.includes('Railways')) shortName = 'Indian Railways';
      else if (ministryName.includes('Civil Aviation')) shortName = 'MoCA';
      else if (ministryName.includes('Housing & Urban')) shortName = 'MoHUA';
      else if (ministryName.includes('Ports, Shipping')) shortName = 'MoPSW';
      else if (ministryName.includes('Power & New')) shortName = 'MoP & MNRE';
      else if (ministryName.includes('Jal Shakti')) shortName = 'Jal Shakti';

      summaries.push({
        ministry: ministryName,
        shortName,
        projectCount: pList.length,
        totalCost,
        totalExpenditure,
        avgCompletion,
        delayedCount,
        atRiskCount,
        onTrackCount,
        completedCount
      });
    });

    // Sort by total cost descending
    return summaries.sort((a, b) => b.totalCost - a.totalCost);
  }, [projects]);

  const toggleExpand = (ministry: string) => {
    setExpandedMinistry(expandedMinistry === ministry ? null : ministry);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Ministry & Department Portfolios
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregated CapEx oversight, completion rates, and delay distributions grouped by central nodal ministries.
          </p>
        </div>
      </div>

      {/* DEPARTMENT CARDS GRID */}
      <div className="space-y-4">
        {ministrySummaries.map((summary) => {
          const isExpanded = expandedMinistry === summary.ministry;
          const deptProjects = projects.filter(p => p.ministry === summary.ministry);
          const utilizationRate = ((summary.totalExpenditure / summary.totalCost) * 100).toFixed(1);

          return (
            <div
              key={summary.ministry}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              {/* Card Header & Key Stats */}
              <div
                onClick={() => toggleExpand(summary.ministry)}
                className="p-5 cursor-pointer hover:bg-slate-50/60 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none"
              >
                <div className="flex items-start gap-3.5 max-w-md">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {summary.shortName}
                      </span>
                      <span className="text-[11px] text-slate-400">·</span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {summary.projectCount} {summary.projectCount === 1 ? 'Project' : 'Projects'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {summary.ministry}
                    </h3>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-6 text-xs border-t lg:border-t-0 border-slate-100 pt-3 lg:pt-0">
                  {/* Total Cost */}
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Total CapEx</p>
                    <p className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                      {formatCrores(summary.totalCost)}
                    </p>
                  </div>

                  {/* Total Expenditure */}
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Expenditure</p>
                    <p className="font-mono font-bold text-blue-700 text-sm tabular-nums">
                      {formatCrores(summary.totalExpenditure)}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">({utilizationRate}%)</span>
                  </div>

                  {/* Avg Completion */}
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Avg Completion</p>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                        {summary.avgCompletion}%
                      </span>
                    </div>
                    <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${summary.avgCompletion}%` }}
                      />
                    </div>
                  </div>

                  {/* Delayed Projects */}
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Delayed</p>
                    <p className={`font-mono font-bold text-sm ${summary.delayedCount > 0 ? 'text-amber-700' : 'text-slate-400'}`}>
                      {summary.delayedCount}
                    </p>
                  </div>

                  {/* At-Risk Projects */}
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">At Risk</p>
                    <p className={`font-mono font-bold text-sm ${summary.atRiskCount > 0 ? 'text-rose-700' : 'text-slate-400'}`}>
                      {summary.atRiskCount}
                    </p>
                  </div>
                </div>

                {/* Expand Toggle */}
                <div className="flex items-center justify-end gap-2 text-slate-400">
                  <span className="text-xs font-semibold text-blue-700 hidden sm:inline">
                    {isExpanded ? 'Hide Projects' : 'View Projects'}
                  </span>
                  <div className="p-1 rounded-md bg-slate-100 text-slate-600">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>
              </div>

              {/* EXPANDED PROJECT DRILL-DOWN TABLE */}
              {isExpanded && (
                <div className="border-t border-slate-200 bg-slate-50/50 p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600">
                          <th className="py-2.5 px-3">ID</th>
                          <th className="py-2.5 px-3">Project Title</th>
                          <th className="py-2.5 px-3">Executing Dept</th>
                          <th className="py-2.5 px-3 text-right">Sanctioned Cost</th>
                          <th className="py-2.5 px-3 text-right">Physical %</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Risk Level</th>
                          <th className="py-2.5 px-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {deptProjects.map((p) => {
                          const statusStyling = getStatusColor(p.status);
                          const riskStyling = getRiskColor(p.riskLevel);
                          return (
                            <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2.5 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                                {p.id}
                              </td>
                              <td className="py-2.5 px-3 font-medium text-slate-900 max-w-xs truncate">
                                {p.name}
                              </td>
                              <td className="py-2.5 px-3 text-slate-600 max-w-[150px] truncate">
                                {p.department}
                              </td>
                              <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-900 whitespace-nowrap">
                                {formatCrores(p.approvedCost)}
                              </td>
                              <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-slate-900 whitespace-nowrap">
                                {p.physicalProgress}%
                              </td>
                              <td className="py-2.5 px-3 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusStyling.bg} ${statusStyling.text}`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${riskStyling.bg} ${riskStyling.text}`}>
                                  {p.riskLevel}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-center whitespace-nowrap">
                                <button
                                  onClick={() => onSelectProject(p.id)}
                                  className="text-blue-700 hover:text-blue-900 font-semibold text-[11px] underline"
                                >
                                  View Dossier
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
