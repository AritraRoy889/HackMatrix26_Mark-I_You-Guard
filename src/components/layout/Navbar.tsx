import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Bell,
  Search,
  Menu,
  User,
  LogOut,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Globe,
  Radio,
  Radar,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUiStore } from '../../store/ui.store';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatTimeAgo } from '../../utils/formatDate';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const {
    toggleSidebar,
    setMobileNavOpen,
    notifications,
    unreadAlertCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useUiStore();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicPage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 md:px-8 backdrop-blur-md">
      {/* Brand & Left Navigation */}
      <div className="flex items-center gap-6">
        {!isPublicPage && (
          <button
            onClick={toggleSidebar}
            className="hidden md:flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setMobileNavOpen(true)}
          className="flex md:hidden items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 glow-cyan-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="font-black tracking-tight text-lg text-white">
            THREAT<span className="text-cyan-400">GUARD</span>
          </span>
          <span className="hidden sm:inline-block rounded-md bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300 font-bold uppercase">
            AI-SOC
          </span>
        </Link>

        {/* Public Header Navigation specified in prompt */}
        {isPublicPage && (
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
            <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Home
            </Link>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <Link to="/intelligence/threats" className="hover:text-white transition-colors">
              Threat Intelligence
            </Link>
            <Link to="/support/help" className="hover:text-white transition-colors">
              About
            </Link>
          </nav>
        )}
      </div>

      {/* Global Quick Search for Authenticated / Inner Pages */}
      {!isPublicPage && (
        <div className="hidden lg:flex items-center w-72">
          <div
            onClick={() => navigate('/scanner')}
            className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-400 cursor-pointer hover:border-slate-700 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Quick scan target or IOC...</span>
            <kbd className="ml-auto rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              /
            </kbd>
          </div>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {isPublicPage ? (
          <div className="flex items-center gap-3">
            <Link
              to="/auth/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Sign In
            </Link>
            <Link to="/auth/register">
              <Button size="sm" variant="cyber" className="text-xs font-semibold shadow-lg shadow-cyan-500/25">
                Get Started
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/scanner"
              className="hidden sm:flex items-center gap-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1.5 text-xs font-semibold transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>New Scan</span>
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadAlertCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                    {unreadAlertCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">Threat Notifications</h4>
                      <Badge variant="cyan" size="sm">{notifications.length}</Badge>
                    </div>
                    {unreadAlertCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] text-cyan-400 hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.link) navigate(n.link);
                          setIsNotifOpen(false);
                        }}
                        className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          n.read
                            ? 'border-transparent bg-slate-950/40 text-slate-400'
                            : 'border-slate-800 bg-slate-800/60 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold mb-1">
                          <span className="text-white flex items-center gap-1.5">
                            {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />}
                            {n.title}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {formatTimeAgo(n.timestamp)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Menu */}
            {isAuthenticated && user && (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-lg border border-slate-800 bg-slate-900/80 hover:border-slate-700 transition-colors"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-cyan-500/40"
                  />
                  <span className="hidden md:inline-block text-xs font-medium text-slate-200">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl p-1.5 z-50">
                    <div className="px-3 py-2 border-b border-slate-800 mb-1">
                      <p className="text-xs font-semibold text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 uppercase text-[9px] font-mono tracking-wider text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/account/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Account Settings</span>
                    </Link>

                    <Link
                      to="/support/help"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span>Help & Documentation</span>
                    </Link>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                        navigate('/auth/login');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};
