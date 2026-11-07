import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ShieldAlert, CheckCircle2, AlertOctagon, Terminal } from 'lucide-react';

export interface ThreatDetectionSummaryProps {
  threats: string[];
  summary: string;
  hasLoginForm: boolean;
  hasHiddenIframes: boolean;
  suspiciousKeywords: number;
}

export const ThreatDetectionSummary: React.FC<ThreatDetectionSummaryProps> = ({
  threats,
  summary,
  hasLoginForm,
  hasHiddenIframes,
  suspiciousKeywords,
}) => {
  const isMalicious = threats.length > 0;

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 flex-1 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            {isMalicious ? (
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            )}
            <h3 className="text-base font-bold text-white">Heuristic Threat Summary</h3>
          </div>
          <Badge variant={isMalicious ? 'rose' : 'emerald'} size="sm">
            {threats.length} Flagged Vectors
          </Badge>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-4">{summary}</p>

        {threats.length > 0 ? (
          <div className="space-y-2 mb-4">
            <span className="text-xs font-mono uppercase text-slate-400 block font-semibold">
              Identified Threat Vectors:
            </span>
            <ul className="space-y-1.5">
              {threats.map((threat, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 p-2 rounded-lg"
                >
                  <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{threat}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Target passed zero-day behavioral analysis without anomaly flags.</span>
          </div>
        )}
      </div>

      {/* DOM Artifact flags */}
      <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px]">LOGIN FORM</span>
          <span className={hasLoginForm ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
            {hasLoginForm ? 'Detected' : 'None'}
          </span>
        </div>
        <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px]">HIDDEN IFRAMES</span>
          <span className={hasHiddenIframes ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
            {hasHiddenIframes ? 'Flagged (1+)' : 'Zero'}
          </span>
        </div>
        <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px]">SUSPICIOUS STRINGS</span>
          <span className={suspiciousKeywords > 0 ? 'text-rose-400 font-semibold' : 'text-emerald-400'}>
            {suspiciousKeywords}
          </span>
        </div>
      </div>
    </Card>
  );
};
