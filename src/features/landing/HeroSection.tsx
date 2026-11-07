import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  Search,
  ArrowRight,
  ShieldCheck,
  Radar,
  Lock,
  Radio,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useScan } from '../../hooks/useScan';
import { MOCK_POPULAR_TARGETS } from '../../utils/constants';

export const HeroSection: React.FC = () => {
  const [targetInput, setTargetInput] = useState('');
  const navigate = useNavigate();
  const { startScan } = useScan();

  const handleScanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetInput.trim()) return;
    navigate('/scanner/progress');
    try {
      await startScan(targetInput.trim());
      navigate('/scanner/results');
    } catch {
      navigate('/scanner');
    }
  };

  return (
    <section className="relative pt-12 pb-20 px-4 md:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[360px] h-[360px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Top Announcement Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs text-cyan-300 font-mono shadow-[0_0_25px_rgba(6,182,212,0.25)]">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold">NEXT-GEN AI HEURISTICS</span>
            <span className="text-slate-500">•</span>
            <span>Real-time Phishing & Zero-Day Interception</span>
          </div>
        </div>

        {/* Headline & Subtitle */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] font-sans">
            TRUST THE WEB. <br />
            <span className="text-gradient-cyan">VERIFY EVERYTHING.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            AI-powered phishing detection, intelligent threat analysis and advanced certificate validation. Identify suspicious websites before they compromise your security.
          </p>
        </div>

        {/* Large URL Scanning Input */}
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleScanSubmit}
            className="flex flex-col sm:flex-row items-center gap-2.5 p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/30 transition-all"
          >
            <div className="flex items-center gap-3 px-3.5 w-full">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="Paste a website URL to analyse..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none py-3 font-mono"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              variant="cyber"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shrink-0 font-mono tracking-wide"
            >
              Analyze Website
            </Button>
          </form>

          {/* Privacy Assurance & Quick Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 px-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacy Guaranteed: Headless sandbox inspection. Zero credential logging.</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="text-slate-500">Quick test:</span>
              <button
                type="button"
                onClick={() => setTargetInput('https://secure-login.chase.com.accounts-verification.xyz')}
                className="text-cyan-400 hover:underline"
              >
                Phish Demo
              </button>
              <span className="text-slate-600">|</span>
              <button
                type="button"
                onClick={() => setTargetInput('https://github.com')}
                className="text-emerald-400 hover:underline"
              >
                Clean Site
              </button>
            </div>
          </div>
        </div>

        {/* Animated Cybersecurity Radar Visual & Floating Data Cards */}
        <div className="relative pt-6 max-w-4xl mx-auto flex justify-center">
          {/* Central Radar Screen Container */}
          <div className="relative w-full max-w-2xl h-72 sm:h-84 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-6 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-xl">
            {/* Radar Concentric Rings */}
            <div className="absolute inset-8 rounded-full border border-cyan-500/15" />
            <div className="absolute inset-16 rounded-full border border-cyan-500/20" />
            <div className="absolute inset-24 rounded-full border border-cyan-500/25" />
            <div className="absolute w-full h-[1px] bg-cyan-500/20" />
            <div className="absolute h-full w-[1px] bg-cyan-500/20" />

            {/* Sweep Animation */}
            <div className="absolute inset-0 origin-center animate-radar-sweep bg-gradient-to-tr from-transparent via-transparent to-cyan-500/30 rounded-full pointer-events-none" />

            {/* Center Shield Node */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-2">
              <div className="h-16 w-16 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 glow-cyan">
                <Radar className="w-8 h-8 animate-pulse text-cyan-400" />
              </div>
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                THREATGUARD NEURAL CORE
              </span>
              <span className="text-[10px] font-mono text-cyan-400">
                12 Parallel Detection Feeds Active
              </span>
            </div>

            {/* Floating Threat Element 1 - Top Left */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 rounded-xl border border-rose-500/40 bg-slate-900/90 p-2.5 shadow-xl text-left font-mono text-[11px] space-y-0.5 animate-float">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>PHISHING INTERCEPT</span>
              </div>
              <p className="text-slate-300 text-[10px]">chase-bank-verify.xyz</p>
              <span className="text-[9px] text-rose-300/80">Homoglyph attack • Risk 96%</span>
            </div>

            {/* Floating Threat Element 2 - Bottom Right */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-xl border border-emerald-500/40 bg-slate-900/90 p-2.5 shadow-xl text-left font-mono text-[11px] space-y-0.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ROOT CA VALIDATED</span>
              </div>
              <p className="text-slate-300 text-[10px]">DigiCert High Assurance EV</p>
              <span className="text-[9px] text-emerald-300/80">Chain status: Verified trusted</span>
            </div>

            {/* Floating Threat Element 3 - Top Right */}
            <div className="hidden sm:block absolute top-6 right-6 rounded-xl border border-purple-500/40 bg-slate-900/90 p-2.5 shadow-xl text-left font-mono text-[11px] space-y-0.5">
              <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                <Activity className="w-3.5 h-3.5" />
                <span>BEHAVIOR HEURISTICS</span>
              </div>
              <p className="text-slate-300 text-[10px]">Hidden form iframe blocked</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
