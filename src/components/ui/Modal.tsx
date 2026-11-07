import React, { useEffect } from 'react';
import { cn } from '../../utils/helpers';
import { X } from 'lucide-react';

export interface ModalProps
{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ( {
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth,
  size,
} ) =>
{
  const resolvedMaxWidth = maxWidth || size || 'lg';
  useEffect( () =>
  {
    const handleKeyDown = ( e: KeyboardEvent ) =>
    {
      if ( e.key === 'Escape' ) onClose();
    };
    if ( isOpen )
    {
      document.body.style.overflow = 'hidden';
      window.addEventListener( 'keydown', handleKeyDown );
    }
    return () =>
    {
      document.body.style.overflow = 'unset';
      window.removeEventListener( 'keydown', handleKeyDown );
    };
  }, [ isOpen, onClose ] );

  if ( !isOpen ) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */ }
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={ onClose }
      />

      {/* Modal Dialog */ }
      <div
        className={ cn(
          'relative w-full rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 text-slate-100 z-10 overflow-hidden max-h-[90vh] flex flex-col',
          maxWidths[ resolvedMaxWidth ]
        ) }
      >
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            { title && <h3 className="text-lg font-semibold text-white">{ title }</h3> }
            { description && <p className="text-xs text-slate-400 mt-1">{ description }</p> }
          </div>
          <button
            onClick={ onClose }
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 overflow-y-auto flex-1 pr-1">{ children }</div>
      </div>
    </div>
  );
};
