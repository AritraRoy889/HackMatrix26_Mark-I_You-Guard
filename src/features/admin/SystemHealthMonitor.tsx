import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Server, Activity, Cpu, HardDrive, ShieldCheck } from 'lucide-react';

export const SystemHealthMonitor: React.FC = () => {
  const nodes = [
    { name: 'Cluster Gateway US-East', status: 'Operational', latency: '24ms', load: '34%' },
    { name: 'Neural Heuristic Core EU-Central', status: 'Operational', latency: '42ms', load: '58%' },
    { name: 'IOC Feed Ingestion Node AP-South', status: 'Operational', latency: '88ms', load: '21%' },
    { name: 'Passive DNS Resolver Global Anycast', status: 'Operational', latency: '12ms', load: '45%' },
  ];

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">System Infrastructure & Microservices</h3>
        </div>
        <Badge variant="emerald" size="sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ALL NODES HEALTHY
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {nodes.map((node, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs font-mono"
          >
            <div>
              <span className="font-semibold text-white block">{node.name}</span>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                <span>Latency: {node.latency}</span>
                <span>•</span>
                <span>Load: {node.load}</span>
              </div>
            </div>
            <Badge variant="emerald" size="sm">
              {node.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
