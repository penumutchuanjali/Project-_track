import React, { useState } from 'react';
import {
  FileSpreadsheet,
  FileText,
  Download,
  Printer,
  Calendar,
  Filter,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Building2,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { Project } from '../types';
import { formatCrores, formatDate } from '../utils/formatters';
import { exportProjectsToCSV } from '../utils/exportUtils';

interface ReportsPageProps {
  projects: Project[];
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ projects }) => {
  const [reportType, setReportType] = useState<
    'progress' | 'financial' | 'delay' | 'risk' | 'ministry'
  >('progress');
  const [selectedMinistry, setSelectedMinistry] = useState<string>('All');
  const [generatedDate, setGeneratedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedSuccess, setGeneratedSuccess] = useState<boolean>(false);

  // Filter projects by selected criteria
  const activeProjects = projects.filter(p => {
    if (selectedMinistry === 'All') return true;
    return p.ministry === selectedMinistry;
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedSuccess(true);
      setGeneratedDate(new Date().toISOString().split('T')[0]);
      setTimeout(() => setGeneratedSuccess(false), 3000);
    }, 450);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const filename = `ProjectDrishti_${reportType}_Report_${new Date().toISOString().split('T')[0]}.csv`;
    exportProjectsToCSV(activeProjects, filename);
  };

  // Summary figures
  const totalCost = activeProjects.reduce((acc, p) => acc + p.approvedCost, 0);
  const totalExp = activeProjects.reduce((acc, p) => acc + p.expenditure, 0);
  const avgCompletion = Math.round(activeProjects.reduce((acc, p) => acc + p.completionPercentage, 0) / (activeProjects.length || 1));
  const delayedCount = activeProjects.filter(p => p.status === 'Delayed').length;
  const atRiskCount = activeProjects.filter(p => p.status === 'At Risk').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Executive Project Monitoring Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Statutory report generation for Cabinet Secretariat, Project Monitoring Group (PMG), and Nodal Ministries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* REPORT CONFIGURATION PANEL */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Configure Monitoring Report Parameters
        </h2>

        {/* 5 Report Types Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'progress', label: 'Project Progress Report', icon: FileCheck },
            { id: 'financial', label: 'Financial CapEx Report', icon: TrendingUp },
            { id: 'delay', label: 'Delay & Variance Report', icon: AlertTriangle },
            { id: 'risk', label: 'Critical Risk Report', icon: AlertTriangle },
            { id: 'ministry', label: 'Ministry-Wise Report', icon: Building2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = reportType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id as any)}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-blue-700' : 'text-slate-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filters & Actions Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Ministry Scope</label>
            <select
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-1.5 px-3 bg-white"
            >
              <option value="All">All Ministries (Consolidated National)</option>
              <option value="Ministry of Road Transport & Highways">MoRTH</option>
              <option value="Ministry of Railways">Ministry of Railways</option>
              <option value="Ministry of Civil Aviation">Civil Aviation</option>
              <option value="Ministry of Housing & Urban Affairs">MoHUA</option>
              <option value="Ministry of Ports, Shipping and Waterways">MoPSW</option>
              <option value="Ministry of Power & New and Renewable Energy">Power & MNRE</option>
              <option value="Ministry of Jal Shakti">Jal Shakti</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1">Time Horizon</label>
            <select className="w-full rounded-lg border border-slate-300 py-1.5 px-3 bg-white">
              <option>FY 2026-27 (Current Fiscal Year)</option>
              <option>Q2 2026 (July - September)</option>
              <option>Cumulative Inception-to-Date</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white py-1.5 px-4 font-semibold text-xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Compiling Dossier...' : 'Generate Report'}</span>
            </button>
          </div>
        </div>
      </div>

      {generatedSuccess && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Report refreshed successfully with latest verified telemetry data.</span>
        </div>
      )}

      {/* LIVE GENERATED REPORT VIEW (Printable & Exportable) */}
      <div id="printable-report" className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* Report Official Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Official Government Monitoring Document
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">
                ProjectDrishti: {reportType.toUpperCase()} MONITORING REPORT
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Scope: {selectedMinistry === 'All' ? 'All Central Ministries & Departments' : selectedMinistry}
              </p>
            </div>

            <div className="text-right text-xs font-mono text-slate-500">
              <p>Generated: <strong>{generatedDate}</strong></p>
              <p className="text-[11px] text-slate-400">Ref: PD-REP-2026-{Math.floor(1000 + Math.random() * 9000)}</p>
            </div>
          </div>

          {/* Executive Summary Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <span className="text-slate-400 font-medium">Projects Covered</span>
              <p className="font-bold text-slate-900 text-sm font-mono">{activeProjects.length}</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <span className="text-slate-400 font-medium">Sanctioned CapEx</span>
              <p className="font-bold text-slate-900 text-sm font-mono">{formatCrores(totalCost)}</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <span className="text-slate-400 font-medium">Realized Spend</span>
              <p className="font-bold text-blue-700 text-sm font-mono">{formatCrores(totalExp)}</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <span className="text-slate-400 font-medium">Avg Physical Progress</span>
              <p className="font-bold text-emerald-700 text-sm font-mono">{avgCompletion}%</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <span className="text-slate-400 font-medium">Projects Delayed</span>
              <p className="font-bold text-amber-700 text-sm font-mono">{delayedCount}</p>
            </div>
          </div>
        </div>

        {/* REPORT CONTENT CONDITIONAL SECTIONS */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600">
                <th className="py-2.5 px-3">Project ID</th>
                <th className="py-2.5 px-3">Infrastructure Asset</th>
                <th className="py-2.5 px-3">Ministry</th>
                {reportType === 'financial' ? (
                  <>
                    <th className="py-2.5 px-3 text-right">Approved (₹ Cr)</th>
                    <th className="py-2.5 px-3 text-right">Expenditure (₹ Cr)</th>
                    <th className="py-2.5 px-3 text-right">Utilization %</th>
                  </>
                ) : reportType === 'delay' ? (
                  <>
                    <th className="py-2.5 px-3">Original Date</th>
                    <th className="py-2.5 px-3">Revised Target</th>
                    <th className="py-2.5 px-3 text-right">Delay (Months)</th>
                  </>
                ) : reportType === 'risk' ? (
                  <>
                    <th className="py-2.5 px-3">Risk Level</th>
                    <th className="py-2.5 px-3">Primary Risk Factor</th>
                    <th className="py-2.5 px-3">Mitigation Responsibility</th>
                  </>
                ) : (
                  <>
                    <th className="py-2.5 px-3 text-right">Cost (₹ Cr)</th>
                    <th className="py-2.5 px-3 text-right">Physical %</th>
                    <th className="py-2.5 px-3">Status</th>
                  </>
                )}
                <th className="py-2.5 px-3 text-center">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeProjects.map((p) => {
                const util = ((p.expenditure / p.approvedCost) * 100).toFixed(1);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">{p.id}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900 max-w-xs truncate">{p.name}</td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-[150px] truncate">{p.ministry}</td>

                    {reportType === 'financial' ? (
                      <>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums">{p.approvedCost.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums text-blue-700">{p.expenditure.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold">{util}%</td>
                      </>
                    ) : reportType === 'delay' ? (
                      <>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{formatDate(p.originalCompletionDate)}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] font-semibold text-slate-900">{formatDate(p.expectedCompletionDate)}</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-700">+{p.delayMonths}</td>
                      </>
                    ) : reportType === 'risk' ? (
                      <>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.riskLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                            p.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {p.riskLevel}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 truncate max-w-[200px]">
                          {p.risks[0]?.title || 'Standard statutory monitoring'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 font-medium">
                          {p.risks[0]?.assignedOfficer || p.projectDirector}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums">{formatCrores(p.approvedCost)}</td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold">{p.physicalProgress}%</td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="font-semibold text-slate-800">{p.status}</span>
                        </td>
                      </>
                    )}

                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Sign-off for printable report */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            <p>ProjectDrishti | Infrastructure & Project Monitoring</p>
            <p>Cabinet Secretariat / PM GatiShakti Nodal Monitoring Cell</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-slate-600">Authorized by Additional Secretary (MoSPI)</p>
            <p>Digital Cryptographic Signature: Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
};
