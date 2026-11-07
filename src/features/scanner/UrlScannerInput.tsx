import React, { useState } from 'react';
import { Search, Globe, Shield, Terminal } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { MOCK_POPULAR_TARGETS } from '../../utils/constants';

export interface UrlScannerInputProps
{
  onScan: ( target: string ) => void;
  isLoading?: boolean;
  initialValue?: string;
}

export const UrlScannerInput: React.FC<UrlScannerInputProps> = ( {
  onScan,
  isLoading = false,
  initialValue = '',
} ) =>
{
  const [ inputVal, setInputVal ] = useState( initialValue );

  const handleSubmit = ( e: React.FormEvent ) =>
  {
    e.preventDefault();
    if ( !inputVal.trim() ) return;
    onScan( inputVal.trim() );
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={ handleSubmit }
        className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/30 transition-all"
      >
        <div className="flex items-center gap-3 px-3 w-full">
          <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={ inputVal }
            onChange={ ( e ) => setInputVal( e.target.value ) }
            placeholder="Enter URL, FQDN (e.g., login.example.com), or IPv4..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none py-2.5 font-mono"
            required
          />
        </div>
        <Button
          type="submit"
          size="md"
          variant="cyber"
          isLoading={ isLoading }
          leftIcon={ <Shield className="w-4 h-4" /> }
          className="w-full sm:w-auto shrink-0"
        >
          Execute Threat Audit
        </Button>
      </form>

      {/* Suggested demo targets */ }
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-1 font-mono text-slate-500">
          <Terminal className="w-3 h-3 text-cyan-400" /> Presets:
        </span>
        { MOCK_POPULAR_TARGETS.map( ( target ) => (
          <button
            key={ target }
            type="button"
            onClick={ () => setInputVal( target ) }
            className="font-mono text-[11px] text-slate-300 bg-slate-900 hover:text-cyan-400 hover:border-cyan-500/40 border border-slate-800 px-2 py-0.5 rounded transition-all"
          >
            { target.replace( /^https?:\/\//, '' ).split( '/' )[ 0 ] }
          </button>
        ) ) }
      </div>
    </div>
  );
};
