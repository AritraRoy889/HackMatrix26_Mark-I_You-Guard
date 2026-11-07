import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BlacklistVendor } from '../../types/scan.types';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export interface BlacklistStatusTableProps
{
  results: BlacklistVendor[];
  enginesDetected: number;
  enginesTotal: number;
}

export const BlacklistStatusTable: React.FC<BlacklistStatusTableProps> = ( {
  results,
  enginesDetected,
  enginesTotal,
} ) =>
{
  return (
    <Card className="bg-slate-900/70 border-slate-800 p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Multi-Engine Blacklist Results</h3>
        </div>
        <span className="text-xs font-mono text-slate-300">
          Detected: <strong className={ enginesDetected > 0 ? 'text-rose-400' : 'text-emerald-400' }>{ enginesDetected }</strong> / { enginesTotal } Engines
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        { results.map( ( vendor, i ) => (
          <div
            key={ i }
            className={ `p-3 rounded-lg border flex items-center justify-between text-xs transition-colors ${ vendor.detected
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }` }
          >
            <div className="flex items-center gap-2 truncate mr-2">
              { vendor.detected ? (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) }
              <div className="truncate">
                <span className="font-semibold block truncate">{ vendor.engine }</span>
                <span className="text-[10px] text-slate-500 font-mono">{ vendor.updateTime }</span>
              </div>
            </div>
            <Badge
              variant={ vendor.detected ? 'rose' : 'emerald' }
              size="sm"
              className="uppercase font-mono text-[9px] shrink-0"
            >
              { vendor.result }
            </Badge>
          </div>
        ) ) }
      </div>
    </Card>
  );
};
