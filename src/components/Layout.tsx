import { ReactNode } from 'react';
import { Bell, Search } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout({
  children
}: {
  children?: ReactNode;
}) {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <header className="topbar">
          <span className="muted">
            Workspace / Security console
          </span>

          <div className="top-actions">
            <div className="searchbox">
              <Search size={15} />
              <input placeholder="Search..." />
            </div>

            <Link to="/alerts">
              <Bell size={19} />
            </Link>
          </div>
        </header>

        <div className="content">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}
