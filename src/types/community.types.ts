import { RiskLevel } from './scan.types';

export interface CommunityReport
{
  id: string;
  target: string;
  threatType: string;
  riskLevel: RiskLevel;
  description: string;
  evidenceUrl?: string;
  reportedBy: string;
  reporterReputation: number;
  reportedAt: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  status: 'pending_review' | 'verified_threat' | 'false_positive' | 'resolved';
  commentsCount: number;
  tags: string[];
}
