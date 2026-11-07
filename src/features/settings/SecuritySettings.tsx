import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Lock, ShieldCheck, KeyRound, Check } from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [twoFactor, setTwoFactor] = useState(true);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage('Password successfully updated.');
    setCurrentPass('');
    setNewPass('');
    setTimeout(() => setSavedMessage(null), 3000);
  };

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-6">
      <div className="pb-3 border-b border-slate-800">
        <h3 className="text-sm font-semibold text-white">Authentication & Cryptographic Access</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure multi-factor hardware security tokens and update authorization secrets.
        </p>
      </div>

      {savedMessage && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
          {savedMessage}
        </div>
      )}

      {/* 2FA Toggle Banner */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-white">Two-Factor Authentication (TOTP / FIDO2)</h4>
              <Badge variant={twoFactor ? 'emerald' : 'amber'} size="sm">
                {twoFactor ? 'ENFORCED' : 'OPTIONAL'}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Requires YubiKey or authenticator verification code for high-privilege SOC actions.
            </p>
          </div>
        </div>

        <Button
          variant={twoFactor ? 'outline' : 'cyber'}
          size="sm"
          onClick={() => setTwoFactor(!twoFactor)}
          className="shrink-0 text-xs"
        >
          {twoFactor ? 'Disable MFA' : 'Enable Hardware MFA'}
        </Button>
      </div>

      {/* Password Change Form */}
      <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-lg">
        <Input
          label="Current Secret / Password"
          type="password"
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
          placeholder="••••••••••••"
          required
        />

        <Input
          label="New Master Secret (14+ characters, mixed symbols)"
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          leftIcon={<KeyRound className="w-4 h-4" />}
          placeholder="••••••••••••"
          required
        />

        <div className="pt-2">
          <Button type="submit" variant="secondary" size="sm">
            Rotate Master Password
          </Button>
        </div>
      </form>
    </Card>
  );
};
