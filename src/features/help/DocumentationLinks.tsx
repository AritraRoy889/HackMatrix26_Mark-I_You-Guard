import React from 'react';
import { Card } from '../../components/ui/Card';
import { BookOpen, Terminal, Shield, ArrowUpRight, Cpu } from 'lucide-react';

export const DocumentationLinks: React.FC = () => {
  const docs = [
    {
      title: 'REST API Reference',
      desc: 'Endpoints, rate limits, bearer authentication, and JSON schema specs.',
      icon: Terminal,
      href: '#',
    },
    {
      title: 'Threat Vector Taxonomy',
      desc: 'How You Guard categorizes homoglyphs, AiTM proxies, and C2 beacons.',
      icon: Shield,
      href: '#',
    },
    {
      title: 'Webhook & SIEM Integration',
      desc: 'Send streaming JSON alerts to Splunk, Datadog, Elastic, and Microsoft Sentinel.',
      icon: Cpu,
      href: '#',
    },
    {
      title: 'Responsible Disclosure Policy',
      desc: 'Protocol for reporting vulnerabilities in You Guard infrastructure safely.',
      icon: BookOpen,
      href: '#',
    },
  ];

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
        <BookOpen className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white">Developer & SOC Knowledge Base</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {docs.map((doc, idx) => {
          const Icon = doc.icon;
          return (
            <a
              key={idx}
              href={doc.href}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all flex items-start gap-3 group"
            >
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-cyan-300">
                  <span>{doc.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{doc.desc}</p>
              </div>
            </a>
          );
        })}
      </div>
    </Card>
  );
};
