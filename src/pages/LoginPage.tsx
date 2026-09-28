import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Building2, KeyRound, CheckCircle2 } from 'lucide-react';
import { UserSession } from '../types';

interface LoginPageProps {
  onLogin: (user: UserSession) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('arvind.subramanian@nic.in');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<'dg' | 'pd' | 'auditor'>('dg');
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = {
    dg: {
      name: 'Dr. Arvind Subramanian, IAS',
      email: 'arvind.subramanian@nic.in',
      role: 'Director General (Infrastructure Monitoring)',
      designation: 'Additional Secretary to Govt. of India',
      department: 'Cabinet Secretariat & MoSPI',
      lastLogin: 'Today at 09:15 AM IST'
    },
    pd: {
      name: 'Er. Manoj K. Verma',
      email: 'manoj.verma@nhai.gov.in',
      role: 'Project Director (Corridor Execution)',
      designation: 'Chief General Manager (NHAI)',
      department: 'Ministry of Road Transport & Highways',
      lastLogin: 'Yesterday at 04:30 PM IST'
    },
    auditor: {
      name: 'Sunita Mehra, IA&AS',
      email: 'sunita.mehra@cag.gov.in',
      role: 'Principal Director of Audit (Infrastructure)',
      designation: 'Comptroller & Auditor General of India',
      department: 'Infrastructure Audit Division',
      lastLogin: '25 Sep 2026 at 11:20 AM IST'
    }
  };

  const handleRoleSelect = (selectedRole: 'dg' | 'pd' | 'auditor') => {
    setRole(selectedRole);
    setEmail(demoAccounts[selectedRole].email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin(demoAccounts[role]);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Top Government Banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-white py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide text-slate-300">GOVERNMENT OF INDIA</span>
            <span className="text-slate-500" aria-hidden="true">|</span>
            <span className="text-slate-400">Cabinet Secretariat & MoSPI</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-slate-400">
            <span>National Infrastructure Pipeline (NIP)</span>
            <span aria-hidden="true">·</span>
            <span>PM GatiShakti Portal</span>
          </div>
        </div>
      </div>

      {/* Main Login Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-800 p-6 text-white text-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mb-3">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">ProjectDrishti</h1>
              <p className="text-xs text-blue-100 mt-1 font-medium max-w-xs">
                Integrated Infrastructure Project Monitoring Platform
              </p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-600/30 rounded-full blur-xl pointer-events-none"></div>
          </div>

          {/* Form */}
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Select Official Authority Role:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('dg')}
                  className={`p-2 text-center rounded-lg border text-xs font-medium transition-colors ${
                    role === 'dg'
                      ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <p className="truncate">Director Gen.</p>
                  <span className="text-[10px] text-slate-400 block truncate">Cabinet Sec</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect('pd')}
                  className={`p-2 text-center rounded-lg border text-xs font-medium transition-colors ${
                    role === 'pd'
                      ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <p className="truncate">Project Dir.</p>
                  <span className="text-[10px] text-slate-400 block truncate">MoRTH/NHAI</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect('auditor')}
                  className={`p-2 text-center rounded-lg border text-xs font-medium transition-colors ${
                    role === 'auditor'
                      ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <p className="truncate">Auditor</p>
                  <span className="text-[10px] text-slate-400 block truncate">CAG Division</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official NIC Email / Government ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-600 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                    placeholder="officer@nic.in"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secure Password / Security Token PIN
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-600 focus:outline-hidden focus:ring-1 focus:ring-blue-600 font-mono"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> 2-Factor NIC Auth Verified
                </span>
                <span className="text-slate-400 font-mono">OTP: Auto-linked</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-700 py-2.5 px-4 text-xs font-semibold text-white shadow-sm hover:bg-blue-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <span>Authenticating Credentials...</span>
                ) : (
                  <>
                    <span>Enter ProjectDrishti Platform</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center text-[11px] text-slate-500">
            <span>Restricted Access: Authorized Ministry & State Project Personnel Only</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        <p>ProjectDrishti | Infrastructure & Project Monitoring</p>
      </div>
    </div>
  );
};
