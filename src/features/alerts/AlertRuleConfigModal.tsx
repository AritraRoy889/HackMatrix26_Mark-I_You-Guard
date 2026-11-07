import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { BellRing, ShieldAlert, Mail, Send } from 'lucide-react';

export interface AlertRuleConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRule: (rule: any) => void;
}

export const AlertRuleConfigModal: React.FC<AlertRuleConfigModalProps> = ({
  isOpen,
  onClose,
  onSaveRule,
}) => {
  const [ruleName, setRuleName] = useState('Critical Risk Domain Notification');
  const [thresholdScore, setThresholdScore] = useState(70);
  const [channels, setChannels] = useState({ email: true, inApp: true, webhook: false });
  const [webhookUrl, setWebhookUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveRule({
      ruleName,
      thresholdScore,
      channels,
      webhookUrl,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configure Adaptive Alert Policy"
      description="Define threat trigger conditions and dispatch incident webhooks to your team."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-xs">
        <Input
          label="Rule Descriptor"
          type="text"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          placeholder="e.g. Production Subdomains Security Alert"
          required
        />

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="font-medium text-slate-300">
              Risk Score Trigger Threshold (&gt;= {thresholdScore})
            </label>
            <span className="font-mono text-cyan-400 font-bold">{thresholdScore}/100</span>
          </div>
          <input
            type="range"
            min={10}
            max={95}
            value={thresholdScore}
            onChange={(e) => setThresholdScore(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>Low (10)</span>
            <span>Suspicious (40)</span>
            <span>Malicious (70)</span>
            <span>Critical (90)</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <label className="font-semibold text-slate-300 block uppercase font-mono text-[10px]">
            Notification Dispatch Channels
          </label>

          <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={channels.email}
              onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-cyan-500"
            />
            <Mail className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-200">Emergency Email Dispatch</span>
          </label>

          <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={channels.inApp}
              onChange={(e) => setChannels({ ...channels, inApp: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-cyan-500"
            />
            <BellRing className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-200">Real-Time In-App Alert Ticker</span>
          </label>
        </div>

        <Input
          label="Slack / PagerDuty / SOC Webhook (Optional)"
          type="url"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          placeholder="https://hooks.slack.com/services/..."
        />

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="cyber" size="sm" type="submit">
            Save Alert Policy
          </Button>
        </div>
      </form>
    </Modal>
  );
};
