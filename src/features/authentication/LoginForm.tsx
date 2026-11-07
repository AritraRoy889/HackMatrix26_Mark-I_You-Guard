import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SocialAuth } from './SocialAuth';
import { useAuth } from '../../hooks/useAuth';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('analyst@youguard.security');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Please provide a valid work email.');
      return;
    }

    try {
      await login({ email, password, rememberMe });
      navigate(from, { replace: true });
    } catch {
      setError('Invalid authentication credentials or MFA rejected.');
    }
  };

  return (
    <Card className="p-6 sm:p-8 bg-slate-900/90 border-slate-800 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Sign in to SOC Console</h2>
        <p className="text-xs text-slate-400 mt-1">
          Access your threat feeds, scan histories, and active alert rules.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Corporate / Security Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-slate-300">Access Password</label>
            <Link
              to="/auth/forgot-password"
              className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot secret?
            </Link>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter master password"
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/30"
            />
            <span>Remember session on this device</span>
          </label>
        </div>

        <Button
          type="submit"
          variant="cyber"
          className="w-full mt-2"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Authenticate Analyst
        </Button>
      </form>

      <div className="mt-6">
        <SocialAuth
          onSocialClick={async () => {
            await login({ email: 'sso.analyst@youguard.security' });
            navigate(from, { replace: true });
          }}
        />
      </div>

      <div className="mt-6 text-center text-xs text-slate-400">
        Don't have an analyst account yet?{' '}
        <Link to="/auth/register" className="text-cyan-400 hover:underline font-semibold">
          Create one now
        </Link>
      </div>
    </Card>
  );
};
