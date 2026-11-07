import { useState } from 'react';
import {
  ShieldCheck,
  LockKeyhole,
  Globe,
  AlertTriangle
} from 'lucide-react';

export default function Certificates() {
  const [domain, setDomain] = useState('');
  const [searched, setSearched] = useState(false);

  function inspect(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
  }

  const checks = [
    'Certificate subject and issuer',
    'Certificate expiry date',
    'TLS protocol version',
    'Certificate authority chain',
    'Certificate Transparency logs',
    'Cryptographic signature'
  ];

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">CERTIFICATE INTELLIGENCE</div>
          <h1>TLS Certificate Inspector</h1>
          <p className="muted">
            Inspect website certificate and trust information.
          </p>
        </div>
      </div>

      <section className="panel">
        <h3>Inspect a domain</h3>

        <form className="field" onSubmit={inspect}>
          <Globe />

          <input
            value={domain}
            onChange={e => setDomain(e.target.value)}
            placeholder="example.com"
            required
          />

          <button className="btn primary">
            Inspect Certificate
          </button>
        </form>
      </section>

      {searched && (
        <div className="notice">
          <AlertTriangle size={17} />
          No live TLS lookup has been performed. Connect
          the certificate inspection API to retrieve actual evidence.
        </div>
      )}

      <section className="panel">
        <h3>Certificate verification modules</h3>

        {checks.map(item => (
          <div className="listrow" key={item}>
            <LockKeyhole size={17} color="#42cce8" />

            {item}

            <span className="badge">Not checked</span>
          </div>
        ))}
      </section>

      <section className="panel chain">
        <h3>Certificate trust chain</h3>

        {[
          'Website / End-entity Certificate',
          'Intermediate Certificate Authority',
          'Root Certificate Authority'
        ].map(item => (
          <div className="feature" key={item}>
            <ShieldCheck color="#42cce8" />

            <h3>{item}</h3>

            <p>
              Issuer, validity, signature and trust relationship.
            </p>

            <span className="badge">Awaiting backend</span>
          </div>
        ))}
      </section>
    </>
  );
}
