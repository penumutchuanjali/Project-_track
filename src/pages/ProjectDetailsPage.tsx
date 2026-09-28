import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Building2,
  MapPin,
  IndianRupee,
  TrendingUp,
  Clock,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
  Download,
  Plus,
  User,
  ShieldCheck,
  Share2,
  Printer
} from 'lucide-react';
import { Project, Milestone, ProjectRisk, ProjectDocument, ProjectUpdate } from '../types';
import { formatCrores, formatDate, getStatusColor, getRiskColor } from '../utils/formatters';

interface ProjectDetailsPageProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onBack: () => void;
}

export const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({
  project,
  allProjects,
  onSelectProject,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'milestones' | 'risks' | 'documents' | 'updates'>('milestones');
  const [downloadSuccessDoc, setDownloadSuccessDoc] = useState<string | null>(null);

  // Stages array for Timeline
  const stages = ['Planning', 'Approval', 'Tender', 'Construction', 'Completed'] as const;
  const currentStageIndex = stages.indexOf(project.stage as any);

  // Group milestones
  const completedMilestones = project.milestones.filter(m => m.status === 'Completed');
  const pendingMilestones = project.milestones.filter(m => m.status === 'Pending');
  const delayedMilestones = project.milestones.filter(m => m.status === 'Delayed');

  const statusStyle = getStatusColor(project.status);
  const riskStyle = getRiskColor(project.riskLevel);

  const handleSimulateDownload = (docName: string) => {
    setDownloadSuccessDoc(docName);
    setTimeout(() => {
      setDownloadSuccessDoc(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation & Project Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Projects</span>
          </button>

          <span className="text-slate-300">|</span>

          {/* Quick Project Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden md:inline">Switch Project:</span>
            <select
              value={project.id}
              onChange={(e) => onSelectProject(e.target.value)}
              className="rounded-lg border border-slate-300 py-1.5 px-2.5 text-xs font-mono font-medium text-slate-900 bg-white focus:outline-hidden focus:border-blue-600 max-w-xs truncate"
            >
              {allProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id}: {p.name.length > 40 ? p.name.substring(0, 38) + '...' : p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <Printer className="h-3.5 w-3.5 text-slate-500" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* HEADER CARD */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                {project.id}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 font-medium">{project.sector}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600">{project.department}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug">
              {project.name}
            </h1>

            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {project.description}
            </p>
          </div>

          <div className="flex sm:flex-col items-end gap-2 shrink-0">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
              <span className={`h-2 w-2 rounded-full ${statusStyle.dot}`}></span>
              <span>{project.status}</span>
            </div>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${riskStyle.bg} ${riskStyle.text} ${riskStyle.border}`}>
              Risk: {project.riskLevel}
            </div>
          </div>
        </div>

        {/* Quick Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-start gap-2 text-slate-600">
            <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Location</p>
              <p className="font-semibold text-slate-900">{project.location.city}, {project.location.state}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-600">
            <Building2 className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Nodal Ministry</p>
              <p className="font-semibold text-slate-900 truncate max-w-[160px]" title={project.ministry}>{project.ministry}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-600">
            <User className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Project Director</p>
              <p className="font-semibold text-slate-900">{project.projectDirector}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-600">
            <ShieldCheck className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Contractor / JV</p>
              <p className="font-semibold text-slate-900 truncate max-w-[160px]" title={project.contractor}>{project.contractor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESS TIMELINE (Planning → Approval → Tender → Construction → Completed) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Statutory Project Lifecycle Timeline
          </h2>
          <span className="text-xs font-mono font-semibold text-blue-700">
            Active Stage: {project.stage}
          </span>
        </div>

        <div className="relative flex items-center justify-between py-2">
          {/* Background Connecting Bar */}
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-slate-200 z-0"></div>
          {/* Active Fill Bar */}
          <div
            className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-blue-600 z-0 transition-all duration-500"
            style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
          ></div>

          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div key={stage} className="relative z-10 flex flex-col items-center group">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                    isCompleted
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : isCurrent
                      ? 'border-blue-600 bg-white text-blue-700 ring-4 ring-blue-100'
                      : 'border-slate-300 bg-white text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isCurrent ? 'text-blue-700 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FINANCIAL & SCHEDULE METRICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Approved Cost */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Approved Cost</span>
          <p className="mt-1 text-xl font-bold font-mono text-slate-900 tabular-nums">
            {formatCrores(project.approvedCost)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">CCEA Sanctioned</p>
        </div>

        {/* Current Expenditure */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Current Expenditure</span>
          <p className="mt-1 text-xl font-bold font-mono text-blue-700 tabular-nums">
            {formatCrores(project.expenditure)}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
            <span className="font-semibold text-blue-700 font-mono">{project.financialProgress}%</span>
            <span>budget utilized</span>
          </div>
        </div>

        {/* Physical Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Physical Progress</span>
            <span className="text-xs font-mono font-bold text-slate-900">{project.physicalProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${project.physicalProgress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">Site Verified</p>
        </div>

        {/* Schedule & Dates */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Expected Delivery</span>
          <p className="mt-1 text-sm font-bold font-mono text-slate-900">
            {formatDate(project.expectedCompletionDate)}
          </p>
          <div className="flex items-center gap-1 text-[11px] mt-1">
            <span className="text-slate-400">Started: {formatDate(project.startDate)}</span>
            {project.delayMonths > 0 && (
              <span className="text-amber-700 font-semibold font-mono">(+{project.delayMonths}m)</span>
            )}
          </div>
        </div>
      </div>

      {/* DOWNLOAD NOTIFICATION BANNER IF SIMULATED */}
      {downloadSuccessDoc && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Successfully downloaded certified document: <strong>{downloadSuccessDoc}</strong></span>
          </div>
          <span className="text-[10px] text-emerald-600 font-mono">SHA-256 Verified</span>
        </div>
      )}

      {/* TABBED DEEP-DIVE SECTIONS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-4 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('milestones')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'milestones'
                ? 'border-blue-600 text-blue-700 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Milestones ({project.milestones.length})</span>
            {delayedMilestones.length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {delayedMilestones.length} delayed
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('risks')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'risks'
                ? 'border-blue-600 text-blue-700 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Issues & Risks ({project.risks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'documents'
                ? 'border-blue-600 text-blue-700 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Project Documents ({project.documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'updates'
                ? 'border-blue-600 text-blue-700 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Recent Updates ({project.updates.length})</span>
          </button>
        </div>

        {/* Tab 1: Milestones */}
        {activeTab === 'milestones' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <p>Key delivery milestones agreed under EPC / PPP concession agreement.</p>
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 font-medium">Completed: {completedMilestones.length}</span>
                <span className="text-slate-300">·</span>
                <span className="text-blue-700 font-medium">Pending: {pendingMilestones.length}</span>
                <span className="text-slate-300">·</span>
                <span className="text-amber-700 font-medium">Delayed: {delayedMilestones.length}</span>
              </div>
            </div>

            <div className="space-y-3">
              {project.milestones.map((m) => {
                const isCompleted = m.status === 'Completed';
                const isDelayed = m.status === 'Delayed';
                return (
                  <div
                    key={m.id}
                    className={`rounded-lg border p-4 text-xs transition-colors ${
                      isCompleted
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : isDelayed
                        ? 'border-amber-200 bg-amber-50/30'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full shrink-0 mt-0.5 ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-700'
                              : isDelayed
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{m.title}</p>
                          <p className="text-slate-600 mt-1">{m.details}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 uppercase font-semibold">Target Date</p>
                          <p className={`font-mono font-medium ${isDelayed ? 'text-amber-800 font-bold' : 'text-slate-700'}`}>
                            {formatDate(m.targetDate)}
                          </p>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isDelayed
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {m.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Issues and Risks */}
        {activeTab === 'risks' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <p>Active impediments, statutory clearance bottlenecks, and mitigation workflows.</p>
              <span className="font-semibold text-slate-700">{project.risks.length} Registered Risks</span>
            </div>

            {project.risks.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                <p>No critical risks currently identified for this project.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {project.risks.map((risk) => (
                  <div
                    key={risk.id}
                    className="rounded-lg border border-slate-200 p-4 text-xs bg-white shadow-xs space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          risk.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                          risk.severity === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {risk.severity} Risk
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">{risk.category}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">Reported: {formatDate(risk.reportedDate)}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{risk.title}</h4>
                    <p className="text-slate-600">{risk.description}</p>

                    <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-2.5 text-xs text-blue-900">
                      <p className="font-semibold">Mitigation Strategy & Execution Plan:</p>
                      <p className="mt-0.5 text-blue-800">{risk.mitigationPlan}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                      <span>Assigned Officer: <strong className="text-slate-800">{risk.assignedOfficer}</strong></span>
                      <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Status: {risk.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Documents */}
        {activeTab === 'documents' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <p>Repository of approved Detailed Project Reports, statutory approvals, and technical reviews.</p>
              <span className="font-semibold text-slate-700">{project.documents.length} Files</span>
            </div>

            <div className="space-y-2.5">
              {project.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-xs transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                      {doc.type}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{doc.name}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>Category: {doc.category}</span>
                        <span>·</span>
                        <span>Size: {doc.fileSize}</span>
                        <span>·</span>
                        <span>Uploaded: {formatDate(doc.uploadDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {doc.status}
                    </span>
                    <button
                      onClick={() => handleSimulateDownload(doc.name)}
                      className="flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-slate-700 hover:text-blue-700 hover:border-blue-600 transition-colors font-medium text-[11px]"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Updates */}
        {activeTab === 'updates' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <p>Chronological field inspection reports and technical directives.</p>
              <span className="font-semibold text-slate-700">{project.updates.length} Updates</span>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {project.updates.map((update) => (
                <div key={update.id} className="relative text-xs">
                  <div className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100"></div>
                  <div className="rounded-lg border border-slate-200 p-3 bg-white shadow-2xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-blue-700">{update.type}</span>
                      <span className="font-mono">{formatDate(update.date)}</span>
                    </div>
                    <p className="mt-1 text-slate-800 font-medium leading-relaxed">{update.summary}</p>
                    <p className="mt-2 text-[10px] text-slate-400">
                      Recorded by: {update.author} ({update.designation})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
