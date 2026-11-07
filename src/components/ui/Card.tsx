import React from 'react';
import { cn } from '../../utils/helpers';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>
{
  glass?: boolean;
  glow?: boolean;
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ( { className, glass = true, glow = false, hoverEffect = false, children, ...props }, ref ) =>
  {
    return (
      <div
        ref={ ref }
        className={ cn(
          'rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200',
          glass && 'backdrop-blur-md bg-slate-900/70 border-white/[0.07]',
          glow && 'shadow-[0_0_25px_-5px_rgba(6,182,212,0.15)]',
          hoverEffect && 'hover:border-cyan-500/30 hover:bg-slate-900/90 hover:shadow-xl hover:-translate-y-0.5',
          className
        ) }
        { ...props }
      >
        { children }
      </div>
    );
  }
);

Card.displayName = 'Card';
