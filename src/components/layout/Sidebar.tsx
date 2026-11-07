import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Radar,
  History,
  Radio,
  FileCheck2,
  Users,
  BookmarkCheck,
  Settings,
  HelpCircle,
  ShieldAlert,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useUiStore } from '../../store/ui.store';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/helpers';

export const Sidebar: React.FC = () => {
  const { isSidebarCollapsed, unreadAlertCount } = useUiStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 9 exact navigation items required by prompt
  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Scan Website', path: '/scanner', icon: <Radar className="w-4 h-4" />, badge: 'AI' },
    { name: 'Scan History', path: '/monitoring/history', icon: <History className="w-4 h-4" /> },
    { name: 'Threat Intelligence', path: '/intelligence/threats', icon: <Radio className="w-4 h-4" /> },
    { name: 'Certificate Inspector', path: '/intelligence/certificates', icon: <FileCheck2 className="w-4 h-4" /> },
    { name: 'Community Reports', path: '/community/reports', icon: <Users className="w-4 h-4" /> },
    {
      name: 'Watchlist',
      path: '/monitoring/alerts',
      icon: <BookmarkCheck className="w-4 h-4" />,
      badge: unreadAlertCount > 0 ? String(unreadAlertCount) : undefined,
    },
    { name: 'Settings', path: '/account/settings', icon: <Settings className="w-4 h-4" /> },
    { name: 'Help and Support', path: '/support/help', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col border-r border-slate-800 bg-slate-950/85 backdrop-blur-md transition-all duration-300 select-none z-30 justify-between',
        isSidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Top Header in Sidebar */}
      <div>
        <div className="h-16 flex items-center px-5 border-b border-slate-800/80 gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 glow-cyan-sm shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          {!isSidebarCollapsed && (
            <div className="truncate">
              <span className="font-black text-sm text-white tracking-tight block">
                THREAT<span className="text-cyan-400">GUARD</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-300/80 block uppercase">
                Enterprise SOC
              </span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group relative',
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.12)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                )
              }
              title={isSidebarCollapsed ? item.name : undefined}
            >
              <span className="shrink-0 transition-transform group-hover:scale-110">{item.icon}</span>
              {!isSidebarCollapsed && <span className="truncate flex-1">{item.name}</span>}
              {!isSidebarCollapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* BOTTOM SIDEBAR: User avatar, username, account type and logout */}
      <div className="p-3 border-t border-slate-800/80">
        <div
          className={cn(
            'flex items-center gap-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800',
            isSidebarCollapsed ? 'justify-center' : 'justify-between'
          )}
        >
          <div className="flex items-center gap-2.5 truncate">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-cyan-500/40 shrink-0"
            />
            {!isSidebarCollapsed && (
              <div className="truncate">
                <span className="text-xs font-bold text-white block truncate leading-tight">
                  {user?.name || 'Alex Vance'}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 capitalize block">
                  {user?.role || 'admin'} • Enterprise SOC
                </span>
              </div>
            )}
          </div>

          {!isSidebarCollapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
