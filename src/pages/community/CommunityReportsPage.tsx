import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Plus,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Filter,
  Search,
  Award,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { communityService } from '../../services/community.service';
import { CommunityReport } from '../../types/community.types';
import { formatTimeAgo, formatDate } from '../../utils/formatDate';

export const CommunityReportsPage: React.FC = () => {
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    communityService.getReports().then(setReports);
  }, []);

  // Top Statistics from prompt
  const topStats = [
    { label: 'Total Submissions', value: '4,892', change: '+128 this week', icon: Users, color: 'text-cyan-400' },
    { label: 'Verified Reports', value: '3,740', change: '76.4% verified rate', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Under Review', value: '984', change: 'Analyst queue active', icon: Clock, color: 'text-amber-400' },
    { label: 'Rejected Reports', value: '168', change: 'False positives triaged', icon: XCircle, color: 'text-slate-400' },
  ];

  // Filters from prompt
  const filterTabs = [
    { label: 'All Reports', val: 'all' },
    { label: 'Verified', val: 'verified_threat' },
    { label: 'Pending', val: 'pending_review' },
    { label: 'Rejected', val: 'false_positive' },
    { label: 'Phishing', val: 'phishing' },
    { label: 'Impersonation', val: 'impersonation' },
    { label: 'Malware', val: 'malware' },
    { label: 'Suspicious Redirects', val: 'redirect' },
  ];

  const filteredReports = reports.filter((r) => {
    const matchesFilter =
      activeFilter === 'all' ||
      r.status === activeFilter ||
      r.threatType.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch =
      !searchTerm ||
      r.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Community Threat Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Help identify suspicious websites and strengthen collective digital security.
          </p>
        </div>

        {/* PRIMARY CTA: Report a Suspicious Website */}
        <Link to="/community/submit">
          <Button
            variant="cyber"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            className="font-mono text-xs font-bold"
          >
            Report a Suspicious Website
          </Button>
        </Link>
      </div>

      {/* TOP STATISTICS: Four Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} className="p-5 bg-slate-900/70 border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black font-mono text-white">{s.value}</div>
                <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">{s.change}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="space-y-3">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-cyan-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by suspicious target URL, threat keyword, or anonymous reporter handle..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filter Pills from prompt */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs">
          {filterTabs.map((tab) => (
            <button
              key={tab.val}
              type="button"
              onClick={() => setActiveFilter(tab.val)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeFilter === tab.val
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN DATA TABLE: Columns from prompt */}
      <Card className="p-6 bg-slate-900/80 border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                <th className="pb-3">Reported URL / Domain</th>
                <th className="pb-3">Threat Category</th>
                <th className="pb-3">Reporter</th>
                <th className="pb-3">Submission Date</th>
                <th className="pb-3">Verification Status</th>
                <th className="pb-3">Confidence</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-slate-300">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="font-bold text-white block truncate max-w-xs">{report.target}</span>
                    <span className="text-[10px] text-slate-500 block truncate max-w-xs">{report.description}</span>
                  </td>
                  <td className="py-3 text-cyan-300 capitalize">{report.threatType}</td>
                  {/* Privacy-conscious reporter identities */}
                  <td className="py-3 text-slate-400">
                    <span className="text-slate-300 font-semibold">{report.reportedBy}</span>
                    <span className="text-[10px] text-slate-500 block">Rep: {report.reporterReputation}</span>
                  </td>
                  <td className="py-3 text-slate-400">{formatTimeAgo(report.reportedAt)}</td>
                  <td className="py-3">
                    <Badge
                      variant={report.status === 'verified_threat' ? 'emerald' : report.status === 'pending_review' ? 'amber' : 'default'}
                      size="sm"
                    >
                      {report.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 text-cyan-400 font-bold">
                    {report.upvotes > 20 ? '96%' : report.upvotes > 10 ? '91%' : '84%'}
                  </td>
                  <td className="py-3 text-right">
                    <Link to="/scanner" state={{ target: report.target }}>
                      <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* LOWER PANEL: Community contribution highlights and recently verified threats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-slate-900/70 border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Award className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              Top Threat Contributors This Month
            </h4>
          </div>
          <div className="space-y-2">
            {[
              { name: 'GhostRider_Sec', score: '+1,480 Rep', reports: '42 Verified' },
              { name: 'Analyst_Sara', score: '+1,280 Rep', reports: '38 Verified' },
              { name: 'HexByte_SOC', score: '+890 Rep', reports: '21 Verified' },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="font-semibold text-white">{user.name}</span>
                <span className="text-cyan-400 font-bold">{user.score}</span>
                <span className="text-slate-400 text-[10px]">{user.reports}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-slate-900/70 border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              Recently Verified Global Threat Signatures
            </h4>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Community verified reports feed directly into THREATGUARD's Neural Classifier mesh, protecting thousands of enterprise client endpoints within minutes of peer verification.
          </p>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
            Average triage response time: <strong className="text-white">18 minutes</strong>
          </div>
        </Card>
      </div>
    </div>
  );
};
