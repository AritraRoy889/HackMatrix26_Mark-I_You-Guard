import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Globe, Tag } from 'lucide-react';

export interface AddDomainModalProps
{
  isOpen: boolean;
  onClose: () => void;
  onAdd: ( domainData: {
    domain: string;
    status: 'healthy' | 'warning' | 'compromised' | 'offline';
    autoScanFrequency: 'hourly' | 'daily' | 'weekly';
    alertEmail: boolean;
    tags: string[];
  } ) => void;
}

export const AddDomainModal: React.FC<AddDomainModalProps> = ( {
  isOpen,
  onClose,
  onAdd,
} ) =>
{
  const [ domain, setDomain ] = useState( '' );
  const [ frequency, setFrequency ] = useState<'hourly' | 'daily' | 'weekly'>( 'daily' );
  const [ alertEmail, setAlertEmail ] = useState( true );
  const [ tagsInput, setTagsInput ] = useState( 'Core Production, API' );

  const handleSubmit = ( e: React.FormEvent ) =>
  {
    e.preventDefault();
    if ( !domain ) return;
    const cleanDomain = domain.replace( /^https?:\/\//, '' ).split( '/' )[ 0 ];
    const tags = tagsInput
      .split( ',' )
      .map( ( t ) => t.trim() )
      .filter( Boolean );

    onAdd( {
      domain: cleanDomain,
      status: 'healthy',
      autoScanFrequency: frequency,
      alertEmail,
      tags,
    } );
    setDomain( '' );
    onClose();
  };

  return (
    <Modal
      isOpen={ isOpen }
      onClose={ onClose }
      title="Add Host to Monitoring Watchlist"
      description="You Guard will run automated background scans and alert you upon SSL expiry or risk change."
      maxWidth="md"
    >
      <form onSubmit={ handleSubmit } className="space-y-4 pt-2 text-xs">
        <Input
          label="Target Hostname or Domain"
          type="text"
          value={ domain }
          onChange={ ( e ) => setDomain( e.target.value ) }
          placeholder="api.customer-portal.com"
          leftIcon={ <Globe className="w-4 h-4" /> }
          required
        />

        <div>
          <label className="block font-medium text-slate-300 mb-1.5">
            Automated Audit Schedule
          </label>
          <select
            value={ frequency }
            onChange={ ( e ) => setFrequency( e.target.value as any ) }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="hourly">Hourly Deep Scan (High Frequency)</option>
            <option value="daily">Daily Scheduled Audit (Standard)</option>
            <option value="weekly">Weekly Health Check</option>
          </select>
        </div>

        <Input
          label="Organizational Tags (comma-separated)"
          type="text"
          value={ tagsInput }
          onChange={ ( e ) => setTagsInput( e.target.value ) }
          placeholder="e.g. AWS, Auth Cluster, Staging"
          leftIcon={ <Tag className="w-4 h-4" /> }
        />

        <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={ alertEmail }
            onChange={ ( e ) => setAlertEmail( e.target.checked ) }
            className="rounded bg-slate-800 border-slate-700 text-cyan-500"
          />
          <span className="text-slate-200">
            Send instant email notification if risk score spikes above 40
          </span>
        </label>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="ghost" size="sm" type="button" onClick={ onClose }>
            Cancel
          </Button>
          <Button variant="cyber" size="sm" type="submit">
            Add to Active Watchlist
          </Button>
        </div>
      </form>
    </Modal>
  );
};
