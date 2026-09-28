import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Plus,
  Eye,
  SlidersHorizontal,
  X,
  FileSpreadsheet,
  Building,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Project, ProjectStatus, RiskLevel } from '../types';
import { formatCrores, formatDate, getStatusColor, getRiskColor } from '../utils/formatters';
import { exportProjectsToCSV } from '../utils/exportUtils';

interface ProjectsPageProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddProject?: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  onSelectProject,
  searchQuery,
  onSearchChange,
  onAddProject
}) => {
  const [selectedMinistry, setSelectedMinistry] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('costDesc');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form state for adding project
  const [newProject, setNewProject] = useState({
    id: `P-${Math.floor(100 + Math.random() * 900)}`,
    name: '',
    ministry: 'Ministry of Road Transport & Highways',
    department: 'NHAI',
    sector: 'Highways & Expressways',
    city: '',
    state: '',
    approvedCost: 5000,
    expenditure: 1200,
    physicalProgress: 25,
    startDate: '2023-01-01',
    expectedCompletionDate: '2027-12-31',
    status: 'On Track' as ProjectStatus,
    riskLevel: 'Low' as RiskLevel
  });

  // Extract unique ministries
  const ministries = useMemo(() => {
    const list = Array.from(new Set(projects.map(p => p.ministry)));
    return ['All', ...list];
  }, [projects]);

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let result = projects.filter(p => {
      // Search filter
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.location.state.toLowerCase().includes(q) ||
        p.contractor.toLowerCase().includes(q) ||
        p.ministry.toLowerCase().includes(q);

      // Ministry filter
      const matchMinistry = selectedMinistry === 'All' || p.ministry === selectedMinistry;

      // Status filter
      const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;

      // Risk filter
      const matchRisk = selectedRisk === 'All' || p.riskLevel === selectedRisk;

      return matchSearch && matchMinistry && matchStatus && matchRisk;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'costDesc') return b.approvedCost - a.approvedCost;
      if (sortBy === 'costAsc') return a.approvedCost - b.approvedCost;
      if (sortBy === 'progressDesc') return b.completionPercentage - a.completionPercentage;
      if (sortBy === 'progressAsc') return a.completionPercentage - b.completionPercentage;
      if (sortBy === 'delayDesc') return b.delayMonths - a.delayMonths;
      if (sortBy === 'expectedDate') return new Date(a.expectedCompletionDate).getTime() - new Date(b.expectedCompletionDate).getTime();
      return 0;
    });

    return result;
  }, [projects, searchQuery, selectedMinistry, selectedStatus, selectedRisk, sortBy]);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name) return;

    const created: Project = {
      id: newProject.id,
      name: newProject.name,
      ministry: newProject.ministry,
      department: newProject.department,
      sector: newProject.sector,
      location: {
        city: newProject.city || 'National Corridor',
        state: newProject.state || 'India',
        coordinates: [20.5937, 78.9629],
        mapRegion: 'Central',
        svgX: 45,
        svgY: 50
      },
      approvedCost: Number(newProject.approvedCost),
      expenditure: Number(newProject.expenditure),
      physicalProgress: Number(newProject.physicalProgress),
      financialProgress: Math.round((Number(newProject.expenditure) / Number(newProject.approvedCost)) * 100),
      completionPercentage: Number(newProject.physicalProgress),
      startDate: newProject.startDate,
      expectedCompletionDate: newProject.expectedCompletionDate,
      originalCompletionDate: newProject.expectedCompletionDate,
      delayMonths: 0,
      status: newProject.status,
      riskLevel: newProject.riskLevel,
      stage: 'Construction',
      projectDirector: 'Er. Vivek Sharma',
      contractor: 'EPC Contractor Joint Venture',
      description: `Major infrastructure asset under ${newProject.ministry}.`,
      milestones: [
        { id: `${newProject.id}-M1`, title: 'Feasibility & Statutory Approvals', targetDate: '2023-06-30', completionDate: '2023-06-15', status: 'Completed', weightage: 30, details: 'All clearances secured.' },
        { id: `${newProject.id}-M2`, title: 'Civil Works Package 1', targetDate: newProject.expectedCompletionDate, status: 'Pending', weightage: 70, details: 'Active execution.' }
      ],
      documents: [
        { id: `${newProject.id}-D1`, name: 'Detailed Project Report (DPR)', type: 'PDF', uploadDate: '2023-01-10', fileSize: '18.4 MB', status: 'Verified', category: 'DPR' }
      ],
      risks: [],
      updates: [
        { id: `${newProject.id}-U1`, date: '2026-09-20', author: 'Project Director', designation: 'SE', summary: 'Project onboarded into ProjectDrishti system.', type: 'Milestone' }
      ],
      monthlyProgress: [
        { month: 'Apr 2026', targetProgress: 20, actualProgress: 20, expenditure: 100 },
        { month: 'Sep 2026', targetProgress: 25, actualProgress: 25, expenditure: 120 }
      ]
    };

    if (onAddProject) {
      onAddProject(created);
    }
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Infrastructure Projects Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed ledger of national infrastructure assets with real-time status, financial utilization, and progress milestones.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportProjectsToCSV(filteredProjects)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
            title="Download CSV"
          >
            <Download className="h-3.5 w-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Onboard Project</span>
          </button>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, name, location, contractor..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-1.5 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Ministry Filter */}
          <div>
            <select
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-1.5 px-3 text-xs text-slate-900 focus:border-blue-600 focus:outline-hidden focus:ring-1 focus:ring-blue-600 bg-white"
            >
              <option value="All">All Ministries</option>
              {ministries.filter(m => m !== 'All').map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-1.5 px-3 text-xs text-slate-900 focus:border-blue-600 focus:outline-hidden focus:ring-1 focus:ring-blue-600 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="On Track">On Track</option>
              <option value="Delayed">Delayed</option>
              <option value="At Risk">At Risk</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-1.5 px-3 text-xs text-slate-900 focus:border-blue-600 focus:outline-hidden focus:ring-1 focus:ring-blue-600 bg-white"
            >
              <option value="All">All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
              <option value="Critical">Critical Risk</option>
            </select>
          </div>
        </div>

        {/* Second Row: Sort & Active Filters Summary */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-slate-300 py-1 px-2.5 text-xs text-slate-900 bg-white focus:outline-hidden focus:border-blue-600"
            >
              <option value="costDesc">Highest Approved Cost (₹ Cr)</option>
              <option value="costAsc">Lowest Approved Cost (₹ Cr)</option>
              <option value="progressDesc">Highest Completion %</option>
              <option value="progressAsc">Lowest Completion %</option>
              <option value="delayDesc">Maximum Delay (Months)</option>
              <option value="expectedDate">Earliest Expected Completion</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">
              Showing <span className="font-bold text-slate-900 tabular-nums">{filteredProjects.length}</span> of {projects.length} projects
            </span>
            {(selectedMinistry !== 'All' || selectedStatus !== 'All' || selectedRisk !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedMinistry('All');
                  setSelectedStatus('All');
                  setSelectedRisk('All');
                  onSearchChange('');
                }}
                className="text-blue-700 hover:text-blue-900 font-medium underline text-[11px]"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PROJECTS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600">
                <th className="py-3 px-3.5 whitespace-nowrap">Project ID</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Project Name</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Ministry / Dept</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Location</th>
                <th className="py-3 px-3.5 whitespace-nowrap text-right">Approved Cost</th>
                <th className="py-3 px-3.5 whitespace-nowrap text-right">Expenditure</th>
                <th className="py-3 px-3.5 whitespace-nowrap text-center">Completion %</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Start Date</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Expected End</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Status</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Risk Level</th>
                <th className="py-3 px-3.5 whitespace-nowrap text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    <p className="font-medium text-slate-600">No infrastructure projects match your filters.</p>
                    <p className="text-[11px] mt-1">Try resetting search keywords or changing the ministry filter.</p>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  const statusStyling = getStatusColor(p.status);
                  const riskStyling = getRiskColor(p.riskLevel);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                      {/* ID */}
                      <td className="py-3 px-3.5 font-mono font-bold text-blue-700 whitespace-nowrap">
                        {p.id}
                      </td>

                      {/* Name */}
                      <td className="py-3 px-3.5 max-w-[240px]">
                        <p className="font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-700 transition-colors" title={p.name}>
                          {p.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{p.sector}</p>
                      </td>

                      {/* Ministry */}
                      <td className="py-3 px-3.5 max-w-[190px]">
                        <p className="font-medium text-slate-800 truncate" title={p.ministry}>{p.ministry}</p>
                        <p className="text-[10px] text-slate-400 truncate">{p.department}</p>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="text-slate-800">{p.location.city}</span>
                        <span className="text-[10px] text-slate-400 block">{p.location.state}</span>
                      </td>

                      {/* Approved Cost */}
                      <td className="py-3 px-3.5 text-right font-mono tabular-nums font-semibold text-slate-900 whitespace-nowrap">
                        {formatCrores(p.approvedCost)}
                      </td>

                      {/* Expenditure */}
                      <td className="py-3 px-3.5 text-right font-mono tabular-nums text-slate-700 whitespace-nowrap">
                        <div>{formatCrores(p.expenditure)}</div>
                        <span className="text-[10px] text-slate-400">
                          {((p.expenditure / p.approvedCost) * 100).toFixed(0)}% spent
                        </span>
                      </td>

                      {/* Completion % with progress mini-bar */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <div className="flex flex-col items-center">
                          <span className="font-mono font-bold text-slate-900 tabular-nums">
                            {p.completionPercentage}%
                          </span>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                p.status === 'On Track' ? 'bg-emerald-600' :
                                p.status === 'Delayed' ? 'bg-amber-500' :
                                p.status === 'At Risk' ? 'bg-rose-500' : 'bg-blue-600'
                              }`}
                              style={{ width: `${Math.min(p.completionPercentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Start Date */}
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-600 font-mono text-[11px]">
                        {formatDate(p.startDate)}
                      </td>

                      {/* Expected Completion Date */}
                      <td className="py-3 px-3.5 whitespace-nowrap font-mono text-[11px]">
                        <span className={p.delayMonths > 0 ? 'text-amber-700 font-semibold' : 'text-slate-600'}>
                          {formatDate(p.expectedCompletionDate)}
                        </span>
                        {p.delayMonths > 0 && (
                          <span className="block text-[10px] text-amber-600 font-sans">
                            +{p.delayMonths} mo delay
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusStyling.bg} ${statusStyling.text} ${statusStyling.border}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusStyling.dot}`}></span>
                          {p.status}
                        </span>
                      </td>

                      {/* Risk Level */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${riskStyling.bg} ${riskStyling.text} ${riskStyling.border}`}>
                          {p.riskLevel}
                        </span>
                      </td>

                      {/* View Button */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <button
                          onClick={() => onSelectProject(p.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-blue-50 hover:bg-blue-700 text-blue-700 hover:text-white px-2.5 py-1 text-[11px] font-semibold transition-colors"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD PROJECT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden my-8">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Onboard New Mega Project</h3>
                <p className="text-[11px] text-slate-500">Register infrastructure initiative into ProjectDrishti</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project ID</label>
                  <input
                    type="text"
                    required
                    value={newProject.id}
                    onChange={(e) => setNewProject({ ...newProject, id: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-3 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sector</label>
                  <input
                    type="text"
                    required
                    value={newProject.sector}
                    onChange={(e) => setNewProject({ ...newProject, sector: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-3"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chenab Arch Railway Bridge & Tunnel Section"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 py-1.5 px-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ministry</label>
                  <select
                    value={newProject.ministry}
                    onChange={(e) => setNewProject({ ...newProject, ministry: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-2.5 bg-white"
                  >
                    <option value="Ministry of Road Transport & Highways">MoRTH</option>
                    <option value="Ministry of Railways">Railways</option>
                    <option value="Ministry of Civil Aviation">Civil Aviation</option>
                    <option value="Ministry of Housing & Urban Affairs">MoHUA</option>
                    <option value="Ministry of Ports, Shipping and Waterways">MoPSW</option>
                    <option value="Ministry of Power & New and Renewable Energy">Power & MNRE</option>
                    <option value="Ministry of Jal Shakti">Jal Shakti</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Executing Department</label>
                  <input
                    type="text"
                    required
                    value={newProject.department}
                    onChange={(e) => setNewProject({ ...newProject, department: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Varanasi"
                    value={newProject.city}
                    onChange={(e) => setNewProject({ ...newProject, city: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-3"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State / UT</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttar Pradesh"
                    value={newProject.state}
                    onChange={(e) => setNewProject({ ...newProject, state: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Approved Cost (₹ Cr)</label>
                  <input
                    type="number"
                    required
                    value={newProject.approvedCost}
                    onChange={(e) => setNewProject({ ...newProject, approvedCost: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-3 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expenditure (₹ Cr)</label>
                  <input
                    type="number"
                    required
                    value={newProject.expenditure}
                    onChange={(e) => setNewProject({ ...newProject, expenditure: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-3 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Physical Completion %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={newProject.physicalProgress}
                    onChange={(e) => setNewProject({ ...newProject, physicalProgress: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-3 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expected Completion</label>
                  <input
                    type="date"
                    required
                    value={newProject.expectedCompletionDate}
                    onChange={(e) => setNewProject({ ...newProject, expectedCompletionDate: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-3"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Initial Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as ProjectStatus })}
                    className="w-full rounded-lg border border-slate-300 py-1.5 px-2.5 bg-white"
                  >
                    <option value="On Track">On Track</option>
                    <option value="Delayed">Delayed</option>
                    <option value="At Risk">At Risk</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-700 px-4 py-2 text-white font-semibold hover:bg-blue-800"
                >
                  Save Project to Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
