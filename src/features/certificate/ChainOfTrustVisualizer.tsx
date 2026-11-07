import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CertificateDetail } from '../../types/certificate.types';
import { ShieldCheck, ArrowDown, Lock, Server } from 'lucide-react';

export interface ChainOfTrustVisualizerProps {
  chain: CertificateDetail['chainOfTrust'];
}

export const ChainOfTrustVisualizer: React.FC<ChainOfTrustVisualizerProps> = ({ chain }) => {
  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Cryptographic Chain of Trust</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">{chain.length} Hierarchy Tiers</span>
      </div>

      <div className="space-y-3">
        {chain.map((tier, idx) => {
          const isLeaf = tier.level === 'leaf';
          const isRoot = tier.level === 'root';

          return (
            <React.Fragment key={idx}>
              <div
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors ${
                  isLeaf
                    ? 'border-cyan-500/40 bg-cyan-500/5'
                    : isRoot
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-slate-800 bg-slate-950/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg border ${
                      isLeaf
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                        : isRoot
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 block">
                      Tier: {tier.level}
                    </span>
                    <h4 className="font-semibold text-white text-sm font-mono">
                      {tier.commonName}
                    </h4>
                    <p className="text-[11px] text-slate-400">{tier.organization}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-500 text-[11px]">Valid Until: {tier.validUntil}</span>
                  <Badge variant={tier.status === 'trusted' ? 'emerald' : 'rose'} size="sm">
                    {tier.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {idx < chain.length - 1 && (
                <div className="flex justify-center my-1 text-slate-600">
                  <ArrowDown className="w-4 h-4 text-cyan-500/40" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Card>
  );
};
