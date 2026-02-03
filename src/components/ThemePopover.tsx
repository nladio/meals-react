import { useEffect, useRef } from 'react';
import type { ThemeName } from '../types';
import { themeList } from '../data/themes';

interface ThemePopoverProps {
  isOpen: boolean;
  currentTheme: ThemeName;
  onSelectTheme: (theme: ThemeName) => void;
  onClose: () => void;
}

export function ThemePopover({ isOpen, currentTheme, onSelectTheme, onClose }: ThemePopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute bottom-full mb-2 right-0 bg-white rounded-xl shadow-lg border border-gray-200 p-3 animate-scale-in"
    >
      <div className="flex gap-2">
        {themeList.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme.id)}
            className="relative w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95"
            style={{ backgroundColor: theme.color }}
            aria-label={theme.name}
            title={theme.name}
          >
            {currentTheme === theme.id && (
              <span className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-gray-800" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
