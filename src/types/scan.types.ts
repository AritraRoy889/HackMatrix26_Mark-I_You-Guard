export type RiskLevel = 'safe' | 'low' | 'suspicious' | 'malicious' | 'critical';

export type ScanStatus = 'idle' | 'queued' | 'scanning' | 'completed' | 'failed';

export interface SecurityHeaderItem {
  name: string;
  value: string;
  status: 'passed' | 'warning' | 'missing';
  recommendation?: string;
}

export interface DnsRecord {
  type: 'A' | 'AAAA' | 'MX' | 'TXT' | 'NS' | 'CNAME' | 'SOA';
  value: string;
  ttl: number;
}

export interface BlacklistVendor {
  engine: string;
  detected: boolean;
  result: 'clean' | 'phishing' | 'malware' | 'malicious' | 'suspicious' | 'unrated';
  updateTime: string;
}

export interface SslCertSummary {
  issuer: string;
  subject: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  isValid: boolean;
  protocol: string;
  cipherSuite: string;
  signatureAlgorithm: string;
  hasPfs: boolean;
}

export interface ScanResult {
  id: string;
  target: string;
  canonicalUrl: string;
  domain: string;
  ipAddress: string;
  country: string;
  countryCode: string;
  asn: string;
  serverHeader: string;
  scanDate: string;
  durationMs: number;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  status: ScanStatus;
  threatsDetected: string[];
  summary: string;
  enginesTotal: number;
  enginesDetected: number;
  blacklistResults: BlacklistVendor[];
  securityHeaders: SecurityHeaderItem[];
  dnsRecords: DnsRecord[];
  certificate: SslCertSummary;
  contentAnalysis: {
    hasLoginForm: boolean;
    hasHiddenIframes: boolean;
    suspiciousKeywordsCount: number;
    redirectCount: number;
    redirectChain: string[];
  };
}

export interface ScanOptions {
  deepAnalysis: boolean;
  checkSslCert: boolean;
  followRedirects: boolean;
  verifyDnsSec: boolean;
  aiHeuristics: boolean;
}

export interface ScanPreset {
  id: string;
  name: string;
  description: string;
  options: ScanOptions;
}
