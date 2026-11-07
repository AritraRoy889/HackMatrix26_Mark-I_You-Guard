import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { User, UserRole } from '../../types/auth.types';
import { formatDate } from '../../utils/formatDate';
import { ShieldAlert, UserCheck, Trash2, Key } from 'lucide-react';

export const UserManagementTable: React.FC = () =>
{
  const [ users, setUsers ] = useState<User[]>( [
    {
      id: 'usr-admin-1',
      name: 'Alex Vance',
      email: 'alex.vance@youguard.security',
      role: 'admin',
      twoFactorEnabled: true,
      createdAt: '2025-01-15T00:00:00Z',
      lastLoginAt: '2026-11-07T10:00:00Z',
      preferences: { theme: 'dark', emailAlerts: true, criticalAlertsOnly: false, autoScanSavedDomains: true },
    },
    {
      id: 'usr-analyst-2',
      name: 'Elena Rostova',
      email: 'elena.rostova@fintrust.sec',
      role: 'analyst',
      organization: 'FinTrust Threat Team',
      twoFactorEnabled: true,
      createdAt: '2025-02-01T00:00:00Z',
      lastLoginAt: '2026-11-07T08:30:00Z',
      preferences: { theme: 'dark', emailAlerts: true, criticalAlertsOnly: false, autoScanSavedDomains: true },
    },
    {
      id: 'usr-member-3',
      name: 'Marcus Chen',
      email: 'marcus.c@devsec.io',
      role: 'member',
      organization: 'Independent Researcher',
      twoFactorEnabled: false,
      createdAt: '2025-02-14T00:00:00Z',
      lastLoginAt: '2026-11-06T15:20:00Z',
      preferences: { theme: 'dark', emailAlerts: false, criticalAlertsOnly: true, autoScanSavedDomains: false },
    },
  ] );

  const handleRoleChange = ( id: string, newRole: UserRole ) =>
  {
    setUsers( users.map( ( u ) => ( u.id === id ? { ...u, role: newRole } : u ) ) );
  };

  const handleDeleteUser = ( id: string ) =>
  {
    setUsers( users.filter( ( u ) => u.id !== id ) );
  };

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">Security Analysts & Access Directory</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage administrative privileges, MFA compliance, and user roles.
          </p>
        </div>
        <Badge variant="cyan" size="sm">{ users.length } Registered Accounts</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
              <th className="pb-3">User & Organization</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">2FA Status</th>
              <th className="pb-3">Last Active</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            { users.map( ( u ) => (
              <tr key={ u.id } className="hover:bg-slate-800/30">
                <td className="py-3">
                  <span className="font-semibold text-white font-sans block">{ u.name }</span>
                  <span className="text-[11px] text-slate-400 block">{ u.email }</span>
                  { u.organization && (
                    <span className="text-[10px] text-slate-500">{ u.organization }</span>
                  ) }
                </td>
                <td className="py-3">
                  <select
                    value={ u.role }
                    onChange={ ( e ) => handleRoleChange( u.id, e.target.value as UserRole ) }
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-cyan-300 capitalize"
                  >
                    <option value="admin">Admin</option>
                    <option value="analyst">Analyst</option>
                    <option value="member">Member</option>
                  </select>
                </td>
                <td className="py-3">
                  <Badge variant={ u.twoFactorEnabled ? 'emerald' : 'amber' } size="sm">
                    { u.twoFactorEnabled ? 'ENFORCED' : 'DISABLED' }
                  </Badge>
                </td>
                <td className="py-3 text-slate-400 text-[11px]">
                  { formatDate( u.lastLoginAt ) }
                </td>
                <td className="py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={ () => handleDeleteUser( u.id ) }
                    className="h-7 text-xs px-2 text-slate-500 hover:text-rose-400"
                    title="Remove user"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </td>
              </tr>
            ) ) }
          </tbody>
        </table>
      </div>
    </Card>
  );
};
