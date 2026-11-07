export interface CertificateDetail {
  id: string;
  domain: string;
  subjectCommonName: string;
  subjectAltNames: string[];
  issuerOrganization: string;
  issuerCommonName: string;
  serialNumber: string;
  fingerprintSha256: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  isExpired: boolean;
  isRevoked: boolean;
  signatureAlgorithm: string;
  keyStrength: string;
  keyUsage: string[];
  chainOfTrust: {
    level: 'leaf' | 'intermediate' | 'root';
    commonName: string;
    organization: string;
    status: 'trusted' | 'untrusted' | 'expired';
    validUntil: string;
  }[];
  vulnerabilities: {
    name: string;
    description: string;
    severity: 'info' | 'warning' | 'high' | 'critical';
    affected: boolean;
  }[];
}
