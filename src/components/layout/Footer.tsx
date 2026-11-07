import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Lock, Terminal, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 px-4 md:px-8 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                THREAT<span className="text-cyan-400">GUARD</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              AI-powered phishing detection, intelligent threat analysis and advanced certificate validation. Identify suspicious websites before they compromise your security.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SOC-2 Type II Certified Architecture</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2">
            <h5 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
              Product
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link to="/scanner" className="hover:text-cyan-400 transition-colors">
                  Website Security Scanner
                </Link>
              </li>
              <li>
                <Link to="/intelligence/certificates" className="hover:text-cyan-400 transition-colors">
                  Certificate Inspector
                </Link>
              </li>
              <li>
                <Link to="/intelligence/threats" className="hover:text-cyan-400 transition-colors">
                  Threat Intelligence Mesh
                </Link>
              </li>
              <li>
                <Link to="/monitoring/alerts" className="hover:text-cyan-400 transition-colors">
                  Continuous Watchlist
                </Link>
              </li>
              <li>
                <Link to="/community/reports" className="hover:text-cyan-400 transition-colors">
                  Community Threat Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Documentation Links */}
          <div className="space-y-2">
            <h5 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
              Documentation
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link to="/support/help" className="hover:text-cyan-400 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/support/help" className="hover:text-cyan-400 transition-colors">
                  Risk Scoring Taxonomy
                </Link>
              </li>
              <li>
                <Link to="/support/help" className="hover:text-cyan-400 transition-colors">
                  SIEM / Webhook Setup
                </Link>
              </li>
              <li>
                <Link to="/support/help" className="hover:text-cyan-400 transition-colors">
                  Responsible Disclosure
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Legal */}
          <div className="space-y-2">
            <h5 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
              Legal & Privacy
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link to="/support/help" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/support/help" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/support/help" className="hover:text-cyan-400 transition-colors">
                  Zero-Log Data Policy
                </Link>
              </li>
              <li>
                <Link to="/support/help" className="hover:text-cyan-400 transition-colors">
                  Security Whitepaper
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} THREATGUARD Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Terminal className="w-3 h-3 text-cyan-400" /> v2.5.0-PROD
            </span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
              <Github className="w-3.5 h-3.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
