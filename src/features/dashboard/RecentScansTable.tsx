import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ScanResult } from '../../types/scan.types';
import { formatTimeAgo } from '../../utils/formatDate';
import { ArrowUpRight, History, ShieldAlert } from 'lucide-react';

export interface RecentScansTableProps
{
  scans: ScanResult[];
}

export const RecentScansTable: React.FC<RecentScansTableProps> = ( { scans } ) =>
{
  return (
    <Card className="bg-slate-900/70 border-slate-800 p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Recent Security Audits</h3>
        </div>
        <Link to="/monitoring/history">
          <Button variant="ghost" size="sm" rightIcon={ <ArrowUpRight className="w-3.5 h-3.5" /> }>
            View All History
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 text-slate-500 font-mono uppercase text-[10px]">
              <th className="pb-2.5 font-semibold">Target Domain / URL</th>
              <th className="pb-2.5 font-semibold">Risk Level</th>
              <th className="pb-2.5 font-semibold">Risk Score</th>
              <th className="pb-2.5 font-semibold">Engines Hit</th>
              <th className="pb-2.5 font-semibold">Audited</th>
              <th className="pb-2.5 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            { scans.slice( 0, 5 ).map( ( scan ) => (
              <tr key={ scan.id } className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 font-mono text-slate-200">
                  <div className="flex items-center gap-2">
                    <ShieldAlert
                      className={ `w-3.5 h-3.5 ${ scan.riskScore > 50 ? 'text-rose-400' : 'text-emerald-400'
                        }` }
                    />
                    <span className="font-semibold text-white">{ scan.domain }</span>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate block max-w-xs">
                    { scan.target }
                  </span>
                </td>
                <td className="py-3">
                  <Badge riskLevel={ scan.riskLevel } size="sm">
                    { scan.riskLevel }
                  </Badge>
                </td>
                <td className="py-3 font-mono font-semibold text-white">
                  { scan.riskScore } / 100
                </td>
                <td className="py-3 font-mono text-slate-300">
                  { scan.enginesDetected } / { scan.enginesTotal }
                </td>
                <td className="py-3 font-mono text-slate-400">
                  { formatTimeAgo( scan.scanDate ) }
                </td>
                <td className="py-3 text-right">
                  <Link to="/scanner/results" state={ { scan } }>
                    <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                      Inspect
                    </Button>
                  </Link>
                </td>
              </tr>
            ) ) }
          </tbody>
        </table>
      </div>
    </Card>
  );
};
