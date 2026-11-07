import { ScanResult } from '../types/scan.types';

export const historyService = {
  getScanHistory: (): ScanResult[] =>
  {
    try
    {
      const raw = localStorage.getItem( 'youguard_scan_history' );
      return raw ? JSON.parse( raw ) : [];
    } catch
    {
      return [];
    }
  },

  deleteScan: ( id: string ): void =>
  {
    try
    {
      const raw = localStorage.getItem( 'youguard_scan_history' );
      if ( raw )
      {
        const parsed: ScanResult[] = JSON.parse( raw );
        const filtered = parsed.filter( ( s ) => s.id !== id );
        localStorage.setItem( 'youguard_scan_history', JSON.stringify( filtered ) );
      }
    } catch
    {
      // ignore
    }
  },

  exportHistoryCsv: ( scans: ScanResult[] ): void =>
  {
    const headers = [ 'ID', 'Target', 'Domain', 'Risk Score', 'Risk Level', 'Scan Date', 'Duration (ms)' ];
    const rows = scans.map( ( s ) => [
      s.id,
      `"${ s.target.replace( /"/g, '""' ) }"`,
      s.domain,
      s.riskScore,
      s.riskLevel,
      s.scanDate,
      s.durationMs,
    ] );
    const csvContent = [ headers.join( ',' ), ...rows.map( ( e ) => e.join( ',' ) ) ].join( '\n' );
    const blob = new Blob( [ csvContent ], { type: 'text/csv;charset=utf-8;' } );
    const link = document.createElement( 'a' );
    link.href = URL.createObjectURL( blob );
    link.setAttribute( 'download', `youguard_scan_history_${ Date.now() }.csv` );
    document.body.appendChild( link );
    link.click();
    document.body.removeChild( link );
  },
};
