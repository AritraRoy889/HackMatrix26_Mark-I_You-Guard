import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Lock, ShieldCheck, Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toggleSuccessDemo, setToggleSuccessDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden cyber-grid">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Centered Recovery Card */}
      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center mb-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 glow-cyan-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="font-black text-xl text-white tracking-tight">
              THREAT<span className="text-cyan-400">GUARD</span>
            </span>
          </Link>
        </div>

        <Card className="p-8 bg-slate-950/80 border-slate-800 shadow-2xl backdrop-blur-xl space-y-6 text-center">
          {/* Small Lock and Shield Illustration */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
            <div className="relative">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
              <Lock className="w-4 h-4 text-white absolute -bottom-1 -right-1" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Recover Your Account.
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Enter the corporate or personal security email associated with your THREATGUARD workspace. We will issue a cryptographically signed recovery token.
            </p>
          </div>

          {/* Form */}
          {isSubmitted || toggleSuccessDemo ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left space-y-2.5 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Recovery Dispatch Confirmed</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                Recovery instructions have been sent if an account exists for this address.
              </p>
              <div className="pt-2">
                <Link to="/auth/login">
                  <Button variant="cyber" size="sm" className="w-full text-xs">
                    Return to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Registered Security Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="analyst@domain.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="cyber"
                className="w-full"
                rightIcon={<Send className="w-4 h-4" />}
              >
                Send Recovery Link
              </Button>

              <div className="pt-2 text-center">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Login</span>
                </Link>
              </div>
            </form>
          )}

          {/* Secondary Success-State Demo Trigger */}
          <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 text-center">
            <button
              type="button"
              onClick={() => setToggleSuccessDemo(!toggleSuccessDemo)}
              className="hover:text-cyan-400 transition-colors"
            >
              [Toggle Secondary Success State Reference]
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
