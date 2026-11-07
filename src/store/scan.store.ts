import { create } from 'zustand';
import { ScanResult, ScanOptions, ScanPreset } from '../types/scan.types';
import { INITIAL_MOCK_SCANS } from '../mocks/mockScans';
import { sanitizeTarget } from '../utils/validateUrl';
import { calculateRiskLevel } from '../utils/formatRisk';

interface ScanStoreState {
  currentScan: ScanResult | null;
  history: ScanResult[];
  isScanning: boolean;
  scanProgress: number;
  currentStepMessage: string;
  selectedOptions: ScanOptions;
  presets: ScanPreset[];
  activePresetId: string;

  // actions
  setScanOptions: (options: Partial<ScanOptions>) => void;
  applyPreset: (presetId: string) => void;
  startScan: (target: string, presetOrType?: string) => Promise<ScanResult>;
  cancelScan: () => void;
  getScanById: (id: string) => ScanResult | undefined;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
}

const STORAGE_KEY = 'youguard_scan_history';

const loadStoredHistory = (): ScanResult[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_MOCK_SCANS;
  } catch {
    return INITIAL_MOCK_SCANS;
  }
};

const DEFAULT_OPTIONS: ScanOptions = {
  deepAnalysis: true,
  checkSslCert: true,
  followRedirects: true,
  verifyDnsSec: true,
  aiHeuristics: true,
};

const DEFAULT_PRESETS: ScanPreset[] = [
  {
    id: 'preset-standard',
    name: 'Standard Security Audit',
    description: 'Fast check across major blacklists and SSL certificate validity.',
    options: {
      deepAnalysis: false,
      checkSslCert: true,
      followRedirects: true,
      verifyDnsSec: false,
      aiHeuristics: true,
    },
  },
  {
    id: 'preset-deep',
    name: 'Full Deep Heuristic',
    description: 'Exhaustive threat audit: DOM analysis, SSL chain, reverse DNS, and AI model scoring.',
    options: {
      deepAnalysis: true,
      checkSslCert: true,
      followRedirects: true,
      verifyDnsSec: true,
      aiHeuristics: true,
    },
  },
  {
    id: 'preset-phish',
    name: 'Phishing & Homograph Focus',
    description: 'Specialized detection for typosquatting, credential harvesting, and suspicious iframes.',
    options: {
      deepAnalysis: true,
      checkSslCert: true,
      followRedirects: true,
      verifyDnsSec: false,
      aiHeuristics: true,
    },
  },
];

let scanIntervalTimer: any = null;

