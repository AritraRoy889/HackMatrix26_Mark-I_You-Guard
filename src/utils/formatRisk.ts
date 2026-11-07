import { RiskLevel } from '../types/scan.types';

export function calculateRiskLevel(score: number): RiskLevel {
  if (score < 15) return 'safe';
  if (score < 40) return 'low';
  if (score < 70) return 'suspicious';
  if (score < 90) return 'malicious';
  return 'critical';
}

export function getRiskColorClass(level: RiskLevel): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  glow: string;
} {
  switch (level) {
    case 'safe':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
      };
    case 'low':
      return {
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
        glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
      };
    case 'suspicious':
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
      };
    case 'malicious':
      return {
        bg: 'bg-rose-500/10',
        text: 'text-rose-400',
        border: 'border-rose-500/30',
        badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
        glow: 'shadow-[0_0_20px_rgba(244,63,94,0.35)]',
      };
    case 'critical':
      return {
        bg: 'bg-red-600/20',
        text: 'text-red-400',
        border: 'border-red-500/50',
        badge: 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse',
        glow: 'shadow-[0_0_30px_rgba(239,68,68,0.5)]',
      };
    default:
      return {
        bg: 'bg-slate-500/10',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        badge: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
        glow: '',
      };
  }
}
