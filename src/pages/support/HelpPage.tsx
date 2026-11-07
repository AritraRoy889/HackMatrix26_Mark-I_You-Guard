import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Search,
  BookOpen,
  PlayCircle,
  BarChart2,
  Lock,
  Network,
  Users,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Bug,
  ShieldCheck,
  ExternalLink,
  Activity,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');

  // 6 Featured Cards
  const featuredCards = [
    {
      id: 1,
      title: 'Getting Started',
      icon: BookOpen,
      desc: 'Platform overview, initial onboarding, workspace settings, and analyst permissions.',
      tag: 'Guide',
    },
    {
      id: 2,
      title: 'Running Your First Scan',
      icon: PlayCircle,
      desc: 'How URL analysis, deep crawling, headless sandboxing, and payload detection operate.',
      tag: 'Scanner',
    },
    {
      id: 3,
      title: 'Understanding Risk Scores',
      icon: BarChart2,
      desc: 'How AI heuristic scores, confidence intervals, weightings, and verdicts are computed.',
      tag: 'Scoring',
    },
    {
      id: 4,
      title: 'Certificate Validation',
      icon: Lock,
      desc: 'SSL/TLS chain verification, Certificate Transparency logs, and cipher deprecations.',
      tag: 'Crypto',
    },
    {
      id: 5,
      title: 'Threat Intelligence',
      icon: Network,
      desc: 'IOC exploration, interactive relationship graphs, ASN pivoting, and blacklist feeds.',
      tag: 'Intelligence',
    },
    {
      id: 6,
      title: 'Community Reporting',
      icon: Users,
      desc: 'How to submit newly discovered malicious URLs and how analyst consensus verification works.',
      tag: 'Community',
    },
  ];

  // FAQs
  const faqItems = [
    {
      q: 'How does THREATGUARD detect zero-day phishing sites?',
      a: 'THREATGUARD combines neural computer-vision models that recognize visual brand spoofing with headless DOM inspection. It analyzes newly registered domain velocity, punycode spoofing, and rogue SSL certificates in Certificate Transparency logs before standard blacklists even flag the site.',
    },
    {
      q: 'What happens during a live sandbox analysis?',
      a: 'When a URL is submitted, an isolated ephemeral container launches a Chromium instance. The engine renders all DOM elements, records HTTP network waterfall requests, captures rendered viewport screenshots, tracks JavaScript redirect chains, and evaluates deceptive form field lures without exposing client environments.',
    },
    {
      q: 'How accurate are the certificate trust chains?',
      a: 'Certificate validation executes real-time X.509 chain resolution against trusted root CAs, checks OCSP stapling and CRL revocation lists, and parses Google/Cloudflare Certificate Transparency logs to detect unauthorized or suspicious certificate re-issuance.',
    },
    {
      q: 'Can I integrate THREATGUARD into my CI/CD or SIEM pipeline?',
      a: 'Yes. THREATGUARD provides a REST API and Webhook event stream compatible with Splunk, Microsoft Sentinel, Elastic SIEM, and GitHub Actions. All API keys support granular role-based scoping.',
    },
    {
      q: 'How are community reports verified?',
      a: 'Every community submission undergoes an initial automated 1.2-second sandbox triage. If indicators exceed severity thresholds, Tier 2 and Tier 3 security analysts perform peer consensus reviews before propagating signatures to the global intelligence mesh.',
    },
    {
      q: 'What is the difference between Malicious and Suspicious verdicts?',
      a: 'A "Suspicious" verdict (risk score 25-69) denotes indicators like newly registered domains, lack of reputation, or weak TLS configurations that warrant caution. A "Malicious" verdict (risk score 70+) indicates positive confirmation of weaponized credential harvesting, malware droppers, or active phishing kits.',
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return faqItems;
    return faqItems.filter(
      (f) =>
        f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, faqItems]);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setIsContactModalOpen(false);
      setSupportMessage('');
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header & Prominent Search Bar */}
      <div className="text-center max-w-3xl mx-auto pt-4 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          Knowledge Base & Help Desk
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-sm text-slate-400">
          Explore comprehensive guides, threat scoring formulas, API documentation, or reach our 24/7 Security Operations team.
        </p>

        {/* Large Search Bar */}
        <div className="relative max-w-2xl mx-auto pt-2">
          <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation, threat guides, API reference, or FAQs..."
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-xl shadow-cyan-950/20 transition-all"
          />
        </div>
      </div>

      {/* Featured Help Cards (Grid of 6) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              className="p-5 bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer group shadow-lg"
              onClick={() => setSearchQuery(card.title)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {card.tag}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {card.desc}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                Read article <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Layout: FAQs (Left) + Right Panel (Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Frequently Asked Questions (Accordion) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Frequently Asked Questions
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              {filteredFaqs.length} answers available
            </span>
          </div>

          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <Card className="p-8 text-center bg-slate-900/60 border-slate-800">
                <p className="text-xs text-slate-400">No questions match "{searchQuery}".</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-cyan-400 text-xs"
                >
                  Clear search query
                </Button>
              </Card>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = activeAccordion === index;
                return (
                  <Card
                    key={index}
                    className={`overflow-hidden transition-colors border ${
                      isOpen
                        ? 'bg-slate-900/90 border-cyan-500/40'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveAccordion(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4"
                    >
                      <span className="text-xs font-semibold text-slate-100">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Support & Platform Status Sidebar */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: Contact Support */}
          <Card className="p-5 bg-slate-900/80 border-slate-800 backdrop-blur-sm shadow-xl">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              Contact Security Support
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Have an urgent IOC inquiry or enterprise deployment question? Our SOC engineers are available 24/7.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsContactModalOpen(true)}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs shadow-md shadow-cyan-500/20"
            >
              Open Support Ticket
            </Button>
          </Card>

          {/* Card 2: Report a Technical Issue */}
          <Card className="p-5 bg-slate-900/80 border-slate-800 backdrop-blur-sm shadow-xl">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-2">
              <Bug className="w-4 h-4 text-amber-400" />
              Report a Technical Issue
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Encountered a false positive, UI bug, or scan timeout? Send a trace directly to our engineering team.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBugModalOpen(true)}
              className="w-full border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs"
            >
              Submit Bug Report
            </Button>
          </Card>

          {/* Card 3: Responsible Disclosure */}
          <Card className="p-5 bg-slate-900/80 border-slate-800 backdrop-blur-sm shadow-xl">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Responsible Disclosure
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              We welcome security researchers to inspect our platform under our safe harbor vulnerability disclosure policy.
            </p>
            <a
              href="#disclosure"
              onClick={(e) => {
                e.preventDefault();
                alert('Vulnerability Disclosure Policy: PGP Key available at security@threatguard-defense.io');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium"
            >
              View Bug Bounty Scope <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Card>

          {/* Card 4: Platform Status Widget */}
          <Card className="p-5 bg-slate-900/80 border-slate-800 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Platform Status
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Operational
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-300">Scanner API</span>
                <span className="text-emerald-400">99.98%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-300">Threat DB Cluster</span>
                <span className="text-emerald-400">100.00%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-300">Cert Monitor CT Log</span>
                <span className="text-emerald-400">99.99%</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 text-right">
              Refreshed 1 minute ago • Global SLA 99.9%
            </p>
          </Card>
        </div>
      </div>

      {/* Support Ticket Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Open Security Support Ticket"
        size="md"
      >
        <form onSubmit={handleSupportSubmit} className="space-y-4 text-xs text-slate-300">
          {supportSubmitted ? (
            <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
              <p className="font-semibold">Ticket Dispatched: #TG-TKT-9912</p>
              <p className="text-[11px] text-emerald-400/80">An on-call SOC analyst will respond to your email within 15 minutes.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Issue Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Ingesting custom IOC feeds via STIX/TAXII"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Severity Level</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500">
                  <option>P3 - Standard Request / Question</option>
                  <option>P2 - High: Degraded Functionality</option>
                  <option>P1 - Critical: Active Security Threat / Outage</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Provide details on the observed behavior or request..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setIsContactModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
                >
                  <Send className="w-3.5 h-3.5 mr-1" />
                  Submit Ticket
                </Button>
              </div>
            </>
          )}
        </form>
      </Modal>

      {/* Bug Report Modal */}
      <Modal
        isOpen={isBugModalOpen}
        onClose={() => setIsBugModalOpen(false)}
        title="Report Technical Issue"
        size="md"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p className="text-slate-400">
            Submit reproduction steps for unexpected platform behavior or telemetry pipeline anomalies.
          </p>
          <Input label="Affected Module or URL" placeholder="e.g. /scanner/results for domain XYZ" />
          <div>
            <label className="block text-slate-300 font-medium mb-1">Reproduction Steps</label>
            <textarea
              rows={3}
              placeholder="1. Enter URL... 2. Click Analyze... 3. Observed error..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setIsBugModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                setIsBugModalOpen(false);
                alert('Diagnostic trace logged. Thank you for helping keep THREATGUARD resilient.');
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
            >
              Dispatch Diagnostic Log
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