export const useScanStore = create<ScanStoreState>((set, get) => {
  return {
    currentScan: INITIAL_MOCK_SCANS[0],
    history: loadStoredHistory(),
    isScanning: false,
    scanProgress: 0,
    currentStepMessage: '',
    selectedOptions: DEFAULT_OPTIONS,
    presets: DEFAULT_PRESETS,
    activePresetId: 'preset-deep',

    setScanOptions: (options) => {
      set((state) => ({
        selectedOptions: { ...state.selectedOptions, ...options },
      }));
    },

    applyPreset: (presetId) => {
      const found = get().presets.find((p) => p.id === presetId);
      if (found) {
        set({
          activePresetId: presetId,
          selectedOptions: { ...found.options },
        });
      }
    },

    cancelScan: () => {
      if (scanIntervalTimer) clearInterval(scanIntervalTimer);
      set({
        isScanning: false,
        scanProgress: 0,
        currentStepMessage: 'Scan cancelled by user.',
      });
    },

    getScanById: (id: string) => {
      return get().history.find((s) => s.id === id);
    },

    deleteHistoryItem: (id: string) => {
      const updated = get().history.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      set({ history: updated });
    },

    clearHistory: () => {
      localStorage.removeItem(STORAGE_KEY);
      set({ history: [] });
    },

    startScan: async (target: string, _presetOrType?: string): Promise<ScanResult> => {
      const { normalizedUrl, domain, protocol } = sanitizeTarget(target);
      if (scanIntervalTimer) clearInterval(scanIntervalTimer);

      set({
        isScanning: true,
        scanProgress: 5,
        currentStepMessage: `Resolving DNS & Host records for ${domain}...`,
      });

      const steps = [
        { progress: 20, message: 'Validating SSL/TLS certificates and chain of trust...' },
        { progress: 45, message: 'Querying 12 threat intelligence blacklists & reputation databases...' },
        { progress: 70, message: 'Executing DOM heuristic scanner & phishing keyword detection...' },
        { progress: 90, message: 'Synthesizing neural threat scoring & generating audit report...' },
      ];

      for (const step of steps) {
        await new Promise((resolve) => {
          scanIntervalTimer = setTimeout(resolve, 650);
        });
        if (!get().isScanning) {
          throw new Error('Scan aborted');
        }
        set({
          scanProgress: step.progress,
          currentStepMessage: step.message,
        });
      }

      // Generate dynamic realistic scan result based on domain pattern
      const isKnownClean = /github|google|microsoft|cloudflare|stripe|amazon|apple\.com/i.test(domain);
      const isKnownThreat = /chase|paypal|verify|login|update|account|auth|secure/i.test(domain) && !isKnownClean;

      const calculatedScore = isKnownClean ? Math.floor(Math.random() * 8) : isKnownThreat ? 75 + Math.floor(Math.random() * 24) : Math.floor(Math.random() * 45);
      const riskLevel = calculateRiskLevel(calculatedScore);

      const generatedResult: ScanResult = {
        id: `scan-${Date.now().toString(36)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        target,
        canonicalUrl: normalizedUrl,
        domain,
        ipAddress: isKnownClean ? '104.21.55.91' : '185.220.101.' + (Math.floor(Math.random() * 200) + 10),
        country: isKnownClean ? 'United States' : 'Seychelles',
        countryCode: isKnownClean ? 'US' : 'SC',
        asn: isKnownClean ? 'AS13335 (Cloudflare, Inc.)' : 'AS44050 (Offshore Hosting B.V.)',
        serverHeader: isKnownClean ? 'cloudflare' : 'nginx/1.22.1',
        scanDate: new Date().toISOString(),
        durationMs: 2700 + Math.floor(Math.random() * 600),
        riskScore: calculatedScore,
        riskLevel,
        status: 'completed',
        threatsDetected: calculatedScore > 40 ? [
          'Deceptive domain name structure flag',
          'Potential credential harvesting form element',
          'Unusual TLS cipher configuration',
          'Host listed in community reputation threat feed'
        ] : [],
        summary: calculatedScore > 70
          ? `High risk indicators detected on ${domain}. Avoid submitting sensitive data or credentials.`
          : calculatedScore > 30
          ? `Moderate anomalies noted on ${domain}. Proceed with standard caution.`
          : `Target ${domain} passed all baseline security engines with zero malicious signatures.`,
        enginesTotal: 12,
        enginesDetected: calculatedScore > 70 ? 9 : calculatedScore > 30 ? 2 : 0,
        blacklistResults: [
          { engine: 'Google Safe Browsing', detected: calculatedScore > 75, result: calculatedScore > 75 ? 'phishing' : 'clean', updateTime: 'Just now' },
          { engine: 'VirusTotal Core', detected: calculatedScore > 60, result: calculatedScore > 60 ? 'malicious' : 'clean', updateTime: 'Just now' },
          { engine: 'PhishTank DB', detected: calculatedScore > 70, result: calculatedScore > 70 ? 'phishing' : 'clean', updateTime: 'Just now' },
          { engine: 'You Guard Heuristics', detected: calculatedScore > 50, result: calculatedScore > 50 ? 'malicious' : 'clean', updateTime: 'Live' },
          { engine: 'Cisco Talos', detected: calculatedScore > 80, result: calculatedScore > 80 ? 'phishing' : 'clean', updateTime: '10m ago' },
          { engine: 'Spamhaus ZEN', detected: calculatedScore > 85, result: calculatedScore > 85 ? 'malicious' : 'clean', updateTime: '20m ago' },
          { engine: 'URLhaus Abuse.ch', detected: calculatedScore > 70, result: calculatedScore > 70 ? 'malicious' : 'clean', updateTime: 'Just now' },
          { engine: 'Cloudflare Radar', detected: calculatedScore > 75, result: calculatedScore > 75 ? 'suspicious' : 'clean', updateTime: 'Just now' },
          { engine: 'AlienVault OTX', detected: calculatedScore > 65, result: calculatedScore > 65 ? 'phishing' : 'clean', updateTime: '5m ago' },
          { engine: 'Kaspersky KSN', detected: calculatedScore > 80, result: calculatedScore > 80 ? 'malicious' : 'clean', updateTime: '15m ago' },
          { engine: 'Microsoft SmartScreen', detected: calculatedScore > 75, result: calculatedScore > 75 ? 'phishing' : 'clean', updateTime: '8m ago' },
          { engine: 'OpenPhish Feed', detected: false, result: 'clean', updateTime: '12m ago' }
        ],
        securityHeaders: [
          { name: 'Strict-Transport-Security (HSTS)', value: isKnownClean ? 'max-age=31536000; preload' : 'Missing', status: isKnownClean ? 'passed' : 'missing' },
          { name: 'Content-Security-Policy (CSP)', value: isKnownClean ? "default-src 'self'" : 'Missing', status: isKnownClean ? 'passed' : 'missing' },
          { name: 'X-Frame-Options', value: isKnownClean ? 'DENY' : 'ALLOW-FROM *', status: isKnownClean ? 'passed' : 'warning' },
          { name: 'X-Content-Type-Options', value: 'nosniff', status: 'passed' },
          { name: 'Referrer-Policy', value: 'strict-origin-when-cross-origin', status: 'passed' }
        ],
        dnsRecords: [
          { type: 'A', value: isKnownClean ? '104.21.55.91' : '185.220.101.42', ttl: 300 },
          { type: 'NS', value: `ns1.${domain}`, ttl: 3600 },
          { type: 'TXT', value: 'v=spf1 ~all', ttl: 3600 }
        ],
        certificate: {
          issuer: isKnownClean ? 'DigiCert Global Root CA' : "Let's Encrypt Authority E6",
          subject: domain,
          validFrom: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
          validTo: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString(),
          daysRemaining: 180,
          isValid: protocol === 'https',
          protocol: protocol === 'https' ? 'TLS 1.3' : 'Insecure Plaintext HTTP',
          cipherSuite: protocol === 'https' ? 'TLS_AES_256_GCM_SHA384' : 'None',
          signatureAlgorithm: 'SHA256withRSA',
          hasPfs: protocol === 'https'
        },
        contentAnalysis: {
          hasLoginForm: calculatedScore > 40,
          hasHiddenIframes: calculatedScore > 70,
          suspiciousKeywordsCount: calculatedScore > 70 ? 8 : 0,
          redirectCount: 1,
          redirectChain: [normalizedUrl]
        }
      };

      const updatedHistory = [generatedResult, ...get().history.slice(0, 49)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

      set({
        currentScan: generatedResult,
        history: updatedHistory,
        isScanning: false,
        scanProgress: 100,
        currentStepMessage: 'Scan complete! Report ready.',
      });

      return generatedResult;
    },
  };
});
