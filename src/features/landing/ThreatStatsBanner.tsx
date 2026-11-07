import React from 'react';
import { Shield, Bug, Activity, Server } from 'lucide-react';

export const ThreatStatsBanner: React.FC = () =>
{
  const stats = [
    { label: 'Domains Scanned Today', value: '1.4M+', icon: Globe, change: '+18.4%' },
    { label: 'Phishing Payloads Blocked', value: '380K+', icon: Shield, change: '100% active' },
    { label: 'Active Threat Signatures', value: '12.8M', icon: Bug, change: 'Updated hourly' },
    { label: 'Mean Detection Latency', value: '< 1.8s', icon: Activity, change: 'Zero delay' },
  ];

  function Globe ( props: any )
  {
    return <Server { ...props } />;
  }

  return (
    <section className="py-10 border-y border-slate-800/80 bg-slate-950/70 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          { stats.map( ( s, idx ) =>
          {
            const Icon = s.icon;
            return (
              <div key={ idx } className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{ s.label }</span>
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">
                  { s.value }
                </div>
                <div className="text-[11px] text-cyan-400/90 font-mono">{ s.change }</div>
              </div>
            );
          } ) }
        </div>
      </div>
    </section>
  );
};
