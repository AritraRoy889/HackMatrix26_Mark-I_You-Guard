import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Globe,
  LockKeyhole,
  Activity,
  Network,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Globe,
      title: 'Web Security Assessment',
      text: 'Identify suspicious redirects and website security signals.'
    },
    {
      icon: LockKeyhole,
      title: 'Certificate Validation',
      text: 'Review TLS certificates, trust chains and transparency.'
    },
    {
      icon: Activity,
      title: 'Dynamic Threat Analysis',
      text: 'Assess suspicious behaviour and threat indicators.'
    },
    {
      icon: Network,
      title: 'Threat Intelligence',
      text: 'Correlate reputation data and community reports.'
    }
  ];

  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand">
          <ShieldCheck /> Threat<span>Guard</span>
        </Link>

        <div style={{ display: 'flex', gap: 15 }}>
          <Link to="/login">Login</Link>

          <Link to="/register" className="btn primary">
            Get Started
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">
          INTELLIGENT CYBERSECURITY PLATFORM
        </div>

        <h1>
          TRUST THE WEB.
          <br />
          VERIFY <span>EVERYTHING.</span>
        </h1>

        <p className="muted">
          One intelligent platform for phishing detection,
          website security assessment and digital trust.
        </p>

        <div className="heroactions">
          <Link to="/register" className="btn primary">
            Start Protecting <ArrowRight size={16} />
          </Link>

          <Link to="/login" className="btn secondary">
            Explore Dashboard
          </Link>
        </div>

        <div className="heroicon">
          <ShieldCheck size={110} color="#42cce8" />
        </div>
      </section>

      <section className="content">
        <div className="header">
          <div>
            <div className="eyebrow">OUR CAPABILITIES</div>
            <h1>Four pillars. One intelligence engine.</h1>
          </div>
        </div>

        <div className="grid4">
          {features.map(item => {
            const Icon = item.icon;

            return (
              <div className="feature" key={item.title}>
                <Icon color="#42cce8" size={30} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="footer">
        <b>ThreatGuard</b>
        <span>Secure today. Safer tomorrow.</span>
      </footer>
    </>
  );
}
