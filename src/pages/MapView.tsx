import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ExternalLink,
  Building2,
  IndianRupee,
  Maximize2,
  Filter,
  X
} from 'lucide-react';
import { Project, ProjectStatus } from '../types';
import { formatCrores, formatDate, getStatusColor } from '../utils/formatters';

interface MapViewProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ projects, onSelectProject }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedMinistry, setSelectedMinistry] = useState<string>('All');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(projects[0]?.id || null);

  const ministries = useMemo(() => {
    return ['All', ...Array.from(new Set(projects.map(p => p.ministry)))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;
      const matchMinistry = selectedMinistry === 'All' || p.ministry === selectedMinistry;
      return matchStatus && matchMinistry;
    });
  }, [projects, selectedStatus, selectedMinistry]);

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === activeProjectId) || filteredProjects[0] || projects[0];
  }, [projects, activeProjectId, filteredProjects]);

  const getMarkerColor = (status: ProjectStatus) => {
    switch (status) {
      case 'On Track':
        return { fill: '#10b981', ring: 'ring-emerald-400', label: 'Green = On Track' };
      case 'Delayed':
        return { fill: '#f59e0b', ring: 'ring-amber-400', label: 'Yellow = Delayed' };
      case 'At Risk':
        return { fill: '#ef4444', ring: 'ring-rose-400', label: 'Red = At Risk' };
      case 'Completed':
        return { fill: '#3b82f6', ring: 'ring-blue-400', label: 'Blue = Completed' };
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Interactive GIS Infrastructure Map of India
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Geospatial tracking of national corridors, mega ports, strategic tunnels, and urban transit systems.
          </p>
        </div>

        {/* Legend pills matching prompt specifications */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            <span>Green = On Track</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
            <span>Yellow = Delayed</span>
          </div>
          <div className="flex items-center gap-1.5 bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-md">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
            <span>Red = At Risk</span>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-md">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            <span>Blue = Completed</span>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">Filter Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-slate-300 py-1 px-2.5 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
            >
              <option value="All">All Statuses</option>
              <option value="On Track">On Track</option>
              <option value="Delayed">Delayed</option>
              <option value="At Risk">At Risk</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">Filter Ministry:</span>
            <select
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
              className="rounded-lg border border-slate-300 py-1 px-2.5 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-blue-600 max-w-[220px] truncate"
            >
              <option value="All">All Ministries</option>
              {ministries.filter(m => m !== 'All').map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-slate-500 text-[11px]">
          Showing <strong>{filteredProjects.length}</strong> pin locations on India Map
        </div>
      </div>

      {/* MAP & DETAIL CARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Interactive Vector Map Container (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden min-h-[580px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm">Republic of India</span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-500">National Corridor GIS Overlay</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Click marker to inspect</span>
          </div>

          {/* SVG Map of India with stylized borders, rivers, state boundaries and project markers */}
          <div className="relative w-full h-[500px] flex items-center justify-center py-4">
            <svg
              viewBox="0 0 1000 1100"
              className="w-full h-full max-h-[500px] select-none"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.04))' }}
            >
              {/* Background Geographic Landmass representation of India */}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#f1f5f9" />
                </linearGradient>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 2" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect x="0" y="0" width="1000" height="1100" fill="url(#gridPattern)" />

              {/* Stylized Accurate Geometric Map Outline of India */}
              <path
                d="M 330 60
                   L 390 100
                   L 460 170
                   L 440 210
                   L 490 270
                   L 590 290
                   L 680 320
                   L 800 290
                   L 920 330
                   L 950 400
                   L 880 430
                   L 840 480
                   L 760 480
                   L 730 520
                   L 750 590
                   L 710 650
                   L 660 740
                   L 570 860
                   L 490 980
                   L 430 920
                   L 370 820
                   L 330 740
                   L 270 650
                   L 250 560
                   L 200 510
                   L 220 440
                   L 290 390
                   L 320 320
                   L 290 240
                   L 320 140
                   Z"
                fill="url(#mapGradient)"
                stroke="#cbd5e1"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Regional Major Corridor Lines (Freight corridors & Expressways) */}
              {/* Delhi to Mumbai */}
              <path d="M 370 340 L 320 480 L 290 550 L 280 620" stroke="#93c5fd" strokeWidth="3" strokeDasharray="4 4" fill="none" />
              {/* Eastern corridor Delhi-Kolkata */}
              <path d="M 370 340 L 470 450 L 740 530" stroke="#fcd34d" strokeWidth="3" strokeDasharray="4 4" fill="none" />
              {/* North-South corridor */}
              <path d="M 340 130 L 370 340 L 470 450 L 380 820" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="2 2" fill="none" />

              {/* Arabian Sea, Bay of Bengal, Indian Ocean Water Labels */}
              <text x="110" y="700" fill="#94a3b8" fontSize="16" fontFamily="sans-serif" fontWeight="600" letterSpacing="4">ARABIAN SEA</text>
              <text x="760" y="720" fill="#94a3b8" fontSize="16" fontFamily="sans-serif" fontWeight="600" letterSpacing="4">BAY OF BENGAL</text>
              <text x="380" y="1040" fill="#94a3b8" fontSize="16" fontFamily="sans-serif" fontWeight="600" letterSpacing="4">INDIAN OCEAN</text>

              {/* Andaman & Nicobar Inset Indicator */}
              <g transform="translate(820, 850)">
                <rect x="0" y="0" width="120" height="150" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="6" />
                <text x="10" y="20" fill="#64748b" fontSize="10" fontWeight="bold">Andaman & Nicobar</text>
                {/* Island chains */}
                <ellipse cx="60" cy="50" rx="4" ry="12" fill="#cbd5e1" />
                <ellipse cx="60" cy="85" rx="5" ry="10" fill="#cbd5e1" />
                <ellipse cx="60" cy="120" rx="8" ry="12" fill="#cbd5e1" />
              </g>

              {/* Render interactive Project Markers */}
              {filteredProjects.map((p) => {
                const marker = getMarkerColor(p.status);
                const isSelected = activeProject.id === p.id;
                // Convert normalized svgX (0-100) and svgY (0-100) to 1000x1100 coordinates
                let cx = p.location.svgX * 10;
                let cy = p.location.svgY * 11;

                // Adjust for Great Nicobar inset
                if (p.id === 'P-301') {
                  cx = 880;
                  cy = 970;
                }

                return (
                  <g
                    key={p.id}
                    onClick={() => setActiveProjectId(p.id)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for active or at-risk */}
                    {(isSelected || p.status === 'At Risk') && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="22"
                        fill={marker.fill}
                        opacity="0.25"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer border circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? "14" : "10"}
                      fill="#ffffff"
                      stroke={marker.fill}
                      strokeWidth={isSelected ? "4" : "3"}
                      className="transition-all duration-200"
                    />

                    {/* Inner core circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? "7" : "5"}
                      fill={marker.fill}
                    />

                    {/* Text Label on map */}
                    <g transform={`translate(${cx + 14}, ${cy + 4})`}>
                      <rect
                        x="-2"
                        y="-12"
                        width={p.id.length * 9 + 8}
                        height="16"
                        fill="#ffffff"
                        opacity="0.92"
                        rx="3"
                        stroke="#e2e8f0"
                        strokeWidth="0.5"
                      />
                      <text
                        x="2"
                        y="0"
                        fill="#0f172a"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {p.id}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Coordinate Source: Survey of India Baseline & PM GatiShakti GIS</span>
            <span className="font-mono text-[11px]">EPSG:4326 WGS84</span>
          </div>
        </div>

        {/* Selected Project Card & Quick Directory (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Detailed Inspector Card */}
          {activeProject && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  {activeProject.id}
                </span>

                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  activeProject.status === 'On Track' ? 'bg-emerald-50 text-emerald-700' :
                  activeProject.status === 'Delayed' ? 'bg-amber-50 text-amber-700' :
                  activeProject.status === 'At Risk' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {activeProject.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {activeProject.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span>{activeProject.location.city}, {activeProject.location.state}</span>
                </p>
              </div>

              {/* Progress and Finance Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Approved Cost</span>
                  <p className="font-mono font-bold text-slate-900 mt-0.5">
                    {formatCrores(activeProject.approvedCost)}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Expenditure</span>
                  <p className="font-mono font-bold text-blue-700 mt-0.5">
                    {formatCrores(activeProject.expenditure)}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Physical %</span>
                  <p className="font-mono font-bold text-emerald-700 mt-0.5">
                    {activeProject.physicalProgress}%
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Delivery Target</span>
                  <p className="font-mono text-slate-800 text-[11px] mt-0.5">
                    {formatDate(activeProject.expectedCompletionDate)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                  <span>Physical Realization</span>
                  <span className="font-mono font-bold text-slate-900">{activeProject.physicalProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      activeProject.status === 'On Track' ? 'bg-emerald-600' :
                      activeProject.status === 'Delayed' ? 'bg-amber-500' :
                      activeProject.status === 'At Risk' ? 'bg-rose-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${activeProject.physicalProgress}%` }}
                  />
                </div>
              </div>

              {activeProject.delayMonths > 0 && (
                <div className="rounded-lg bg-amber-50 border border-amber-200/80 p-2.5 text-xs text-amber-900 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Scheduled delay: <strong>+{activeProject.delayMonths} months</strong> against original master plan.</span>
                </div>
              )}

              <button
                onClick={() => onSelectProject(activeProject.id)}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>Open Full Project Dossier</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Quick List of map projects */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Locations in View ({filteredProjects.length})
            </h4>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredProjects.map((p) => {
                const isSelected = activeProject.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveProjectId(p.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                      isSelected
                        ? 'bg-blue-50 border border-blue-200 font-semibold text-blue-900'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="truncate">
                      <span className="font-mono text-blue-700 font-bold mr-1.5">{p.id}</span>
                      <span className="truncate">{p.location.city}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">{p.status}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
