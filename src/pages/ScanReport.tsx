import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  Download,
  CheckCircle2
} from 'lucide-react';

import { getScan, type Scan } from '../services/scan';

export default function ScanReport() {
  const { id = '' } = useParams();

  const [scan, setScan] = useState<Scan | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getScan(id)
      .then(setScan)
      .catch(err => setError(err.message));
  }, [id]);

  if (error) {
    return <div className="panel">{error}</div>;
  }

  if (!scan) {
    return <div className="panel">Loading report...</div>;
  }

  const pillars = [
    {
      name: 'Web Security Assessment',
      description: 'DOM, redirects and configuration signals.'
    },
    {
      name: 'Certificate Validation',
      description: 'TLS certificate and trust-chain inspection.'
    },
    {
      name: 'Dynamic Threat Analysis',
      description: 'Suspicious behaviour and payload analysis.'
    },
    {
      name: 'Threat Intelligence',
      description: 'Reputation and community threat indicators.'
    }
  ];

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">SECURITY REPORT</div>
          <h1>Website Analysis</h1>
          <p className="muted">{scan.url}</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => window.print()}
        >
          <Download size={15} />
          Export Report
        </button>
      </div>

      <section className="panel reporthero">
        <div
          className="risk"
          style={{
            background: `conic-gradient(#e8ad50 ${scan.risk_score}%, #25394f 0)`
          }}
        >
          <div>
            <b>{scan.risk_score}</b>
            <small>/100</small>
          </div>
        </div>

        <div>
          <div className="eyebrow">OVERALL RISK SCORE</div>

          <h2>{scan.verdict}</h2>

          <p className="muted">
            {scan.explanation}
          </p>

          <span className="badge">
            Scan ID: {scan.scan_id}
          </span>
        </div>
      </section>

      <div className="notice">
        <AlertTriangle size={17} />
        DEMO REPORT: This is simulated data, not a verified
        security assessment.
      </div>

      <section className="panel">
        <h3>Four-pillar security assessment</h3>

        <div className="grid2">
          {pillars.map((pillar, index) => (
            <div className="feature" key={pillar.name}>
              <ShieldCheck color="#42cce8" />

              <h3>{pillar.name}</h3>

              <p>{pillar.description}</p>

              <span className="badge">
                {index === 1
                  ? 'Not verified'
                  : 'Demo only'}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Recommended actions</h3>

        {[
          'Verify the website identity.',
          'Review the TLS certificate and validity.',
          'Investigate suspicious redirects.',
          'Correlate threat intelligence indicators.'
        ].map(item => (
          <div className="listrow" key={item}>
            <CheckCircle2 color="#42cce8" />
            {item}
          </div>
        ))}
      </section>
    </>
  );
}
