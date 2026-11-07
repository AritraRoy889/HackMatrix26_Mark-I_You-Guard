import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, ShieldCheck, ArrowRight, RotateCw, AlertTriangle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const VerifyEmailPage: React.FC = () => {
  const [code, setCode] = useState(['8', '4', '2', '', '', '']);
  const [countdown, setCountdown] = useState(48);
  const [showExpiredState, setShowExpiredState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const next = [...code];
    next[index] = val;
    setCode(next);
    if (val && index < 5) {
      const el = document.getElementById(`verify-digit-${index + 1}`);
      el?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleResend = () => {
    setCountdown(60);
    setShowExpiredState(false);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden cyber-grid">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

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
          {/* Minimal Envelope and Shield Illustration */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
            <div className="relative">
              <Mail className="w-8 h-8 text-cyan-400" />
              <ShieldCheck className="w-4 h-4 text-emerald-400 absolute -bottom-1 -right-1" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Verify Your Email.
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              We've transmitted a 6-digit confirmation token to verify your authorized security analyst account at:
            </p>
            {/* Masked Email Example */}
            <div className="font-mono text-xs font-semibold text-cyan-400 bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-lg inline-block">
              al***.v***e@threatguard.security
            </div>
          </div>

          {/* Expired Code Secondary State Warning */}
          {showExpiredState && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-left text-xs text-amber-300 flex items-start gap-2 animate-in fade-in">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Security Token Expired:</span>
                <p className="text-[11px] text-amber-300/80 mt-0.5">
                  The verification challenge has timed out for session safety. Click Resend below to generate a new token.
                </p>
              </div>
            </div>
          )}

          {/* Six-digit verification code input */}
          <form onSubmit={handleVerify} className="space-y-5">
            <div className="flex justify-center gap-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`verify-digit-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  className="w-10 h-12 text-center text-lg font-mono font-bold bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                  required
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="cyber"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Verify Email
            </Button>
          </form>

          {/* Resend Code Action with Countdown & Links */}
          <div className="space-y-3 pt-2 text-xs font-mono">
            <div className="text-slate-400">
              {countdown > 0 ? (
                <span>Resend verification code in <strong className="text-white">{countdown}s</strong></span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-cyan-400 hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Resend Verification Code</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-center gap-4 text-slate-500 text-[11px] pt-2 border-t border-slate-800/80">
              <Link to="/auth/register" className="hover:text-slate-300 transition-colors">
                Change email address
              </Link>
              <span>•</span>
              <Link to="/auth/login" className="hover:text-slate-300 transition-colors">
                Return to login
              </Link>
            </div>
          </div>

          {/* Secondary UI State Reference Toggle */}
          <div className="pt-2 text-[10px] font-mono text-slate-600">
            <button
              type="button"
              onClick={() => setShowExpiredState(!showExpiredState)}
              className="hover:text-slate-400"
            >
              [Toggle Expired-Code Secondary UI State]
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
