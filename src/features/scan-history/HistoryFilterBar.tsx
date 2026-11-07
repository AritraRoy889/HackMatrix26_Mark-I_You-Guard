import React from 'react';
import { Search, Download, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface HistoryFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedRisk: string;
  onRiskChange: (val: string) => void;
  onExportCsv: () => void;
  onClearHistory: () => void;
}

export const HistoryFilterBar: React.FC<HistoryFilterBarProps> = ({
  search,
  onSearchChange,
  selectedRisk,
  onRiskChange,
  onExportCsv,
  onClearHistory,
}) => {
  const risks = [
    { label: 'All Audits', value: 'all' },
    { label: 'Critical Only', value: 'critical' },
    { label: 'Malicious', value: 'malicious' },
    { label: 'Safe Verified', value: 'safe' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter history by domain, target URL, or IP..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
        <div className="flex items-center gap-1">
          {risks.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => onRiskChange(r.value)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                selectedRisk === r.value
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onExportCsv}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Export CSV
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
            title="Clear all local history"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
