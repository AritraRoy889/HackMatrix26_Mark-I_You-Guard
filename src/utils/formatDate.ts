export function formatDate ( dateString: string | Date ): string
{
  try
  {
    const d = new Date( dateString );
    if ( isNaN( d.getTime() ) ) return 'Invalid date';
    return d.toLocaleDateString( 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    } );
  } catch
  {
    return String( dateString );
  }
}

export function formatTimeAgo ( dateString: string | Date ): string
{
  try
  {
    const d = new Date( dateString );
    const now = new Date();
    const diffSec = Math.floor( ( now.getTime() - d.getTime() ) / 1000 );

    if ( diffSec < 60 ) return `${ diffSec }s ago`;
    const diffMin = Math.floor( diffSec / 60 );
    if ( diffMin < 60 ) return `${ diffMin }m ago`;
    const diffHour = Math.floor( diffMin / 60 );
    if ( diffHour < 24 ) return `${ diffHour }h ago`;
    const diffDays = Math.floor( diffHour / 24 );
    if ( diffDays < 30 ) return `${ diffDays }d ago`;
    return d.toLocaleDateString();
  } catch
  {
    return 'recently';
  }
}
