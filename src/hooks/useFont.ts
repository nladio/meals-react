import { useEffect } from 'react';
import type { FontName } from '../types';
import { fonts } from '../data/fonts';

export function applyFont(fontName: FontName): void {
  const font = fonts[fontName];
  const root = document.documentElement;

  root.style.setProperty('--font-sans', font.sansFont);
  root.style.setProperty('--font-display', font.displayFont);
}

export function useFont(fontName: FontName): void {
  useEffect(() => {
    applyFont(fontName);
  }, [fontName]);
}
