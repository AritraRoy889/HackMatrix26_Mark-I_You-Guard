import { ScanResult, ScanOptions } from '../types/scan.types';
import { INITIAL_MOCK_SCANS } from '../mocks/mockScans';

export const scanService = {
  triggerScan: async (target: string, options?: Partial<ScanOptions>): Promise<ScanResult> => {
    // In mock mode, this delegates through the store or returns pre-computed scan
    const found = INITIAL_MOCK_SCANS.find((s) => s.target.toLowerCase() === target.toLowerCase());
    if (found) return found;
    return INITIAL_MOCK_SCANS[0];
  },

  getRecentScans: async (): Promise<ScanResult[]> => {
    return INITIAL_MOCK_SCANS;
  },

  getScanDetails: async (id: string): Promise<ScanResult | null> => {
    return INITIAL_MOCK_SCANS.find((s) => s.id === id) || null;
  },
};
