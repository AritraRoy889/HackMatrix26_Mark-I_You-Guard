import React, { useState } from 'react';
import {
  Radio,
  Search,
  Globe,
  Server,
  FileCheck2,
  AlertOctagon,
  Users,
  Flame,
  Filter,
  CheckCircle2,
  ExternalLink,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatTimeAgo } from '../../utils/formatDate';

interface GraphNode {
  id: string;
  label: string;
  type: 'domain' | 'ip' | 'cert' | 'campaign' | 'report';
  risk: 'malicious' | 'suspicious' | 'verified' | 'unknown';
  reputation: string;
  confidence: string;
  firstSeen: string;
  lastSeen: string;
  associatedReports: number;
  relatedIndicators: string[];
  evidence: string;
  x: number;
  y: number;
}

export const ThreatExplorerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  // Interactive Graph Nodes
  const nodes: GraphNode[] = [
    {
      id: 'node-domain-1',
      label: 'accounts-verification.xyz',
      type: 'domain',
      risk: 'malicious',
      reputation: '96/100 (Critical Malicious)',
      confidence: '98%',
      firstSeen: '2026-11-03T10:14:00Z',
      lastSeen: '12 mins ago',
      associatedReports: 14,
      relatedIndicators: ['185.220.101.42', 'Let\'s Encrypt E6 #4991', '#ShadowDrop Campaign'],
      evidence: 'Reverse DNS homoglyph attack mirroring Chase Online banking login forms.',
      x: 350,
      y: 150,
    },
    {
      id: 'node-ip-1',
      label: '185.220.101.42 (Offshore C2)',
      type: 'ip',
      risk: 'malicious',
      reputation: '92/100 (Hostile C2 Host)',
      confidence: '95%',
      firstSeen: '2026-10-29T08:00:00Z',
      lastSeen: '5 mins ago',
      associatedReports: 28,
      relatedIndicators: ['accounts-verification.xyz', 'chase-account-update.ru', '#ShadowDrop Campaign'],
      evidence: 'Bulletproof VPS host routing credential theft packets.',
      x: 180,
      y: 80,
    },
    {
      id: 'node-cert-1',
      label: 'Let\'s Encrypt E6 (#4991)',
      type: 'cert',
      risk: 'suspicious',
      reputation: '65/100 (Automated Ephemeral)',
      confidence: '90%',
      firstSeen: '2026-11-01T12:00:00Z',
      lastSeen: '1 hour ago',
      associatedReports: 6,
      relatedIndicators: ['accounts-verification.xyz'],
      evidence: 'Rapidly rotated 90-day disposable certificate without verified organization details.',
      x: 520,
      y: 80,
    },
    {
      id: 'node-campaign-1',
      label: '#OperationShadowDrop',
      type: 'campaign',
      risk: 'malicious',
      reputation: '99/100 (Active Cyber Threat Campaign)',
      confidence: '99%',
      firstSeen: '2026-10-15T00:00:00Z',
      lastSeen: 'Active Now',
      associatedReports: 84,
      relatedIndicators: ['185.220.101.42', 'accounts-verification.xyz', 'paypal-recovery.ru'],
      evidence: 'Adversary in the Middle (AiTM) kit stealing session cookies and OTP bypass codes.',
      x: 180,
      y: 230,
    },
    {
      id: 'node-report-1',
      label: 'Community Report #CR-882',
      type: 'report',
      risk: 'verified',
      reputation: 'Verified (Score +42)',
      confidence: '97%',
      firstSeen: '2026-11-06T18:20:00Z',
      lastSeen: '2 hours ago',
      associatedReports: 42,
      relatedIndicators: ['accounts-verification.xyz'],
      evidence: 'Submitted by analyst GhostRider_Sec with raw HTTP header dumps.',
      x: 520,
      y: 230,
    },
    {
      id: 'node-related-domain',
      label: 'chase-account-update.ru',
      type: 'domain',
      risk: 'malicious',
      reputation: '88/100 (Secondary Lure)',
      confidence: '94%',
      firstSeen: '2026-11-04T05:00:00Z',
      lastSeen: '30 mins ago',
      associatedReports: 9,
      relatedIndicators: ['185.220.101.42'],
      evidence: 'Predecessor domain in identical IP allocation block.',
      x: 350,
      y: 290,
    },
  ];

  // Selected indicator in right panel
  const [selectedNode, setSelectedNode] = useState<GraphNode>(nodes[0]);

  // Network connections between nodes
  const edges = [
    { from: 'node-domain-1', to: 'node-ip-1' },
    { from: 'node-domain-1', to: 'node-cert-1' },
    { from: 'node-domain-1', to: 'node-campaign-1' },
    { from: 'node-domain-1', to: 'node-report-1' },
    { from: 'node-domain-1', to: 'node-related-domain' },
    { from: 'node-ip-1', to: 'node-campaign-1' },
    { from: 'node-ip-1', to: 'node-related-domain' },
  ];

  const filteredNodes = nodes.filter((n) => {
    const matchesFilter = filterRisk === 'all' || n.risk === filterRisk;
    const matchesSearch = !searchTerm || n.label.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* PAGE TITLE & SUBTITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Threat Intelligence Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Investigate domains, IP addresses, certificates and associated threat indicators.
          </p>
        </div>

        <Badge variant="cyan" size="sm" className="font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          INTERACTIVE IOC GRAPH ACTIVE
        </Badge>
      </div>

      {/* TOP GLOBAL IOC SEARCH */}
      <Card className="p-4 bg-slate-900/80 border-slate-800">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-cyan-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Global IOC Search: Domain, URL, IP address (e.g. 185.220...), Certificate SHA-256 fingerprint, or Threat Hash..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </Card>

      {/* MAIN VISUAL: Interactive Graph with Left Filter Panel & Right Intelligence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT FILTER PANEL (1 COL) */}
        <div className="space-y-4">
          <Card className="p-5 bg-slate-900/80 border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Filter className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-white uppercase text-[11px] tracking-wider">
                Filter Threat Posture
              </h3>
            </div>

            <div className="space-y-1.5">
              {[
                { label: 'All Indicators', val: 'all' },
                { label: 'Malicious Only', val: 'malicious' },
                { label: 'Suspicious Anomaly', val: 'suspicious' },
                { label: 'Verified Reports', val: 'verified' },
                { label: 'Recently Observed', val: 'unknown' },
              ].map((f) => (
                <button
                  key={f.val}
                  type="button"
                  onClick={() => setFilterRisk(f.val)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between text-xs ${
                    filterRisk === f.val
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{f.label}</span>
                  {filterRisk === f.val && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed font-sans">
              Click any node in the graph to populate deep forensic indicators and evidence references in the right panel.
            </div>
          </Card>
        </div>

        {/* CENTER: INTERACTIVE THREAT RELATIONSHIP NETWORK GRAPH (2 COLS) */}
        <div className="lg:col-span-2">
          <Card className="p-4 bg-slate-950 border-slate-800 relative overflow-hidden flex flex-col justify-between h-[420px] shadow-2xl">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Threat Correlation Mesh Graph
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Click nodes to investigate
              </span>
            </div>

            {/* SVG Network Graph Canvas */}
            <div className="relative w-full h-full flex items-center justify-center my-2">
              <svg viewBox="0 0 700 360" className="w-full h-full">
                {/* Background Grid Pattern */}
                <defs>
                  <pattern id="graphGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#1e293b" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#graphGrid)" opacity="0.6" />

                {/* Connection Edges */}
                {edges.map((edge, i) => {
                  const src = nodes.find((n) => n.id === edge.from);
                  const dest = nodes.find((n) => n.id === edge.to);
                  if (!src || !dest) return null;
                  const isHighlighted = selectedNode.id === src.id || selectedNode.id === dest.id;
                  return (
                    <line
                      key={i}
                      x1={src.x}
                      y1={src.y}
                      x2={dest.x}
                      y2={dest.y}
                      stroke={isHighlighted ? '#06b6d4' : '#334155'}
                      strokeWidth={isHighlighted ? '2.5' : '1.5'}
                      strokeDasharray={isHighlighted ? '4 2' : undefined}
                      opacity={isHighlighted ? 0.9 : 0.4}
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const isMalicious = node.risk === 'malicious';
                  const isVerified = node.risk === 'verified';

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      {/* Outer pulse circle for selected */}
                      {isSelected && (
                        <circle r="26" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.6" className="animate-ping" />
                      )}

                      {/* Main Node Shape */}
                      <circle
                        r="18"
                        fill={isMalicious ? '#7f1d1d' : isVerified ? '#065f46' : '#1e293b'}
                        stroke={isSelected ? '#22d3ee' : isMalicious ? '#ef4444' : '#10b981'}
                        strokeWidth={isSelected ? '3' : '2'}
                      />

                      {/* Node Text Label */}
                      <text
                        y="32"
                        textAnchor="middle"
                        fill={isSelected ? '#22d3ee' : '#cbd5e1'}
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {node.label.length > 20 ? node.label.slice(0, 18) + '...' : node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legend below Graph */}
            <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900 z-10">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Hostile Domain / IP
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Digital Certificate
              </span>
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-400" /> Campaign Threat
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Community Evidence
              </span>
            </div>
          </Card>
        </div>

        {/* RIGHT INTELLIGENCE PANEL: Selected Indicator Details (1 COL) */}
        <div className="space-y-4">
          <Card className="p-5 bg-slate-900/80 border-slate-800 space-y-4 font-mono text-xs">
            <div className="pb-3 border-b border-slate-800">
              <span className="text-[10px] uppercase text-cyan-400 font-bold block">
                Selected Node Intelligence
              </span>
              <h3 className="text-sm font-bold text-white break-all mt-0.5">
                {selectedNode.label}
              </h3>
            </div>

            <div className="space-y-2.5">
              <div>
                <span className="text-slate-500 block text-[10px]">INDICATOR TYPE</span>
                <span className="text-white capitalize">{selectedNode.type}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">REPUTATION ASSESSMENT</span>
                <span className={selectedNode.risk === 'malicious' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {selectedNode.reputation}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">ENGINE CONFIDENCE</span>
                <span className="text-cyan-400 font-bold">{selectedNode.confidence}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">FIRST SEEN / LAST SEEN</span>
                <span className="text-slate-300 block">{formatTimeAgo(selectedNode.firstSeen)} &rarr; {selectedNode.lastSeen}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">ASSOCIATED INCIDENT REPORTS</span>
                <span className="text-slate-200">{selectedNode.associatedReports} Verified Submissions</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">RELATED INDICATORS</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedNode.relatedIndicators.map((rel, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                      {rel}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">EVIDENCE REFERENCES</span>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 mt-1">
                  {selectedNode.evidence}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* BOTTOM: RECENT THREAT INTELLIGENCE TABLE */}
      <Card className="p-6 bg-slate-900/80 border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
            Recent Global Indicators of Compromise (Sample Data)
          </h3>
          <span className="text-xs font-mono text-cyan-400">Streamed from 12 Vendor Meshes</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                <th className="pb-2.5">Indicator</th>
                <th className="pb-2.5">Type</th>
                <th className="pb-2.5">Reputation</th>
                <th className="pb-2.5">Targeted Entity</th>
                <th className="pb-2.5">First Seen</th>
                <th className="pb-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-slate-300">
              {nodes.map((node) => (
                <tr key={node.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 font-bold text-white">{node.label}</td>
                  <td className="py-2.5 capitalize text-slate-400">{node.type}</td>
                  <td className="py-2.5">
                    <Badge variant={node.risk === 'malicious' ? 'rose' : node.risk === 'suspicious' ? 'amber' : 'emerald'} size="sm">
                      {node.risk.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-slate-300 font-sans">US Banking / Enterprise</td>
                  <td className="py-2.5 text-slate-400">{formatTimeAgo(node.firstSeen)}</td>
                  <td className="py-2.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs px-2.5"
                      onClick={() => setSelectedNode(node)}
                    >
                      Inspect Node
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
