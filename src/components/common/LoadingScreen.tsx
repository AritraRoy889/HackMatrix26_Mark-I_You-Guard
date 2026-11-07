import React from 'react';
import { ShieldAlert } from 'lucide-react';

export interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Initializing Secure Environment...',
}) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 animate-pulse">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-mono text-cyan-400/90 tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
};
