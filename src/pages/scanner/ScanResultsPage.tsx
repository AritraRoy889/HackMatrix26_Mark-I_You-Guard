import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useScan } from '../../hooks/useScan';
import {
  FileText,
  RefreshCw,
  AlertOctagon,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Globe,
  FileCheck2,
  Cpu,
  Radio,
  ArrowRight,
  Download,
  Info,
  CheckCircle2,
  ExternalLink,
  Lock,
  Server,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ExportReportModal } from '../../features/scan-results/ExportReportModal';
import { formatDate } from '../../utils/formatDate';

export const ScanResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentScan, startScan } = useScan();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // If scan is passed in state, prefer that; otherwise default currentScan
  const scan = (location.state as any)?.scan || currentScan;

  if (!scan) {
    return (
      <div className="p-12 text-center space-y-4">
        <h3 className="text-base font-semibold text-white">No active scan report found</h3>
        <p className="text-xs text-slate-400">Please enter a URL or domain in the scanner first.</p>
        <Link to="/scanner">
          <Button variant="cyber" size="sm">
            Go to Scanner
          </Button>
        </Link>
      </div>
    );
  }

  const handleRescan = async () => {
    navigate('/scanner/progress');
    try {
      await startScan(scan.target);
      navigate('/scanner/results');
    } catch {
      navigate('/scanner');
    }
  };

  // Four Pillar Assessment Data from prompt
  const fourPillarResults = [
    {
      title: 'Web Security Assessment',
      status: scan.riskScore > 50 ? 'Warning' : 'Passed',
      severity: scan.riskScore > 50 ? 'High' : 'Safe',
      checksPerformed: 14,
      findingsCount: scan.riskScore > 50 ? 5 : 0,
      icon: Globe,
      color: scan.riskScore > 50 ? 'text-amber-400' : 'text-emerald-400',
      badgeVariant: scan.riskScore > 50 ? 'amber' : 'emerald',
      subtext: 'DOM traps, hidden login elements, typosquatting',
    },
    {
      title: 'Certificate Validation',
      status: scan.certificate.isValid ? 'Valid Chain' : 'Untrusted',
      severity: scan.certificate.isValid ? 'Safe' : 'Critical',
      checksPerformed: 6,
      findingsCount: scan.certificate.isValid ? 1 : 3,
      icon: FileCheck2,
      color: scan.certificate.isValid ? 'text-emerald-400' : 'text-rose-400',
      badgeVariant: scan.certificate.isValid ? 'emerald' : 'rose',
      subtext: `${scan.certificate.protocol} • ${scan.certificate.daysRemaining}d remaining`,
    },
    {
      title: 'Dynamic Threat Analysis',
      status: scan.riskScore > 70 ? 'Malicious Activity' : 'Clean Sandbox',
      severity: scan.riskScore > 70 ? 'Critical' : 'Safe',
      checksPerformed: 8,
      findingsCount: scan.riskScore > 70 ? 4 : 0,
      icon: Cpu,
      color: scan.riskScore > 70 ? 'text-rose-400' : 'text-emerald-400',
      badgeVariant: scan.riskScore > 70 ? 'rose' : 'emerald',
      subtext: 'Runtime JavaScript exfiltration & evasions',
    },
    {
      title: 'Threat Intelligence',
      status: scan.enginesDetected > 0 ? 'Blacklist Match' : 'Unflagged',
      severity: scan.enginesDetected > 0 ? 'High' : 'Safe',
      checksPerformed: 12,
      findingsCount: scan.enginesDetected,
      icon: Radio,
      color: scan.enginesDetected > 0 ? 'text-rose-400' : 'text-emerald-400',
      badgeVariant: scan.enginesDetected > 0 ? 'rose' : 'emerald',
      subtext: `${scan.enginesDetected}/${scan.enginesTotal} vendor feeds alerted`,
    },
  ];

  // Weighted Risk Score Breakdown Factors
  const riskBreakdown = [
    { factor: 'Phishing Brand Impersonation', points: 35, percentage: 40, color: '#ef4444' },
    { factor: 'Deceptive Homograph Domain', points: 25, percentage: 30, color: '#f97316' },
    { factor: 'Missing HSTS & Weak CSP Headers', points: 15, percentage: 18, color: '#eab308' },
    { factor: 'Disposable Short-Lifetime TLS', points: 12, percentage: 12, color: '#06b6d4' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 uppercase">Security Scan Report</span>
            <span>•</span>
            <Badge riskLevel={scan.riskLevel} size="sm">
              {scan.riskLevel.toUpperCase()}
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
            {scan.domain}
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Scan ID: <strong className="text-slate-300">{scan.id}</strong> • Timestamp: {formatDate(scan.scanDate)}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRescan}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Rescan
          </Button>

          <Button
            variant="cyber"
            size="sm"
            onClick={() => setIsExportModalOpen(true)}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Download PDF
          </Button>
        </div>
      </div>

      {/* HERO RISK ASSESSMENT: Circular Risk Score Visualization (0-100) */}
      <Card className="p-6 sm:p-8 bg-slate-900/80 border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left Circular Visualization */}
        <div className="flex flex-col items-center justify-center text-center space-y-2 border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
          <div className="relative w-40 h-40 rounded-full border-4 border-rose-500/40 bg-rose-500/10 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(239,68,68,0.3)]">
            <div className="text-5xl font-black font-mono text-white tracking-tight">
              {scan.riskScore}
            </div>
            <span className="text-[10px] font-mono text-rose-300 uppercase tracking-widest mt-1">
              / 100 Risk Score
            </span>
          </div>

          <div className="pt-2">
            <Badge variant="rose" size="md" className="font-mono font-bold tracking-wider">
              VERDICT: {scan.riskScore > 70 ? 'HIGH RISK' : scan.riskScore > 35 ? 'SUSPICIOUS' : 'SAFE'}
            </Badge>
            <p className="text-[11px] font-mono text-slate-400 mt-1">
              Engine Confidence: <strong className="text-cyan-400">94%</strong>
            </p>
          </div>
        </div>

        {/* Right AI Explanation & Context */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Automated AI Risk Explanation
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
              <Info className="w-3 h-3 text-cyan-400" /> Sample demonstration values
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800 font-sans">
            "Multiple suspicious indicators were identified across website behaviour, reputation and security configuration. The target exhibits characteristics of a credential interception portal imitating financial institutions."
          </p>

          {/* Quick Metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">RESOLVED IP</span>
              <span className="text-slate-200 font-bold">{scan.ipAddress}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">AUTONOMOUS SYSTEM</span>
              <span className="text-slate-200 truncate block">{scan.asn}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">GEOLOCATION</span>
              <span className="text-slate-200">{scan.country}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">SCAN LATENCY</span>
              <span className="text-cyan-400">{scan.durationMs}ms</span>
            </div>
          </div>
        </div>
      </Card>

      {/* FOUR PILLAR RESULTS: Visually Distinct Assessment Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
            Four-Pillar Assessment Breakdown
          </h3>
          <Link
            to={`/scanner/detailed-analysis?domain=${scan.domain}`}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View Comprehensive Technical Report (Page 10)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fourPillarResults.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={idx}
                className="p-5 bg-slate-900/70 border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <Icon className={`w-4 h-4 ${pillar.color}`} />
                    </div>
                    <Badge variant={pillar.badgeVariant as any} size="sm">
                      {pillar.status}
                    </Badge>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-1">{pillar.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight mb-2">{pillar.subtext}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Checks Run:</span>
                    <span className="text-slate-200">{pillar.checksPerformed}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Findings:</span>
                    <span className={pillar.findingsCount > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {pillar.findingsCount} flagged
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Severity:</span>
                    <span className="text-slate-200">{pillar.severity}</span>
                  </div>

                  <Link to={`/scanner/detailed-analysis?domain=${scan.domain}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs mt-1">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* RISK SCORE BREAKDOWN CONTRIBUTION CHART */}
      <Card className="p-6 bg-slate-900/70 border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Risk Score Contribution Breakdown</h3>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              How individual findings and anomaly weights formulate the 87/100 risk score
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold">100% Normalized</span>
        </div>

        {/* Stacked Breakdown Bar */}
        <div className="space-y-2">
          <div className="flex h-3.5 w-full rounded-full overflow-hidden bg-slate-950 p-0.5 border border-slate-800">
            {riskBreakdown.map((item, i) => (
              <div
                key={i}
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                className="h-full first:rounded-l-full last:rounded-r-full"
                title={`${item.factor}: ${item.percentage}%`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-mono">
            {riskBreakdown.map((item, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-slate-200">{item.points} Pts</span>
                </div>
                <span className="text-[11px] text-slate-400 leading-tight block">{item.factor}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ADDITIONAL SECTIONS: Critical Findings & Recommended Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Findings & Suspicious Indicators */}
        <Card className="p-6 bg-slate-900/70 border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-bold text-white">Critical Findings & Suspicious Indicators</h3>
          </div>

          <ul className="space-y-2 text-xs">
            {scan.threatsDetected.map((threat: string, i: number) => (
              <li
                key={i}
                className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start gap-2.5"
              >
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{threat}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recommended Actions */}
        <Card className="p-6 bg-slate-900/70 border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Recommended Remediation Actions</h3>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2">
              <span className="font-bold text-cyan-400 font-mono">1.</span>
              <span>Block outbound DNS resolution and network traffic to <strong>{scan.domain}</strong> across all corporate proxies and firewalls.</span>
            </li>
            <li className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2">
              <span className="font-bold text-cyan-400 font-mono">2.</span>
              <span>Issue takedown notifications to the hosting registrar and upstream transit provider (AS44050).</span>
            </li>
            <li className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2">
              <span className="font-bold text-cyan-400 font-mono">3.</span>
              <span>Audit corporate mail logs for incoming lure emails referencing password updates or account verification.</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        scan={scan}
      />
    </div>
  );
};
