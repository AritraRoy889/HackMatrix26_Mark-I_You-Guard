import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { User, Building, Mail, Check } from 'lucide-react';

export const ProfileSettings: React.FC = () =>
{
  const { user, updateProfile } = useAuth();
  const [ name, setName ] = useState( user?.name || '' );
  const [ organization, setOrganization ] = useState( user?.organization || '' );
  const [ isSaved, setIsSaved ] = useState( false );

  const handleSave = ( e: React.FormEvent ) =>
  {
    e.preventDefault();
    updateProfile( { name, organization } );
    setIsSaved( true );
    setTimeout( () => setIsSaved( false ), 2000 );
  };

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-5">
      <div className="pb-3 border-b border-slate-800">
        <h3 className="text-sm font-semibold text-white">Analyst Identity & Organization</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage your contact credentials and display persona across the threat mesh.
        </p>
      </div>

      <form onSubmit={ handleSave } className="space-y-4 max-w-lg">
        <Input
          label="Display Name"
          type="text"
          value={ name }
          onChange={ ( e ) => setName( e.target.value ) }
          leftIcon={ <User className="w-4 h-4" /> }
          required
        />

        <Input
          label="Primary Security Email (Read-Only)"
          type="email"
          value={ user?.email || '' }
          disabled
          leftIcon={ <Mail className="w-4 h-4" /> }
          helperText="Managed by corporate SSO or identity directory."
        />

        <Input
          label="Security Organization / SOC Unit"
          type="text"
          value={ organization }
          onChange={ ( e ) => setOrganization( e.target.value ) }
          leftIcon={ <Building className="w-4 h-4" /> }
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="cyber"
            size="sm"
            leftIcon={ isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : undefined }
          >
            { isSaved ? 'Changes Saved' : 'Update Profile' }
          </Button>
        </div>
      </form>
    </Card>
  );
};
