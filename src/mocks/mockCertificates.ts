import { CertificateDetail } from '../types/certificate.types';

export const MOCK_CERTIFICATE_DATA: Record<string, CertificateDetail> = {
  'github.com': {
    id: 'cert-gh-819',
    domain: 'github.com',
    subjectCommonName: 'github.com',
    subjectAltNames: [ 'github.com', 'www.github.com', '*.github.com' ],
    issuerOrganization: 'DigiCert Inc',
    issuerCommonName: 'DigiCert High Assurance TLS Hybrid ECC SHA256 2020 CA1',
    serialNumber: '04:BA:C1:20:9E:FF:42:01:88:AC:23:44:01',
    fingerprintSha256: '9A:42:1B:77:88:EC:33:01:92:DF:5A:CC:12:44:89:12:99:FF:33:44:55:66:77:88:99:00:11:22:33:44:55:66',
    validFrom: '2024-03-01T00:00:00Z',
    validTo: '2025-03-15T23:59:59Z',
    daysRemaining: 128,
    isExpired: false,
    isRevoked: false,
    signatureAlgorithm: 'SHA256withECDSA',
    keyStrength: 'ECC 256 bits (P-256 equivalent to RSA 3072)',
    keyUsage: [ 'Digital Signature', 'Key Encipherment', 'Server Authentication' ],
    chainOfTrust: [
      {
        level: 'leaf',
        commonName: 'github.com',
        organization: 'GitHub, Inc.',
        status: 'trusted',
        validUntil: '2025-03-15'
      },
      {
        level: 'intermediate',
        commonName: 'DigiCert High Assurance TLS Hybrid ECC SHA256 2020 CA1',
        organization: 'DigiCert Inc',
        status: 'trusted',
        validUntil: '2030-09-22'
      },
      {
        level: 'root',
        commonName: 'DigiCert Global Root CA',
        organization: 'DigiCert Inc',
        status: 'trusted',
        validUntil: '2038-11-10'
      }
    ],
    vulnerabilities: [
      {
        name: 'Heartbleed (CVE-2014-0160)',
        description: 'Vulnerability in OpenSSL TLS heartbeat extension allowing memory reading',
        severity: 'info',
        affected: false
      },
      {
        name: 'POODLE (SSLv3 fallback)',
        description: 'Padding Oracle On Downgraded Legacy Encryption vulnerability',
        severity: 'info',
        affected: false
      },
      {
        name: 'ROBOT (Return Of Bleichenbacher Oracle Threat)',
        description: 'Bleichenbacher attack against RSA encryption ciphers',
        severity: 'info',
        affected: false
      },
      {
        name: 'Weak Cipher Check',
        description: 'RC4, 3DES, EXPORT, NULL, or MD5 ciphers detected',
        severity: 'info',
        affected: false
      }
    ]
  },
  'accounts-verification.xyz': {
    id: 'cert-fake-991',
    domain: 'accounts-verification.xyz',
    subjectCommonName: 'accounts-verification.xyz',
    subjectAltNames: [ '*.accounts-verification.xyz', 'accounts-verification.xyz' ],
    issuerOrganization: "Let's Encrypt",
    issuerCommonName: "R3",
    serialNumber: '03:AA:89:12:33:44:55:66',
    fingerprintSha256: 'EF:12:44:90:AB:CD:EF:01:23:45:67:89:01:23:45:67:89:AB:CD:EF:01:23:45:67:89:AB:CD:EF:01:23:45:67',
    validFrom: '2026-11-01T10:00:00Z',
    validTo: '2027-01-30T10:00:00Z',
    daysRemaining: 84,
    isExpired: false,
    isRevoked: false,
    signatureAlgorithm: 'SHA256withRSA',
    keyStrength: 'RSA 2048 bits',
    keyUsage: [ 'Digital Signature', 'Key Encipherment' ],
    chainOfTrust: [
      {
        level: 'leaf',
        commonName: 'accounts-verification.xyz',
        organization: 'Unknown / Private Registrant',
        status: 'untrusted',
        validUntil: '2027-01-30'
      },
      {
        level: 'intermediate',
        commonName: 'R3',
        organization: "Let's Encrypt",
        status: 'trusted',
        validUntil: '2028-09-04'
      },
      {
        level: 'root',
        commonName: 'ISRG Root X1',
        organization: 'Internet Security Research Group',
        status: 'trusted',
        validUntil: '2035-06-04'
      }
    ],
    vulnerabilities: [
      {
        name: 'Brand Spoofing Flag',
        description: 'Domain exhibits high resemblance to registered financial entity trademarks',
        severity: 'critical',
        affected: true
      },
      {
        name: 'Short Certificate Lifetime (< 90d automated disposable)',
        description: 'Frequent rotation pattern common in disposable phishing kits',
        severity: 'warning',
        affected: true
      }
    ]
  }
};
