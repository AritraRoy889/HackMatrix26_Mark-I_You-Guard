import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ErrorStateProps
{
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ( {
  title = 'System Anomaly Detected',
  message = 'An unexpected failure occurred while processing this telemetry stream.',
  onRetry,
} ) =>
{
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-rose-500/30 bg-rose-500/5 my-4">
      <div className="p-3 rounded-full bg-rose-500/15 text-rose-400 mb-3 border border-rose-500/20">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-rose-300">{ title }</h3>
      <p className="text-xs text-rose-200/80 max-w-sm mt-1 mb-4 leading-relaxed">{ message }</p>
      { onRetry && (
        <Button size="sm" variant="danger" onClick={ onRetry }>
          Re-attempt Connection
        </Button>
      ) }
    </div>
  );
};
