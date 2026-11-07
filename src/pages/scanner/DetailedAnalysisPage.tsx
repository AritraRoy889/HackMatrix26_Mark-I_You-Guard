import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Globe,
  FileCheck2,
  Cpu,
  Radio,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Download,
  Info,
  Server,
  Lock,
  Code2,
  Terminal,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useScan } from '../../hooks/useScan';
import { formatDate } from '../../utils/formatDate';

export const DetailedAnalysisPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { currentScan } = useScan();
  const domain = searchParams.get('domain') || currentScan?.domain || 'secure-login.chase.com.accounts-verification.xyz';

  // Toggle state for expandable evidence panels
  const [expandedSection, setExpandedSection] = useState<number | null>(1);

  const toggleSection = (num: number) => {
    setExpandedSection(expandedSection === num ? null : num);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Link
              to="/scanner/results"
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Summary Report (Page 09)</span>
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
            Detailed Four-Pillar Analysis Report: {domain}
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Scan ID: <strong className="text-slate-300">TG-AUDIT-9921-ANALYSIS</strong> • Status: <span className="text-rose-400 font-bold">CRITICAL THREAT</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="rose" size="md" className="font-mono font-bold">
            HIGH RISK 87/100
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Export Audit
          </Button>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2 font-mono">
        <Info className="w-4 h-4 shrink-0 text-cyan-400" />
        <span>Demonstration fixtures explicitly labeled. All telemetry exhibits sample security analysis data.</span>
      </div>

      {/* MAIN TWO COLUMN LAYOUT: Technical Sections + Compact Metadata Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT / CENTER: FOUR LARGE TECHNICAL SECTIONS (3 COLS) */}
        <div className="lg:col-span-3 space-y-6">
          {/* SECTION 1 — WEB SECURITY ASSESSMENT */}
          <Card className="p-6 bg-slate-900/80 border-slate-800 space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(1)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                    Section 1 — Web Security Assessment
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Redirect analysis, DOM inspection, outdated dependencies & headers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="rose" size="sm">3 VULNERABILITIES</Badge>
                {expandedSection === 1 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>

            {expandedSection === 1 && (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-in fade-in">
                {/* Findings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                        <th className="pb-2">Vulnerability / Check</th>
                        <th className="pb-2">Severity</th>
                        <th className="pb-2">Technical Evidence</th>
                        <th className="pb-2">Confidence</th>
                        <th className="pb-2 text-right">Remediation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-slate-300">
                      <tr>
                        <td className="py-2.5 font-bold text-white">Homoglyph Brand Mimicry</td>
                        <td className="py-2.5"><Badge variant="rose" size="sm">CRITICAL</Badge></td>
                        <td className="py-2.5 text-[11px] text-slate-400">Uses "chase.com" sublabel on .xyz registry</td>
                        <td className="py-2.5 text-cyan-400">99%</td>
                        <td className="py-2.5 text-right text-slate-400">UDRP Domain Takedown</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">Hidden Credential Exfiltration Iframe</td>
                        <td className="py-2.5"><Badge variant="rose" size="sm">HIGH</Badge></td>
                        <td className="py-2.5 text-[11px] text-slate-400">&lt;iframe src="//185.220.101.42/sink.php" style="display:none"&gt;</td>
                        <td className="py-2.5 text-cyan-400">94%</td>
                        <td className="py-2.5 text-right text-slate-400">Deploy Strict CSP</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">Missing HSTS & X-Frame-Options</td>
                        <td className="py-2.5"><Badge variant="amber" size="sm">MEDIUM</Badge></td>
                        <td className="py-2.5 text-[11px] text-slate-400">Header response absent; framing permitted</td>
                        <td className="py-2.5 text-cyan-400">100%</td>
                        <td className="py-2.5 text-right text-slate-400">Set Strict-Transport</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Technical Evidence Panel */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                  <span className="text-slate-500 text-[10px] block font-bold uppercase">Raw DOM Extraction Trace:</span>
                  <p className="text-cyan-400 text-[11px]">HTTP/1.1 200 OK | Server: nginx/1.18.0 (Ubuntu)</p>
                  <p className="text-slate-400 text-[11px]">&lt;form action="https://185.220.101.42/auth/sinkhole.php" method="POST"&gt;</p>
                  <p className="text-slate-400 text-[11px]">&nbsp;&nbsp;&lt;input type="password" name="user_pin_pass" id="otp_code" /&gt;</p>
                </div>
              </div>
            )}
          </Card>

          {/* SECTION 2 — ADVANCED CERTIFICATE VALIDATION */}
          <Card className="p-6 bg-slate-900/80 border-slate-800 space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(2)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                    Section 2 — Advanced Certificate Validation
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    TLS protocol, Certificate Issuer, Subject, CA integrity & transparency logs
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="amber" size="sm">SHORT LIFETIME</Badge>
                {expandedSection === 2 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>

            {expandedSection === 2 && (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-in fade-in">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                        <th className="pb-2">Certificate Parameter</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Cryptographic Value</th>
                        <th className="pb-2 text-right">Assessment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-slate-300">
                      <tr>
                        <td className="py-2.5 font-bold text-white">TLS Protocol Support</td>
                        <td className="py-2.5"><Badge variant="emerald" size="sm">VERIFIED</Badge></td>
                        <td className="py-2.5 text-[11px] text-slate-400">TLS 1.2 / TLS 1.3 Supported</td>
                        <td className="py-2.5 text-right text-emerald-400">Modern Ciphers</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">Root & Intermediate CA</td>
                        <td className="py-2.5"><Badge variant="emerald" size="sm">VALID ROOT</Badge></td>
                        <td className="py-2.5 text-[11px] text-slate-400">Let's Encrypt Authority E6 (ISRG Root X1)</td>
                        <td className="py-2.5 text-right text-slate-400">Automated ACME</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">Certificate Transparency Log</td>
                        <td className="py-2.5"><Badge variant="cyan" size="sm">LOGGED</Badge></td>
                        <td className="py-2.5 text-[11px] text-slate-400">Google Argon2026 CT Log #88201</td>
                        <td className="py-2.5 text-right text-cyan-400">Public Proof OK</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                  <span className="text-slate-500 text-[10px] block font-bold uppercase">Chain of Trust Hierarchy Node:</span>
                  <p className="text-slate-300">accounts-verification.xyz [Leaf] &rarr; Let's Encrypt E6 [Intermediate] &rarr; ISRG Root X1 [Root]</p>
                  <p className="text-slate-400 text-[11px]">Valid from: 2026-11-01 to 2027-01-30 (87 days remaining). Signature: SHA256withRSA.</p>
                </div>
              </div>
            )}
          </Card>

          {/* SECTION 3 — DYNAMIC THREAT ANALYSIS */}
          <Card className="p-6 bg-slate-900/80 border-slate-800 space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(3)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                    Section 3 — Dynamic Threat Analysis
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Sandbox runtime behavior, payload inspection & visual similarity
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="rose" size="sm">HOSTILE RUNTIME</Badge>
                {expandedSection === 3 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>

            {expandedSection === 3 && (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-in fade-in">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                        <th className="pb-2">Behavior Observation</th>
                        <th className="pb-2">Severity</th>
                        <th className="pb-2">Telemetry Detail</th>
                        <th className="pb-2 text-right">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-slate-300">
                      <tr>
                        <td className="py-2.5 font-bold text-white">Debugger / Headless Evasion Script</td>
                        <td className="py-2.5"><Badge variant="rose" size="sm">CRITICAL</Badge></td>
                        <td className="py-2.5 text-[11px] text-slate-400">Checks for `navigator.webdriver` flag & pauses execution</td>
                        <td className="py-2.5 text-right text-rose-400">96%</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">Visual Similarity Index</td>
                        <td className="py-2.5"><Badge variant="rose" size="sm">HIGH</Badge></td>
                        <td className="py-2.5 text-[11px] text-slate-400">97.8% perceptual hash alignment with Chase Bank login</td>
                        <td className="py-2.5 text-right text-rose-400">98%</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">Dynamic Redirect Hops</td>
                        <td className="py-2.5"><Badge variant="amber" size="sm">MEDIUM</Badge></td>
                        <td className="py-2.5 text-[11px] text-slate-400">2 intermediate hops via shortener before landing</td>
                        <td className="py-2.5 text-right text-cyan-400">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                  <span className="text-slate-500 text-[10px] block font-bold uppercase">Sandbox Execution Verdict:</span>
                  <p className="text-rose-300">Malicious phishing kit executing active credential interception and OTP token harvesting.</p>
                </div>
              </div>
            )}
          </Card>

          {/* SECTION 4 — THREAT INTELLIGENCE */}
          <Card className="p-6 bg-slate-900/80 border-slate-800 space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(4)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                    Section 4 — Threat Intelligence & Reputation
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Blacklist reputation, OSINT indicators & community incident correlation
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="rose" size="sm">11/12 ENGINES ALERTED</Badge>
                {expandedSection === 4 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>

            {expandedSection === 4 && (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-in fade-in">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                        <th className="pb-2">Intelligence Source</th>
                        <th className="pb-2">Classification</th>
                        <th className="pb-2">Last Observed</th>
                        <th className="pb-2 text-right">Reputation Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-slate-300">
                      <tr>
                        <td className="py-2.5 font-bold text-white">Google Safe Browsing API</td>
                        <td className="py-2.5"><Badge variant="rose" size="sm">SOCIAL ENGINEERING</Badge></td>
                        <td className="py-2.5 text-slate-400">14 minutes ago</td>
                        <td className="py-2.5 text-right text-rose-400 font-bold">100/100 Threat</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">VirusTotal Threat Core</td>
                        <td className="py-2.5"><Badge variant="rose" size="sm">MALICIOUS</Badge></td>
                        <td className="py-2.5 text-slate-400">Just now</td>
                        <td className="py-2.5 text-right text-rose-400 font-bold">11 / 12 Feeds</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-white">PhishTank Verified DB</td>
                        <td className="py-2.5"><Badge variant="rose" size="sm">VERIFIED PHISH</Badge></td>
                        <td className="py-2.5 text-slate-400">22 minutes ago</td>
                        <td className="py-2.5 text-right text-rose-400 font-bold">Confirmed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                  <span className="text-slate-500 text-[10px] block font-bold uppercase">Associated Threat Campaign Tag:</span>
                  <p className="text-slate-300">#OperationShadowDrop • US Banking Phishing Cluster • AS44050 Bulletproof Hosting</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT: COMPACT TECHNICAL METADATA SIDEBAR (1 COL) */}
        <div className="space-y-4">
          <Card className="p-5 bg-slate-900/80 border-slate-800 space-y-4 font-mono text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              Technical Metadata
            </h4>

            <div className="space-y-2.5">
              <div>
                <span className="text-slate-500 block text-[10px]">TARGET FQDN</span>
                <span className="text-white font-semibold break-all">{domain}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">RESOLVED IP</span>
                <span className="text-cyan-400 font-bold">185.220.101.42</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">AUTONOMOUS SYSTEM</span>
                <span className="text-slate-300">AS44050 (HostKey B.V.)</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">GEOLOCATION</span>
                <span className="text-slate-300">Seychelles (SC)</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">REGISTRAR</span>
                <span className="text-slate-300">NameCheap Inc. (.xyz)</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">DOMAIN AGE</span>
                <span className="text-amber-400 font-bold">3 Days Old (Zero-Day)</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">NAMESERVERS</span>
                <span className="text-slate-300 block">ns1.anonymous-dns.su</span>
                <span className="text-slate-300 block">ns2.anonymous-dns.su</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <Link to="/community/submit">
                <Button variant="cyber" size="sm" className="w-full text-xs">
                  Escalate Incident
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
