import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/helpers';
import { ChevronDown } from 'lucide-react';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  onChange,
  placeholder = 'Select option',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((i) => i.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn('relative inline-block w-full', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2 text-sm text-slate-100 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
      >
        <span className="flex items-center gap-2 truncate">
          {selectedItem?.icon}
          {selectedItem ? selectedItem.label : <span className="text-slate-500">{placeholder}</span>}
        </span>
        <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-full bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-30 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.value}
              disabled={item.disabled}
              type="button"
              onClick={() => {
                onChange(item.value);
                setIsOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-2 px-3.5 py-2 text-xs text-left transition-colors',
                item.value === value
                  ? 'bg-cyan-500/15 text-cyan-300 font-medium'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                item.disabled && 'opacity-40 cursor-not-allowed'
              )}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
