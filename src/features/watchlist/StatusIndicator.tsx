import React from 'react';
import { Badge } from '../../components/ui/Badge';

export interface StatusIndicatorProps {
  status: 'healthy' | 'warning' | 'compromised' | 'offline';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  switch (status) {
    case 'healthy':
      return (
        <Badge variant="emerald" size="sm" className="font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          HEALTHY
        </Badge>
      );
    case 'warning':
      return (
        <Badge variant="amber" size="sm" className="font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          ATTENTION NEEDED
        </Badge>
      );
    case 'compromised':
      return (
        <Badge variant="rose" size="sm" className="font-mono animate-pulse">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          COMPROMISED
        </Badge>
      );
    default:
      return (
        <Badge variant="default" size="sm" className="font-mono">
          OFFLINE
        </Badge>
      );
  }
};
