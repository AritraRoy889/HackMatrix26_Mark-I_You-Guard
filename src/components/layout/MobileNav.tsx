import React from 'react';
import { NavLink } from 'react-router-dom';
import
  {
    X,
    LayoutDashboard,
    Radar,
    Radio,
    FileCheck2,
    Users,
    History,
    BellRing,
    BookmarkCheck,
    Settings,
    HelpCircle,
    ShieldAlert,
  } from 'lucide-react';
import { useUiStore } from '../../store/ui.store';
import { cn } from '../../utils/helpers';

export const MobileNav: React.FC = () =>
{
  const { isMobileNavOpen, setMobileNavOpen } = useUiStore();

  if ( !isMobileNavOpen ) return null;

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Threat Scanner', path: '/scanner', icon: <Radar className="w-5 h-5" /> },
    { name: 'Threat Intelligence', path: '/intelligence/threats', icon: <Radio className="w-5 h-5" /> },
    { name: 'Certificate Inspector', path: '/intelligence/certificates', icon: <FileCheck2 className="w-5 h-5" /> },
    { name: 'Watchlist', path: '/monitoring/watchlist', icon: <BookmarkCheck className="w-5 h-5" /> },
    { name: 'Alerts', path: '/monitoring/alerts', icon: <BellRing className="w-5 h-5" /> },
    { name: 'Scan History', path: '/monitoring/history', icon: <History className="w-5 h-5" /> },
    { name: 'Community Reports', path: '/community/reports', icon: <Users className="w-5 h-5" /> },
    { name: 'Settings', path: '/account/settings', icon: <Settings className="w-5 h-5" /> },
    { name: 'Help & Docs', path: '/support/help', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */ }
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={ () => setMobileNavOpen( false ) }
      />

      <div className="relative w-72 max-w-[80vw] bg-slate-900 border-r border-slate-800 p-5 flex flex-col z-10 h-full">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <span className="font-extrabold text-white text-base">
              YOU<span className="text-cyan-400">GUARD</span>
            </span>
          </div>
          <button
            onClick={ () => setMobileNavOpen( false ) }
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-1">
          { links.map( ( link ) => (
            <NavLink
              key={ link.path }
              to={ link.path }
              onClick={ () => setMobileNavOpen( false ) }
              className={ ( { isActive } ) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )
              }
            >
              { link.icon }
              <span>{ link.name }</span>
            </NavLink>
          ) ) }
        </div>
      </div>
    </div>
  );
};
