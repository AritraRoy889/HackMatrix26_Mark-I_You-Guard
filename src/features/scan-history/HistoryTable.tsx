import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ScanResult } from '../../types/scan.types';
import { formatDate } from '../../utils/formatDate';
import { ShieldAlert, Trash2, ArrowUpRight } from 'lucide-react';

export interface HistoryTableProps
{
  scans: ScanResult[];
  onDelete: ( id: string ) => void;
}

export const HistoryTable: React.FC<HistoryTableProps> = ( { scans, onDelete } ) =>
{
  if ( scans.length === 0 )
  {
    return (
      <Card className="bg-slate-900/60 border-slate-800 p-8 text-center text-slate-400 text-xs">
        No scan records match the current filter parameters.
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-5">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
              <th className="pb-3">Domain / URL Target</th>
              <th className="pb-3">Risk Assessment</th>
              <th className="pb-3">Threat Score</th>
              <th className="pb-3">Detection Ratio</th>
              <th className="pb-3">Audit Timestamp</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            { scans.map( ( scan ) => (
              <tr key={ scan.id } className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 pr-3">
                  <div className="flex items-center gap-2">
                    <ShieldAlert
                      className={ `w-3.5 h-3.5 shrink-0 ${ scan.riskScore > 50 ? 'text-rose-400' : 'text-emerald-400'
                        }` }
                    />
                    <span className="font-semibold text-white">{ scan.domain }</span>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate block max-w-sm mt-0.5">
                    { scan.target }
                  </span>
                </td>
                <td className="py-3.5">
                  <Badge riskLevel={ scan.riskLevel } size="sm">
                    { scan.riskLevel }
                  </Badge>
                </td>
                <td className="py-3.5 font-bold text-white">
                  { scan.riskScore } / 100
                </td>
                <td className="py-3.5 text-slate-300">
                  { scan.enginesDetected } / { scan.enginesTotal } engines
                </td>
                <td className="py-3.5 text-slate-400 text-[11px]">
                  { formatDate( scan.scanDate ) }
                </td>
                <td className="py-3.5 text-right space-x-1">
                  <Link to="/scanner/results" state={ { scan } }>
                    <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                      Report
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs px-2 text-slate-500 hover:text-rose-400"
                    onClick={ () => onDelete( scan.id ) }
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </td>
              </tr>
            ) ) }
          </tbody>
        </table>
      </div>
    </Card>
  );
};
