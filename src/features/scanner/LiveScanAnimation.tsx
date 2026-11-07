import React from 'react';
import { Radar, ShieldAlert, Cpu, Database, CheckCircle2 } from 'lucide-react';
import { Progress } from '../../components/ui/Progress';

export interface LiveScanAnimationProps
{
  progress: number;
  message: string;
  target: string;
}

export const LiveScanAnimation: React.FC<LiveScanAnimationProps> = ( {
  progress,
  message,
  target,
} ) =>
{
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto space-y-6">
      {/* Radar sweep graphical animation */ }
      <div className="relative w-44 h-44 rounded-full border-2 border-cyan-500/30 bg-slate-950 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden">
        {/* Radar concentric circles */ }
        <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
        <div className="absolute inset-10 rounded-full border border-cyan-500/20" />
        <div className="absolute inset-16 rounded-full border border-cyan-500/20" />
        <div className="absolute w-full h-[1px] bg-cyan-500/20" />
        <div className="absolute h-full w-[1px] bg-cyan-500/20" />

        {/* Sweep scanner blade */ }
        <div className="absolute inset-0 origin-center animate-radar-sweep bg-gradient-to-tr from-transparent via-transparent to-cyan-500/40 pointer-events-none rounded-full" />

        {/* Center node */ }
        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 border border-cyan-400 text-cyan-300">
          <Radar className="w-7 h-7 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2 w-full">
        <h3 className="text-lg font-bold text-white font-mono truncate">
          Auditing: <span className="text-cyan-400">{ target }</span>
        </h3>
        <p className="text-xs text-slate-400 font-mono h-5 animate-pulse">{ message }</p>
      </div>

      {/* Progress Bar */ }
      <div className="w-full space-y-2">
        <Progress value={ progress } color="gradient" size="md" showLabel />
      </div>

      {/* Active Sub-Engine Telemetry Status Indicators */ }
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full pt-4 text-[11px] font-mono">
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>DOM Tree</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-slate-300">
          <Database className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>12 Feeds</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-slate-300">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Heuristics</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>TLS Chain</span>
        </div>
      </div>
    </div>
  );
};
