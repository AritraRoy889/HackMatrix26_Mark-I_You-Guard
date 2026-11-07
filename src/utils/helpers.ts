import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn ( ...inputs: ClassValue[] )
{
  return twMerge( clsx( inputs ) );
}

export function generateRandomId ( prefix = 'id' ): string
{
  return `${ prefix }-${ Math.random().toString( 36 ).substring( 2, 9 ) }-${ Date.now().toString( 36 ) }`;
}

export function downloadJsonFile ( data: unknown, filename: string )
{
  const blob = new Blob( [ JSON.stringify( data, null, 2 ) ], { type: 'application/json' } );
  const url = URL.createObjectURL( blob );
  const a = document.createElement( 'a' );
  a.href = url;
  a.download = filename;
  document.body.appendChild( a );
  a.click();
  document.body.removeChild( a );
  URL.revokeObjectURL( url );
}

export function copyToClipboard ( text: string ): Promise<boolean>
{
  if ( navigator.clipboard && window.isSecureContext )
  {
    return navigator.clipboard.writeText( text ).then( () => true ).catch( () => false );
  }
  const textArea = document.createElement( 'textarea' );
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild( textArea );
  textArea.focus();
  textArea.select();
  const successful = document.execCommand( 'copy' );
  document.body.removeChild( textArea );
  return Promise.resolve( successful );
}
