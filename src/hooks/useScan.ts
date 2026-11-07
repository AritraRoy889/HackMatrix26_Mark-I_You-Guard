import { useScanStore } from '../store/scan.store';

export function useScan() {
  const {
    currentScan,
    history,
    isScanning,
    scanProgress,
    currentStepMessage,
    selectedOptions,
    presets,
    activePresetId,
    setScanOptions,
    applyPreset,
    startScan,
    cancelScan,
    getScanById,
  } = useScanStore();

  return {
    currentScan,
    history,
    isScanning,
    scanProgress,
    currentStepMessage,
    selectedOptions,
    presets,
    activePresetId,
    setScanOptions,
    applyPreset,
    startScan,
    cancelScan,
    getScanById,
  };
}
