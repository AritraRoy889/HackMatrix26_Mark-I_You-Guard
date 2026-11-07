import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, ArrowRight, Terminal } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-6 relative">
      <div className="max-w-5xl mx-auto rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/40 via-slate-900/80 to-slate-950 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl shadow-cyan-950/50">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300 font-mono">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Ready for Immediate Deployment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Elevate Your Organization's Threat Posture Today
          </h2>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Start scanning URLs, monitoring critical domains, and streaming live IOCs with zero initial configuration required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link to="/auth/register" className="w-full sm:w-auto">
              <Button size="lg" variant="cyber" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Create Free SOC Account
              </Button>
            </Link>
            <Link to="/scanner" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto" leftIcon={<Terminal className="w-4 h-4" />}>
                Launch Anonymous Scanner
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
