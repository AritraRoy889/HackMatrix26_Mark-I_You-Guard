import { useState } from 'react';
import { HelpCircle, ShieldCheck } from 'lucide-react';

const questions = [
  {
    q: 'How do I scan a website?',
    a: 'Open the scanner, enter a public website URL you are authorised to assess, and start the assessment.'
  },
  {
    q: 'Does HTTPS mean a website is safe?',
    a: 'No. HTTPS protects the connection but does not guarantee that the website owner is legitimate.'
  },
  {
    q: 'What is a phishing website?',
    a: 'A phishing website impersonates a trusted service to deceive visitors into sharing sensitive information.'
  },
  {
    q: 'What does the risk score mean?',
    a: 'The score represents an assessment of security evidence. Its calculation must be based on your backend detection engine.'
  },
  {
    q: 'What is Certificate Transparency?',
    a: 'Certificate Transparency provides publicly auditable records of issued TLS certificates.'
  }
];

export default function Help() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">SUPPORT CENTRE</div>
          <h1>Help & Documentation</h1>
          <p className="muted">
            Learn how to use ThreatGuard.
          </p>
        </div>
      </div>

      <section className="panel">
        <HelpCircle size={28} color="#42cce8" />

        <h3>Frequently asked questions</h3>

        {questions.map((item, index) => (
          <div key={item.q} className="faq">
            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
            >
              {item.q} <span>⌄</span>
            </button>

            {open === index && (
              <p>{item.a}</p>
            )}
          </div>
        ))}
      </section>

      <section className="panel">
        <ShieldCheck color="#42cce8" size={28} />
        <h3>Security best practices</h3>

        <p className="muted">
          Always verify website addresses, avoid entering
          credentials into suspicious portals, and review
          certificate and reputation information.
        </p>
      </section>
    </>
  );
}
