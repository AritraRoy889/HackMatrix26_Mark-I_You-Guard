import { CertificateDetail } from '../types/certificate.types';
import { MOCK_CERTIFICATE_DATA } from '../mocks/mockCertificates';

export const certificateService = {
  getCertificateForDomain: async ( domain: string ): Promise<CertificateDetail> =>
  {
    await new Promise( ( r ) => setTimeout( r, 400 ) );
    const cleanDomain = domain.replace( /^https?:\/\//i, '' ).split( '/' )[ 0 ];
    if ( MOCK_CERTIFICATE_DATA[ cleanDomain ] )
    {
      return MOCK_CERTIFICATE_DATA[ cleanDomain ];
    }

    // Dynamic fallback
    return {
      id: `cert-${ Date.now().toString( 36 ) }`,
      domain: cleanDomain,
      subjectCommonName: cleanDomain,
      subjectAltNames: [ cleanDomain, `www.${ cleanDomain }` ],
      issuerOrganization: "Let's Encrypt Authority",
      issuerCommonName: 'R3 CA',
      serialNumber: '04:1A:3B:5C:7D:9E:01:22',
      fingerprintSha256: 'FA:88:21:44:90:BC:DE:F1:02:34:56:78:90:12:34:56:78:90:AB:CD',
      validFrom: new Date( Date.now() - 1000 * 60 * 60 * 24 * 20 ).toISOString(),
      validTo: new Date( Date.now() + 1000 * 60 * 60 * 24 * 70 ).toISOString(),
      daysRemaining: 70,
      isExpired: false,
      isRevoked: false,
      signatureAlgorithm: 'SHA256withRSA',
      keyStrength: 'RSA 2048 bits',
      keyUsage: [ 'Digital Signature', 'Key Encipherment' ],
      chainOfTrust: [
        {
          level: 'leaf',
          commonName: cleanDomain,
          organization: cleanDomain,
          status: 'trusted',
          validUntil: new Date( Date.now() + 1000 * 60 * 60 * 24 * 70 ).toISOString().split( 'T' )[ 0 ],
        },
        {
          level: 'intermediate',
          commonName: 'R3',
          organization: "Let's Encrypt",
          status: 'trusted',
          validUntil: '2028-09-04',
        },
        {
          level: 'root',
          commonName: 'ISRG Root X1',
          organization: 'Internet Security Research Group',
          status: 'trusted',
          validUntil: '2035-06-04',
        },
      ],
      vulnerabilities: [
        {
          name: 'Heartbleed Check',
          description: 'Evaluated against OpenSSL TLS heartbeat flaw',
          severity: 'info',
          affected: false,
        },
      ],
    };
  },
};
