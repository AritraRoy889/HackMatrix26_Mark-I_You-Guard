import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

export interface UpvoteButtonProps {
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  onVote: (type: 'up' | 'down') => void;
}

export const UpvoteButton: React.FC<UpvoteButtonProps> = ({
  upvotes,
  downvotes,
  userVote,
  onVote,
}) => {
  const score = upvotes - downvotes;

  return (
    <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1 font-mono text-xs">
      <button
        onClick={() => onVote('up')}
        className={cn(
          'p-1 rounded hover:bg-slate-800 transition-colors',
          userVote === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400'
        )}
        title="Verify / Upvote threat report"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      <span
        className={cn(
          'px-1.5 font-bold',
          score > 0 ? 'text-emerald-400' : score < 0 ? 'text-rose-400' : 'text-slate-400'
        )}
      >
        {score > 0 ? `+${score}` : score}
      </span>

      <button
        onClick={() => onVote('down')}
        className={cn(
          'p-1 rounded hover:bg-slate-800 transition-colors',
          userVote === 'down' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400'
        )}
        title="Dispute / Mark false positive"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
};
