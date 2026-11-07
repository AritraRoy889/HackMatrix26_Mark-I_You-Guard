import { ScanResult } from '../types/scan.types';

export const INITIAL_MOCK_SCANS: ScanResult[] = [
  {
    id: 'scan-chase-fake-9921',
    target: 'https://secure-login.chase.com.accounts-verification.xyz',
    canonicalUrl: 'https://secure-login.chase.com.accounts-verification.xyz/auth/login.php',
    domain: 'accounts-verification.xyz',
    ipAddress: '185.220.101.42',
    country: 'Seychelles',
    countryCode: 'SC',
    asn: 'AS44050 (HostKey B.V.)',
    serverHeader: 'nginx/1.18.0 (Ubuntu)',
    scanDate: new Date( Date.now() - 1000 * 60 * 18 ).toISOString(),
    durationMs: 2840,
    riskScore: 96,
    riskLevel: 'critical',
    status: 'completed',
    threatsDetected: [
      'Phishing credential harvester imitating Chase Bank',
      'Homograph domain deceptive naming technique',
      'Suspicious zero-day registrar (.xyz top-level domain flagged)',
      'Fake SSL certificate issued via free ACME provider',
      'Hidden password exfiltration iframe detected'
    ],
    summary: 'Extremely dangerous active credential interception portal targeting US banking credentials.',
    enginesTotal: 12,
    enginesDetected: 11,
    blacklistResults: [
      { engine: 'Google Safe Browsing', detected: true, result: 'phishing', updateTime: '2 mins ago' },
      { engine: 'VirusTotal Core', detected: true, result: 'malicious', updateTime: 'Just now' },
      { engine: 'PhishTank DB', detected: true, result: 'phishing', updateTime: '5 mins ago' },
      { engine: 'You Guard Heuristics', detected: true, result: 'malicious', updateTime: 'Live' },
      { engine: 'Cisco Talos', detected: true, result: 'phishing', updateTime: '12 mins ago' },
      { engine: 'Spamhaus ZEN', detected: true, result: 'malicious', updateTime: '1 hour ago' },
      { engine: 'URLhaus Abuse.ch', detected: true, result: 'malicious', updateTime: '30 mins ago' },
      { engine: 'Cloudflare Radar', detected: true, result: 'malicious', updateTime: '10 mins ago' },
      { engine: 'AlienVault OTX', detected: true, result: 'phishing', updateTime: '15 mins ago' },
      { engine: 'Kaspersky KSN', detected: true, result: 'malicious', updateTime: '8 mins ago' },
      { engine: 'Microsoft SmartScreen', detected: true, result: 'phishing', updateTime: '22 mins ago' },
      { engine: 'OpenPhish Feed', detected: false, result: 'clean', updateTime: 'Pending re-index' }
    ],
    securityHeaders: [
      { name: 'Strict-Transport-Security (HSTS)', value: 'Missing', status: 'missing', recommendation: 'Enforce HSTS with max-age >= 31536000' },
      { name: 'Content-Security-Policy (CSP)', value: 'Missing', status: 'missing', recommendation: 'Configure CSP to prevent cross-site scripting and unauthorized framing' },
      { name: 'X-Frame-Options', value: 'ALLOW-FROM *', status: 'warning', recommendation: 'Set X-Frame-Options to DENY or SAMEORIGIN' },
      { name: 'X-Content-Type-Options', value: 'nosniff', status: 'passed' },
      { name: 'Referrer-Policy', value: 'unsafe-url', status: 'warning', recommendation: 'Set strict-origin-when-cross-origin' }
    ],
    dnsRecords: [
      { type: 'A', value: '185.220.101.42', ttl: 300 },
      { type: 'NS', value: 'ns1.anonymous-dns.su', ttl: 3600 },
      { type: 'NS', value: 'ns2.anonymous-dns.su', ttl: 3600 },
      { type: 'TXT', value: 'v=spf1 -all', ttl: 300 }
    ],
    certificate: {
      issuer: "Let's Encrypt Authority E6",
      subject: 'accounts-verification.xyz',
      validFrom: new Date( Date.now() - 1000 * 60 * 60 * 24 * 3 ).toISOString(),
      validTo: new Date( Date.now() + 1000 * 60 * 60 * 24 * 87 ).toISOString(),
      daysRemaining: 87,
      isValid: true,
      protocol: 'TLS 1.2',
      cipherSuite: 'ECDHE-RSA-AES256-GCM-SHA384',
      signatureAlgorithm: 'SHA256withRSA',
      hasPfs: true
    },
    contentAnalysis: {
      hasLoginForm: true,
      hasHiddenIframes: true,
      suspiciousKeywordsCount: 14,
      redirectCount: 2,
      redirectChain: [ 'http://accounts-verification.xyz', 'https://secure-login.chase.com.accounts-verification.xyz' ]
    }
  },
  {
    id: 'scan-github-safe-0041',
    target: 'https://github.com',
    canonicalUrl: 'https://github.com',
    domain: 'github.com',
    ipAddress: '140.82.121.4',
    country: 'United States',
    countryCode: 'US',
    asn: 'AS36459 (GitHub, Inc.)',
    serverHeader: 'GitHub.com',
    scanDate: new Date( Date.now() - 1000 * 60 * 45 ).toISOString(),
    durationMs: 1420,
    riskScore: 2,
    riskLevel: 'safe',
    status: 'completed',
    threatsDetected: [],
    summary: 'Verified authentic, enterprise-grade domain with high reputation and zero malicious indicators detected.',
    enginesTotal: 12,
    enginesDetected: 0,
    blacklistResults: [
      { engine: 'Google Safe Browsing', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'VirusTotal Core', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'PhishTank DB', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'You Guard Heuristics', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'Cisco Talos', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'Spamhaus ZEN', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'URLhaus Abuse.ch', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'Cloudflare Radar', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'AlienVault OTX', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'Kaspersky KSN', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'Microsoft SmartScreen', detected: false, result: 'clean', updateTime: 'Just now' },
      { engine: 'OpenPhish Feed', detected: false, result: 'clean', updateTime: 'Just now' }
    ],
    securityHeaders: [
      { name: 'Strict-Transport-Security (HSTS)', value: 'max-age=31536000; includeSubdomains; preload', status: 'passed' },
      { name: 'Content-Security-Policy (CSP)', value: "default-src 'none'; base-uri 'self'...", status: 'passed' },
      { name: 'X-Frame-Options', value: 'DENY', status: 'passed' },
      { name: 'X-Content-Type-Options', value: 'nosniff', status: 'passed' },
      { name: 'Referrer-Policy', value: 'origin-when-cross-origin, strict-origin-when-cross-origin', status: 'passed' }
    ],
    dnsRecords: [
      { type: 'A', value: '140.82.121.4', ttl: 60 },
      { type: 'AAAA', value: '2606:50c0:8000::153', ttl: 60 },
      { type: 'MX', value: 'aspmx.l.google.com', ttl: 300 }
    ],
    certificate: {
      issuer: 'DigiCert High Assurance TLS Hybrid ECC SHA256 2020 CA1',
      subject: 'github.com',
      validFrom: new Date( Date.now() - 1000 * 60 * 60 * 24 * 120 ).toISOString(),
      validTo: new Date( Date.now() + 1000 * 60 * 60 * 24 * 245 ).toISOString(),
      daysRemaining: 245,
      isValid: true,
      protocol: 'TLS 1.3',
      cipherSuite: 'TLS_AES_128_GCM_SHA256',
      signatureAlgorithm: 'SHA256withECDSA',
      hasPfs: true
    },
    contentAnalysis: {
      hasLoginForm: true,
      hasHiddenIframes: false,
      suspiciousKeywordsCount: 0,
      redirectCount: 0,
      redirectChain: [ 'https://github.com' ]
    }
  },
  {
    id: 'scan-paypal-update-7712',
    target: 'http://paypal-resolution-center-update.ru/login',
    canonicalUrl: 'http://paypal-resolution-center-update.ru/login',
    domain: 'paypal-resolution-center-update.ru',
    ipAddress: '91.240.118.89',
    country: 'Russian Federation',
    countryCode: 'RU',
    asn: 'AS57523 (Selectel Ltd.)',
    serverHeader: 'Apache/2.4.41',
    scanDate: new Date( Date.now() - 1000 * 60 * 120 ).toISOString(),
    durationMs: 3100,
    riskScore: 88,
    riskLevel: 'malicious',
    status: 'completed',
    threatsDetected: [
      'Deceptive brand impersonation (PayPal)',
      'Insecure HTTP protocol transmitting sensitive auth data',
      'Obfuscated JavaScript payload detecting virtual sandbox environments',
      'Target domain registered within the past 48 hours'
    ],
    summary: 'Active credential theft form copying PayPal layout and styling without valid transport encryption.',
    enginesTotal: 12,
    enginesDetected: 9,
    blacklistResults: [
      { engine: 'Google Safe Browsing', detected: true, result: 'phishing', updateTime: '1 hour ago' },
      { engine: 'VirusTotal Core', detected: true, result: 'malicious', updateTime: '2 hours ago' },
      { engine: 'PhishTank DB', detected: true, result: 'phishing', updateTime: '1 hour ago' },
      { engine: 'You Guard Heuristics', detected: true, result: 'malicious', updateTime: 'Live' },
      { engine: 'Cisco Talos', detected: true, result: 'phishing', updateTime: '3 hours ago' },
      { engine: 'Spamhaus ZEN', detected: false, result: 'clean', updateTime: '4 hours ago' },
      { engine: 'URLhaus Abuse.ch', detected: true, result: 'malicious', updateTime: '30 mins ago' },
      { engine: 'Cloudflare Radar', detected: true, result: 'malicious', updateTime: '1 hour ago' },
      { engine: 'AlienVault OTX', detected: true, result: 'phishing', updateTime: '2 hours ago' },
      { engine: 'Kaspersky KSN', detected: true, result: 'malicious', updateTime: '1 hour ago' },
      { engine: 'Microsoft SmartScreen', detected: true, result: 'phishing', updateTime: '1 hour ago' },
      { engine: 'OpenPhish Feed', detected: false, result: 'clean', updateTime: 'Pending' }
    ],
    securityHeaders: [
      { name: 'Strict-Transport-Security (HSTS)', value: 'Missing', status: 'missing', recommendation: 'Enable HTTPS immediately' },
      { name: 'Content-Security-Policy (CSP)', value: 'Missing', status: 'missing', recommendation: 'Deploy Strict CSP' },
      { name: 'X-Frame-Options', value: 'Missing', status: 'warning', recommendation: 'Prevent clickjacking' },
      { name: 'X-Content-Type-Options', value: 'Missing', status: 'warning', recommendation: 'Set nosniff' }
    ],
    dnsRecords: [
      { type: 'A', value: '91.240.118.89', ttl: 600 },
      { type: 'NS', value: 'ns1.ru-tld.ru', ttl: 86400 }
    ],
    certificate: {
      issuer: 'None (Plain HTTP connection)',
      subject: 'Insecure Plaintext',
      validFrom: '-',
      validTo: '-',
      daysRemaining: 0,
      isValid: false,
      protocol: 'None',
      cipherSuite: 'None',
      signatureAlgorithm: 'None',
      hasPfs: false
    },
    contentAnalysis: {
      hasLoginForm: true,
      hasHiddenIframes: false,
      suspiciousKeywordsCount: 9,
      redirectCount: 1,
      redirectChain: [ 'http://paypal-resolution-center-update.ru/login' ]
    }
  }
];
