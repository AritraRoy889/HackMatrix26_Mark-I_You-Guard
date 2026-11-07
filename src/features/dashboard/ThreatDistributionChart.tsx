import React from 'react';
import { Card } from '../../components/ui/Card';
import { PieChart, ShieldAlert } from 'lucide-react';

export interface ThreatItem
{
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ThreatDistributionChartProps
{
  distribution: ThreatItem[];
}

export const ThreatDistributionChart: React.FC<ThreatDistributionChartProps> = ( {
  distribution,
} ) =>
{
  return (
    <Card className="bg-slate-900/70 border-slate-800 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Threat Vector Breakdown</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">Last 30 Days</span>
        </div>

        {/* Visual Stacked Bar representation */ }
        <div className="my-5 space-y-2">
          <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-800/80 p-0.5 border border-slate-700/50">
            { distribution.map( ( item, idx ) => (
              <div
                key={ idx }
                style={ {
                  width: `${ item.percentage }%`,
                  backgroundColor: item.color,
                } }
                className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500"
                title={ `${ item.name }: ${ item.percentage }%` }
              />
            ) ) }
          </div>
          <p className="text-[11px] font-mono text-slate-400 text-right">
            Total Threats Classified: 14,210
          </p>
        </div>

        {/* Detailed Legend List */ }
        <div className="space-y-2.5">
          { distribution.map( ( item, idx ) => (
            <div key={ idx } className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={ { backgroundColor: item.color } }
                />
                <span className="text-slate-300 font-medium">{ item.name }</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-slate-400">
                <span>{ item.count.toLocaleString() }</span>
                <span className="w-10 text-right font-semibold text-white">
                  { item.percentage }%
                </span>
              </div>
            </div>
          ) ) }
        </div>
      </div>

      <div className="mt-5 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20 flex items-center gap-2.5 text-xs text-cyan-300">
        <ShieldAlert className="w-4 h-4 shrink-0 text-cyan-400" />
        <span>Phishing remains highest risk vector. 48% targeted financial institutions.</span>
      </div>
    </Card>
  );
};
