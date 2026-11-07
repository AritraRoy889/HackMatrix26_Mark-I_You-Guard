import React from 'react';
import { Search, Filter } from 'lucide-react';

export interface IocSearchInputProps {
  value: string;
  onChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export const IocSearchInput: React.FC<IocSearchInputProps> = ({
  value,
  onChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = [
    { label: 'All Vectors', value: 'all' },
    { label: 'Phishing', value: 'phishing' },
    { label: 'Malware', value: 'malware' },
    { label: 'C2 Infrastructure', value: 'c2_server' },
    { label: 'Credential Theft', value: 'credential_harvester' },
    { label: 'Cryptominers', value: 'cryptominer' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Filter by domain, IP, SHA-256 hash, or CVE..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => onCategoryChange(cat.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
              selectedCategory === cat.value
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};
