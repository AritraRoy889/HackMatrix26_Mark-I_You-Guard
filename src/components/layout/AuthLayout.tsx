import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-[#0b0f19] text-slate-100 cyber-grid relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-6 text-center z-10">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 glow-cyan">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <span className="font-extrabold tracking-tight text-2xl text-white">
            YOU<span className="text-cyan-400">GUARD</span>
          </span>
        </Link>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Decentralized Cyber Threat Defense & Intelligence Portal
        </p>
      </div>

      {/* Form Container Card */}
      <div className="w-full max-w-md relative z-10">
        <Outlet />
      </div>

      {/* Security Trust Badges */}
      <div className="mt-8 flex items-center gap-6 text-xs text-slate-500 z-10 font-mono">
        <span className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-cyan-400" /> End-to-End Encrypted
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Log Credentials
        </span>
      </div>
    </div>
  );
};
