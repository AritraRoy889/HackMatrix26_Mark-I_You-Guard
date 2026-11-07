import React from 'react';
import { cn } from '../../utils/helpers';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>
{
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ( { className, label, error, helperText, leftIcon, rightIcon, ...props }, ref ) =>
  {
    return (
      <div className="w-full space-y-1.5">
        { label && (
          <label className="block text-xs font-medium text-slate-300">
            { label }
          </label>
        ) }
        <div className="relative flex items-center">
          { leftIcon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none">
              { leftIcon }
            </div>
          ) }
          <input
            ref={ ref }
            className={ cn(
              'w-full bg-slate-900/80 border border-slate-700/80 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/80 transition-all duration-150',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-500/80 focus:ring-rose-500/40 focus:border-rose-500',
              className
            ) }
            { ...props }
          />
          { rightIcon && (
            <div className="absolute right-3 text-slate-400 flex items-center">
              { rightIcon }
            </div>
          ) }
        </div>
        { error ? (
          <p className="text-xs text-rose-400 font-medium">{ error }</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400">{ helperText }</p>
        ) : null }
      </div>
    );
  }
);

Input.displayName = 'Input';
