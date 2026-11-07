import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { AlertNotification } from '../../types/api.types';
import { formatDate } from '../../utils/formatDate';
import { BellRing, Check, ExternalLink, ShieldAlert, AlertTriangle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface AlertsListProps
{
  alerts: AlertNotification[];
  onMarkRead: ( id: string ) => void;
}

export const AlertsList: React.FC<AlertsListProps> = ( { alerts, onMarkRead } ) =>
{
  const navigate = useNavigate();

  const getSeverityIcon = ( sev: string ) =>
  {
    switch ( sev )
    {
      case 'critical':
        return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return <Info className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <div className="space-y-3">
      { alerts.map( ( alert ) => (
        <Card
          key={ alert.id }
          className={ `p-4 transition-all border ${ alert.read
              ? 'bg-slate-900/40 border-slate-800 text-slate-400'
              : 'bg-slate-900/90 border-slate-700/80 text-slate-100 shadow-lg'
            }` }
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                { getSeverityIcon( alert.severity ) }
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white">{ alert.title }</h4>
                  { !alert.read && (
                    <span className="h-2 w-2 rounded-full bg-cyan-400 inline-block" />
                  ) }
                  <Badge
                    variant={
                      alert.severity === 'critical'
                        ? 'rose'
                        : alert.severity === 'warning'
                          ? 'amber'
                          : 'cyan'
                    }
                    size="sm"
                    className="uppercase font-mono text-[9px]"
                  >
                    { alert.severity }
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ alert.message }</p>
                { alert.targetDomain && (
                  <span className="inline-block mt-2 font-mono text-[11px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    Host: { alert.targetDomain }
                  </span>
                ) }
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 font-mono text-xs">
              <span className="text-[11px] text-slate-500">{ formatDate( alert.timestamp ) }</span>
              <div className="flex items-center gap-1.5">
                { alert.link && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs px-2.5"
                    onClick={ () => navigate( alert.link! ) }
                  >
                    Investigate
                  </Button>
                ) }
                { !alert.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs px-2 text-slate-400 hover:text-white"
                    onClick={ () => onMarkRead( alert.id ) }
                    title="Mark read"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </Button>
                ) }
              </div>
            </div>
          </div>
        </Card>
      ) ) }
    </div>
  );
};
