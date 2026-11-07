import React from 'react';
import { ScanPreset } from '../../types/scan.types';
import { Card } from '../../components/ui/Card';
import { Zap, ShieldCheck, Flame } from 'lucide-react';

export interface ScanPresetSelectorProps
{
  presets: ScanPreset[];
  activePresetId: string;
  onSelect: ( presetId: string ) => void;
}

export const ScanPresetSelector: React.FC<ScanPresetSelectorProps> = ( {
  presets,
  activePresetId,
  onSelect,
} ) =>
{
  const getPresetIcon = ( id: string ) =>
  {
    if ( id.includes( 'deep' ) ) return <Flame className="w-4 h-4 text-cyan-400" />;
    if ( id.includes( 'phish' ) ) return <Zap className="w-4 h-4 text-amber-400" />;
    return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
        Audit Profile Preset
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        { presets.map( ( preset ) =>
        {
          const isSelected = preset.id === activePresetId;
          return (
            <Card
              key={ preset.id }
              onClick={ () => onSelect( preset.id ) }
              className={ `p-4 cursor-pointer transition-all border ${ isSelected
                ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }` }
            >
              <div className="flex items-center gap-2 mb-1.5">
                { getPresetIcon( preset.id ) }
                <h4 className="text-xs font-semibold text-white">{ preset.name }</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{ preset.description }</p>
            </Card>
          );
        } ) }
      </div>
    </div>
  );
};
