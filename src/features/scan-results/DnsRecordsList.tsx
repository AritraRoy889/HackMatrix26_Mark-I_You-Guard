import React from 'react';
import { Card } from '../../components/ui/Card';
import { DnsRecord } from '../../types/scan.types';
import { Globe, Server } from 'lucide-react';

export interface DnsRecordsListProps
{
  records: DnsRecord[];
  ipAddress: string;
  country: string;
  asn: string;
}

export const DnsRecordsList: React.FC<DnsRecordsListProps> = ( {
  records,
  ipAddress,
  country,
  asn,
} ) =>
{
  return (
    <Card className="bg-slate-900/70 border-slate-800 p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">DNS & Routing Infrastructure</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">{ country }</span>
      </div>

      {/* Primary Server Meta */ }
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 text-xs font-mono">
        <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px]">RESOLVED IP</span>
          <span className="text-cyan-400 font-semibold">{ ipAddress }</span>
        </div>
        <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px]">AUTONOMOUS SYSTEM</span>
          <span className="text-slate-200 truncate block">{ asn }</span>
        </div>
        <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
          <span className="text-slate-500 block text-[10px]">GEOLOCATION</span>
          <span className="text-slate-200">{ country }</span>
        </div>
      </div>

      {/* DNS Records Table */ }
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 text-[10px]">
              <th className="pb-2">Type</th>
              <th className="pb-2">Record Value</th>
              <th className="pb-2 text-right">TTL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            { records.map( ( rec, i ) => (
              <tr key={ i } className="hover:bg-slate-800/30">
                <td className="py-2">
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold">
                    { rec.type }
                  </span>
                </td>
                <td className="py-2 text-slate-300 break-all">{ rec.value }</td>
                <td className="py-2 text-right text-slate-500">{ rec.ttl }s</td>
              </tr>
            ) ) }
          </tbody>
        </table>
      </div>
    </Card>
  );
};
