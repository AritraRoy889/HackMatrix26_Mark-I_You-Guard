import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Radio, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ThreatTickerItem {
  id: string;
  target: string;
  type: string;
  risk: string;
  time: string;
}

export interface RealtimeThreatTickerProps {
  threats: ThreatTickerItem[];
}

export const RealtimeThreatTicker: React.FC<RealtimeThreatTickerProps> = ({ threats }) => {
  return (
    <Card className="bg-slate-900/70 border-slate-800 p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
          <h3 className="text-sm font-semibold text-white">Live Threat Stream</h3>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          IOC Feed Active
        </span>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {threats.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-slate-700 transition-colors text-xs"
          >
            <div className="flex items-center gap-2.5 truncate mr-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <div className="truncate">
                <span className="font-mono text-slate-200 block truncate">{t.target}</span>
                <span className="text-[10px] text-slate-500 font-mono">{t.type}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="rose" size="sm">
                {t.risk}
              </Badge>
              <span className="text-[10px] text-slate-500 font-mono">{t.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 text-center">
        <Link
          to="/intelligence/threats"
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium font-mono"
        >
          Explore All 1,840+ Live Indicators &rarr;
        </Link>
      </div>
    </Card>
  );
};
