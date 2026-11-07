import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ThreatFeedItem } from '../../types/threat.types';
import { formatTimeAgo } from '../../utils/formatDate';
import { ShieldAlert, ExternalLink, Hash, Globe, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScan } from '../../hooks/useScan';

export interface ThreatFeedTableProps {
  items: ThreatFeedItem[];
  onSelectIoc?: (ioc: ThreatFeedItem) => void;
}

export const ThreatFeedTable: React.FC<ThreatFeedTableProps> = ({ items, onSelectIoc }) => {
  const navigate = useNavigate();
  const { startScan } = useScan();

  const handleScanTarget = async (target: string) => {
    navigate('/scanner/progress');
    try {
      await startScan(target);
      navigate('/scanner/results');
    } catch {
      navigate('/scanner');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hash_sha256':
        return <Hash className="w-3.5 h-3.5 text-purple-400" />;
      case 'ip':
        return <Radio className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-5">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
              <th className="pb-3">Indicator / Target</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Severity</th>
              <th className="pb-3">Targeted Brand</th>
              <th className="pb-3">Source Feed</th>
              <th className="pb-3">Last Seen</th>
              <th className="pb-3 text-right">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <span className="text-white font-semibold truncate max-w-xs block">
                      {item.indicator}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 text-slate-300 font-sans capitalize">
                  {item.category.replace('_', ' ')}
                </td>
                <td className="py-3">
                  <Badge riskLevel={item.severity} size="sm">
                    {item.severity}
                  </Badge>
                </td>
                <td className="py-3 text-slate-300 font-sans">
                  {item.targetedBrand || 'General'}
                </td>
                <td className="py-3 text-slate-400 text-[11px] truncate max-w-[140px]">
                  {item.source}
                </td>
                <td className="py-3 text-slate-400 text-[11px]">
                  {formatTimeAgo(item.lastSeen)}
                </td>
                <td className="py-3 text-right">
                  {item.type !== 'hash_sha256' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs px-2.5"
                      onClick={() => handleScanTarget(item.indicator)}
                    >
                      Audit
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs px-2.5 text-slate-500"
                      disabled
                    >
                      Hash
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
