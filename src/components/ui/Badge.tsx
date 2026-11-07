import React from 'react';
import { cn } from '../../utils/helpers';
import { RiskLevel } from '../../types/scan.types';
import { getRiskColorClass } from '../../utils/formatRisk';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>
{
  variant?: 'default' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'risk';
  riskLevel?: RiskLevel;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ( {
  className,
  variant = 'default',
  riskLevel,
  size = 'md',
  children,
  ...props
} ) =>
{
  let colorStyles = 'bg-slate-800 text-slate-300 border-slate-700';

  if ( riskLevel )
  {
    const risk = getRiskColorClass( riskLevel );
    colorStyles = risk.badge;
  } else
  {
    switch ( variant )
    {
      case 'cyan':
        colorStyles = 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
        break;
      case 'emerald':
        colorStyles = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
        break;
      case 'amber':
        colorStyles = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
        break;
      case 'rose':
        colorStyles = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
        break;
      default:
        colorStyles = 'bg-slate-800 text-slate-300 border-slate-700';
    }
  }

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider uppercase font-semibold',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={ cn(
        'inline-flex items-center gap-1.5 rounded-full border',
        sizes[ size ],
        colorStyles,
        className
      ) }
      { ...props }
    >
      { children }
    </span>
  );
};
