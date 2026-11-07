import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, ArrowLeft, Home, Search, RefreshCw, AlertCircle, WifiOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden">
      {/* Background Subtle Glowing Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

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
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono text-cyan-400 font-medium">Gateway Active</span>
        </div>
      </header>

      {/* Central Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-auto py-8">
        {/* Central Visual: Digital Radar & Shield with Disconnected Node */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center relative shadow-2xl shadow-cyan-950/40">
            {/* Concentric Radar Rings */}
            <div className="absolute inset-2 rounded-full border border-cyan-500/20" />
            <div className="absolute inset-5 rounded-full border border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: '30s' }} />

            {/* Central Broken Signal Beam */}
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 relative">
              <ShieldAlert className="w-7 h-7 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                <WifiOff className="w-2.5 h-2.5 text-red-400" />
              </div>
            </div>

            {/* Orbiting Disconnected Nodes */}
            <div className="absolute top-1 right-2 w-3 h-3 rounded-full bg-slate-800 border border-slate-700 animate-ping opacity-60" />
            <div className="absolute bottom-2 left-3 w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-400" />
          </div>
        </div>

        {/* Large Stylized 404 with Cyber Cyan Glow */}
        <div className="font-mono text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-600 tracking-tighter drop-shadow-[0_0_35px_rgba(34,211,238,0.35)] select-none">
          404
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mt-2 mb-3">
          404 — Signal Lost
        </h1>

        {/* Supporting Copy */}
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed mb-6">
          The page you're looking for doesn't exist, has been isolated for security protocols, or may have moved to an alternative endpoint.
        </p>

        {/* Diagnostic Metadata Block */}
        <div className="w-full max-w-md p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-left font-mono text-[11px] space-y-1.5 shadow-inner mb-8">
          <div className="flex items-center justify-between text-slate-400">
            <span>Error Code:</span>
            <span className="text-rose-400 font-semibold">ERR_HTTP_404_TARGET_UNREACHABLE</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Incident Reference ID:</span>
            <span className="text-cyan-400">TG-REQ-88912-NF</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Node Status:</span>
            <span className="text-amber-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Disconnected
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="primary"
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs px-5 py-2.5 shadow-lg shadow-cyan-500/20"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Dashboard
            </Button>
          </Link>

          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs px-5 py-2.5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
        </div>

        {/* Tertiary Text Link */}
        <div className="mt-5">
          <Link
            to="/scanner"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            Run New Security Scan
          </Link>
        </div>
      </main>

      {/* Small Bottom Footer */}
      <footer className="relative z-10 text-center text-xs text-slate-500 max-w-md mx-auto pt-4">
        Need assistance?{' '}
        <Link to="/support/help" className="text-slate-400 hover:text-cyan-400 underline underline-offset-2 transition-colors">
          Contact Security Operations Support
        </Link>
      </footer>
    </div>
  );
};
