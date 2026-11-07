import { useState } from 'react';
import {
  Search,
  Network,
  Globe,
  ShieldAlert,
  Database
} from 'lucide-react';

export default function ThreatIntelligence() {
  const [indicator, setIndicator] = useState('');
  const [type, setType] = useState('Domain');
  const [searched, setSearched] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
  }

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">GLOBAL THREAT INTELLIGENCE</div>
          <h1>Threat Explorer</h1>
          <p className="muted">
            Investigate suspicious indicators and threat reputation.
          </p>
        </div>
      </div>

      <div className="stats">
        {[
          ['Threat feeds', '—'],
          ['Tracked indicators', '—'],
          ['Verified reports', '—'],
          ['Active sources', '—']
        ].map(([name, value]) => (
          <div className="stat" key={name}>
            <small>{name}</small>
            <b>{value}</b>
            <small>Live API required</small>
          </div>
        ))}
      </div>

      <section className="panel">
        <h3>Search threat indicators</h3>

        <form onSubmit={handleSearch} className="form">
          <label>
            Indicator type

            <select
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option>Domain</option>
              <option>IP Address</option>
              <option>URL</option>
              <option>File Hash</option>
            </select>
          </label>

          <div className="field">
            <Search size={18} />

            <input
              value={indicator}
              onChange={e => setIndicator(e.target.value)}
              placeholder="Enter indicator to investigate"
              required
            />

            <button className="btn primary">
              Investigate
            </button>
          </div>
        </form>

        {searched && (
          <div className="notice">
            <ShieldAlert size={17} />
            Indicator submitted in the UI. Connect threat intelligence
            sources to retrieve actual reputation data.
          </div>
        )}
      </section>

      <div className="grid2">
        <section className="panel">
          <Network color="#42cce8" size={25} />
          <h3>Threat correlation</h3>
          <p className="muted">
            Correlate domains, IP addresses, hashes and
            reputation signals.
          </p>
        </section>

        <section className="panel">
          <Database color="#42cce8" size={25} />
          <h3>Intelligence sources</h3>
          <p className="muted">
            Integrate trusted OSINT and community intelligence feeds.
          </p>
        </section>
      </div>

      <section className="panel">
        <h3>Investigation workspace</h3>
        {[
          'Domain reputation',
          'IP reputation',
          'Related infrastructure',
          'Historical indicators',
          'Threat attribution confidence'
        ].map(item => (
          <div className="listrow" key={item}>
            <Globe size={16} color="#42cce8" />
            {item}
            <span className="badge">Awaiting data</span>
          </div>
        ))}
      </section>
    </>
  );
}
