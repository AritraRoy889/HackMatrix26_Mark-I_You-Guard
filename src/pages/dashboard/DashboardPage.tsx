import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Globe,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Search,
  Radar,
  Info,
  CheckCircle2,
  FileCheck2,
  Radio,
  Cpu,
  Layers,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useScan } from '../../hooks/useScan';
import { useUiStore } from '../../store/ui.store';
import { formatTimeAgo, formatDate } from '../../utils/formatDate';

export const DashboardPage: React.FC = () => {
  const [scanInput, setScanInput] = useState('');
  const { history, startScan } = useScan();
  const { notifications } = useUiStore();
  const navigate = useNavigate();

  const handleStartScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;
    navigate('/scanner/progress');
    try {
      await startScan(scanInput.trim());
      navigate('/scanner/results');
    } catch {
      navigate('/scanner');
    }
  };

  // Four sample stats from prompt with explicit sample demo note
  const stats = [
    {
      label: 'Total Websites Scanned',
      value: '48,924',
      change: '+14.8% this week',
      icon: Globe,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      label: 'Malicious Websites Detected',
      value: '14,210',
      change: '29.0% detection rate',
      icon: ShieldAlert,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
    {
      label: 'Suspicious Websites',
      value: '8,420',
      change: 'Flagged for observation',
      icon: AlertTriangle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Security Issues Identified',
      value: '67,105',
      change: 'Ciphers, CSP, TLS traps',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  // Threat Distribution donut data
  const threatCategories = [
    { label: 'Credential Phishing', percent: 48, color: '#ef4444' },
    { label: 'Malware Droppers', percent: 24, color: '#f97316' },
    { label: 'C2 Infrastructure', percent: 14, color: '#eab308' },
    { label: 'Defacement & Scams', percent: 9, color: '#06b6d4' },
    { label: 'Cryptominers', percent: 5, color: '#a855f7' },
  ];

  // Four Pillar Scanning Status Panel
  const pillarStatus = [
    {
      title: 'Web Security Assessment',
      status: 'Operational',
      subtext: 'DOM, Homoglyph, Typosquatting heuristics',
      icon: Globe,
      score: '99.4%',
    },
    {
      title: 'Advanced Certificate Validation',
      status: 'Operational',
      subtext: 'TLS protocol, CA trust, Transparency logs',
      icon: FileCheck2,
      score: '100%',
    },
    {
      title: 'Dynamic Threat Analysis',
      status: 'Operational',
      subtext: 'Sandbox runtime, payload behavior tests',
      icon: Cpu,
      score: '98.8%',
    },
    {
      title: 'Threat Intelligence Feeds',
      status: 'Active Streaming',
      subtext: '12 synchronized global blacklist feeds',
      icon: Radio,
      score: '12 / 12',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Breadcrumb & Status */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Security Console</span>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">Overview</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">Live Threat Shield Active</span>
        </div>
      </div>

      {/* WELCOME SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Security Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Monitor threats, analyse suspicious websites and understand your digital security posture.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg w-fit">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Sample statistics marked as illustrative demo data</span>
        </div>
      </div>

      {/* PRIMARY CTA: Large URL Scanning Input */}
      <Card className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-cyan-500/30 glow-cyan-sm">
        <div className="flex items-center gap-2 mb-3">
          <Radar className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
            Execute On-Demand Threat Assessment
          </h2>
        </div>

        <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="Enter suspect URL, FQDN, or IP to audit (e.g., https://auth-check.xyz)..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              required
            />
          </div>

          <Button
            type="submit"
            variant="cyber"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shrink-0 font-mono text-xs font-bold"
          >
            Start Security Scan
          </Button>
        </form>
      </Card>

      {/* STATISTICS: Four Premium Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card
              key={idx}
              className="p-5 bg-slate-900/70 border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{s.label}</span>
                <div className={`p-2 rounded-lg border ${s.bg} ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                  {s.value}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-cyan-400">
                  <TrendingUp className="w-3 h-3 text-cyan-400" />
                  <span>{s.change}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ANALYTICS SECTION: Trends Chart + Donut Chart + Four Pillars Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Threat Detection Trends Line Chart (SVG) */}
        <Card className="lg:col-span-2 p-6 bg-slate-900/70 border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Threat Detection Trends</h3>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                Weekly breakdown of scanned vs. intercepted malicious domains
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400" /> Total Scanned
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500" /> Intercepted
              </span>
            </div>
          </div>

          {/* SVG Line Graph */}
          <div className="h-56 w-full pt-4">
            <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="cyanLineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="roseLineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="#1e293b" />

              {/* Cyan Total Area & Path */}
              <path
                d="M 0 160 Q 100 110, 200 130 T 400 60 T 600 40 L 600 190 L 0 190 Z"
                fill="url(#cyanLineGrad)"
              />
              <path
                d="M 0 160 Q 100 110, 200 130 T 400 60 T 600 40"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
              />

              {/* Rose Malicious Area & Path */}
              <path
                d="M 0 180 Q 100 160, 200 150 T 400 110 T 600 95 L 600 190 L 0 190 Z"
                fill="url(#roseLineGrad)"
              />
              <path
                d="M 0 180 Q 100 160, 200 150 T 400 110 T 600 95"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              />

              {/* Points */}
              <circle cx="200" cy="130" r="4" fill="#06b6d4" />
              <circle cx="400" cy="60" r="4" fill="#06b6d4" />
              <circle cx="600" cy="40" r="4" fill="#06b6d4" />
              <circle cx="200" cy="150" r="3.5" fill="#ef4444" />
              <circle cx="400" cy="110" r="3.5" fill="#ef4444" />
              <circle cx="600" cy="95" r="3.5" fill="#ef4444" />
            </svg>

            <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun (Today)</span>
            </div>
          </div>
        </Card>

        {/* 2. Threat Distribution Donut Chart */}
        <Card className="p-6 bg-slate-900/70 border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Threat Distribution</h3>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">Categorical Breakdown</p>
          </div>

          <div className="flex items-center justify-center py-2">
            {/* SVG Donut */}
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="48 100"
                  strokeDashoffset="0"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeDasharray="24 100"
                  strokeDashoffset="-48"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="3"
                  strokeDasharray="14 100"
                  strokeDashoffset="-72"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  strokeDasharray="9 100"
                  strokeDashoffset="-86"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3"
                  strokeDasharray="5 100"
                  strokeDashoffset="-95"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                <span className="text-lg font-extrabold text-white">14.2K</span>
                <span className="text-[9px] text-slate-400">Total Flagged</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            {threatCategories.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.label}
                </span>
                <span className="font-bold text-white">{c.percent}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 3. Four-Pillar Scanning Status Panel */}
      <Card className="p-6 bg-slate-900/70 border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Four-Pillar Core Engine Status</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All Sub-Engines Healthy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillarStatus.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant="emerald" size="sm">
                    {p.status}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{p.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{p.subtext}</p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-500">Uptime:</span>
                  <span className="text-cyan-400 font-bold">{p.score}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* BOTTOM SECTION: Recent Scans Table & Recent Security Alerts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT SCANS TABLE */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-slate-900/70 border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Recent Website Scans</h3>
              <Link to="/monitoring/history">
                <Button variant="ghost" size="sm" className="text-xs text-cyan-400 hover:text-cyan-300">
                  View Full Ledger &rarr;
                </Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                    <th className="pb-3">Website / Domain</th>
                    <th className="pb-3">Risk Score</th>
                    <th className="pb-3">Verdict</th>
                    <th className="pb-3">Scan Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {history.slice(0, 5).map((scan) => (
                    <tr key={scan.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3">
                        <span className="font-semibold text-white block truncate max-w-xs">
                          {scan.domain}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate block max-w-xs">
                          {scan.target}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-white">
                        {scan.riskScore}/100
                      </td>
                      <td className="py-3">
                        <Badge riskLevel={scan.riskLevel} size="sm">
                          {scan.riskLevel.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 text-slate-400 text-[11px]">
                        {formatTimeAgo(scan.scanDate)}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                          Complete
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Link to="/scanner/results" state={{ scan }}>
                          <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                            Report
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* RECENT SECURITY ALERTS COMPACT FEED */}
        <div>
          <Card className="p-6 bg-slate-900/70 border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Recent Security Alerts</h3>
              <Link to="/monitoring/alerts">
                <Button variant="ghost" size="sm" className="text-xs text-cyan-400 hover:text-cyan-300">
                  View All &rarr;
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {notifications.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white truncate max-w-[180px]">
                      {alert.title}
                    </span>
                    <Badge
                      variant={alert.severity === 'critical' ? 'rose' : 'amber'}
                      size="sm"
                      className="uppercase font-mono text-[9px]"
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{alert.message}</p>
                  <span className="text-[10px] font-mono text-slate-500 block pt-1">
                    {formatTimeAgo(alert.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
