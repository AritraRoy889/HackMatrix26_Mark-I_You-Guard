import React from 'react';
import { ShieldCheck, ShieldAlert, Globe, BookmarkCheck, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { DashboardStats } from '../../mocks/mockDashboard';

export interface MetricCardsProps
{
  stats: DashboardStats;
}

export const MetricCards: React.FC<MetricCardsProps> = ( { stats } ) =>
{
  const cards = [
    {
      label: 'Total Scans Executed',
      value: stats.totalScans.toLocaleString(),
      change: `+${ stats.scansTrend }% this week`,
      isPositive: true,
      icon: Globe,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      label: 'Threats Blocked / Neutralized',
      value: stats.threatsBlocked.toLocaleString(),
      change: `${ stats.threatsTrend }% variance`,
      isPositive: false,
      icon: ShieldAlert,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
    {
      label: 'Verified Clean Targets',
      value: stats.safeDomains.toLocaleString(),
      change: '88.4% passing rate',
      isPositive: true,
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Active Monitored Watchlist',
      value: stats.activeWatchlist.toString(),
      change: 'Hourly auto-check active',
      isPositive: true,
      icon: BookmarkCheck,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      { cards.map( ( card, i ) =>
      {
        const Icon = card.icon;
        return (
          <Card key={ i } className="bg-slate-900/70 border-slate-800 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{ card.label }</span>
              <div className={ `p-2 rounded-lg border ${ card.bg } ${ card.color }` }>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold font-mono text-white tracking-tight">
                { card.value }
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono">
                { card.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                ) }
                <span className={ card.isPositive ? 'text-emerald-400' : 'text-slate-400' }>
                  { card.change }
                </span>
              </div>
            </div>
          </Card>
        );
      } ) }
    </div>
  );
};
