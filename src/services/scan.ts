import { request } from './api';

export interface Scan {
  scan_id: string;
  url: string;
  status: string;
  risk_score: number;
  verdict: string;
  created_at: string;
  demo?: boolean;
  explanation?: string;
}

const DEMO =
  import.meta.env.VITE_DEMO_MODE !== 'false';

export async function startScan(url: string): Promise<Scan> {
  if (!DEMO) {
    return request<Scan>('/scans', {
      method: 'POST',
      body: JSON.stringify({
        url,
        scan_type: 'full'
      })
    });
  }

  // Simulated result for frontend demonstration only.
  const result: Scan = {
    scan_id: `demo_${Date.now()}`,
    url,
    status: 'Completed',
    risk_score: 28,
    verdict: 'Low Risk',
    created_at: new Date().toISOString(),
    demo: true,
    explanation:
      'Simulated result. No live security checks were performed.'
  };

  localStorage.setItem(
    `tg_scan_${result.scan_id}`,
    JSON.stringify(result)
  );

  return result;
}

export async function getScan(id: string): Promise<Scan> {
  if (!DEMO) {
    return request<Scan>(`/scans/${id}/report`);
  }

  const data = localStorage.getItem(`tg_scan_${id}`);

  if (!data) {
    throw new Error('Scan not found');
  }

  return JSON.parse(data);
}

export function getHistory(): Scan[] {
  return Object.keys(localStorage)
    .filter(key => key.startsWith('tg_scan_'))
    .map(key => JSON.parse(
      localStorage.getItem(key)!
    ) as Scan)
    .sort((a, b) =>
      b.created_at.localeCompare(a.created_at)
    );
}
