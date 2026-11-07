import { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  ShieldCheck,
  Clock
} from 'lucide-react';

const initialAlerts = [
  {
    id: 1,
    title: 'Certificate expiry warning',
    description: 'A monitored certificate may require renewal.',
    severity: 'Medium',
    time: 'Sample event'
  },
  {
    id: 2,
    title: 'Suspicious domain indicator',
    description: 'A threat intelligence correlation requires review.',
    severity: 'High',
    time: 'Sample event'
  },
  {
    id: 3,
    title: 'Assessment completed',
    description: 'A website assessment workflow has completed.',
    severity: 'Info',
    time: 'Sample event'
  }
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">MONITORING CENTRE</div>
          <h1>Security Alerts</h1>
          <p className="muted">
            Review important security notifications.
          </p>
        </div>

        <span className="badge">
          {alerts.length} notifications
        </span>
      </div>

      <section className="panel">
        <h3>
          <Bell size={18} /> Notification centre
        </h3>

        {alerts.length === 0 ? (
          <div className="empty">No notifications.</div>
        ) : (
          alerts.map(alert => (
            <div className="listrow" key={alert.id}>
              <AlertTriangle color="#e8ad50" />

              <div style={{ flex: 1 }}>
                <b>{alert.title}</b>
                <p className="muted">
                  {alert.description}
                </p>
                <small className="muted">
                  <Clock size={12} /> {alert.time}
                </small>
              </div>

              <span className="badge">{alert.severity}</span>

              <button
                className="btn secondary"
                onClick={() =>
                  setAlerts(old =>
                    old.filter(item => item.id !== alert.id)
                  )
                }
              >
                Dismiss
              </button>
            </div>
          ))
        )}
      </section>

      <section className="panel">
        <ShieldCheck color="#42cce8" />
        <h3>Notification preferences</h3>
        <p className="muted">
          Configure email, dashboard and webhook alerts
          when the notification backend is connected.
        </p>
      </section>
    </>
  );
}
