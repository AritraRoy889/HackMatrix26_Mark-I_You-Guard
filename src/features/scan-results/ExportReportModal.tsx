import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { ScanResult } from '../../types/scan.types';
import { downloadJsonFile, copyToClipboard } from '../../utils/helpers';
import { FileJson, FileText, Check, Copy, Download } from 'lucide-react';

export interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  scan: ScanResult;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  scan,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyJson = async () => {
    await copyToClipboard(JSON.stringify(scan, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    downloadJsonFile(scan, `YouGuard_Audit_${scan.domain}_${Date.now()}.json`);
    onClose();
  };

  const handlePrintPdf = () => {
    window.print();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Security Audit Report"
      description="Download compliance-ready telemetry in structured JSON or print-ready format."
      maxWidth="md"
    >
      <div className="space-y-4 pt-2">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">TARGET:</span>
            <span className="text-white truncate max-w-[200px]">{scan.target}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">AUDIT SCORE:</span>
            <span className="text-cyan-400 font-bold">{scan.riskScore}/100 ({scan.riskLevel})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">DATE:</span>
            <span className="text-slate-400">{scan.scanDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            onClick={handleDownloadJson}
            leftIcon={<Download className="w-4 h-4 text-cyan-400" />}
            className="w-full text-xs"
          >
            Download JSON
          </Button>

          <Button
            variant="secondary"
            onClick={handleCopyJson}
            leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            className="w-full text-xs"
          >
            {copied ? 'Copied to Clipboard' : 'Copy JSON'}
          </Button>
        </div>

        <Button
          variant="cyber"
          onClick={handlePrintPdf}
          leftIcon={<FileText className="w-4 h-4" />}
          className="w-full text-xs"
        >
          Print / Save PDF Report
        </Button>
      </div>
    </Modal>
  );
};
