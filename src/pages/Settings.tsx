import { useState } from 'react';
import { Settings as SettingsIcon, User, Lock, Bell, Eye } from 'lucide-react';
import { currentUser } from '../services/auth';

export default function Settings() {
  const [active, setActive] = useState('Profile');

  const user = currentUser();

  const sections = [
    { name: 'Profile', icon: User },
    { name: 'Security', icon: Lock },
    { name: 'Notifications', icon: Bell },
    { name: 'Privacy', icon: Eye }
  ];

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">ACCOUNT MANAGEMENT</div>
          <h1>Settings</h1>
          <p className="muted">
            Manage your account and preferences.
          </p>
        </div>
      </div>

      <div className="grid2">
        <section className="panel">
          <h3><SettingsIcon size={18} /> Preferences</h3>

          {sections.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className="listrow"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 0,
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => setActive(item.name)}
              >
                <Icon size={17} />
                {item.name}
                {active === item.name && (
                  <span className="badge">Selected</span>
                )}
              </button>
            );
          })}
        </section>

        <section className="panel">
          <h3>{active} settings</h3>

          {active === 'Profile' && (
            <>
              <p className="muted">Account information</p>

              <div className="listrow">
                Name
                <b>{user?.name || 'User'}</b>
              </div>

              <div className="listrow">
                Email
                <b>{user?.email || 'Not available'}</b>
              </div>
            </>
          )}

          {active === 'Security' && (
            <p className="muted">
              Configure password management and
              multi-factor authentication through your backend.
            </p>
          )}

          {active === 'Notifications' && (
            <p className="muted">
              Configure alert preferences, email notifications
              and webhook integrations.
            </p>
          )}

          {active === 'Privacy' && (
            <p className="muted">
              Configure data retention, consent and
              account privacy preferences.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
