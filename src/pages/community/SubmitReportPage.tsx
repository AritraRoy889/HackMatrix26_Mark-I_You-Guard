import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { communityService } from '../../services/community.service';
import {
  ShieldAlert,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  FileText,
  Lock,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  X,
  FileCheck
} from 'lucide-react';

export const SubmitReportPage: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [threatCategory, setThreatCategory] = useState('Phishing');
  const [description, setDescription] = useState('');
  const [discoveryDate, setDiscoveryDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string }>>([
    { name: 'phishing_login_screenshot.png', size: '1.4 MB' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    { value: 'Phishing', label: 'Phishing — Credential Harvester or Fake Login' },
    { value: 'Brand impersonation', label: 'Brand Impersonation — Spoofed Corporate Identity' },
    { value: 'Fake recruitment', label: 'Fake Recruitment / Employment Scam' },
    { value: 'Fraudulent payment', label: 'Fraudulent Payment Gateway / Crypto Drainer' },
    { value: 'Malware distribution', label: 'Malware Distribution / Dropper Link' },
    { value: 'Suspicious redirect', label: 'Suspicious Redirect / Cloaked URL' },
    { value: 'Other', label: 'Other Malicious Threat' },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedFiles(prev => [...prev, { name: file.name, size: `${sizeMB} MB` }]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl) {
      setErrorMessage('Please enter a target website URL or domain.');
      return;
    }
    if (!description || description.trim().length < 15) {
      setErrorMessage('Please provide a brief description of the suspicious behavior (minimum 15 characters).');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await communityService.submitReport({
        target: websiteUrl,
        threatType: threatCategory,
        riskLevel: 'malicious',
        description: `${description}${additionalNotes ? ` | Notes: ${additionalNotes}` : ''}`,
        reportedBy: 'SOC_Analyst_Direct',
        reporterReputation: 120,
        tags: [threatCategory.toLowerCase().replace(/\s+/g, '-'), 'community-verified'],
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/community/reports');
      }, 1800);
    } catch {
      setIsSubmitting(false);
      setErrorMessage('Failed to submit report. Please check the network connection and try again.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Submit a Threat Report"
        description="Strengthen collective cyber defense by submitting newly discovered phishing campaigns, brand impersonation sites, and deceptive web infrastructure."
        action={
          <Link
            to="/community/reports"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors"
          >
            View Active Reports
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
        }
      />

      {submitSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-3 animate-fade-in text-emerald-300 text-xs shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="font-semibold text-emerald-200">Threat report submitted successfully!</p>
            <p className="text-emerald-400/90 mt-0.5">Automated telemetry sandbox is queued. Redirecting to verified reports ledger...</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 flex items-center gap-3 animate-fade-in text-red-300 text-xs shadow-lg shadow-red-950/50">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <div>
            <p className="font-semibold text-red-200">Submission Error</p>
            <p className="text-red-400/90 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-8">
          <Card className="p-6 md:p-8 bg-slate-900/90 border-slate-800 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-6 text-xs relative z-10">
              {/* Field 1: Website URL */}
              <div>
                <label className="block text-slate-200 font-semibold mb-1.5 flex items-center justify-between">
                  <span>Website URL or Target Domain <span className="text-cyan-400">*</span></span>
                  <span className="text-[10px] text-slate-400 font-normal">HTTP / HTTPS or raw domain</span>
                </label>
                <Input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="e.g. https://auth-verify.secure-banking-corp.com/login.php"
                  leftIcon={<ShieldAlert className="w-4 h-4 text-cyan-400" />}
                  required
                />
                <p className="mt-1.5 text-[11px] text-slate-500">
                  Provide the complete URL including query parameters if applicable (e.g., token or referrer).
                </p>
              </div>

              {/* Field 2 & 3: Threat Category & Discovery Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-200 font-semibold mb-1.5">
                    Threat Category <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    value={threatCategory}
                    onChange={(e) => setThreatCategory(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value} className="bg-slate-900 text-slate-200">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-200 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Discovery Date <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={discoveryDate}
                    onChange={(e) => setDiscoveryDate(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {/* Field 4: Description of Suspicious Behavior */}
              <div>
                <label className="block text-slate-200 font-semibold mb-1.5 flex items-center justify-between">
                  <span>Description of Suspicious Behavior <span className="text-cyan-400">*</span></span>
                  <span className="text-[10px] text-slate-500">Min 15 characters</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain why this domain is suspicious (e.g., exact clone of Chase bank sign-in portal, asks for SSN and SMS 2FA codes, domain registered 18 hours ago under obscure registrar)..."
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all font-sans leading-relaxed resize-y"
                  required
                />
              </div>

              {/* Field 5: Drag-and-Drop Evidence Upload Area */}
              <div>
                <label className="block text-slate-200 font-semibold mb-1.5 flex items-center justify-between">
                  <span>Evidence Files (Screenshots, E-mails, Raw Source)</span>
                  <span className="text-[10px] text-slate-400">Max file size: 15MB each</span>
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-cyan-400 bg-cyan-950/20'
                      : 'border-slate-700/80 hover:border-slate-600 bg-slate-950/40'
                  }`}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.onchange = (e: any) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
                        setUploadedFiles(prev => [...prev, { name: file.name, size: `${sizeMB} MB` }]);
                      }
                    };
                    input.click();
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-3 text-cyan-400 shadow-inner">
                    <UploadCloud className="w-6 h-6 animate-pulse" />
                  </div>
                  <p className="text-xs font-semibold text-slate-200">
                    Drag and drop evidence files here, or <span className="text-cyan-400 underline underline-offset-2">browse filesystem</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Accepts PNG, JPG, PDF, EML, HAR, and HTML files (automated sandbox strips dangerous active payloads)
                  </p>
                </div>

                {/* Uploaded File List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadedFiles.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px]"
                      >
                        <div className="flex items-center gap-2 text-slate-300">
                          <FileCheck className="w-4 h-4 text-emerald-400" />
                          <span className="font-mono text-slate-200">{f.name}</span>
                          <span className="text-slate-500">({f.size})</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Ready
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(i)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          title="Remove file"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 6: Optional Additional Notes */}
              <div>
                <label className="block text-slate-200 font-semibold mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  Optional Additional Notes / Indicators of Compromise (IOCs)
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Associated IP: 185.220.101.5, impersonated sender address: alerts@notifications-security-corp.com"
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-y"
                />
              </div>

              {/* Bottom Actions & Privacy Notice */}
              <div className="pt-4 border-t border-slate-800/80 space-y-4">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-800/30 text-cyan-200/90 text-[11px] leading-relaxed">
                  <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-cyan-300">Privacy & Sanitization Assurance:</strong> All submitted URLs and evidence files are processed inside isolated, zero-trust headless sandboxes. Submissions undergo algorithmic scrubbing to strip any personal session tokens, cookies, or reporter credentials prior to community publication.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate('/community/reports')}
                    className="w-full sm:w-auto text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[160px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        Validating & Submitting...
                      </span>
                    ) : (
                      'Submit Threat Report'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: Informative Cards */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: How Reporting Works */}
          <Card className="p-5 bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                1
              </span>
              How Reporting Works
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Every community submission fuels THREATGUARD’s global intelligence graph to neutralize adversary infrastructure within minutes.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300 shrink-0 font-mono">
                  1
                </span>
                <div>
                  <p className="font-medium text-slate-200">URL Submission</p>
                  <p className="text-[11px] text-slate-400">Reporter inputs target link, category, and observed malicious indicators.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300 shrink-0 font-mono">
                  2
                </span>
                <div>
                  <p className="font-medium text-slate-200">Sandbox Triage</p>
                  <p className="text-[11px] text-slate-400">Heuristic engine detonates payload and extracts TLS, DOM, and network signatures.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300 shrink-0 font-mono">
                  3
                </span>
                <div>
                  <p className="font-medium text-slate-200">Global Mesh Propagation</p>
                  <p className="text-[11px] text-slate-400">Verified findings are broadcast to active firewalls, DNS filters, and analysts.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Card 2: Verification Process */}
          <Card className="p-5 bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[10px] text-purple-400 font-bold">
                2
              </span>
              Verification Process
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              We employ a hybrid verification pipeline combining high-speed automated analysis with senior security analyst peer consensus.
            </p>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center justify-between text-slate-300 font-medium">
                  <span>Automated Sandbox</span>
                  <span className="text-[10px] text-cyan-400 font-mono">1.2 sec avg</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Full DOM inspection, SSL certificate verification, and brand logo similarity scans.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center justify-between text-slate-300 font-medium">
                  <span>Human Analyst Review</span>
                  <span className="text-[10px] text-purple-400 font-mono">High-impact IOCs</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Complex brand spoofing and zero-day lures reviewed by Tier 2 and Tier 3 SOC operators.
                </p>
              </div>
            </div>
          </Card>

          {/* Card 3: Community Safety Guidelines */}
          <Card className="p-5 bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[10px] text-amber-400 font-bold">
                3
              </span>
              Safety Guidelines
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-100">Never navigate directly</strong> to untrusted URLs on non-isolated personal workstations.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-100">Preserve evidence integrity</strong> without attempting to trigger exploit payloads or counter-hack.</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-100">Defang links</strong> if sharing in community chat (e.g. <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-300 text-[10px]">hxxps://example[.]com</code>).</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
