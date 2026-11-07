import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../hooks/useAuth';
import {
  User,
  ShieldCheck,
  Bell,
  Sliders,
  Lock,
  Smartphone,
  Key,
  Globe,
  Monitor,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle2,
  Check,
  Eye,
  EyeOff,
  LogOut,
  Clock,
  Sparkles,
  Save,
  Laptop
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences' | 'privacy'>('profile');

  // Tab 1: Profile State
  const [fullName, setFullName] = useState(user?.name || 'Alex Mercer');
  const [email] = useState(user?.email || 'alex.mercer@threatguard-defense.io');
  const [orgName, setOrgName] = useState('ThreatGuard Global Cyber Defense');
  const [accountType] = useState('Enterprise Tier — Senior Security Analyst');
  const [avatarSeed, setAvatarSeed] = useState('Alex');
  const [profileSaved, setProfileSaved] = useState(false);

  // Tab 2: Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [securitySuccess, setSecuritySuccess] = useState(false);

  // Tab 3: Notifications State
  const [emailCritical, setEmailCritical] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [emailWeekly, setEmailWeekly] = useState(false);
  const [inAppThreats, setInAppThreats] = useState(true);
  const [certWarnings, setCertWarnings] = useState(true);
  const [communityUpdates, setCommunityUpdates] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.slack.com/services/T90001/B9811/threatguard-soc-feed');
  const [notifSaved, setNotifSaved] = useState(false);

  // Tab 4: Preferences State
  const [selectedTheme, setSelectedTheme] = useState<'navy' | 'high-contrast'>('navy');
  const [timezone, setTimezone] = useState('UTC-05:00 (Eastern Time)');
  const [defaultScanConfig, setDefaultScanConfig] = useState<'full' | 'rapid'>('full');
  const [autoSaveReports, setAutoSaveReports] = useState(true);
  const [prefSaved, setPrefSaved] = useState(false);

  // Tab 5: Privacy State
  const [retentionPeriod, setRetentionPeriod] = useState('90');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const pwStrength = getPasswordStrength(newPassword);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecuritySuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSecuritySuccess(false), 2500);
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2500);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setPrefSaved(true);
    setTimeout(() => setPrefSaved(false), 2500);
  };

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      user: { fullName, email, orgName, accountType },
      preferences: { timezone, defaultScanConfig, autoSaveReports },
      platform: 'THREATGUARD Enterprise SaaS',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `threatguard_user_archive_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const navItems = [
    { id: 'profile', label: 'Profile', icon: User, desc: 'Identity & Organization' },
    { id: 'security', label: 'Security', icon: ShieldCheck, desc: 'Password, MFA & Sessions' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alerts, Webhooks & Feeds' },
    { id: 'preferences', label: 'Preferences', icon: Sliders, desc: 'Themes & Scan Defaults' },
    { id: 'privacy', label: 'Privacy & Data', icon: Lock, desc: 'Retention & Account Data' },
  ] as const;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Account Settings"
        description="Manage your enterprise profile, authentication security, SOC alert policies, and platform defaults."
      />

      {/* Main Layout: Left Navigation + Right Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Vertical Navigation */}
        <div className="lg:col-span-3 space-y-2">
          <Card className="p-2 bg-slate-900/90 border-slate-800 backdrop-blur-sm shadow-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">{item.label}</span>
                    <span className="text-[10px] text-slate-500 font-normal">{item.desc}</span>
                  </div>
                </button>
              );
            })}
          </Card>

          {/* Quick Support Badge */}
          <Card className="p-3.5 bg-slate-900/60 border-slate-800 text-xs text-slate-400">
            <span className="text-[10px] uppercase font-mono text-cyan-400 block mb-1">Assigned License</span>
            <p className="font-semibold text-slate-200">{accountType}</p>
            <p className="text-[11px] text-slate-500 mt-1">Managed via Enterprise Single Sign-On (SSO)</p>
          </Card>
        </div>

        {/* Right Content Panels */}
        <div className="lg:col-span-9">
          {/* ================= TAB 1: PROFILE ================= */}
          {activeTab === 'profile' && (
            <Card className="p-6 md:p-8 bg-slate-900/90 border-slate-800 backdrop-blur-sm shadow-xl">
              <div className="border-b border-slate-800 pb-4 mb-6">
                <h3 className="text-base font-bold text-slate-100">Analyst Profile & Organization</h3>
                <p className="text-xs text-slate-400 mt-1">Update your personal contact details and enterprise role designation.</p>
              </div>

              {profileSaved && (
                <div className="mb-6 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-2.5 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Profile settings updated successfully.
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
                {/* Avatar Section */}
                <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
                    <img
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}&backgroundColor=0f172a`}
                      alt="Avatar"
                      className="w-full h-full rounded-[14px] bg-slate-900"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">Avatar Persona</h4>
                    <p className="text-[11px] text-slate-500 mb-2">Cryptographic deterministic avatar representation</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAvatarSeed(`Analyst-${Math.random().toString(36).substring(7)}`)}
                      className="border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                      Regenerate Avatar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />

                  <div>
                    <label className="block text-slate-200 font-semibold mb-1.5 flex items-center justify-between">
                      <span>Work Email</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        <Check className="w-3 h-3" /> Verified
                      </span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-slate-950/40 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Enterprise Organization"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required
                  />

                  <div>
                    <label className="block text-slate-200 font-semibold mb-1.5">
                      Assigned Security Role
                    </label>
                    <input
                      type="text"
                      value={accountType}
                      disabled
                      className="w-full bg-slate-950/40 border border-slate-800 rounded-lg px-3 py-2 text-xs text-cyan-300 font-mono cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs"
                  >
                    <Save className="w-3.5 h-3.5 mr-1.5" />
                    Save Profile Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* ================= TAB 2: SECURITY ================= */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password Card */}
              <Card className="p-6 md:p-8 bg-slate-900/90 border-slate-800 backdrop-blur-sm shadow-xl">
                <div className="border-b border-slate-800 pb-4 mb-6">
                  <h3 className="text-base font-bold text-slate-100">Change Authentication Password</h3>
                  <p className="text-xs text-slate-400 mt-1">Ensure your password uses high-entropy characters to prevent brute-force attacks.</p>
                </div>

                {securitySuccess && (
                  <div className="mb-6 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-2.5 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    Password credentials rotated successfully.
                  </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-200 font-semibold mb-1.5">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPw ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPw(!showCurrentPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-200 font-semibold mb-1.5">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPw ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPw(!showNewPw)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                        >
                          {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Strength Bar */}
                      {newPassword && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                            <span>Entropy Rating:</span>
                            <span className="font-mono text-cyan-400">
                              {pwStrength === 4 ? 'Very Strong' : pwStrength === 3 ? 'Good' : 'Weak'}
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                pwStrength >= 4
                                  ? 'w-full bg-emerald-400'
                                  : pwStrength === 3
                                  ? 'w-3/4 bg-cyan-400'
                                  : 'w-1/3 bg-rose-500'
                              }`}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-200 font-semibold mb-1.5">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Two-Factor Authentication (2FA / MFA) */}
              <Card className="p-6 md:p-8 bg-slate-900/90 border-slate-800 backdrop-blur-sm shadow-xl">
                <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-cyan-400" />
                      Two-Factor Authentication (MFA / 2FA)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Protect your security console with time-based one-time password (TOTP) hardware tokens or authenticator apps.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMfaEnabled(!mfaEnabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      mfaEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow ring-0 transition duration-200 ease-in-out ${
                        mfaEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {mfaEnabled ? (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-semibold">MFA is Active & Enforced</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Authenticator App (Google Authenticator, YubiKey, or 1Password) linked on 2026-09-14.
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <Button variant="outline" size="sm" className="border-slate-700 text-xs">
                        View Emergency Recovery Codes
                      </Button>
                      <Button variant="ghost" size="sm" className="text-rose-400 hover:text-rose-300 text-xs">
                        Re-pair Authenticator Device
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span className="font-semibold">Two-Factor Authentication is Disabled</span>
                    </div>
                    <p className="text-[11px] text-amber-300/80">
                      We strongly advise enabling TOTP multi-factor authentication to comply with SOC2 Type II certification.
                    </p>
                  </div>
                )}
              </Card>

              {/* Active Sessions & Last Login */}
              <Card className="p-6 md:p-8 bg-slate-900/90 border-slate-800 backdrop-blur-sm shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-cyan-400" />
                      Active Analyst Sessions
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Authorized browser workstations and token leases currently authenticated.</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs">
                    Revoke Other Sessions
                  </Button>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Current session */}
                  <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Laptop className="w-5 h-5 text-cyan-400" />
                      <div>
                        <div className="font-semibold text-slate-200 flex items-center gap-2">
                          Chrome 122 on Windows 11
                          <span className="px-1.5 py-0.2 rounded bg-cyan-500 text-slate-950 font-bold text-[9px] uppercase">
                            Current
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          IP: 142.250.190.46 • Virginia, United States
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">Active Now</span>
                  </div>

                  {/* Secondary session */}
                  <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-slate-400" />
                      <div>
                        <div className="font-semibold text-slate-300">Firefox on macOS Sonoma</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          IP: 198.51.100.22 • San Francisco, CA
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">Last active 2 days ago</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ================= TAB 3: NOTIFICATIONS ================= */}
          {activeTab === 'notifications' && (
            <Card className="p-6 md:p-8 bg-slate-900/90 border-slate-800 backdrop-blur-sm shadow-xl">
              <div className="border-b border-slate-800 pb-4 mb-6">
                <h3 className="text-base font-bold text-slate-100">SOC Notification & Dispatch Rules</h3>
                <p className="text-xs text-slate-400 mt-1">Customize which threat signals trigger outbound dispatch and SIEM ingestion.</p>
              </div>

              {notifSaved && (
                <div className="mb-6 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-2.5 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Notification channels saved successfully.
                </div>
              )}

              <form onSubmit={handleSaveNotifications} className="space-y-6 text-xs">
                {/* Email Alerts */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-cyan-400" />
                    Email Notification Dispatch
                  </h4>
                  <div className="space-y-2.5">
                    <label className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <div>
                        <span className="font-semibold text-slate-200 block">Critical Threat Immediate Alerts</span>
                        <span className="text-[11px] text-slate-500">Dispatch instant notifications when risk score reaches 90+</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailCritical}
                        onChange={(e) => setEmailCritical(e.target.checked)}
                        className="rounded text-cyan-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <div>
                        <span className="font-semibold text-slate-200 block">Daily Threat Intelligence Digest</span>
                        <span className="text-[11px] text-slate-500">Summarized daily breakdown of scans and emerging brand spoofing campaigns</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailDigest}
                        onChange={(e) => setEmailDigest(e.target.checked)}
                        className="rounded text-cyan-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <div>
                        <span className="font-semibold text-slate-200 block">Weekly Executive Security Report</span>
                        <span className="text-[11px] text-slate-500">High-level executive briefing with CSV telemetry attachments</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailWeekly}
                        onChange={(e) => setEmailWeekly(e.target.checked)}
                        className="rounded text-cyan-500 focus:ring-0"
                      />
                    </label>
                  </div>
                </div>

                {/* Real-time In-App & Verification Updates */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    In-App Platform Alerts
                  </h4>
                  <div className="space-y-2.5">
                    <label className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <div>
                        <span className="font-semibold text-slate-200 block">Real-time Banner & Sound Alerts</span>
                        <span className="text-[11px] text-slate-500">Display desktop notification pops when monitoring watches trigger</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={inAppThreats}
                        onChange={(e) => setInAppThreats(e.target.checked)}
                        className="rounded text-cyan-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <div>
                        <span className="font-semibold text-slate-200 block">SSL Certificate Expiration Warnings</span>
                        <span className="text-[11px] text-slate-500">Receive proactive warnings 30, 14, and 7 days prior to expiry</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={certWarnings}
                        onChange={(e) => setCertWarnings(e.target.checked)}
                        className="rounded text-cyan-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <div>
                        <span className="font-semibold text-slate-200 block">Community Report Verification Updates</span>
                        <span className="text-[11px] text-slate-500">Notifies when submitted reports are confirmed by peer consensus</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={communityUpdates}
                        onChange={(e) => setCommunityUpdates(e.target.checked)}
                        className="rounded text-cyan-500 focus:ring-0"
                      />
                    </label>
                  </div>
                </div>

                {/* Webhook / Slack integration */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 mb-2">SOC Webhook / Slack Integration</h4>
                  <p className="text-[11px] text-slate-500 mb-2">
                    HTTP POST JSON payload dispatched on every verified critical threat event.
                  </p>
                  <Input
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://hooks.slack.com/services/..."
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs"
                  >
                    Save Notification Policies
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* ================= TAB 4: PREFERENCES ================= */}
          {activeTab === 'preferences' && (
            <Card className="p-6 md:p-8 bg-slate-900/90 border-slate-800 backdrop-blur-sm shadow-xl">
              <div className="border-b border-slate-800 pb-4 mb-6">
                <h3 className="text-base font-bold text-slate-100">Application Preferences</h3>
                <p className="text-xs text-slate-400 mt-1">Configure default scan engine behavior, visual theme, and localization.</p>
              </div>

              {prefSaved && (
                <div className="mb-6 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-2.5 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Preferences updated.
                </div>
              )}

              <form onSubmit={handleSavePreferences} className="space-y-6 text-xs">
                {/* Theme Selection */}
                <div>
                  <label className="block text-slate-200 font-semibold mb-2">Interface Theme</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setSelectedTheme('navy')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedTheme === 'navy'
                          ? 'border-cyan-500 bg-cyan-950/20 shadow-md shadow-cyan-500/10'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-200">Dark Cyber Navy</span>
                        {selectedTheme === 'navy' && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Default SOC palette: deep midnight blue (#080d1a), electric cyan highlights, and purple accents.
                      </p>
                    </div>

                    <div
                      onClick={() => setSelectedTheme('high-contrast')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedTheme === 'high-contrast'
                          ? 'border-cyan-500 bg-cyan-950/20 shadow-md shadow-cyan-500/10'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-200">High Contrast Dark</span>
                        {selectedTheme === 'high-contrast' && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Pure black (#000000) background with high contrast neon cyan borders for bright SOC environments.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timezone Selector */}
                <div>
                  <label className="block text-slate-200 font-semibold mb-1.5">Reporting Time Zone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="UTC-05:00 (Eastern Time)">UTC-05:00 (Eastern Time - New York)</option>
                    <option value="UTC-08:00 (Pacific Time)">UTC-08:00 (Pacific Time - San Francisco)</option>
                    <option value="UTC+00:00 (Universal Coordinated)">UTC+00:00 (Universal Coordinated Time - London)</option>
                    <option value="UTC+01:00 (Central European Time)">UTC+01:00 (Central European Time - Berlin)</option>
                    <option value="UTC+05:30 (India Standard Time)">UTC+05:30 (India Standard Time - New Delhi)</option>
                    <option value="UTC+09:00 (Japan Standard Time)">UTC+09:00 (Japan Standard Time - Tokyo)</option>
                  </select>
                </div>

                {/* Default Scan Configuration */}
                <div>
                  <label className="block text-slate-200 font-semibold mb-2">Default Scanner Engine Mode</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="scanConfig"
                        checked={defaultScanConfig === 'full'}
                        onChange={() => setDefaultScanConfig('full')}
                        className="mt-0.5 text-cyan-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-semibold text-slate-200 block">Full Security Assessment</span>
                        <span className="text-[11px] text-slate-500">All four pillars: Web Security, SSL Cert, Sandbox, OSINT</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="scanConfig"
                        checked={defaultScanConfig === 'rapid'}
                        onChange={() => setDefaultScanConfig('rapid')}
                        className="mt-0.5 text-cyan-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-semibold text-slate-200 block">Rapid Assessment</span>
                        <span className="text-[11px] text-slate-500">Fast heuristics and blacklist check (~1.5s response)</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Auto-save */}
                <label className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <div>
                    <span className="font-semibold text-slate-200 block">Auto-Save Scan Telemetry to Audit History</span>
                    <span className="text-[11px] text-slate-500">Automatically retain all initiated URL evaluations in the audit ledger</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoSaveReports}
                    onChange={(e) => setAutoSaveReports(e.target.checked)}
                    className="rounded text-cyan-500 focus:ring-0"
                  />
                </label>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs"
                  >
                    Save Preferences
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* ================= TAB 5: PRIVACY & DATA ================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <Card className="p-6 md:p-8 bg-slate-900/90 border-slate-800 backdrop-blur-sm shadow-xl">
                <div className="border-b border-slate-800 pb-4 mb-6">
                  <h3 className="text-base font-bold text-slate-100">Telemetry Data Retention & Export</h3>
                  <p className="text-xs text-slate-400 mt-1">Configure automated pruning schedules and export full JSON audit archives.</p>
                </div>

                <div className="space-y-6 text-xs">
                  {/* Data Retention */}
                  <div>
                    <label className="block text-slate-200 font-semibold mb-1.5">Audit Log Retention Window</label>
                    <select
                      value={retentionPeriod}
                      onChange={(e) => setRetentionPeriod(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="30">30 Days (Standard SOC Compliance)</option>
                      <option value="90">90 Days (Recommended)</option>
                      <option value="365">1 Year (Regulatory Archival)</option>
                      <option value="indefinite">Indefinite (Never Prune)</option>
                    </select>
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      Scans older than the selected retention horizon are purged from local storage automatically.
                    </p>
                  </div>

                  {/* Account Data Export */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-200">Export All Security Telemetry</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Download a machine-readable JSON archive containing all scan reports, watchlist items, and IOCs.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleExportData}
                      className="border-slate-700 text-slate-200 hover:text-cyan-300 text-xs shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                      Download JSON Archive
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Danger Zone */}
              <Card className="p-6 md:p-8 bg-red-950/10 border-red-500/30 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      Danger Zone
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Permanently terminate your THREATGUARD analyst account and purge all encrypted telemetry keys.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 text-xs shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteConfirmationText('');
        }}
        title="Permanently Terminate Account?"
        size="md"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300">
            <strong className="block mb-1">Warning: Irrevocable Action</strong>
            This will permanently remove your user identity, revoke all issued API keys, and decouple your active watchlist subscriptions.
          </div>

          <p className="text-slate-400">
            To proceed, please type <code className="text-red-400 font-mono bg-slate-950 px-1 py-0.5 rounded">DELETE</code> in the field below:
          </p>

          <Input
            value={deleteConfirmationText}
            onChange={(e) => setDeleteConfirmationText(e.target.value)}
            placeholder="Type DELETE to confirm"
          />

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeleteConfirmationText('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              disabled={deleteConfirmationText !== 'DELETE'}
              onClick={() => {
                setIsDeleteModalOpen(false);
                alert('Account deletion simulated in demo environment.');
              }}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold"
            >
              Permanently Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
