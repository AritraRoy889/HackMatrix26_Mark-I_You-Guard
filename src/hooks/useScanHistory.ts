import { useScanStore } from '../store/scan.store';

export function useScanHistory() {
  const { history, deleteHistoryItem, clearHistory } = useScanStore();

  return {
    history,
    deleteHistoryItem,
    clearHistory,
    totalScans: history.length,
    threatsDetectedCount: history.filter((h) => h.riskScore >= 40).length,
    safeCount: history.filter((h) => h.riskScore < 15).length,
  };
}

