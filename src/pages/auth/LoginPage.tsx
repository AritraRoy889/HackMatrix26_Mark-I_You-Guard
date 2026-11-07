import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  Radar,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Radio,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('analyst@threatguard.security');
  const [password, setPassword] = useState('ThreatGuard#2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Secondary interactive reference state preview (validation error / state demo)
  const [showValidationErrorState, setShowValidationErrorState] = useState(false);

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Please provide a valid work email.');
      return;
    }
    try {
      await login({ email, password, rememberMe });
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials or authentication challenge failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden cyber-grid">
      {/* Background radial glow spots */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main 2-Column Container Desktop 1440 × 1024 */}
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE: Brand, Radar Artwork, Trust Statements */}
        <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between relative bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950">
          <div>
            {/* THREATGUARD Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 glow-cyan-sm">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                THREAT<span className="text-cyan-400">GUARD</span>
              </span>
            </Link>

            {/* Headline & Copy */}
            <div className="space-y-3 mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Your Security Intelligence Starts Here.
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                Access real-time threat intelligence feeds, conduct automated heuristic scans, and protect your digital infrastructure against zero-day phishing operations.
              </p>
            </div>

            {/* Abstract 3D Shield & Glowing Digital Radar Artwork */}
            <div className="my-6 relative flex items-center justify-center h-48 rounded-2xl border border-cyan-500/20 bg-slate-950/70 overflow-hidden">
              <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-pulse" />
              <div className="absolute inset-10 rounded-full border border-cyan-500/30" />
              <div className="absolute inset-16 rounded-full border border-cyan-500/40" />
              <div className="absolute w-full h-[1px] bg-cyan-500/20" />
              <div className="absolute h-full w-[1px] bg-cyan-500/20" />
              <div className="absolute inset-0 origin-center animate-radar-sweep bg-gradient-to-tr from-transparent via-transparent to-cyan-500/25 rounded-full pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-b from-cyan-400 to-blue-600 p-0.5 shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                  <div className="h-full w-full bg-slate-950 rounded-2xl flex items-center justify-center text-cyan-400">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-cyan-300 mt-2 tracking-widest uppercase">
                  CRYPTOGRAPHIC DEFENSE CORE
                </span>
              </div>
            </div>
          </div>

          {/* Three Trust Statements from prompt */}
          <div className="space-y-3 pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="h-6 w-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-white">Secure Authentication:</span> Hardware MFA & FIDO2 token ready.
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="h-6 w-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Radio className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-white">Intelligent Threat Detection:</span> 12 parallel global blacklist feeds.
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="h-6 w-6 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-white">Privacy-First Architecture:</span> Zero credential harvesting or logging.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Elegant Login Card */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your credentials to access your SOC dashboard.
              </p>
            </div>

            {/* Validation Error Alert State (or dynamic error) */}
            {(error || showValidationErrorState) && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Authentication Challenge Error:</span>
                  <p className="text-[11px] text-rose-300/80 mt-0.5">
                    {error || 'Invalid corporate security credentials or multi-factor token expired.'}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@domain.com"
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 font-mono"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security password"
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2.5 pr-10 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-white transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/30"
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              <Button
                type="submit"
                variant="cyber"
                className="w-full mt-2"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In
              </Button>
            </form>

            {/* Divider OR */}
            <div className="my-5 relative flex items-center justify-center">
              <div className="w-full border-t border-slate-800" />
              <span className="bg-slate-950 px-3 text-[11px] font-mono text-slate-500 uppercase tracking-wider absolute">
                OR
              </span>
            </div>

            {/* Continue with Google button */}
            <Button
              type="button"
              variant="secondary"
              className="w-full text-xs font-mono"
              onClick={async () => {
                await login({ email: 'google.analyst@threatguard.security' });
                navigate('/dashboard');
              }}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Continue with Google
            </Button>

            <div className="mt-5 text-center text-xs text-slate-400">
              New to THREATGUARD?{' '}
              <Link to="/auth/register" className="text-cyan-400 hover:underline font-semibold">
                Create account
              </Link>
            </div>
          </div>

          {/* Secondary Component Reference: Test Validation Error Preview Button */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <button
              type="button"
              onClick={() => setShowValidationErrorState(!showValidationErrorState)}
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              Toggle Error State Preview
            </button>
            <div className="flex gap-3">
              <Link to="/support/help" className="hover:text-slate-300">Terms</Link>
              <Link to="/support/help" className="hover:text-slate-300">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
