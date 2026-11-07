import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Radar, ArrowRight, Sparkles } from 'lucide-react';
import { useScan } from '../../hooks/useScan';

export const QuickScanCard: React.FC = () =>
{
  const [ target, setTarget ] = useState( '' );
  const { startScan } = useScan();
  const navigate = useNavigate();

  const handleQuickScan = async ( e: React.FormEvent ) =>
  {
    e.preventDefault();
    if ( !target.trim() ) return;
    navigate( '/scanner/progress' );
    try
    {
      await startScan( target.trim() );
      navigate( '/scanner/results' );
    } catch
    {
      navigate( '/scanner' );
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border-cyan-500/20 p-5 glow-cyan-sm">
      <div className="flex items-center gap-2 mb-3">
        <Radar className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white">Ad-Hoc Target Security Scan</h3>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Run immediate cross-network audit for any suspect domain, URL, or host.
      </p>

      <form onSubmit={ handleQuickScan } className="flex gap-2">
        <input
          type="text"
          value={ target }
          onChange={ ( e ) => setTarget( e.target.value ) }
          placeholder="e.g. secure-login.domain.xyz"
          className="flex-1 bg-slate-950/80 border border-slate-700 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          required
        />
        <Button type="submit" variant="cyber" size="sm" rightIcon={ <ArrowRight className="w-3.5 h-3.5" /> }>
          Analyze
        </Button>
      </form>
    </Card>
  );
};
