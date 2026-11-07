import { useState } from 'react';
import { Eye, Globe, Trash2 } from 'lucide-react';

export default function Watchlist() {
  const [domain, setDomain] = useState('');
  const [domains, setDomains] = useState<string[]>([]);

  function addDomain(e: React.FormEvent) {
    e.preventDefault();

    const clean = domain.trim();

    if (!clean || domains.includes(clean)) return;

    setDomains(old => [...old, clean]);
    setDomain('');
  }

  function removeDomain(target: string) {
    setDomains(old => old.filter(item => item !== target));
  }

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">CONTINUOUS MONITORING</div>
          <h1>Domain Watchlist</h1>
          <p className="muted">
            Manage domains you want to monitor.
          </p>
        </div>
      </div>

      <section className="panel">
        <h3>Add a monitored domain</h3>

        <form className="field" onSubmit={addDomain}>
          <Globe size={18} />

          <input
            value={domain}
            onChange={e => setDomain(e.target.value)}
            placeholder="example.com"
            required
          />

          <button className="btn primary">
            Add Domain
          </button>
        </form>
      </section>

      <section className="panel">
        <h3>
          <Eye size={18} /> Monitored domains
        </h3>

        {domains.length === 0 ? (
          <div className="empty">
            Your watchlist is currently empty.
          </div>
        ) : (
          domains.map(item => (
            <div className="listrow" key={item}>
              <Globe color="#42cce8" />
              <b>{item}</b>

              <span className="badge">
                Local demo
              </span>

              <button
                className="btn secondary"
                onClick={() => removeDomain(item)}
              >
                <Trash2 size={15} />
                Remove
              </button>
            </div>
          ))
        )}
      </section>
    </>
  );
}
