import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  IndianRupee,
  Layers,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Project, AlertItem } from '../types';
import { formatCrores } from '../utils/formatters';

interface DashboardPageProps {
  projects: Project[];
  alerts: AlertItem[];
  onSelectProject: (projectId: string) => void;
  onNavigate: (page: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  projects,
  alerts,
  onSelectProject,
  onNavigate
}) => {
  // Aggregate Metrics
  const totalProjects = projects.length;
  const onTrackProjects = projects.filter(p => p.status === 'On Track').length;
  const delayedProjects = projects.filter(p => p.status === 'Delayed').length;
  const atRiskProjects = projects.filter(p => p.status === 'At Risk').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;

  const totalBudget = projects.reduce((acc, p) => acc + p.approvedCost, 0);
  const totalExpenditure = projects.reduce((acc, p) => acc + p.expenditure, 0);
  const expenditurePercentage = ((totalExpenditure / totalBudget) * 100).toFixed(1);

  // 1. Projects by Status data for Pie Chart
  const statusData = [
    { name: 'On Track', value: onTrackProjects, color: '#10b981' },
    { name: 'Delayed', value: delayedProjects, color: '#f59e0b' },
    { name: 'At Risk', value: atRiskProjects, color: '#ef4444' },
    { name: 'Completed', value: completedProjects, color: '#3b82f6' }
  ];

  // 2. Project Progress Overview Distribution
  const progressBuckets = [
    { range: '0-25%', count: projects.filter(p => p.completionPercentage < 25).length },
    { range: '26-50%', count: projects.filter(p => p.completionPercentage >= 25 && p.completionPercentage < 50).length },
    { range: '51-75%', count: projects.filter(p => p.completionPercentage >= 50 && p.completionPercentage < 75).length },
    { range: '76-99%', count: projects.filter(p => p.completionPercentage >= 75 && p.completionPercentage < 100).length },
    { range: '100%', count: projects.filter(p => p.completionPercentage === 100).length }
  ];

  // 3. Budget vs Expenditure by Ministry / Top Projects
  const budgetVsExpenditure = projects.slice(0, 6).map(p => ({
    name: p.id,
    fullName: p.name,
    budget: p.approvedCost,
    expenditure: p.expenditure,
    utilization: Math.round((p.expenditure / p.approvedCost) * 100)
  }));

  // 4. Monthly Progress Trend (Aggregation of last 6 months)
  const monthlyData = [
    { month: 'Apr 26', target: 51, actual: 49, spend: 3200 },
    { month: 'May 26', target: 54, actual: 52, spend: 3600 },
    { month: 'Jun 26', target: 58, actual: 54, spend: 3450 },
    { month: 'Jul 26', target: 61, actual: 56, spend: 3300 },
    { month: 'Aug 26', target: 64, actual: 58, spend: 3750 },
    { month: 'Sep 26', target: 68, actual: 61, spend: 4100 }
  ];

  // 5. Delay Analysis (Projects with delay in months)
  const delayedProjectsList = [...projects]
    .filter(p => p.delayMonths > 0)
    .sort((a, b) => b.delayMonths - a.delayMonths)
    .slice(0, 6)
    .map(p => ({
      id: p.id,
      name: p.id + ': ' + (p.name.length > 25 ? p.name.substring(0, 22) + '...' : p.name),
      delayMonths: p.delayMonths,
      status: p.status,
      originalDate: p.originalCompletionDate,
      expectedDate: p.expectedCompletionDate
    }));

  return (
    <div className="space-y-6">
      {/* Page Title & Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            National Infrastructure Command Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time multi-sectoral monitoring of capital expenditure, schedule variances, and milestone delivery.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <span>View All Projects</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onNavigate('reports')}
            className="flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>Generate Report</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 6 SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Projects */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Total Projects</span>
            <Layers className="h-4 w-4 text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 tabular-nums">{totalProjects}</p>
          <div className="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
            <span>7 Core Sectors</span>
          </div>
        </div>

        {/* On Track */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">On Track</span>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-700 tabular-nums">{onTrackProjects}</p>
          <div className="mt-2 text-[11px] text-slate-500">
            <span className="font-semibold text-emerald-600">{Math.round((onTrackProjects / totalProjects) * 100)}%</span> of total
          </div>
        </div>

        {/* Delayed */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Delayed</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-700 tabular-nums">{delayedProjects}</p>
          <div className="mt-2 text-[11px] text-slate-500">
            <span className="font-semibold text-amber-600">{Math.round((delayedProjects / totalProjects) * 100)}%</span> active delays
          </div>
        </div>

        {/* At Risk */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">At Risk</span>
            <AlertTriangle className="h-4 w-4 text-rose-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-rose-700 tabular-nums">{atRiskProjects}</p>
          <div className="mt-2 text-[11px] text-slate-500">
            <span className="font-semibold text-rose-600">Requires CCEA review</span>
          </div>
        </div>

        {/* Total Budget */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Total Budget</span>
            <IndianRupee className="h-4 w-4 text-slate-700" />
          </div>
          <p className="mt-2 text-xl font-bold text-slate-900 tabular-nums">
            {formatCrores(totalBudget)}
          </p>
          <div className="mt-2 text-[11px] text-slate-500 truncate">
            Sanctioned CapEx
          </div>
        </div>

        {/* Total Expenditure */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Expenditure</span>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          <p className="mt-2 text-xl font-bold text-blue-700 tabular-nums">
            {formatCrores(totalExpenditure)}
          </p>
          <div className="mt-2 text-[11px] text-slate-500">
            <span className="font-semibold text-blue-700">{expenditurePercentage}%</span> utilized
          </div>
        </div>
      </div>

      {/* CRITICAL WARNING TICKER IF ANY ALERTS */}
      {alerts.some(a => a.severity === 'Critical' && !a.acknowledged) && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-rose-900">
                Early Warning System: Urgent Attention Required
              </p>
              <p className="text-xs text-rose-700">
                P-102 milestone overdue & P-205 expenditure exceeded 82.8% of budget limit.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('risks')}
            className="self-start sm:self-auto rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 transition-colors whitespace-nowrap"
          >
            Review Risks & Alerts
          </button>
        </div>
      )}

      {/* CHARTS ROW 1: Progress Overview & Budget vs Expenditure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Project Progress Overview */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Project Progress Overview</h2>
              <p className="text-[11px] text-slate-500">Distribution of projects across physical completion stages</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Total: {totalProjects} Projects</span>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressBuckets} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value: any) => [`${value} Projects`, 'Count']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Budget vs Expenditure */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Budget vs Expenditure Analysis</h2>
              <p className="text-[11px] text-slate-500">Sanctioned cost vs realized expenditure in ₹ Crores (Major Projects)</p>
            </div>
            <span className="text-xs font-mono text-blue-600 font-semibold">{expenditurePercentage}% avg</span>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetVsExpenditure} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(val) => `₹${val >= 1000 ? `${Math.round(val / 1000)}k` : val}`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [formatCrores(Number(value)), name === 'budget' ? 'Sanctioned Budget' : 'Expenditure']}
                  labelFormatter={(label) => {
                    const match = budgetVsExpenditure.find(b => b.name === label);
                    return match ? `${match.name}: ${match.fullName}` : label;
                  }}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="budget" name="Approved Budget" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expenditure" name="Actual Expenditure" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2: Status Breakdown, Monthly Progress, Delay Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 3: Projects by Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Projects by Status</h2>
                <p className="text-[11px] text-slate-500">Current monitoring classifications</p>
              </div>
            </div>

            <div className="h-48 mt-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} Projects`, name]}
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                  <span className="text-slate-600 text-[11px]">{s.name}</span>
                </div>
                <span className="font-bold text-slate-900 font-mono text-[11px]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Monthly Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Monthly Progress Tracking</h2>
              <p className="text-[11px] text-slate-500">Target % vs Actual % weighted achievement</p>
            </div>
          </div>

          <div className="h-60 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 75]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Progress']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                <Line type="monotone" dataKey="target" name="Target Plan" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="actual" name="Actual Realized" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Delay Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Delay Analysis</h2>
                <p className="text-[11px] text-slate-500">Schedule overrun in months across impacted projects</p>
              </div>
            </div>

            <div className="h-60 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={delayedProjectsList}
                  margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} unit="m" />
                  <YAxis type="category" dataKey="id" tick={{ fontSize: 11, fill: '#1e293b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(val: any) => [`${val} Months Delay`, 'Delay']}
                    labelFormatter={(id) => {
                      const item = delayedProjectsList.find(d => d.id === id);
                      return item ? `${item.name} (${item.status})` : id;
                    }}
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="delayMonths" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK TABLE: Recent High Priority Projects Drilldown */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">High-Impact Infrastructure Watchlist</h2>
            <p className="text-[11px] text-slate-500">Projects with active alerts or capital allocation exceeding ₹10,000 Cr</p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>Full Directory</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                <th className="py-2.5 px-3">Project ID</th>
                <th className="py-2.5 px-3">Project Name</th>
                <th className="py-2.5 px-3">Ministry</th>
                <th className="py-2.5 px-3 text-right">Sanctioned Cost</th>
                <th className="py-2.5 px-3 text-right">Physical %</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.slice(0, 5).map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{project.id}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-900 max-w-xs truncate">{project.name}</td>
                  <td className="py-2.5 px-3 text-slate-600 truncate max-w-[180px]">{project.ministry}</td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-900">
                    {formatCrores(project.approvedCost)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                    <span className="font-semibold text-slate-900">{project.physicalProgress}%</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      project.status === 'On Track' ? 'bg-emerald-50 text-emerald-700' :
                      project.status === 'Delayed' ? 'bg-amber-50 text-amber-700' :
                      project.status === 'At Risk' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[11px] font-semibold ${
                      project.riskLevel === 'Critical' ? 'text-rose-700' :
                      project.riskLevel === 'High' ? 'text-amber-700' :
                      project.riskLevel === 'Medium' ? 'text-blue-700' : 'text-slate-600'
                    }`}>
                      {project.riskLevel}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => onSelectProject(project.id)}
                      className="text-blue-700 hover:text-blue-900 font-semibold text-[11px] hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
