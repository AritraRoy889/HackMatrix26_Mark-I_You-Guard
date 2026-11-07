import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { RiskLevel } from '../../types/scan.types';
import { getRiskColorClass } from '../../utils/formatRisk';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

export interface RiskScoreGaugeProps {
  score: number;
  riskLevel: RiskLevel;
  durationMs: number;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({
  score,
  riskLevel,
  durationMs,
}) => {
  const riskColor = getRiskColorClass(riskLevel);

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 flex flex-col justify-between items-center text-center">
      <div className="w-full flex items-center justify-between text-xs text-slate-400 font-mono pb-2 border-b border-slate-800">
        <span>THREAT REPUTATION</span>
        <span>LATENCY: {durationMs}ms</span>
      </div>

      <div className="my-6 relative flex items-center justify-center">
        {/* Circular Gauge Border */}
        <div
          className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center ${riskColor.border} ${riskColor.bg} ${riskColor.glow}`}
        >
          <div className="text-4xl font-extrabold font-mono text-white tracking-tight">
            {score}
          </div>
          <span className="text-[10px] font-mono uppercase text-slate-400">/ 100 Risk</span>
        </div>
      </div>

      <div className="space-y-2 w-full">
        <Badge riskLevel={riskLevel} size="md" className="uppercase font-mono tracking-wider font-bold">
          {riskLevel} Risk Profile
        </Badge>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
          {score > 70
            ? 'Severe threat signature detected. High probability of malicious intent or data theft.'
            : score > 35
            ? 'Suspicious indicators noted. Proceed with elevated caution.'
            : 'Minimal to zero anomalous indicators detected by all heuristic evaluation engines.'}
        </p>
      </div>
    </Card>
  );
};
