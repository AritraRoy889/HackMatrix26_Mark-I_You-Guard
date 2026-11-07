import { RiskLevel } from './scan.types';

export type ThreatCategory =
  | 'phishing'
  | 'malware'
  | 'c2_server'
  | 'cryptominer'
  | 'credential_harvester'
  | 'defacement'
  | 'ddos_botnet'
  | 'zero_day';

export interface ThreatFeedItem
{
  id: string;
  indicator: string; // URL, domain, IP, or hash
  type: 'url' | 'domain' | 'ip' | 'hash_sha256';
  category: ThreatCategory;
  severity: RiskLevel;
  confidenceScore: number; // 0 - 100
  source: string;
  firstSeen: string;
  lastSeen: string;
  targetedBrand?: string;
  tags: string[];
  description: string;
  isActive: boolean;
}

export interface VulnerabilityCve
{
  id: string; // e.g. CVE-2024-3400
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  cvssScore: number;
  affectedSoftware: string;
  publishedDate: string;
  summary: string;
  solution: string;
  references: string[];
}
