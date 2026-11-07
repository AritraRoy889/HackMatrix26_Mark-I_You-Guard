import { CommunityReport } from '../types/community.types';

const INITIAL_REPORTS: CommunityReport[] = [
  {
    id: 'rep-001',
    target: 'https://steamcommunnity.ru-trade-drop.com/login',
    threatType: 'Phishing',
    riskLevel: 'critical',
    description: 'Fake Steam OpenID authentication pop-up stealing Steam Guard Mobile Authenticator codes.',
    evidenceUrl: 'https://steamcommunnity.ru-trade-drop.com',
    reportedBy: 'GhostRider_Sec',
    reporterReputation: 450,
    reportedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    upvotes: 24,
    downvotes: 1,
    userVote: null,
    status: 'verified_threat',
    commentsCount: 6,
    tags: ['steam', 'gaming-phish', 'mfa-theft'],
  },
  {
    id: 'rep-002',
    target: 'http://usps-tracking-package-redelivery.top/post',
    threatType: 'SMS Smishing',
    riskLevel: 'critical',
    description: 'Received SMS about missed package delivery. Prompts for $0.30 redelivery charge to steal credit card info.',
    reportedBy: 'Analyst_Sara',
    reporterReputation: 1280,
    reportedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    upvotes: 42,
    downvotes: 0,
    userVote: 'up',
    status: 'verified_threat',
    commentsCount: 14,
    tags: ['usps', 'smishing', 'credit-card-theft'],
  },
  {
    id: 'rep-003',
    target: 'https://netflix-subscription-hold-resolve.com',
    threatType: 'Credential Phish',
    riskLevel: 'malicious',
    description: 'Phishing email with subject "Account suspended". Mirrors Netflix login form exactly.',
    reportedBy: 'HexByte',
    reporterReputation: 89,
    reportedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    upvotes: 15,
    downvotes: 2,
    userVote: null,
    status: 'pending_review',
    commentsCount: 3,
    tags: ['netflix', 'subscription-scam'],
  },
];

const STORAGE_KEY = 'youguard_community_reports';

export const communityService = {
  getReports: async (): Promise<CommunityReport[]> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  },

  submitReport: async (reportData: Omit<CommunityReport, 'id' | 'reportedAt' | 'upvotes' | 'downvotes' | 'status' | 'commentsCount'>): Promise<CommunityReport> => {
    const current = await communityService.getReports();
    const newReport: CommunityReport = {
      ...reportData,
      id: `rep-${Date.now().toString(36)}`,
      reportedAt: new Date().toISOString(),
      upvotes: 1,
      downvotes: 0,
      userVote: 'up',
      status: 'pending_review',
      commentsCount: 0,
    };
    const updated = [newReport, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newReport;
  },

  voteReport: async (id: string, voteType: 'up' | 'down'): Promise<CommunityReport[]> => {
    const current = await communityService.getReports();
    const updated = current.map((r) => {
      if (r.id !== id) return r;
      if (r.userVote === voteType) {
        // Toggle off
        return {
          ...r,
          upvotes: voteType === 'up' ? r.upvotes - 1 : r.upvotes,
          downvotes: voteType === 'down' ? r.downvotes - 1 : r.downvotes,
          userVote: null,
        };
      }
      return {
        ...r,
        upvotes: voteType === 'up' ? (r.userVote === 'down' ? r.upvotes + 1 : r.upvotes + 1) : (r.userVote === 'up' ? r.upvotes - 1 : r.upvotes),
        downvotes: voteType === 'down' ? (r.userVote === 'up' ? r.downvotes + 1 : r.downvotes + 1) : (r.userVote === 'down' ? r.downvotes - 1 : r.downvotes),
        userVote: voteType,
      };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },
};
