import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Mail, ShieldAlert, Check } from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  const { user, updateUserPreferences } = useAuth();
  const [emailAlerts, setEmailAlerts] = useState(user?.preferences?.emailAlerts ?? true);
  const [criticalOnly, setCriticalOnly] = useState(user?.preferences?.criticalAlertsOnly ?? false);
  const [autoScan, setAutoScan] = useState(user?.preferences?.autoScanSavedDomains ?? true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateUserPreferences({
      emailAlerts,
      criticalAlertsOnly: criticalOnly,
      autoScanSavedDomains: autoScan,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-6">
      <div className="pb-3 border-b border-slate-800">
        <h3 className="text-sm font-semibold text-white">Alert Preferences & Delivery Channels</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Select notification triggers for new threat detections and expiration events.
        </p>
      </div>

      <div className="space-y-3 max-w-xl text-xs">
        <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={(e) => setEmailAlerts(e.target.checked)}
            className="mt-0.5 rounded bg-slate-800 border-slate-700 text-cyan-500"
          />
          <div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-white">Emergency Email Security Summaries</span>
            </div>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Receive immediate alerts whenever a monitored domain is flagged on a public blacklist.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={criticalOnly}
            onChange={(e) => setCriticalOnly(e.target.checked)}
            className="mt-0.5 rounded bg-slate-800 border-slate-700 text-cyan-500"
          />
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span className="font-semibold text-white">Critical Incidents Only (Noise Reduction)</span>
            </div>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Suppress minor certificate notices and only notify on active phishing or C2 beacons.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={autoScan}
            onChange={(e) => setAutoScan(e.target.checked)}
            className="mt-0.5 rounded bg-slate-800 border-slate-700 text-cyan-500"
          />
          <div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">Automated Background Watchlist Scans</span>
            </div>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Allow You Guard daemon to scan your saved inventory without manual initiation.
            </p>
          </div>
        </label>
      </div>

      <div className="pt-2">
        <Button
          variant="cyber"
          size="sm"
          onClick={handleSave}
          leftIcon={isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : undefined}
        >
          {isSaved ? 'Preferences Stored' : 'Save Notification Policy'}
        </Button>
      </div>
    </Card>
  );
};
