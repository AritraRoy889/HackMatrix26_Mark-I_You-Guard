import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useNotifications } from '../../hooks/useNotifications';
import { useUiStore } from '../../store/ui.store';
import { useScanStore } from '../../store/scan.store';
import {
  Bell,
  BellRing,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCheck,
  Filter,
  Plus,
  Search,
  Eye,
  Sliders,
  X,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Lock,
  Globe,
  Radio,
  Trash2,
  Play,
  Pause,
  Send,
  Check,
  Calendar,
  Layers
} from 'lucide-react';

interface AlertItem {
  id: string;
  title: string;
  domain: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'Phishing' | 'Certificate Expiry' | 'Brand Abuse' | 'Blacklist';
  source: string;
  timestamp: string;
  isRead: boolean;
  summary: string;
}

interface WatchlistDomain {
  id: string;
  domain: string;
  reputationScore: number;
  lastChecked: string;
  riskLevel: 'safe' | 'suspicious' | 'malicious' | 'critical';
  frequency: string;
  isActive: boolean;
  sslExpiresDays: number;
  trend: number[];
  issuer: string;
}

export const AlertsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { startScan } = useScanStore();

  // Tab State: 'alerts' or 'watchlist'
  const activeTab = searchParams.get('tab') === 'watchlist' ? 'watchlist' : 'alerts';
  const setActiveTab = (tab: 'alerts' | 'watchlist') => {
    setSearchParams(tab === 'watchlist' ? { tab: 'watchlist' } : {});
  };

  // Notification / Alert state
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 'ALT-8891',
      title: 'Critical: Potential Phishing Clone Detected on Watchlist Domain',
      domain: 'auth-chase-security-portal.com',
      severity: 'critical',
      category: 'Phishing',
      source: 'Certificate Transparency & Heuristic Engine',
      timestamp: '12 minutes ago',
      isRead: false,
      summary: 'New TLS certificate issued mimicking corporate SSO identity. Form fields extract SSN & SMS tokens.',
    },
    {
      id: 'ALT-8890',
      title: 'High: Immediate SSL Certificate Expiration Warning (7 Days Left)',
      domain: 'portal.youguard-gateway.net',
      severity: 'high',
      category: 'Certificate Expiry',
      source: 'Automated TLS Watcher',
      timestamp: '45 minutes ago',
      isRead: false,
      summary: 'Let\'s Encrypt authority certificate expires on 2026-11-14. Auto-renewal failed due to DNS challenge failure.',
    },
    {
      id: 'ALT-8889',
      title: 'High: Brand Abuse Lookalike Domain Registered with Punycode',
      domain: 'xn--microsft-n7a.com',
      severity: 'high',
      category: 'Brand Abuse',
      source: 'OSINT Domain Monitor',
      timestamp: '2 hours ago',
      isRead: false,
      summary: 'Adversary registered Cyrillic homoglyph spoofing company corporate enterprise portal.',
    },
    {
      id: 'ALT-8888',
      title: 'Medium: Host Blacklisted on Spamhaus DBL Feed',
      domain: 'smtp-outbound-relay-99.net',
      severity: 'medium',
      category: 'Blacklist',
      source: 'Threat Intelligence Feeds',
      timestamp: '5 hours ago',
      isRead: true,
      summary: 'IP address detected sending bulk smishing lures targeted at North American consumers.',
    },
    {
      id: 'ALT-8887',
      title: 'Low: Minor SSL Cipher Suite Deprecation Notice',
      domain: 'legacy-api.internal-cloud.io',
      severity: 'low',
      category: 'Certificate Expiry',
      source: 'Cryptographic Engine',
      timestamp: '1 day ago',
      isRead: true,
      summary: 'Server negotiates TLS 1.2 with CBC ciphers. Recommend upgrading to TLS 1.3 ChaCha20-Poly1305.',
    },
  ]);

  // Alert Filters
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [alertSearch, setAlertSearch] = useState('');

  // Watchlist State
  const [watchlistDomains, setWatchlistDomains] = useState<WatchlistDomain[]>([
    {
      id: 'WL-01',
      domain: 'chase.com',
      reputationScore: 98,
      lastChecked: '4 mins ago',
      riskLevel: 'safe',
      frequency: 'Every 15 min',
      isActive: true,
      sslExpiresDays: 194,
      trend: [98, 98, 97, 98, 98, 99, 98],
      issuer: 'DigiCert Global Root G2',
    },
    {
      id: 'WL-02',
      domain: 'auth-chase-security-portal.com',
      reputationScore: 12,
      lastChecked: '12 mins ago',
      riskLevel: 'critical',
      frequency: 'Every 5 min',
      isActive: true,
      sslExpiresDays: 89,
      trend: [85, 80, 50, 30, 20, 15, 12],
      issuer: 'Let\'s Encrypt Authority X3',
    },
    {
      id: 'WL-03',
      domain: 'portal.youguard-gateway.net',
      reputationScore: 84,
      lastChecked: '45 mins ago',
      riskLevel: 'suspicious',
      frequency: 'Hourly',
      isActive: true,
      sslExpiresDays: 7,
      trend: [95, 95, 92, 90, 88, 86, 84],
      issuer: 'Let\'s Encrypt Authority X3',
    },
    {
      id: 'WL-04',
      domain: 'github.com',
      reputationScore: 99,
      lastChecked: '1 hour ago',
      riskLevel: 'safe',
      frequency: 'Every 15 min',
      isActive: true,
      sslExpiresDays: 242,
      trend: [99, 99, 99, 99, 99, 99, 99],
      issuer: 'DigiCert SHA2 High Assurance Server CA',
    },
    {
      id: 'WL-05',
      domain: 'legacy-api.internal-cloud.io',
      reputationScore: 68,
      lastChecked: '3 hours ago',
      riskLevel: 'suspicious',
      frequency: 'Daily',
      isActive: false,
      sslExpiresDays: 45,
      trend: [72, 70, 70, 69, 68, 68, 68],
      issuer: 'Sectigo RSA Domain Validation',
    },
  ]);

  const [watchlistSearch, setWatchlistSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<WatchlistDomain | null>(watchlistDomains[1]);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isAddDomainModalOpen, setIsAddDomainModalOpen] = useState(false);
  const [newDomainInput, setNewDomainInput] = useState('');
  const [newFrequencyInput, setNewFrequencyInput] = useState('Every 15 min');

  // Notification Settings Modal state
  const [notifSettings, setNotifSettings] = useState({
    maliciousClassified: true,
    certExpiry: true,
    reputationDrop: true,
    communityReport: true,
    channelInApp: true,
    channelEmail: true,
    channelWebhook: false,
    webhookUrl: 'https://hooks.slack.com/services/T00000/B00000/XXXXX',
  });

  // Filtered Alerts
  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      const matchSev = severityFilter === 'all' || a.severity === severityFilter;
      const matchCat = categoryFilter === 'all' || a.category === categoryFilter;
      const matchQuery =
        !alertSearch ||
        a.title.toLowerCase().includes(alertSearch.toLowerCase()) ||
        a.domain.toLowerCase().includes(alertSearch.toLowerCase()) ||
        a.source.toLowerCase().includes(alertSearch.toLowerCase());
      return matchSev && matchCat && matchQuery;
    });
  }, [alerts, severityFilter, categoryFilter, alertSearch]);

  const unreadAlertsCount = alerts.filter((a) => !a.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: !a.isRead } : a))
    );
  };

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  // Watchlist handlers
  const handleToggleActive = (id: string) => {
    setWatchlistDomains((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
  };

  const handleRemoveWatchlist = (id: string) => {
    setWatchlistDomains((prev) => prev.filter((d) => d.id !== id));
    if (selectedDomain?.id === id) {
      setSelectedDomain(null);
    }
  };

  const handleScanNow = (domain: string) => {
    startScan(`https://${domain}`, 'deep');
    navigate('/scanner/progress');
  };

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainInput) return;
    const clean = newDomainInput.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const newEntry: WatchlistDomain = {
      id: `WL-${Date.now().toString().slice(-4)}`,
      domain: clean,
      reputationScore: 92,
      lastChecked: 'Just now',
      riskLevel: 'safe',
      frequency: newFrequencyInput,
      isActive: true,
      sslExpiresDays: 120,
      trend: [92, 92, 92, 92, 92],
      issuer: 'Cloudflare Inc ECC CA-3',
    };
    setWatchlistDomains((prev) => [newEntry, ...prev]);
    setSelectedDomain(newEntry);
    setNewDomainInput('');
    setIsAddDomainModalOpen(false);
  };

  const filteredWatchlist = useMemo(() => {
    return watchlistDomains.filter((d) =>
      !watchlistSearch || d.domain.toLowerCase().includes(watchlistSearch.toLowerCase())
    );
  }, [watchlistDomains, watchlistSearch]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Monitoring & Alerts"
        description="Continuous surveillance of mission-critical domains, automated threat telemetry alerts, and real-time perimeter protection."
        badge={
          unreadAlertsCount > 0 ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              {unreadAlertsCount} Unresolved Alerts
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Check className="w-3.5 h-3.5" />
              All Incidents Resolved
            </span>
          )
        }
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConfigModalOpen(true)}
              className="border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs"
            >
              <Sliders className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              Notification Settings
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddDomainModalOpen(true)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-md shadow-cyan-500/20 text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add Monitored Domain
            </Button>
          </div>
        }
      />

      {/* Two Prominent Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'alerts'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BellRing className="w-4 h-4 text-cyan-400" />
            <span>Security Alerts</span>
            {unreadAlertsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-red-500 text-slate-950 font-bold">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('watchlist')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'watchlist'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>My Watchlist</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
              {watchlistDomains.length}
            </span>
          </button>
        </div>

        {activeTab === 'alerts' && unreadAlertsCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark All Read
          </button>
        )}
      </div>

      {/* ================= TAB 1: SECURITY ALERTS ================= */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {/* Alert Filter Bar */}
          <Card className="p-3.5 bg-slate-900/80 border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={alertSearch}
                  onChange={(e) => setAlertSearch(e.target.value)}
                  placeholder="Filter alerts by domain, threat type, or source..."
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-3">
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">Severity: All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">Category: All Threat Categories</option>
                  <option value="Phishing">Phishing</option>
                  <option value="Certificate Expiry">Certificate Expiry</option>
                  <option value="Brand Abuse">Brand Abuse</option>
                  <option value="Blacklist">Blacklist</option>
                </select>
              </div>

              <div className="md:col-span-1 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setSeverityFilter('all');
                    setCategoryFilter('all');
                    setAlertSearch('');
                  }}
                  className="text-[11px] text-slate-400 hover:text-slate-200"
                >
                  Reset
                </button>
              </div>
            </div>
          </Card>

          {/* Alert List */}
          <div className="space-y-3">
            {filteredAlerts.length === 0 ? (
              <Card className="p-12 text-center bg-slate-900/60 border-slate-800">
                <ShieldCheck className="w-10 h-10 mx-auto mb-3 text-emerald-400 opacity-60" />
                <h4 className="text-sm font-semibold text-slate-200">No active alerts found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Your monitoring rules are active and no critical deviations or security breaches match the selected criteria.
                </p>
              </Card>
            ) : (
              filteredAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`p-4 transition-all border ${
                    !alert.isRead
                      ? 'bg-slate-900/90 border-slate-700/80 shadow-lg shadow-cyan-950/20'
                      : 'bg-slate-900/50 border-slate-800/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      {/* Pulse Indicator & Severity Badge */}
                      <div className="pt-0.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            alert.severity === 'critical'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                              : alert.severity === 'high'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : alert.severity === 'medium'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              alert.severity === 'critical'
                                ? 'bg-red-400 animate-ping'
                                : alert.severity === 'high'
                                ? 'bg-rose-400'
                                : alert.severity === 'medium'
                                ? 'bg-amber-400'
                                : 'bg-blue-400'
                            }`}
                          />
                          {alert.severity}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-semibold text-slate-100">
                            {alert.title}
                          </h4>
                          {!alert.isRead && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" title="Unread Alert" />
                          )}
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          {alert.summary}
                        </p>

                        <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 flex-wrap">
                          <span className="flex items-center gap-1 font-mono text-cyan-400">
                            <Globe className="w-3 h-3 text-slate-400" />
                            {alert.domain}
                          </span>
                          <span className="flex items-center gap-1">
                            <Layers className="w-3 h-3 text-slate-500" />
                            Source: <strong className="text-slate-400 font-normal">{alert.source}</strong>
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {alert.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2 shrink-0 md:self-center">
                      <Link
                        to="/intelligence/threats"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-cyan-300 border border-slate-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        Investigation
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(alert.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-xs"
                        title={alert.isRead ? 'Mark as Unread' : 'Mark as Read'}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDismissAlert(alert.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                        title="Dismiss Alert"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 2: MY WATCHLIST ================= */}
      {activeTab === 'watchlist' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Monitored Domains List & Search */}
          <div className="lg:col-span-8 space-y-4">
            <Card className="p-3.5 bg-slate-900/80 border-slate-800">
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={watchlistSearch}
                    onChange={(e) => setWatchlistSearch(e.target.value)}
                    placeholder="Search monitored domains..."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddDomainModalOpen(true)}
                  className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 text-xs shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add Domain
                </Button>
              </div>
            </Card>

            {/* Watchlist Table */}
            <Card className="bg-slate-900/90 border-slate-800 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Domain</th>
                      <th className="py-3 px-3">Reputation</th>
                      <th className="py-3 px-3">Last Checked</th>
                      <th className="py-3 px-3">Frequency</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {filteredWatchlist.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedDomain(item)}
                        className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                          selectedDomain?.id === item.id ? 'bg-cyan-950/20 border-l-2 border-l-cyan-400' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="font-mono font-medium text-slate-200 flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            {item.domain}
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`font-mono font-semibold ${
                              item.reputationScore >= 80
                                ? 'text-emerald-400'
                                : item.reputationScore >= 40
                                ? 'text-amber-400'
                                : 'text-red-400'
                            }`}
                          >
                            {item.reputationScore}/100
                          </span>
                        </td>

                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                          {item.lastChecked}
                        </td>

                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                            {item.frequency}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleActive(item.id);
                            }}
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                              item.isActive
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                            {item.isActive ? 'Active' : 'Paused'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => handleScanNow(item.domain)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                              title="Scan Now"
                            >
                              <Play className="w-3.5 h-3.5 text-cyan-400" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setIsConfigModalOpen(true)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                              title="Configure Alerts"
                            >
                              <Sliders className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRemoveWatchlist(item.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                              title="Remove from Watchlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right Column: Domain Details Side Panel */}
          <div className="lg:col-span-4 space-y-4">
            {selectedDomain ? (
              <Card className="p-5 bg-slate-900/90 border-slate-800 backdrop-blur-sm shadow-xl sticky top-20">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">
                      Selected Monitored Target
                    </span>
                    <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-1.5 mt-0.5">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      {selectedDomain.domain}
                    </h3>
                  </div>
                  <Badge
                    variant={selectedDomain.riskLevel === 'safe' ? 'emerald' : selectedDomain.riskLevel === 'critical' ? 'rose' : 'amber'}
                    size="sm"
                  >
                    {selectedDomain.riskLevel.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-4 pt-4 text-xs">
                  {/* 30-Day Risk Trend Mini Chart */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 font-medium">30-Day Health Trend</span>
                      <span className="text-cyan-400 font-mono text-[11px]">
                        Score: {selectedDomain.reputationScore}/100
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                      <svg viewBox="0 0 140 40" className="w-full h-12 overflow-visible">
                        <polyline
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points="0,35 25,32 50,28 75,30 100,18 120,12 140,8"
                        />
                        <circle cx="140" cy="8" r="3.5" fill="#22d3ee" className="animate-ping" />
                      </svg>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 font-mono">
                        <span>30 days ago</span>
                        <span>Today</span>
                      </div>
                    </div>
                  </div>

                  {/* SSL Certificate Status & Expiry Countdown */}
                  <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-cyan-400" />
                        SSL Certificate
                      </span>
                      <span
                        className={`font-mono font-semibold text-[11px] ${
                          selectedDomain.sslExpiresDays <= 14 ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {selectedDomain.sslExpiresDays} Days Left
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">
                      CA: {selectedDomain.issuer}
                    </p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          selectedDomain.sslExpiresDays <= 14 ? 'bg-rose-500' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${Math.min(100, (selectedDomain.sslExpiresDays / 90) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Recent Alerts for Domain */}
                  <div>
                    <span className="text-slate-400 font-medium block mb-2">Recent Incident Telemetry</span>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px]">
                        <p className="text-slate-200 font-semibold">Automated TLS re-audit completed</p>
                        <p className="text-slate-500 mt-0.5">TLS 1.3 negotiated with zero revocations.</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px]">
                        <p className="text-slate-200 font-semibold">DNS WHOIS registrar unchanged</p>
                        <p className="text-slate-500 mt-0.5">DNSSEC validation active.</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick CTAs */}
                  <div className="pt-2 flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleScanNow(selectedDomain.domain)}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs"
                    >
                      Trigger Full Scan
                    </Button>
                    <Link to="/intelligence/certificates" className="w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
                      >
                        Inspect Cert
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center bg-slate-900/60 border-slate-800">
                <Globe className="w-8 h-8 mx-auto mb-2 text-cyan-400 opacity-40" />
                <p className="text-xs text-slate-400 font-medium">Select a domain from the watchlist</p>
                <p className="text-[11px] text-slate-500 mt-1">Detailed telemetry and 30-day health graphs will display here.</p>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL 1: NOTIFICATION SETTINGS ================= */}
      <Modal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        title="Automated Monitoring & Alert Rules"
        size="md"
      >
        <div className="space-y-5 text-xs text-slate-300">
          <p className="text-slate-400 text-[11px]">
            Configure trigger conditions for automated notifications across your monitored domain portfolio.
          </p>

          <div className="space-y-3">
            <label className="flex items-start gap-2.5 cursor-pointer p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <input
                type="checkbox"
                checked={notifSettings.maliciousClassified}
                onChange={(e) => setNotifSettings({ ...notifSettings, maliciousClassified: e.target.checked })}
                className="mt-0.5 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <div>
                <span className="font-semibold text-slate-100 block">New Malicious Classification</span>
                <span className="text-[11px] text-slate-500">Alert immediately when heuristic score exceeds threshold (&gt;= 70)</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <input
                type="checkbox"
                checked={notifSettings.certExpiry}
                onChange={(e) => setNotifSettings({ ...notifSettings, certExpiry: e.target.checked })}
                className="mt-0.5 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <div>
                <span className="font-semibold text-slate-100 block">Certificate Expiry Warning (30, 14, 7 Days)</span>
                <span className="text-[11px] text-slate-500">Proactively notify before SSL/TLS handshake failures occur</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <input
                type="checkbox"
                checked={notifSettings.reputationDrop}
                onChange={(e) => setNotifSettings({ ...notifSettings, reputationDrop: e.target.checked })}
                className="mt-0.5 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <div>
                <span className="font-semibold text-slate-100 block">Reputation Drop &gt; 15 Points</span>
                <span className="text-[11px] text-slate-500">Trigger alert upon significant volatility in domain safety score</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <input
                type="checkbox"
                checked={notifSettings.communityReport}
                onChange={(e) => setNotifSettings({ ...notifSettings, communityReport: e.target.checked })}
                className="mt-0.5 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <div>
                <span className="font-semibold text-slate-100 block">Newly Reported Community Threat</span>
                <span className="text-[11px] text-slate-500">Notify when peers submit potential lookalike or typo-squatting variants</span>
              </div>
            </label>
          </div>

          {/* Delivery Channels */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <span className="text-slate-200 font-semibold block">Delivery Channels</span>
            <div className="grid grid-cols-3 gap-2">
              <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifSettings.channelInApp}
                  onChange={(e) => setNotifSettings({ ...notifSettings, channelInApp: e.target.checked })}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px]">In-App</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifSettings.channelEmail}
                  onChange={(e) => setNotifSettings({ ...notifSettings, channelEmail: e.target.checked })}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px]">Email</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifSettings.channelWebhook}
                  onChange={(e) => setNotifSettings({ ...notifSettings, channelWebhook: e.target.checked })}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px]">Webhook / Slack</span>
              </label>
            </div>

            {notifSettings.channelWebhook && (
              <Input
                label="Webhook Endpoint URL"
                value={notifSettings.webhookUrl}
                onChange={(e) => setNotifSettings({ ...notifSettings, webhookUrl: e.target.value })}
                placeholder="https://hooks.slack.com/services/..."
              />
            )}
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setIsConfigModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsConfigModalOpen(false)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </Modal>

      {/* ================= MODAL 2: ADD DOMAIN TO WATCHLIST ================= */}
      <Modal
        isOpen={isAddDomainModalOpen}
        onClose={() => setIsAddDomainModalOpen(false)}
        title="Add Domain to Continuous Watchlist"
        size="md"
      >
        <form onSubmit={handleAddDomain} className="space-y-4 text-xs">
          <Input
            label="Target Domain or Hostname"
            value={newDomainInput}
            onChange={(e) => setNewDomainInput(e.target.value)}
            placeholder="e.g. portal.internal-corp.com"
            leftIcon={<Globe className="w-4 h-4 text-cyan-400" />}
            required
          />

          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Monitoring Audit Cadence
            </label>
            <select
              value={newFrequencyInput}
              onChange={(e) => setNewFrequencyInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Every 5 min">Every 5 min (High-Priority Threat Target)</option>
              <option value="Every 15 min">Every 15 min (Standard Tier)</option>
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setIsAddDomainModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
            >
              Start Monitoring
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
