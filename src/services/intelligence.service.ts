import { ThreatFeedItem, VulnerabilityCve } from '../types/threat.types';
import { MOCK_THREAT_FEED, MOCK_CVES } from '../mocks/mockThreats';

export const intelligenceService = {
  getThreatFeed: async (): Promise<ThreatFeedItem[]> => {
    return MOCK_THREAT_FEED;
  },

  getCves: async (): Promise<VulnerabilityCve[]> => {
    return MOCK_CVES;
  },

  searchIndicators: async (query: string): Promise<ThreatFeedItem[]> => {
    if (!query) return MOCK_THREAT_FEED;
    const q = query.toLowerCase();
    return MOCK_THREAT_FEED.filter(
      (item) =>
        item.indicator.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        (item.targetedBrand && item.targetedBrand.toLowerCase().includes(q))
    );
  },
};
