export const APP_CONFIG = {
  name: 'THREATGUARD',
  fullName: 'THREATGUARD Cybersecurity SaaS',
  tagline: 'AI-Powered Phishing & Malicious Website Detection Platform',
  version: '2.5.0-PROD',
  defaultScanTimeout: 12000,
  maxRecentScans: 50,
};

export const DEMO_PAGES = [
  { id: 1, name: 'Page 01 — Landing Page', path: '/' },
  { id: 2, name: 'Page 02 — Login Screen', path: '/auth/login' },
  { id: 3, name: 'Page 03 — Registration Screen', path: '/auth/register' },
  { id: 4, name: 'Page 04 — Forgot Password', path: '/auth/forgot-password' },
  { id: 5, name: 'Page 05 — Email Verification', path: '/auth/verify-email' },
  { id: 6, name: 'Page 06 — Main Security Dashboard', path: '/dashboard' },
  { id: 7, name: 'Page 07 — URL Security Scanner', path: '/scanner' },
  { id: 8, name: 'Page 08 — Live Screening Progress', path: '/scanner/progress' },
  { id: 9, name: 'Page 09 — Scan Results Overview', path: '/scanner/results' },
  { id: 10, name: 'Page 10 — Detailed Four-Pillar Analysis', path: '/scanner/detailed-analysis' },
  { id: 11, name: 'Page 11 — Certificate Inspector', path: '/intelligence/certificates' },
  { id: 12, name: 'Page 12 — Threat Intelligence Explorer', path: '/intelligence/threats' },
  { id: 13, name: 'Page 13 — Community Reports', path: '/community/reports' },
  { id: 14, name: 'Page 14 — Submit Threat Report', path: '/community/submit' },
  { id: 15, name: 'Page 15 — Scan History', path: '/monitoring/history' },
  { id: 16, name: 'Page 16 — Alerts & Watchlist', path: '/monitoring/alerts' },
  { id: 17, name: 'Page 17 — Profile & Settings', path: '/account/settings' },
  { id: 18, name: 'Page 18 — Help & Documentation', path: '/support/help' },
  { id: 19, name: 'Page 19 — 404 Signal Lost', path: '/404' },
  { id: 20, name: 'Page 20 — System Maintenance / 500', path: '/maintenance' },
];

export const SCAN_ENGINES = [
  'THREATGUARD Neural Heuristics',
  'Google Safe Browsing API v4',
  'VirusTotal Threat Core Engine',
  'Cloudflare Radar Intelligence',
  'PhishTank Verified Community DB',
  'Cisco Talos Threat Mesh',
  'Spamhaus ZEN IP/Domain Reputation',
  'OpenPhish Automated Feed',
  'URLhaus Abuse.ch Malware DB',
  'AlienVault OTX Pulse Graph',
  'Kaspersky Security Network (KSN)',
  'Microsoft Defender SmartScreen'
];

export const MOCK_POPULAR_TARGETS = [
  'https://secure-login.chase.com.accounts-verification.xyz',
  'https://github.com',
  'http://paypal-resolution-center-update.ru/login',
  'https://cloudflare.com',
  'http://appleid-apple-support-verify.top/auth',
  'https://stripe.com'
];
