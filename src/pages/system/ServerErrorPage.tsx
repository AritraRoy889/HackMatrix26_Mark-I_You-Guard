import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Settings,
  RefreshCw,
  Home,
  Activity,
  AlertTriangle,
  Server,
  Lock,
  Clock,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ServerErrorPage: React.FC = () => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryMessage, setRetryMessage] = useState('');

  const handleRetry = () => {
    setIsRetrying(true);
    setRetryMessage('');
    setTimeout(() => {
      setIsRetrying(false);
      setRetryMessage('Cluster handshake re-verified. Node load still above 95% threshold. Retrying fallback routing...');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden">
      {/* Background Ambient Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header with THREATGUARD Logo */}
      <header className="relative z-10 flex items-center justify-between max-w-6xl w-full mx-auto">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-extrabold tracking-widest text-slate-100 uppercase">
              THREAT<span className="text-cyan-400">GUARD</span>
            </span>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
              Autonomous Cybersecurity Mesh
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono text-amber-400 font-medium">Degraded Cluster State</span>
        </div>
      </header>

      {/* Central Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-auto py-8">
        {/* Central Illustration: Cyber Shield with Maintenance Gear & Hex Lock */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center relative shadow-2xl shadow-amber-950/40">
            {/* Concentric Telemetry Lines */}
            <div className="absolute inset-2 rounded-full border border-amber-500/20" />
            <div className="absolute inset-5 rounded-full border border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: '40s' }} />

            {/* Central Gear & Shield */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 relative">
              <Settings className="w-8 h-8 animate-spin" style={{ animationDuration: '15s' }} />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
                <Lock className="w-3 h-3 text-cyan-400" />
              </div>
            </div>

            {/* Diagnostic Signals */}
            <div className="absolute top-1 left-3 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping opacity-80" />
            <div className="absolute bottom-2 right-4 w-2 h-2 rounded-full bg-cyan-400" />
          </div>
        </div>

        {/* Stylized Error Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-3 shadow-md shadow-amber-950/30">
          <AlertTriangle className="w-3.5 h-3.5" />
          500 — SYSTEM MAINTENANCE
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mb-3">
          Security Systems Temporarily Unavailable
        </h1>

        {/* Supporting Copy */}
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed mb-6">
          Our threat analysis cluster is undergoing scheduled maintenance or experiencing high telemetry ingestion load. Your account data and security perimeter remain fully protected.
        </p>

        {/* Diagnostic Telemetry Status Box */}
        <div className="w-full max-w-lg p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-left font-mono text-[11px] space-y-2 shadow-inner mb-6">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
            <span className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              Diagnostic Telemetry Status
            </span>
            <span className="text-[10px] text-cyan-400 font-sans">Node C-04</span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Service Status:</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Degraded (Engine Cluster C-04)
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Affected Component:</span>
            <span className="text-slate-300">Deep Sandbox Execution Node</span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Core Threat DB:</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Online & Protected
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Last Status Update:</span>
            <span className="text-slate-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              2 minutes ago
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/80">
            <span>Estimated Restoration:</span>
            <span className="text-cyan-400 font-semibold">&lt; 15 minutes</span>
          </div>
        </div>

        {retryMessage && (
          <div className="mb-6 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-[11px] text-cyan-300 font-mono max-w-md animate-fade-in">
            {retryMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Button
            type="button"
            variant="primary"
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full sm:w-auto min-w-[170px] bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs px-5 py-2.5 shadow-lg shadow-cyan-500/20"
          >
            {isRetrying ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Testing Node...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Retry Connection
              </span>
            )}
          </Button>

          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs px-5 py-2.5"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Dashboard
            </Button>
          </Link>
        </div>

        {/* Tertiary Link */}
        <div className="mt-5">
          <Link
            to="/support/help"
            className="text-xs text-slate-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Check Real-Time Status Page
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </main>

      {/* Small Bottom Note */}
      <footer className="relative z-10 text-center text-[11px] font-mono text-slate-500 max-w-md mx-auto pt-4">
        Incident ID: TG-MAINT-2026-X89 | ThreatGuard Operations Team
      </footer>
    </div>
  );
};
