import React from 'react';
import { Card } from '../../components/ui/Card';
import { History, ShieldAlert, ShieldCheck, Clock } from 'lucide-react';

export interface HistoryStatsProps
{
  total: number;
  threatsCount: number;
  safeCount: number;
}

export const HistoryStats: React.FC<HistoryStatsProps> = ( {
  total,
  threatsCount,
  safeCount,
} ) =>
{
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="bg-slate-900/60 border-slate-800 p-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 font-medium">Lifetime Audits Run</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">{ total }</div>
        </div>
        <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <History className="w-5 h-5" />
        </div>
      </Card>

      <Card className="bg-slate-900/60 border-slate-800 p-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 font-medium">Malicious Indicators Flagged</span>
          <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{ threatsCount }</div>
        </div>
        <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <ShieldAlert className="w-5 h-5" />
        </div>
      </Card>

      <Card className="bg-slate-900/60 border-slate-800 p-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 font-medium">Clean Reputations Verified</span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{ safeCount }</div>
        </div>
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </Card>
    </div>
  );
};
