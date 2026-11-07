import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, ArrowRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SocialAuth } from './SocialAuth';
import { useAuth } from '../../hooks/useAuth';

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!agreeToTerms) {
      setError('You must accept the Security Guidelines & Usage Policy.');
      return;
    }
    if (!email || !name) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await register({ name, email, organization, password, agreeToTerms });
      navigate('/dashboard');
    } catch {
      setError('Could not complete registration. Please try again.');
    }
  };

  return (
    <Card className="p-6 sm:p-8 bg-slate-900/90 border-slate-800 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Create Security Workspace</h2>
        <p className="text-xs text-slate-400 mt-1">
          Join thousands of security engineers and threat researchers on You Guard.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Input
          label="Full Legal / Handle Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex Vance"
          leftIcon={<User className="w-4 h-4" />}
          required
        />

        <Input
          label="Primary Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="analyst@domain.com"
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        <Input
          label="Organization or Domain (Optional)"
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="e.g. Acme Corp SecOps"
          leftIcon={<Building className="w-4 h-4" />}
        />

        <Input
          label="Master Password (12+ characters)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Strong password"
          leftIcon={<Lock className="w-4 h-4" />}
          required
        />

        <div className="pt-1">
          <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/30"
            />
            <span className="leading-relaxed">
              I agree to the Responsible Disclosure Guidelines and Acceptable Usage Policy.
            </span>
          </label>
        </div>

        <Button
          type="submit"
          variant="cyber"
          className="w-full mt-2"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Initialize Workspace
        </Button>
      </form>

      <div className="mt-6">
        <SocialAuth
          onSocialClick={async () => {
            await register({
              name: 'Security Analyst',
              email: 'analyst@mesh.sec',
              agreeToTerms: true,
            });
            navigate('/dashboard');
          }}
        />
      </div>

      <div className="mt-6 text-center text-xs text-slate-400">
        Already have access?{' '}
        <Link to="/auth/login" className="text-cyan-400 hover:underline font-semibold">
          Sign In
        </Link>
      </div>
    </Card>
  );
};
