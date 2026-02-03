import { useEffect } from 'react';
import type { ThemeName } from '../types';
import { themes } from '../data/themes';

export function applyTheme(themeName: ThemeName): void {
  const theme = themes[themeName];
  const root = document.documentElement;

  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-primary-dark', theme.primaryDark);
  root.style.setProperty('--color-primary-light', theme.primaryLight);
  root.style.setProperty('--color-primary-vibrant', theme.primaryVibrant);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-secondary-light', theme.secondaryLight);
  root.style.setProperty('--color-secondary-text', theme.secondaryText);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-bg', theme.bg);
  root.style.setProperty('--color-bg-card', theme.bgCard);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-text-muted', theme.textMuted);
  root.style.setProperty('--color-text-light', theme.textLight);
  root.style.setProperty('--color-border', theme.border);
  root.style.setProperty('--color-fresh', theme.fresh);
  root.style.setProperty('--color-frozen', theme.frozen);
  root.style.setProperty('--color-dry', theme.dry);
  root.style.setProperty('--color-protein', theme.protein);
  root.style.setProperty('--color-protein-light', theme.proteinLight);
  root.style.setProperty('--color-protein-text', theme.proteinText);
  root.style.setProperty('--color-protein-border', theme.proteinBorder);
  root.style.setProperty('--color-fiber', theme.fiber);
  root.style.setProperty('--color-fiber-light', theme.fiberLight);
  root.style.setProperty('--color-fiber-text', theme.fiberText);
  root.style.setProperty('--color-fiber-border', theme.fiberBorder);
  root.style.setProperty('--color-both', theme.both);
  root.style.setProperty('--color-both-light', theme.bothLight);
  root.style.setProperty('--color-both-text', theme.bothText);
  root.style.setProperty('--color-both-border', theme.bothBorder);
  root.style.setProperty('--color-success', theme.success);
  root.style.setProperty('--color-warning', theme.warning);
  root.style.setProperty('--color-warning-light', theme.warningLight);
  root.style.setProperty('--color-warning-text', theme.warningText);
  root.style.setProperty('--color-warning-border', theme.warningBorder);
  root.style.setProperty('--color-danger', theme.danger);
}

export function useTheme(themeName: ThemeName): void {
  useEffect(() => {
    applyTheme(themeName);
  }, [themeName]);
}
