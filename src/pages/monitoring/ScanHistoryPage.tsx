import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { useScanHistory } from '../../hooks/useScanHistory';
import { useScanStore } from '../../store/scan.store';
import {
  Search,
  Download,
  Filter,
  Calendar,
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RotateCw,
  Copy,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Globe,
  Lock,
  Layers,
  Sparkles,
  Check,
  Activity
} from 'lucide-react';

export const ScanHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { history, deleteHistoryItem, clearHistory } = useScanHistory();
  const { startScan } = useScanStore();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Interactive state
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Extended synthetic dataset based on store history to match enterprise volume
  const allHistoryRecords = useMemo(() => {
    // Combine existing history items with structured mock items for rich visual depth
    const baseItems = history.length > 0 ? history : [
      {
        id: 'TG-SCN-99120',
        target: 'https://chase-security-verify.net/auth',
        domain: 'chase-security-verify.net',
        riskScore: 92,
        riskLevel: 'critical' as const,
        scanType: 'Full Scan',
        timestamp: '2026-11-07 14:45:10',
        status: 'Completed' as const,
        ipAddress: '185.220.101.44',
      },
      {
        id: 'TG-SCN-99119',
        target: 'https://github.com',
        domain: 'github.com',
        riskScore: 4,
        riskLevel: 'safe' as const,
        scanType: 'Full Scan',
        timestamp: '2026-11-07 13:20:18',
        status: 'Completed' as const,
        ipAddress: '140.82.121.4',
      },
      {
        id: 'TG-SCN-99118',
        target: 'https://paypal-resolution-center.info',
        domain: 'paypal-resolution-center.info',
        riskScore: 88,
        riskLevel: 'malicious' as const,
        scanType: 'Rapid Check',
        timestamp: '2026-11-07 11:05:42',
        status: 'Completed' as const,
        ipAddress: '194.26.29.112',
      },
      {
        id: 'TG-SCN-99117',
        target: 'https://cloud-storage-cdn.xyz/payload.exe',
        domain: 'cloud-storage-cdn.xyz',
        riskScore: 78,
        riskLevel: 'suspicious' as const,
        scanType: 'Full Scan',
        timestamp: '2026-11-07 09:33:01',
        status: 'Completed' as const,
        ipAddress: '91.240.118.15',
      },
      {
        id: 'TG-SCN-99116',
        target: 'https://google.com',
        domain: 'google.com',
        riskScore: 2,
        riskLevel: 'safe' as const,
        scanType: 'Certificate Only',
        timestamp: '2026-11-06 22:15:00',
        status: 'Completed' as const,
        ipAddress: '142.250.190.46',
      },
      {
        id: 'TG-SCN-99115',
        target: 'https://vpn-internal-gateway.corp-portal.site',
        domain: 'vpn-internal-gateway.corp-portal.site',
        riskScore: 84,
        riskLevel: 'malicious' as const,
        scanType: 'Full Scan',
        timestamp: '2026-11-06 18:40:22',
        status: 'Completed' as const,
        ipAddress: '45.154.255.89',
      },
      {
        id: 'TG-SCN-99114',
        target: 'https://stripe.com',
        domain: 'stripe.com',
        riskScore: 5,
        riskLevel: 'safe' as const,
        scanType: 'Full Scan',
        timestamp: '2026-11-06 15:10:09',
        status: 'Completed' as const,
        ipAddress: '199.60.103.22',
      },
      {
        id: 'TG-SCN-99113',
        target: 'https://expired-origin-ssl.internal.org',
        domain: 'expired-origin-ssl.internal.org',
        riskScore: 0,
        riskLevel: 'unknown' as const,
        scanType: 'Certificate Only',
        timestamp: '2026-11-06 12:00:30',
        status: 'Failed' as const,
        ipAddress: '198.51.100.12',
      },
      {
        id: 'TG-SCN-99112',
        target: 'https://microsoft-office365-login.auth-sso.click',
        domain: 'microsoft-office365-login.auth-sso.click',
        riskScore: 95,
        riskLevel: 'critical' as const,
        scanType: 'Full Scan',
        timestamp: '2026-11-05 21:14:55',
        status: 'Completed' as const,
        ipAddress: '195.123.245.9',
      },
      {
        id: 'TG-SCN-99111',
        target: 'https://cloudflare.com',
        domain: 'cloudflare.com',
        riskScore: 3,
        riskLevel: 'safe' as const,
        scanType: 'Rapid Check',
        timestamp: '2026-11-05 17:30:11',
        status: 'Completed' as const,
        ipAddress: '104.16.132.229',
      },
    ];

    return baseItems.map(item => ({
      ...item,
      timestamp: (item as any).timestamp || (item as any).scanDate || '2026-11-07 12:00:00',
      scanType: (item as any).scanType || 'Full Scan',
      status: (item as any).status || 'Completed',
    }));
  }, [history]);

  // Filtering
  const filteredRecords = useMemo(() => {
    return allHistoryRecords.filter((rec) => {
      // Search
      const matchesSearch =
        !searchQuery ||
        rec.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.id.toLowerCase().includes(searchQuery.toLowerCase());

      // Risk
      const matchesRisk =
        riskFilter === 'all' ||
        (riskFilter === 'safe' && rec.riskScore < 25) ||
        (riskFilter === 'suspicious' && rec.riskScore >= 25 && rec.riskScore < 70) ||
        (riskFilter === 'malicious' && rec.riskScore >= 70 && rec.riskScore < 90) ||
        (riskFilter === 'critical' && rec.riskScore >= 90);

      // Status
      const matchesStatus =
        statusFilter === 'all' || rec.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesRisk && matchesStatus;
    });
  }, [allHistoryRecords, searchQuery, riskFilter, statusFilter]);

  // Pagination calculation
  const totalResults = filteredRecords.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDomain(text);
    setTimeout(() => setCopiedDomain(null), 2000);
  };

  const handleRescan = (domain: string) => {
    startScan(`https://${domain}`, 'deep');
    navigate('/scanner/progress');
  };

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Scan ID,Target Domain,Risk Score,Verdict,Scan Type,Date,Status,IP']
        .concat(
          filteredRecords.map(
            (r) =>
              `${r.id},${r.domain},${r.riskScore},${r.riskLevel},${r.scanType},${r.timestamp},${r.status},${r.ipAddress}`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `threatguard_scan_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getVerdictBadge = (score: number, level: string, status: string) => {
    if (status === 'Failed') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
          Unreachable
        </span>
      );
    }
    if (score >= 90) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
          <ShieldAlert className="w-3 h-3" /> Critical
        </span>
      );
    }
    if (score >= 70) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
          <AlertTriangle className="w-3 h-3" /> Malicious
        </span>
      );
    }
    if (score >= 25) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <AlertTriangle className="w-3 h-3" /> Suspicious
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        <ShieldCheck className="w-3 h-3" /> Clean / Safe
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Scan History & Audit Log"
        description="Review past website security assessments, tracked vulnerabilities, and cryptographically verified scan records."
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              className="border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            >
              <Download className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              Export CSV
            </Button>
            <Link to="/scanner">
              <Button
                variant="primary"
                size="sm"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-md shadow-cyan-500/20"
              >
                <Activity className="w-3.5 h-3.5 mr-1.5" />
                New Security Scan
              </Button>
            </Link>
          </div>
        }
      />

      {/* 4 Statistics Cards with Demo Illustrative Mark */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Scans */}
        <Card className="p-4 bg-slate-900/80 border-slate-800 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Scans Performed</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Demo Metrics
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl font-bold font-mono text-slate-100">1,428</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">+18%</span> vs previous 30-day window
          </p>
        </Card>

        {/* Card 2: High-Risk Scans */}
        <Card className="p-4 bg-slate-900/80 border-slate-800 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">High-Risk & Critical</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
              Demo Metrics
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl font-bold font-mono text-red-400">312</span>
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            21.8% flagged with malicious or spoof payload
          </p>
        </Card>

        {/* Card 3: Safe Scans */}
        <Card className="p-4 bg-slate-900/80 border-slate-800 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Safe & Clean Verdicts</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Demo Metrics
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl font-bold font-mono text-emerald-400">984</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            68.9% confirmed legitimate infrastructure
          </p>
        </Card>

        {/* Card 4: Failed Scans */}
        <Card className="p-4 bg-slate-900/80 border-slate-800 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Unreachable / Failed</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Demo Metrics
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl font-bold font-mono text-amber-400">132</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            9.3% DNS NXDOMAIN or connection timeout
          </p>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="p-4 bg-slate-900/80 border-slate-800 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search */}
          <div className="md:col-span-5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by URL, domain, or Scan ID..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          {/* Date Filter */}
          <div className="md:col-span-2">
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="all">Date: All Time</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div className="md:col-span-2">
            <select
              value={riskFilter}
              onChange={(e) => {
                setRiskFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="all">Risk: All Levels</option>
              <option value="safe">Safe (0-24)</option>
              <option value="suspicious">Suspicious (25-69)</option>
              <option value="malicious">Malicious (70-89)</option>
              <option value="critical">Critical (90-100)</option>
            </select>
          </div>

          {/* Scan Status Filter */}
          <div className="md:col-span-3 flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="all">Status: All</option>
              <option value="completed">Completed</option>
              <option value="in progress">In Progress</option>
              <option value="failed">Failed</option>
            </select>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setDateFilter('all');
                setRiskFilter('all');
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className="text-[11px] text-slate-400 hover:text-slate-200 whitespace-nowrap"
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Data Table */}
      <Card className="bg-slate-900/90 border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Target Domain</th>
                <th className="py-3.5 px-3">Risk Score</th>
                <th className="py-3.5 px-3">Verdict</th>
                <th className="py-3.5 px-3">Scan Type</th>
                <th className="py-3.5 px-3">Scan Timestamp</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Globe className="w-8 h-8 mx-auto mb-2 opacity-30 text-cyan-400" />
                    <p className="font-medium text-slate-400">No scan history records match your filters.</p>
                    <p className="text-[11px] text-slate-600 mt-1">Try clearing query terms or running a new security assessment.</p>
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Target Domain */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                          {item.riskScore >= 70 ? (
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-cyan-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-mono font-medium text-slate-200 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                            {item.domain}
                            <span className="text-[10px] text-slate-600 font-sans">({item.id})</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            IP: {item.ipAddress}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Risk Score */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono font-bold text-sm ${
                            item.status === 'Failed'
                              ? 'text-slate-500'
                              : item.riskScore >= 90
                              ? 'text-red-400'
                              : item.riskScore >= 70
                              ? 'text-rose-400'
                              : item.riskScore >= 25
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {item.status === 'Failed' ? 'N/A' : `${item.riskScore}/100`}
                        </span>
                        {item.status !== 'Failed' && (
                          <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                item.riskScore >= 90
                                  ? 'bg-red-500'
                                  : item.riskScore >= 70
                                  ? 'bg-rose-500'
                                  : item.riskScore >= 25
                                  ? 'bg-amber-400'
                                  : 'bg-emerald-400'
                              }`}
                              style={{ width: `${item.riskScore}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Verdict Badge */}
                    <td className="py-3 px-3">
                      {getVerdictBadge(item.riskScore, item.riskLevel, item.status)}
                    </td>

                    {/* Scan Type */}
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 text-[10px] font-medium">
                        {item.scanType}
                      </span>
                    </td>

                    {/* Scan Date & Time */}
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {item.timestamp}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-medium ${
                          item.status === 'Completed'
                            ? 'text-emerald-400'
                            : item.status === 'Failed'
                            ? 'text-red-400'
                            : 'text-cyan-400 animate-pulse'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'Completed'
                              ? 'bg-emerald-400'
                              : item.status === 'Failed'
                              ? 'bg-red-400'
                              : 'bg-cyan-400'
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Report Link */}
                        <Link
                          to="/scanner/results"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                          title="View Security Report"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {/* Rescan Button */}
                        <button
                          type="button"
                          onClick={() => handleRescan(item.domain)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                          title="Rescan Domain"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>

                        {/* Copy Domain Button */}
                        <button
                          type="button"
                          onClick={() => handleCopy(item.domain)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                          title="Copy Domain"
                        >
                          {copiedDomain === item.domain ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => setItemToDelete(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                          title="Delete from Audit History"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Showing <span className="font-mono font-medium text-slate-200">{filteredRecords.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-mono font-medium text-slate-200">
              {Math.min(currentPage * itemsPerPage, filteredRecords.length)}
            </span>{' '}
            of <span className="font-mono font-medium text-cyan-400">{filteredRecords.length}</span> scan logs
            <span className="ml-2 text-[10px] text-slate-600">(Total demo ledger: 1,428)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                type="button"
                onClick={() => setCurrentPage(pg)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-medium transition-colors ${
                  currentPage === pg
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          if (itemToDelete) {
            deleteHistoryItem(itemToDelete);
            setItemToDelete(null);
          }
        }}
        title="Delete Scan Record from History?"
        message="This will irrevocably remove this domain assessment and its cryptographic telemetry proofs from your local audit ledger."
        confirmText="Confirm Delete"
        isDestructive
      />
    </div>
  );
};
