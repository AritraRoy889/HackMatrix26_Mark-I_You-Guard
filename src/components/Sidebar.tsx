import { NavLink, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  ScanSearch,
  History,
  Network,
  Shield,
  Users,
  Bell,
  Eye,
  Settings,
  LogOut
} from 'lucide-react';

import { signOut } from '../services/auth';

const sections = [
  {
    title: 'WORKSPACE',
    links: [
      { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Scan Website', path: '/scanner', icon: ScanSearch },
      { name: 'Scan History', path: '/scan-history', icon: History }
    ]
  },
  {
    title: 'INTELLIGENCE',
    links: [
      { name: 'Threat Explorer', path: '/threat-intelligence', icon: Network },
      { name: 'Certificates', path: '/certificates', icon: Shield },
      { name: 'Community Reports', path: '/community', icon: Users }
    ]
  },
  {
    title: 'MONITORING',
    links: [
      { name: 'Alerts', path: '/alerts', icon: Bell },
      { name: 'Watchlist', path: '/watchlist', icon: Eye }
    ]
  }
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="brand">
        <ShieldCheck />
        Threat<span>Guard</span>
      </NavLink>

      {sections.map(section => (
        <div className="navgroup" key={section.title}>
          <div className="navtitle">{section.title}</div>

          {section.links.map(item => {
            const Icon = item.icon;

            return (
              <NavLink
                to={item.path}
                key={item.path}
                className={({ isActive }) =>
                  `navlink ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={17} />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      ))}

      <div className="sidebar-bottom">
        <NavLink className="navlink" to="/settings">
          <Settings size={17} />
          Settings
        </NavLink>

        <button className="navlink" onClick={handleLogout}>
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
