import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Globe,
  Clipboard,
  X,
  ShieldAlert,
  ShieldCheck,
  FileCheck2,
  Cpu,
  Radio,
  Lock,
  Eye,
  CheckCircle2,
  Info,
  Clock,
  ArrowRight,
  Flame,
  Zap,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useScan } from '../../hooks/useScan';
import { MOCK_POPULAR_TARGETS } from '../../utils/constants';

export const ScannerPage: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [activePreset, setActivePreset] = useState<'full' | 'web' | 'cert' | 'intel' | 'dynamic'>('full');
  const [pillarToggles, setPillarToggles] = useState({
    web: true,
    cert: true,
    dynamic: true,
    intel: true,
  });

  const { startScan, isScanning, history } = useScan();
  const navigate = useNavigate();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrlInput(text.trim());
    } catch {
      // ignore
    }
  };

  const handleClear = () => setUrlInput('');

  const handleScanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    navigate('/scanner/progress');
    try {
      await startScan(urlInput.trim());
      navigate('/scanner/results');
    } catch {
      navigate('/scanner');
    }
  };

  // Four Pillar Cards from prompt
  const pillars = [
    {
      id: 'web',
      title: 'Web Security Assessment',
      icon: Globe,
      explanation: 'DOM elements, input harvesting forms, redirect chains, and homoglyph inspection.',
      enabled: pillarToggles.web,
    },
    {
      id: 'cert',
      title: 'Advanced Certificate Validation',
      icon: FileCheck2,
      explanation: 'Full TLS chain validation, CA trustworthiness, SAN parsing, and transparency logs.',
      enabled: pillarToggles.cert,
    },
    {
      id: 'dynamic',
      title: 'Dynamic Threat Analysis',
      icon: Cpu,
      explanation: 'Headless sandbox analysis, runtime behavior, and obfuscated payload detection.',
      enabled: pillarToggles.dynamic,
    },
    {
      id: 'intel',
      title: 'Threat Intelligence & Community',
      icon: Radio,
      explanation: '12 synchronized global blacklists, OSINT feeds, and crowdsourced incident logs.',
      enabled: pillarToggles.intel,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* PAGE HEADER */}
      <div className="space-y-1 pb-4 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Website Security Scanner
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Analyse suspicious URLs using multiple layers of intelligent security assessment.
        </p>
      </div>

      {/* CENTRAL SCANNER CARD — Strongest Visual Element */}
      <Card className="p-6 sm:p-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-cyan-500/40 shadow-2xl glow-cyan space-y-4">
        <form onSubmit={handleScanSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-mono text-xs uppercase font-bold text-slate-300">
                Target URL or Fully Qualified Domain Name
              </label>
              <div className="flex items-center gap-2 text-slate-400">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex items-center gap-1 hover:text-cyan-400 font-mono text-[11px] transition-colors"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Paste URL</span>
                </button>
                {urlInput && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center gap-1 hover:text-rose-400 font-mono text-[11px] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            <div className="relative flex items-center">
              <Globe className="absolute left-4 w-5 h-5 text-cyan-400 pointer-events-none" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-4 text-base font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px] font-mono text-slate-400">
              <span>Accepts standard HTTP/HTTPS URLs, FQDNs, or direct IPv4 hostnames.</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Lock className="w-3 h-3" /> Safe Sandboxed Crawl
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <Eye className="w-3 h-3" /> Zero IP Exposure
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="cyber"
              size="lg"
              isLoading={isScanning}
              className="w-full font-mono text-sm font-bold tracking-wider py-4 shadow-xl shadow-cyan-500/20"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Scan Website
            </Button>
          </div>
        </form>
      </Card>

      {/* SCAN CONFIGURATION PANEL */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
            Scan Configuration
          </h3>
          <span className="text-[11px] font-mono text-cyan-400">
            Customize which assessment layers run on submission
          </span>
        </div>

        {/* Configuration Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActivePreset('full');
              setPillarToggles({ web: true, cert: true, dynamic: true, intel: true });
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activePreset === 'full'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Full Security Scan — Recommended
          </button>
          <button
            type="button"
            onClick={() => {
              setActivePreset('web');
              setPillarToggles({ web: true, cert: false, dynamic: false, intel: true });
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activePreset === 'web'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Web Security Assessment
          </button>
          <button
            type="button"
            onClick={() => {
              setActivePreset('cert');
              setPillarToggles({ web: false, cert: true, dynamic: false, intel: false });
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activePreset === 'cert'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Certificate Validation
          </button>
          <button
            type="button"
            onClick={() => {
              setActivePreset('intel');
              setPillarToggles({ web: false, cert: false, dynamic: false, intel: true });
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activePreset === 'intel'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Threat Intelligence Lookup
          </button>
          <button
            type="button"
            onClick={() => {
              setActivePreset('dynamic');
              setPillarToggles({ web: true, cert: false, dynamic: true, intel: false });
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activePreset === 'dynamic'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Dynamic Threat Analysis
          </button>
        </div>

        {/* Four Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.id}
                onClick={() =>
                  setPillarToggles({
                    ...pillarToggles,
                    [pillar.id]: !pillarToggles[pillar.id as keyof typeof pillarToggles],
                  })
                }
                className={`p-4 cursor-pointer transition-all border ${
                  pillar.enabled
                    ? 'border-cyan-500/40 bg-slate-900/80 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                    : 'border-slate-800 bg-slate-950/40 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant={pillar.enabled ? 'emerald' : 'default'} size="sm">
                    {pillar.enabled ? 'ENABLED' : 'DISABLED'}
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{pillar.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{pillar.explanation}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ADDITIONAL CONTENT: Recently Scanned Domains & Popular Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently Scanned Domains */}
        <Card className="p-5 bg-slate-900/70 border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Recently Scanned Domains
            </h4>
            <Link to="/monitoring/history" className="text-[11px] font-mono text-cyan-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-2">
            {history.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => setUrlInput(item.target)}
                className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-between text-xs font-mono transition-colors"
              >
                <span className="text-slate-200 truncate mr-2">{item.domain}</span>
                <Badge riskLevel={item.riskLevel} size="sm">
                  {item.riskScore}/100
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Popular Security Checks & Scanning Explanation */}
        <Card className="p-5 bg-slate-900/70 border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Popular Security Targets (Demo)
            </h4>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {MOCK_POPULAR_TARGETS.map((target) => (
              <button
                key={target}
                type="button"
                onClick={() => setUrlInput(target)}
                className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                {target.replace(/^https?:\/\//, '').split('/')[0]}
              </button>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80">
            <strong className="text-slate-300">Safe Scanning Disclaimer:</strong> THREATGUARD runs all scans in isolated ephemeral sandboxes. Target websites receive no identifying origin credentials or direct client headers.
          </div>
        </Card>
      </div>
    </div>
  );
};
