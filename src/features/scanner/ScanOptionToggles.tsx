import React from 'react';
import { Card } from '../../components/ui/Card';
import { ScanOptions } from '../../types/scan.types';
import { Check, ShieldCheck, Lock, Share2, Cpu, Globe } from 'lucide-react';

export interface ScanOptionTogglesProps {
  options: ScanOptions;
  onChange: (options: Partial<ScanOptions>) => void;
}

export const ScanOptionToggles: React.FC<ScanOptionTogglesProps> = ({ options, onChange }) => {
  const toggleItems = [
    {
      key: 'deepAnalysis',
      label: 'Deep DOM & Iframe Inspection',
      desc: 'Parses page source for hidden credential harvesting inputs and overlay traps.',
      icon: Cpu,
    },
    {
      key: 'checkSslCert',
      label: 'Full SSL / TLS Chain Validation',
      desc: 'Validates cryptographic cipher suite, expiry, SAN list, and root authority.',
      icon: Lock,
    },
    {
      key: 'followRedirects',
      label: 'Follow Multi-Hop Redirects',
      desc: 'Traces URL shorteners and evasive proxy hops to final destination.',
      icon: Share2,
    },
    {
      key: 'verifyDnsSec',
      label: 'DNS & Reverse IP Geolocation',
      desc: 'Queries MX, TXT, AAAA records and checks registrant reputation.',
      icon: Globe,
    },
    {
      key: 'aiHeuristics',
      label: 'Neural Phishing Classifier',
      desc: 'Analyzes visual brand impersonation and homoglyph typosquatting.',
      icon: ShieldCheck,
    },
  ];

  return (
    <Card className="bg-slate-900/60 border-slate-800 p-5">
      <h4 className="text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider mb-3">
        Active Heuristic Engines & Scan Parameters
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {toggleItems.map((item) => {
          const isChecked = Boolean(options[item.key as keyof ScanOptions]);
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              onClick={() =>
                onChange({ [item.key]: !isChecked } as Partial<ScanOptions>)
              }
              className={`p-3 rounded-lg border text-xs cursor-pointer select-none transition-all flex items-start gap-3 ${
                isChecked
                  ? 'border-cyan-500/40 bg-cyan-500/5 text-slate-200'
                  : 'border-slate-800 bg-slate-950/40 text-slate-400 opacity-60 hover:opacity-80'
              }`}
            >
              <div
                className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                  isChecked
                    ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                    : 'border-slate-700 bg-slate-800'
                }`}
              >
                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div>
                <span className="font-semibold text-white block mb-0.5">{item.label}</span>
                <span className="text-[11px] text-slate-400 leading-tight block">{item.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
