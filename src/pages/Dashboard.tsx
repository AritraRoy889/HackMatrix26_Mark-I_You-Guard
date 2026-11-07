import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  ScanSearch,
  Globe,
  Activity,
  ArrowUpRight
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Scans',
      value: '1,284',
      note: 'Illustrative demo metric',
      icon: ScanSearch
    },
    {
      title: 'Threats Detected',
      value: '248',
      note: 'Illustrative demo metric',
      icon: AlertTriangle
    },
    {
      title: 'Safe Websites',
      value: '892',
      note: 'Illustrative demo metric',
      icon: ShieldCheck
    },
    {
      title: 'Monitored Domains',
      value: '156',
      note: 'Illustrative demo metric',
      icon: Globe
    }
  ];

  const activities = [
    ['bank-example.com', 'High Risk', 'Phishing indicators'],
    ['university-example.edu', 'Safe', 'No demo indicators'],
    ['payment-example.net', 'Suspicious', 'Impersonation indicators'],
    ['company-example.com', 'Safe', 'No demo indicators']
  ];

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">SECURITY INTELLIGENCE</div>
          <h1>Security Overview</h1>
          <p className="muted">
            Monitor your digital security environment.
          </p>
        </div>

        <Link to="/scanner" className="btn primary">
          <ScanSearch size={16} />
          New Scan
        </Link>
      </div>

      <div className="stats">
        {stats.map(item => {
          const Icon = item.icon;

          return (
            <div className="stat" key={item.title}>
              <Icon color="#42cce8" size={22} />
              <small>{item.title}</small>
              <b>{item.value}</b>
              <small>{item.note}</small>
            </div>
          );
        })}
      </div>

      <div className="grid2">
        <section className="panel">
          <h3>Threat activity overview</h3>

          <div className="chart">
            {[40, 65, 50, 78, 55, 90, 62, 73, 45, 82, 57, 70].map(
              (height, index) => (
                <i
                  key={index}
                  style={{ height: `${height}%` }}
                />
              )
            )}
          </div>

          <p className="muted">
            Illustrative activity visualization.
          </p>
        </section>

        <section className="panel">
          <h3>Security engine status</h3>

          {[
            'Web Security Assessment',
            'Certificate Validation',
            'Dynamic Threat Analysis',
            'Threat Intelligence'
          ].map(item => (
            <div className="listrow" key={item}>
              {item}
              <span className="badge">Demo ready</span>
            </div>
          ))}
        </section>
      </div>

      <section className="panel">
        <h3>Recent security activity</h3>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>DOMAIN</th>
                <th>VERDICT</th>
                <th>FINDING</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {activities.map(row => (
                <tr key={row[0]}>
                  <td><b>{row[0]}</b></td>
                  <td>
                    <span className="badge">{row[1]}</span>
                  </td>
                  <td>{row[2]}</td>
                  <td>
                    <Link to="/scan-history">
                      <ArrowUpRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="notice">
        <Activity size={16} />
        Sample dashboard data. Replace with verified backend scan data.
      </div>
    </>
  );
}
