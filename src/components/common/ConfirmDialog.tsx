import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertCircle } from 'lucide-react';

export interface ConfirmDialogProps
{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ( {
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm Action',
  cancelText = 'Cancel',
  isDestructive = false,
} ) =>
{
  return (
    <Modal isOpen={ isOpen } onClose={ onClose } maxWidth="sm">
      <div className="flex flex-col items-center text-center p-2">
        <div
          className={ `p-3 rounded-full mb-3 border ${ isDestructive
              ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
              : 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
            }` }
        >
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-white mb-1.5">{ title }</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">{ message }</p>
        <div className="flex w-full gap-3">
          <Button
            variant="ghost"
            className="flex-1"
            size="sm"
            onClick={ onClose }
          >
            { cancelText }
          </Button>
          <Button
            variant={ isDestructive ? 'danger' : 'primary' }
            className="flex-1"
            size="sm"
            onClick={ () =>
            {
              onConfirm();
              onClose();
            } }
          >
            { confirmText }
          </Button>
        </div>
      </div>
    </Modal>
  );
};
