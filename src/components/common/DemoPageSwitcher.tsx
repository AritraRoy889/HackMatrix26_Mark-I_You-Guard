import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Layers,
  ChevronUp,
  ChevronDown,
  X,
  ExternalLink,
  Shield,
  CheckCircle2,
  Sparkles,
  Compass
} from 'lucide-react';

interface PageItem {
  num: string;
  title: string;
  category: string;
  route: string;
  description: string;
}

export const DemoPageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pages: PageItem[] = [
    {
      num: '01',
      title: 'Landing Page',
      category: 'Public & Marketing',
      route: '/',
      description: 'Enterprise hero, radar scanner CTA, 4 pillars & interactive threat map',
    },
    {
      num: '02',
      title: 'Login Screen',
      category: 'Authentication Flow',
      route: '/auth/login',
      description: 'Two-column enterprise layout with 3D shield & trust statements',
    },
    {
      num: '03',
      title: 'User Registration',
      category: 'Authentication Flow',
      route: '/auth/register',
      description: 'Password entropy checklist, organization info & terms acceptance',
    },
    {
      num: '04',
      title: 'Forgot Password Recovery',
      category: 'Authentication Flow',
      route: '/auth/forgot-password',
      description: 'Minimalist recovery with automated token dispatch states',
    },
    {
      num: '05',
      title: 'Email Verification',
      category: 'Authentication Flow',
      route: '/auth/verify-email',
      description: '6-digit OTP verification card with resend countdown timer',
    },
    {
      num: '06',
      title: 'Main Security Dashboard',
      category: 'Core SOC Experience',
      route: '/dashboard',
      description: 'Global overview, threat trends SVG, 4-pillar status & audit feed',
    },
    {
      num: '07',
      title: 'URL Security Scanner',
      category: 'Scanner Engine',
      route: '/scanner',
      description: 'Central scanner card, paste actions, full/rapid config & recent checks',
    },
    {
      num: '08',
      title: 'Live Screening Progress',
      category: 'Scanner Engine',
      route: '/scanner/progress',
      description: 'Animated cybersecurity radar ring, live timeline & 4-pillar meters',
    },
    {
      num: '09',
      title: 'Scan Results Overview',
      category: 'Scanner Engine',
      route: '/scanner/results',
      description: 'Circular risk gauge (0-100), AI explanation & pillar summaries',
    },
    {
      num: '10',
      title: 'Detailed Four Pillar Analysis',
      category: 'Deep Forensics',
      route: '/scanner/detailed-analysis',
      description: 'Comprehensive deep inspection across Web, TLS, Sandbox & OSINT',
    },
    {
      num: '11',
      title: 'Certificate Inspector',
      category: 'Deep Forensics',
      route: '/intelligence/certificates',
      description: 'Interactive X.509 Leaf→Intermediate→Root trust chain & CT logs',
    },
    {
      num: '12',
      title: 'Threat Intelligence Explorer',
      category: 'Deep Forensics',
      route: '/intelligence/threats',
      description: 'Global IOC search & interactive interconnected SVG threat graph',
    },
    {
      num: '13',
      title: 'Community Threat Reports',
      category: 'Community Defense',
      route: '/community/reports',
      description: 'Consensus-verified incident ledger, filterable feeds & stats',
    },
    {
      num: '14',
      title: 'Submit Threat Report',
      category: 'Community Defense',
      route: '/community/submit',
      description: 'Incident submission form with drag-and-drop evidence upload',
    },
    {
      num: '15',
      title: 'Scan History & Audit Log',
      category: 'Monitoring & Audit',
      route: '/monitoring/history',
      description: 'High-density audit log, 4 stats cards, CSV export & pagination',
    },
    {
      num: '16',
      title: 'Monitoring & Alerts',
      category: 'Monitoring & Audit',
      route: '/monitoring/alerts',
      description: 'Combined Security Alerts & Watchlist with slide-over telemetry panel',
    },
    {
      num: '17',
      title: 'Account Settings',
      category: 'Account & SOC Admin',
      route: '/account/settings',
      description: '5 vertical tabs: Profile, Security 2FA, Notifications, Prefs & Privacy',
    },
    {
      num: '18',
      title: 'Help & Knowledge Center',
      category: 'Documentation & Support',
      route: '/support/help',
      description: 'Large search bar, 6 featured guides, accordion FAQs & SLA widget',
    },
    {
      num: '19',
      title: '404 — Signal Lost',
      category: 'System & Diagnostics',
      route: '/404',
      description: 'Digital radar with disconnected node, stylized 404 & diagnostic block',
    },
    {
      num: '20',
      title: 'Server Error & Maintenance',
      category: 'System & Diagnostics',
      route: '/maintenance',
      description: 'Hex lock gear illustration, 500 status block & cluster health telemetry',
    },
  ];

  const handleNavigate = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  const currentPage = pages.find((p) => p.route === location.pathname);

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Floating Pill Toggle */}
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-800 text-slate-100 border border-cyan-500/40 shadow-xl shadow-cyan-950/50 backdrop-blur-md transition-all hover:scale-105 group"
        >
          <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:rotate-180 transition-transform">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-mono font-bold text-cyan-400">
              {currentPage ? `Page ${currentPage.num}` : 'THREATGUARD'}
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 font-medium hidden sm:inline">20-Page Suite</span>
          </div>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-cyan-500 text-slate-950 font-bold">
            20/20
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      ) : (
        /* Expanded Suite Navigator Panel */
        <div className="w-[360px] sm:w-[440px] max-h-[82vh] bg-slate-950/95 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/70 backdrop-blur-xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-3.5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  THREATGUARD 20-Page Suite
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    COMPLETE
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400">
                  Switch instantly to any screen across the 20-page specification.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Page List */}
          <div className="p-2 space-y-1 overflow-y-auto flex-1 text-xs divide-y divide-slate-800/40">
            {pages.map((p) => {
              const isCurrent = location.pathname === p.route;
              return (
                <div
                  key={p.num}
                  onClick={() => handleNavigate(p.route)}
                  className={`pt-1.5 pb-1.5 px-2.5 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-200'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        isCurrent
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {p.num}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-100 truncate flex items-center gap-1.5">
                        {p.title}
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {p.description}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-[9px] text-slate-400 block">
                      {p.route}
                    </span>
                    <span className="text-[9px] text-cyan-400/80 font-mono">
                      {p.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-[10px] text-slate-400">
            <span className="font-mono">1440 × 1024 Desktop High-Fidelity</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Close Navigator
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
