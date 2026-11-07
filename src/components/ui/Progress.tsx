import React from 'react';
import { cn } from '../../utils/helpers';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  color?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  color = 'cyan',
  size = 'md',
  showLabel = false,
  className,
  ...props
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  const colors = {
    cyan: 'bg-cyan-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    gradient: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400',
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
          <span>Progress</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-slate-800/90 border border-slate-700/50', heights[size])}>
        <div
          className={cn('h-full transition-all duration-300 ease-out rounded-full', colors[color])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
