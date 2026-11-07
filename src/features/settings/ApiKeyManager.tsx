import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { copyToClipboard } from '../../utils/helpers';
import { Key, Copy, Check, Plus, Trash2, Terminal } from 'lucide-react';

interface ApiKeyItem
{
  id: string;
  name: string;
  keyPrefix: string;
  created: string;
  lastUsed: string;
}

export const ApiKeyManager: React.FC = () =>
{
  const [ keys, setKeys ] = useState<ApiKeyItem[]>( [
    {
      id: 'k-1',
      name: 'CI/CD Pipeline Scanner Token',
      keyPrefix: 'yg_live_89f029...7a4',
      created: '2025-02-01',
      lastUsed: '12 mins ago',
    },
    {
      id: 'k-2',
      name: 'Splunk / SIEM Log Ingestion',
      keyPrefix: 'yg_live_44aa01...bb9',
      created: '2025-01-18',
      lastUsed: 'Just now',
    },
  ] );
  const [ copiedId, setCopiedId ] = useState<string | null>( null );

  const handleCopy = async ( id: string, key: string ) =>
  {
    await copyToClipboard( key );
    setCopiedId( id );
    setTimeout( () => setCopiedId( null ), 2000 );
  };

  const handleCreateKey = () =>
  {
    const newKey: ApiKeyItem = {
      id: `k-${ Date.now() }`,
      name: `API Token #${ keys.length + 1 }`,
      keyPrefix: `yg_live_${ Math.random().toString( 36 ).substring( 2, 8 ) }...${ Math.random().toString( 36 ).substring( 2, 5 ) }`,
      created: new Date().toISOString().split( 'T' )[ 0 ],
      lastUsed: 'Never',
    };
    setKeys( [ ...keys, newKey ] );
  };

  const handleDelete = ( id: string ) =>
  {
    setKeys( keys.filter( ( k ) => k.id !== id ) );
  };

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">Programmatic API Access & Tokens</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Use these bearer tokens to query You Guard API endpoints via curl, Python, or CI/CD scripts.
          </p>
        </div>
        <Button
          variant="cyber"
          size="sm"
          onClick={ handleCreateKey }
          leftIcon={ <Plus className="w-3.5 h-3.5" /> }
          className="text-xs shrink-0"
        >
          Generate New API Key
        </Button>
      </div>

      <div className="space-y-3">
        { keys.map( ( k ) => (
          <div
            key={ k.id }
            className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
          >
            <div>
              <div className="flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-white font-sans">{ k.name }</span>
                <Badge variant="cyan" size="sm">ACTIVE</Badge>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-[11px] mt-1">
                <span>Created: { k.created }</span>
                <span>•</span>
                <span>Last active: { k.lastUsed }</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-slate-900 border border-slate-700/80 px-2 py-1 rounded text-cyan-300 text-[11px]">
                { k.keyPrefix }
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={ () => handleCopy( k.id, k.keyPrefix ) }
                className="h-7 text-xs px-2 text-slate-400 hover:text-white"
                title="Copy token"
              >
                { copiedId === k.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" /> }
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={ () => handleDelete( k.id ) }
                className="h-7 text-xs px-2 text-slate-500 hover:text-rose-400"
                title="Revoke token"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ) ) }
      </div>

      {/* Code snippet example */ }
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] pb-1">
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span>BASH CURL INVOCATION EXAMPLE</span>
        </div>
        <p className="text-cyan-400">
          curl -X POST https://api.youguard.security/v1/scans \
        </p>
        <p className="pl-4 text-slate-400">
          -H "Authorization: Bearer <span className="text-white">YOUR_TOKEN_HERE</span>" \
        </p>
        <p className="pl-4 text-slate-400">
          -d '{ '{"target": "https://suspicious-site.xyz"}' }'
        </p>
      </div>
    </Card>
  );
};
