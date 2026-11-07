import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  ScanSearch,
  ShieldCheck,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

import { startScan } from '../services/scan';

export default function Scanner() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    let target: URL;

    try {
      target = new URL(
        /^https?:\/\//i.test(url)
          ? url
          : `https://${url}`
      );

      if (
        !['http:', 'https:'].includes(target.protocol) ||
        target.hostname === 'localhost'
      ) {
        throw new Error();
      }
    } catch {
      setError('Please enter a valid public website URL.');
      return;
    }

    setLoading(true);

    try {
      const result = await startScan(target.toString());

      navigate(`/scans/${result.scan_id}/progress`);
    } catch {
      setError('Unable to start scan. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">THREAT DETECTION ENGINE</div>
          <h1>Website Security Scanner</h1>
          <p className="muted">
            Analyse website security and threat indicators.
          </p>
        </div>
      </div>

      <section className="panel scannerbox">
        <ScanSearch size={42} color="#42cce8" />

        <h2>Check a website before you trust it.</h2>

        <p className="muted">
          Enter a public URL to initiate a security assessment.
        </p>

        <form onSubmit={handleScan}>
          <div className="field">
            <Globe size={20} />

            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />

            <button
              className="btn primary"
              disabled={loading}
            >
              {loading ? 'Starting...' : 'Scan Website'}
              <ArrowRight size={15} />
            </button>
          </div>
        </form>

        {error && (
          <p className="error">
            <AlertTriangle size={14} /> {error}
          </p>
        )}

        <div className="notice">
          Only scan websites you own or have permission to assess.
        </div>
      </section>

      <section className="panel">
        <h3>Four-pillar assessment engine</h3>

        <div className="grid4">
          {[
            'Web Security',
            'Certificate Validation',
            'Dynamic Threat Analysis',
            'Threat Intelligence'
          ].map(item => (
            <div className="feature" key={item}>
              <ShieldCheck color="#42cce8" />
              <h3>{item}</h3>
              <p>
                Integrated assessment module.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
