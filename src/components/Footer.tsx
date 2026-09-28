import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-6 text-xs text-slate-500">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-700 text-white text-[10px] font-bold">
            PD
          </div>
          <span className="font-semibold text-slate-800">
            ProjectDrishti | Infrastructure & Project Monitoring
          </span>
          <span className="hidden md:inline" aria-hidden="true">·</span>
          <span className="text-slate-500 hidden md:inline">
            Integrated Infrastructure Project Monitoring Platform
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-500">
          <span>Cabinet Secretariat</span>
          <span aria-hidden="true">·</span>
          <span>MoSPI Infrastructure Division</span>
          <span aria-hidden="true">·</span>
          <span>National Informatics Centre</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-[11px] text-slate-400">Security Standard GIGW-3.0</span>
        </div>
      </div>
    </footer>
  );
};
