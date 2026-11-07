import { Link } from 'react-router-dom';
import { History, ScanSearch } from 'lucide-react';
import { getHistory } from '../services/scan';

export default function ScanHistory() {
  const scans = getHistory();

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">WORKSPACE</div>
          <h1>Scan History</h1>
          <p className="muted">
            View previously submitted website assessments.
          </p>
        </div>

        <Link to="/scanner" className="btn primary">
          <ScanSearch size={16} />
          New Scan
        </Link>
      </div>

      <section className="panel">
        <h3>
          <History size={18} /> Previous assessments
        </h3>

        {scans.length === 0 ? (
          <div className="empty">
            No scan records found.
          </div>
        ) : (
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>WEBSITE</th>
                  <th>RISK SCORE</th>
                  <th>VERDICT</th>
                  <th>DATE</th>
                  <th>REPORT</th>
                </tr>
              </thead>

              <tbody>
                {scans.map(scan => (
                  <tr key={scan.scan_id}>
                    <td><b>{scan.url}</b></td>

                    <td>{scan.risk_score}/100</td>

                    <td>
                      <span className="badge">
                        {scan.verdict}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        scan.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <Link
                        className="tablelink"
                        to={`/scans/${scan.scan_id}`}
                      >
                        View report
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
