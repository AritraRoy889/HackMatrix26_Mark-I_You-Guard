import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Radar,
  ShieldCheck,
  Globe,
  FileCheck2,
  Cpu,
  Radio,
  Clock,
  X,
  CheckCircle2,
  Loader2,
  Activity,
  Layers,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { useScan } from '../../hooks/useScan';

export const ScanProgressPage: React.FC = () => {
  const { currentScan, isScanning, scanProgress, currentStepMessage, cancelScan } = useScan();
  const navigate = useNavigate();

  // If scan completes, navigate to results automatically
  useEffect(() => {
    if (!isScanning && currentScan) {
      const timer = setTimeout(() => {
        navigate('/scanner/results');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isScanning, currentScan, navigate]);

  const targetDomain = currentScan?.domain || 'secure-login.chase.com.accounts-verification.xyz';
  const scanId = currentScan?.id || 'TG-SCAN-9941-PROD';

  // Live Event Timeline elements
  const timelineEvents = [
    { label: 'URL accepted and normalized into schema', done: scanProgress >= 15 },
    { label: `Domain resolved via Anycast DNS (${currentScan?.ipAddress || '185.220.101.42'})`, done: scanProgress >= 35 },
    { label: 'Certificate inspection initiated (leaf, intermediate, root CA)', done: scanProgress >= 55 },
    { label: 'Threat intelligence lookup initiated across 12 vendor meshes', done: scanProgress >= 75 },
    { label: 'Neural heuristics & DOM security assessments running', done: scanProgress >= 90 },
  ];

  const handleCancel = () => {
    cancelScan();
    navigate('/scanner');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white font-mono">{targetDomain}</h1>
              <Badge variant="cyan" size="sm" className="font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                ASSESSING THREATS
              </Badge>
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-0.5">
              Scan ID: <strong className="text-slate-300">{scanId}</strong> • Simulated Demo Mode Active
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          leftIcon={<X className="w-3.5 h-3.5" />}
          className="text-xs text-rose-400 hover:bg-rose-500/10 self-start sm:self-auto"
        >
          Cancel Scan
        </Button>
      </div>

      {/* MAIN VISUAL: Circular Cybersecurity Scanning with Radar Ring & Central Shield */}
      <Card className="p-8 bg-slate-950/80 border-cyan-500/30 text-center relative overflow-hidden glow-cyan-sm">
        <div className="relative mx-auto w-48 h-48 rounded-full border-2 border-cyan-500/30 bg-slate-950 flex items-center justify-center shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden mb-6">
          <div className="absolute inset-4 rounded-full border border-cyan-500/15" />
          <div className="absolute inset-10 rounded-full border border-cyan-500/20" />
          <div className="absolute inset-16 rounded-full border border-cyan-500/30" />
          <div className="absolute w-full h-[1px] bg-cyan-500/20" />
          <div className="absolute h-full w-[1px] bg-cyan-500/20" />
          <div className="absolute inset-0 origin-center animate-radar-sweep bg-gradient-to-tr from-transparent via-transparent to-cyan-500/40 rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="h-14 w-14 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Radar className="w-7 h-7 animate-pulse text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5 max-w-lg mx-auto">
          <h2 className="text-2xl font-black text-white tracking-tight">
            Analysing Website Security
          </h2>
          <p className="text-xs text-slate-300 font-mono">
            Your website is being assessed by four intelligent detection engines.
          </p>
          <p className="text-[11px] font-mono text-cyan-400 animate-pulse pt-1">
            {currentStepMessage || 'Querying real-time reputation networks...'}
          </p>
        </div>
      </Card>

      {/* FOUR PILLAR PROGRESS PANELS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pillar 1: Web Security Assessment */}
        <Card className="p-5 bg-slate-900/70 border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase">
                  1. Web Security Assessment
                </h4>
                <p className="text-[10px] text-slate-400">DOM analysis, redirects & dependencies</p>
              </div>
            </div>
            <Badge variant={scanProgress >= 50 ? 'emerald' : 'cyan'} size="sm">
              {scanProgress >= 50 ? 'COMPLETE' : 'ACTIVE'}
            </Badge>
          </div>
          <Progress value={Math.min(100, scanProgress * 1.3)} size="sm" color="cyan" />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Stage: Element inspection</span>
            <span className="text-slate-200">14/14 checks completed</span>
          </div>
        </Card>

        {/* Pillar 2: Certificate Validation */}
        <Card className="p-5 bg-slate-900/70 border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase">
                  2. Certificate Validation
                </h4>
                <p className="text-[10px] text-slate-400">TLS cert, CA integrity & transparency logs</p>
              </div>
            </div>
            <Badge variant={scanProgress >= 70 ? 'emerald' : 'cyan'} size="sm">
              {scanProgress >= 70 ? 'COMPLETE' : 'ACTIVE'}
            </Badge>
          </div>
          <Progress value={Math.min(100, scanProgress * 1.15)} size="sm" color="emerald" />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Stage: Chain verification</span>
            <span className="text-slate-200">6/6 checks completed</span>
          </div>
        </Card>

        {/* Pillar 3: Dynamic Threat Analysis */}
        <Card className="p-5 bg-slate-900/70 border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase">
                  3. Dynamic Threat Analysis
                </h4>
                <p className="text-[10px] text-slate-400">Behavior analysis & payload inspection</p>
              </div>
            </div>
            <Badge variant={scanProgress >= 90 ? 'emerald' : 'cyan'} size="sm">
              {scanProgress >= 90 ? 'COMPLETE' : 'ACTIVE'}
            </Badge>
          </div>
          <Progress value={Math.min(100, scanProgress * 1.05)} size="sm" color="amber" />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Stage: Headless sandbox render</span>
            <span className="text-slate-200">8/8 checks completed</span>
          </div>
        </Card>

        {/* Pillar 4: Threat Intelligence */}
        <Card className="p-5 bg-slate-900/70 border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase">
                  4. Threat Intelligence
                </h4>
                <p className="text-[10px] text-slate-400">Blacklist intelligence & threat feeds</p>
              </div>
            </div>
            <Badge variant={scanProgress >= 95 ? 'emerald' : 'cyan'} size="sm">
              {scanProgress >= 95 ? 'COMPLETE' : 'ACTIVE'}
            </Badge>
          </div>
          <Progress value={scanProgress} size="sm" color="rose" />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Stage: Multi-vendor database queries</span>
            <span className="text-slate-200">12/12 feeds queried</span>
          </div>
        </Card>
      </div>

      {/* LIVE EVENT TIMELINE */}
      <Card className="p-6 bg-slate-900/70 border-slate-800 space-y-3 font-mono text-xs">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
          Live Telemetry Execution Timeline
        </h4>
        <div className="space-y-2">
          {timelineEvents.map((evt, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                evt.done ? 'bg-slate-950/60 text-slate-200' : 'text-slate-500'
              }`}
            >
              {evt.done ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
              )}
              <span className="flex-1 truncate">{evt.label}</span>
              <span className="text-[10px] text-slate-500">
                {evt.done ? 'OK' : 'PENDING'}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* BOTTOM OVERALL PROGRESS & DISCLAIMER */}
      <Card className="p-5 bg-slate-950 border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Overall Telemetry Completion</span>
            <span className="text-cyan-400 font-bold">{scanProgress}%</span>
          </div>
          <Progress value={scanProgress} size="md" color="gradient" />
        </div>

        <div className="text-right shrink-0">
          <span className="text-[10px] text-slate-500 block">
            Realistic processing state • Zero client exposure
          </span>
        </div>
      </Card>
    </div>
  );
};
