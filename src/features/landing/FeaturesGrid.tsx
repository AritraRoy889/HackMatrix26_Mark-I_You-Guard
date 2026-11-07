import React from 'react';
import {
  Globe2,
  FileCheck2,
  Radio,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Binary,
  Layers,
  Sparkles,
  Users,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const FeaturesGrid: React.FC = () => {
  // Four Pillar Cards from prompt
  const fourPillars = [
    {
      pillar: 'Pillar 01',
      title: 'Web Security Assessment',
      desc: 'Heuristic evaluation of DOM structures, suspicious login forms, hidden iframes, redirect chains, and deceptive typographical typosquatting.',
      icon: Globe2,
      accent: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    },
    {
      pillar: 'Pillar 02',
      title: 'Advanced Certificate Validation',
      desc: 'Cryptographic inspection across complete chain of trust (leaf to root CA), validity timelines, cipher suite vulnerabilities, and Certificate Transparency logs.',
      icon: FileCheck2,
      accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    },
    {
      pillar: 'Pillar 03',
      title: 'Dynamic Threat Analysis',
      desc: 'Headless sandbox execution observing runtime behaviors, obfuscated JavaScript payloads, anti-debugging evasion routines, and phishing form actions.',
      icon: Cpu,
      accent: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    },
    {
      pillar: 'Pillar 04',
      title: 'Threat Intelligence & Community Reports',
      desc: 'Cross-referencing against 12 global threat blacklists (VirusTotal, PhishTank, Talos) combined with crowdsourced, community-verified zero-day incident feeds.',
      icon: Radio,
      accent: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    },
  ];

  // How It Works four stages
  const workflowStages = [
    {
      step: '01',
      title: 'Submit URL',
      desc: 'Analyst or user inputs suspect domain, FQDN, or URL query.',
    },
    {
      step: '02',
      title: 'Analyse',
      desc: 'Headless browsers crawl DOM, test TLS ciphers, and parse metadata.',
    },
    {
      step: '03',
      title: 'Correlate Threats',
      desc: 'Neural engine cross-checks 12 threat feeds & historical IOC registries.',
    },
    {
      step: '04',
      title: 'Receive Security Report',
      desc: 'Detailed 0-100 explainable risk score, evidence logs & remediation.',
    },
  ];

  return (
    <div className="space-y-24 py-12 px-4 md:px-8 max-w-6xl mx-auto">
      {/* SECTION 1: FOUR PILLAR FEATURES */}
      <section className="space-y-8" id="features">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="cyan" size="sm" className="font-mono">
            FOUR-PILLAR THREAT SHIELD
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Defense-in-Depth Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Our multi-layered inspection engine analyzes website reputation, cryptographic integrity, and behavioral anomalies simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fourPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <Card
                key={idx}
                hoverEffect
                className="p-6 bg-slate-900/60 border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-slate-500 tracking-wider">
                      {p.pillar}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${p.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS - 4 HORIZONTAL STAGES */}
      <section className="space-y-10" id="how-it-works">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="cyan" size="sm" className="font-mono">
            WORKFLOW PIPELINE
          </Badge>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            How THREATGUARD Works
          </h2>
          <p className="text-xs text-slate-400">
            A continuous automated pipeline from raw input to verified intelligence in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {workflowStages.map((stage, i) => (
            <div
              key={i}
              className="relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-cyan-400/80">
                  {stage.step}
                </span>
                {i < 3 && (
                  <ArrowRight className="hidden lg:block w-4 h-4 text-slate-600 -mr-2" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">{stage.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ADDITIONAL ARCHITECTURAL MODULES */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="cyan" size="sm" className="font-mono">
            SECURITY INTELLIGENCE DEEP DIVE
          </Badge>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Intelligent Analytics & Explainable Scoring
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-slate-900/60 border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">AI-Powered Detection</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transformer models trained on millions of benign and malicious URLs recognize zero-day obfuscation patterns before signature vendors issue updates.
            </p>
          </Card>

          <Card className="p-6 bg-slate-900/60 border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
              <Binary className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Explainable Risk Scoring</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never trust a black box. THREATGUARD breaks every 0-100 rating down into weighted factors: DOM traps, certificate trust, and DNS reputation.
            </p>
          </Card>

          <Card className="p-6 bg-slate-900/60 border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Community-Driven Intelligence</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Security analysts peer-review in-the-wild SMS smishing and fake portals, giving defenders crowdsourced visibility into targeted attacks.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};
