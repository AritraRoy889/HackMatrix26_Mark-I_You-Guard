import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ShieldAlert, AlertTriangle, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LiveScannerPreview: React.FC = () =>
{
  return (
    <section className="py-12 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Badge variant="cyan" size="sm">LIVE TELEMETRY DEMO</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
            Inspect Threats with Granular Heuristic Depth
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto mt-1">
            See how You Guard breaks down payload signatures, SSL cipher strength, DNS records, and blacklists in real-time.
          </p>
        </div>

        {/* Mock Interface Terminal Preview */ }
        <div className="rounded-2xl border border-slate-700/80 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Terminal Window Chrome */ }
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 font-mono text-xs text-slate-400">
                target://secure-login.chase.com.accounts-verification.xyz
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="rose" size="sm">
                CRITICAL RISK 96/100
              </Badge>
            </div>
          </div>

          {/* Terminal Content Grid */ }
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Col 1: Verdict */ }
            <Card className="bg-slate-900/60 border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Reputation Verdict</span>
                <ShieldAlert className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-3xl font-extrabold text-rose-400 font-mono">
                96 <span className="text-xs text-slate-500 font-sans font-normal">/ 100</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Homograph domain imitating US financial institution with active credential theft forms.
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Engines Flagged:</span>
                <span className="text-rose-400 font-bold">11 / 12</span>
              </div>
            </Card>

            {/* Col 2: SSL & Infrastructure */ }
            <Card className="bg-slate-900/60 border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">SSL & ASN Analysis</span>
                <Lock className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">ASN:</span>
                  <span className="text-slate-200 font-mono">AS44050 (Offshore B.V.)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Issuer:</span>
                  <span className="text-slate-200 font-mono">Let's Encrypt E6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Domain Age:</span>
                  <span className="text-amber-400 font-mono font-semibold">3 Days Old</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">HSTS Header:</span>
                  <span className="text-rose-400 font-mono">Missing</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Disposable TLS Certificate</span>
              </div>
            </Card>

            {/* Col 3: Heuristics */ }
            <Card className="bg-slate-900/60 border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">AI Neural Heuristics</span>
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2 text-rose-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Hidden password exfiltration iframe
                </li>
                <li className="flex items-center gap-2 text-rose-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Zero-day deceptive brand keywords
                </li>
                <li className="flex items-center gap-2 text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Anti-sandbox evasion scripts detected
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/scanner"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Inspect Full Analysis Report
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
