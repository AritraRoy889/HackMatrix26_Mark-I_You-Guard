import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { SecurityHeaderItem } from '../../types/scan.types';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

export interface SecurityHeadersCardProps
{
  headers: SecurityHeaderItem[];
}

export const SecurityHeadersCard: React.FC<SecurityHeadersCardProps> = ( { headers } ) =>
{
  return (
    <Card className="bg-slate-900/70 border-slate-800 p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">HTTP Security Headers</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          { headers.filter( ( h ) => h.status === 'passed' ).length } / { headers.length } Configured
        </span>
      </div>

      <div className="space-y-2.5">
        { headers.map( ( header, idx ) => (
          <div
            key={ idx }
            className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-medium text-slate-200">{ header.name }</span>
                { header.status === 'passed' && (
                  <Badge variant="emerald" size="sm">PASSED</Badge>
                ) }
                { header.status === 'warning' && (
                  <Badge variant="amber" size="sm">WEAK</Badge>
                ) }
                { header.status === 'missing' && (
                  <Badge variant="rose" size="sm">MISSING</Badge>
                ) }
              </div>
              { header.recommendation && (
                <p className="text-[11px] text-slate-400 mt-1">{ header.recommendation }</p>
              ) }
            </div>
            <div className="font-mono text-[11px] text-slate-400 max-w-xs truncate text-right">
              { header.value }
            </div>
          </div>
        ) ) }
      </div>
    </Card>
  );
};
