import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { WatchlistItem } from '../../types/api.types';
import { StatusIndicator } from './StatusIndicator';
import { formatTimeAgo } from '../../utils/formatDate';
import { Globe, ShieldAlert, Trash2, Radar, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScan } from '../../hooks/useScan';

export interface WatchlistCardsProps
{
  items: WatchlistItem[];
  onRemove: ( id: string ) => void;
}

export const WatchlistCards: React.FC<WatchlistCardsProps> = ( { items, onRemove } ) =>
{
  const navigate = useNavigate();
  const { startScan } = useScan();

  const handleAuditTarget = async ( domain: string ) =>
  {
    navigate( '/scanner/progress' );
    try
    {
      await startScan( `https://${ domain }` );
      navigate( '/scanner/results' );
    } catch
    {
      navigate( '/scanner' );
    }
  };

  if ( items.length === 0 )
  {
    return (
      <Card className="p-8 text-center bg-slate-900/60 border-slate-800 text-slate-400 text-xs">
        No critical domains currently in your monitoring watchlist. Click "Add Monitored Host" to begin tracking.
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      { items.map( ( item ) => (
        <Card
          key={ item.id }
          className="bg-slate-900/70 border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 truncate mr-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-bold text-white font-mono text-sm truncate">
                  { item.domain }
                </span>
              </div>
              <StatusIndicator status={ item.status } />
            </div>

            <div className="my-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Risk Score:</span>
                <span
                  className={
                    item.lastRiskScore > 40
                      ? 'text-rose-400 font-bold'
                      : 'text-emerald-400 font-bold'
                  }
                >
                  { item.lastRiskScore } / 100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SSL Certificate Expiry:</span>
                <span
                  className={
                    item.sslDaysRemaining < 30 ? 'text-amber-400 font-semibold' : 'text-slate-300'
                  }
                >
                  { item.sslDaysRemaining } days remaining
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Auto-Scan Interval:</span>
                <span className="text-slate-300 capitalize">{ item.autoScanFrequency }</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Verified:</span>
                <span className="text-slate-400">{ formatTimeAgo( item.lastScanDate ) }</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              { item.tags.map( ( t ) => (
                <span
                  key={ t }
                  className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 text-[10px] font-mono"
                >
                  { t }
                </span>
              ) ) }
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={ () => handleAuditTarget( item.domain ) }
              leftIcon={ <Radar className="w-3.5 h-3.5" /> }
              className="text-xs"
            >
              Audit Now
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={ () => onRemove( item.id ) }
              className="text-xs text-slate-500 hover:text-rose-400"
              title="Remove domain from monitoring"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) ) }
    </div>
  );
};
