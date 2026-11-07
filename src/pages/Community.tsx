import { useState } from 'react';
import {
  Users,
  Flag,
  ShieldAlert,
  Send
} from 'lucide-react';

export default function Community() {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Phishing');
  const [submitted, setSubmitted] = useState(false);

  function submitReport(e: React.FormEvent) {
    e.preventDefault();

    // Replace with POST /community/reports.
    setSubmitted(true);
  }

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">COLLABORATIVE INTELLIGENCE</div>
          <h1>Community Reports</h1>
          <p className="muted">
            Help identify and report suspicious websites.
          </p>
        </div>
      </div>

      <div className="grid2">
        <section className="panel">
          <h3>
            <Flag size={18} /> Submit a threat report
          </h3>

          <form className="form" onSubmit={submitReport}>
            <label>
              Website URL

              <input
                type="url"
                required
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://suspicious.example"
              />
            </label>

            <label>
              Threat category

              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option>Phishing</option>
                <option>Website impersonation</option>
                <option>Payment fraud</option>
                <option>Malware distribution</option>
                <option>Suspicious redirects</option>
              </select>
            </label>

            <label>
              Description

              <textarea
                required
                rows={5}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the suspicious activity..."
              />
            </label>

            <button className="btn primary">
              <Send size={15} />
              Submit Report
            </button>
          </form>

          {submitted && (
            <div className="notice">
              Demo submission recorded in the UI.
              Backend persistence and moderation are not connected.
            </div>
          )}
        </section>

        <section className="panel">
          <Users size={30} color="#42cce8" />

          <h3>Community intelligence workflow</h3>

          {[
            'Submit suspicious website',
            'Collect supporting evidence',
            'Moderation and verification',
            'Correlate with existing indicators',
            'Publish verified intelligence'
          ].map(item => (
            <div className="listrow" key={item}>
              {item}
            </div>
          ))}
        </section>
      </div>

      <section className="panel">
        <ShieldAlert color="#42cce8" />
        <h3>Community trust policy</h3>
        <p className="muted">
          Reports must be reviewed and corroborated before being
          treated as confirmed malicious indicators.
        </p>
      </section>
    </>
  );
}
