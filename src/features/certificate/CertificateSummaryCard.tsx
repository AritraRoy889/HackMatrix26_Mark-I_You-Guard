import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CertificateDetail } from '../../types/certificate.types';
import { Lock, ShieldCheck, Calendar, Key, AlertTriangle } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export interface CertificateSummaryCardProps
{
  certificate: CertificateDetail;
}

export const CertificateSummaryCard: React.FC<CertificateSummaryCardProps> = ( {
  certificate,
} ) =>
{
  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white font-mono">{ certificate.domain }</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">Issued by { certificate.issuerOrganization }</p>
        </div>
        <div className="flex items-center gap-2">
          { certificate.isExpired ? (
            <Badge variant="rose">EXPIRED</Badge>
          ) : (
            <Badge variant="emerald">
              <ShieldCheck className="w-3.5 h-3.5" />
              VALID ({ certificate.daysRemaining } days left)
            </Badge>
          ) }
        </div>
      </div>

      {/* Grid of Cert Specs */ }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px] uppercase">Common Name (CN)</span>
          <span className="text-slate-200 font-semibold">{ certificate.subjectCommonName }</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px] uppercase">Issuer Authority</span>
          <span className="text-cyan-400 truncate block">{ certificate.issuerCommonName }</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px] uppercase">Key Strength</span>
          <span className="text-slate-200">{ certificate.keyStrength }</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px] uppercase">Valid From</span>
          <span className="text-slate-300">{ formatDate( certificate.validFrom ) }</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px] uppercase">Valid Until</span>
          <span className={ certificate.daysRemaining < 30 ? 'text-amber-400 font-bold' : 'text-slate-300' }>
            { formatDate( certificate.validTo ) }
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px] uppercase">Signature Algorithm</span>
          <span className="text-slate-200">{ certificate.signatureAlgorithm }</span>
        </div>
      </div>

      {/* SAN List */ }
      <div>
        <span className="text-xs font-mono uppercase text-slate-400 block mb-2 font-semibold">
          Subject Alternative Names (SANs) ({ certificate.subjectAltNames.length })
        </span>
        <div className="flex flex-wrap gap-1.5">
          { certificate.subjectAltNames.map( ( san, i ) => (
            <span
              key={ i }
              className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300"
            >
              { san }
            </span>
          ) ) }
        </div>
      </div>

      {/* SHA256 Fingerprint */ }
      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono">
        <span className="text-slate-500 block text-[10px]">SHA-256 FINGERPRINT:</span>
        <span className="text-slate-400 break-all select-all">{ certificate.fingerprintSha256 }</span>
      </div>
    </Card>
  );
};
