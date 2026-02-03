import { useEffect, useRef } from 'react';
import type { ThemeName, FontName } from '../types';
import { themeList } from '../data/themes';
import { fontList } from '../data/fonts';

interface ThemePopoverProps {
  isOpen: boolean;
  currentTheme: ThemeName;
  currentFont: FontName;
  onSelectTheme: (theme: ThemeName) => void;
  onSelectFont: (font: FontName) => void;
  onClose: () => void;
}

export function ThemePopover({ isOpen, currentTheme, currentFont, onSelectTheme, onSelectFont, onClose }: ThemePopoverProps) {
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
      {/* Color themes */}
      <div className="flex gap-3 justify-center">
        {themeList.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme.id)}
            className="relative w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95"
            style={{
              background: `conic-gradient(
                ${theme.primary} 0deg 120deg,
                ${theme.secondary} 120deg 240deg,
                ${theme.accent} 240deg 360deg
              )`,
            }}
            aria-label={theme.name}
            title={theme.name}
          >
            {currentTheme === theme.id && (
              <span className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-gray-800" />
            )}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3" />

      {/* Font selection */}
      <div className="flex flex-col gap-1.5">
        {fontList.map((font) => (
          <button
            key={font.id}
            onClick={() => onSelectFont(font.id)}
            className={`relative px-3 py-1.5 rounded-lg text-sm text-left transition-all hover:bg-gray-100 active:scale-98 ${
              currentFont === font.id ? 'bg-gray-100 ring-2 ring-gray-800 ring-offset-1' : ''
            }`}
            style={{ fontFamily: font.displayFont }}
            aria-label={font.name}
          >
            {font.name}
          </button>
        ))}
      </div>
    </div>
  );
}
