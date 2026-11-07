import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface FaqItem
{
  question: string;
  answer: string;
}

export const FaqAccordion: React.FC = () =>
{
  const [ openIdx, setOpenIdx ] = useState<number | null>( 0 );

  const faqs: FaqItem[] = [
    {
      question: 'How does You Guard evaluate threat reputation without alerting attackers?',
      answer:
        'You Guard utilizes distributed passive DNS lookups, TLS fingerprint inspection, and headless browser scraping from rotating residential proxies. This prevents target evasion kits from identifying active security crawlers.',
    },
    {
      question: 'Which blacklist engines are integrated into the multi-vendor scan?',
      answer:
        'We query Google Safe Browsing, VirusTotal Threat Core, Cisco Talos, Spamhaus ZEN, URLhaus, PhishTank, Cloudflare Radar, and our proprietary neural deep-learning classifier in parallel.',
    },
    {
      question: 'What is the frequency of the automated Watchlist monitoring?',
      answer:
        'Depending on your tier and configuration, monitored hosts can be checked hourly, daily, or weekly. Alerts are dispatched instantly whenever a risk score crosses your specified policy threshold.',
    },
    {
      question: 'Can I integrate You Guard alerts directly into Slack or PagerDuty?',
      answer:
        'Yes. Under Platform Settings > Alert Rules, you can provide any valid incoming webhook URL to receive JSON payloads with full IOC data, score delta, and direct investigation links.',
    },
  ];

  return (
    <Card className="bg-slate-900/70 border-slate-800 p-6 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
        <HelpCircle className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white">Frequently Addressed Questions</h3>
      </div>

      <div className="space-y-2">
        { faqs.map( ( faq, idx ) =>
        {
          const isOpen = openIdx === idx;
          return (
            <div
              key={ idx }
              className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40"
            >
              <button
                type="button"
                onClick={ () => setOpenIdx( isOpen ? null : idx ) }
                className="w-full flex items-center justify-between p-4 text-left text-xs font-semibold text-white hover:bg-slate-800/30 transition-colors"
              >
                <span>{ faq.question }</span>
                <ChevronDown
                  className={ cn( 'w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2', isOpen && 'rotate-180' ) }
                />
              </button>
              { isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                  { faq.answer }
                </div>
              ) }
            </div>
          );
        } ) }
      </div>
    </Card>
  );
};
