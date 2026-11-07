import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CertificateDetail } from '../../types/certificate.types';
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';

export interface SslVulnerabilitiesCardProps
{
  vulnerabilities: CertificateDetail[ 'vulnerabilities' ];
}

export const SslVulnerabilitiesCard: React.FC<SslVulnerabilitiesCardProps> = ( {
  vulnerabilities,
} ) =>
{
  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Known Protocol Flaws & Cipher Audit</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          { vulnerabilities.filter( ( v ) => v.affected ).length } Active Vulnerabilities
        </span>
      </div>

      <div className="space-y-3">
        { vulnerabilities.map( ( vuln, i ) => (
          <div
            key={ i }
            className={ `p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition-colors ${ vuln.affected
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }` }
          >
            <div className="flex items-start gap-2.5">
              { vuln.affected ? (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) }
              <div>
                <span className="font-semibold text-white block">{ vuln.name }</span>
                <span className="text-[11px] text-slate-400 leading-relaxed block">
                  { vuln.description }
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <Badge
                variant={ vuln.affected ? 'rose' : 'emerald' }
                size="sm"
                className="uppercase font-mono text-[9px]"
              >
                { vuln.affected ? 'VULNERABLE' : 'PROTECTED' }
              </Badge>
            </div>
          </div>
        ) ) }
      </div>
    </Card>
  );
};
