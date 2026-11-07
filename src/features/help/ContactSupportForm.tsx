import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, MessageSquare, Send, Check } from 'lucide-react';

export const ContactSupportForm: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setSubject('');
    setMessage('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
        <MessageSquare className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white">Contact Security Operations Support</h3>
      </div>

      {sent && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Support dispatch ticket created. An engineer will follow up via email.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input
          label="Inquiry Topic or Ticket Subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. False positive dispute for domain.com"
          required
        />

        <div>
          <label className="block font-medium text-slate-300 mb-1.5">
            Detailed Query or Incident Description
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Include IOC details, scan ID, or technical request..."
            rows={4}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            required
          />
        </div>

        <Button
          type="submit"
          variant="cyber"
          size="sm"
          rightIcon={<Send className="w-3.5 h-3.5" />}
        >
          Submit Ticket
        </Button>
      </form>
    </Card>
  );
};
