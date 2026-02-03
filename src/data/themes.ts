import type { ThemeName } from '../types';

export interface ThemeDefinition {
  name: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primaryVibrant: string;
  secondary: string;
  secondaryLight: string;
  secondaryText: string;
  accent: string;
  bg: string;
  bgCard: string;
  text: string;
  textMuted: string;
  textLight: string;
  border: string;
  fresh: string;
  frozen: string;
  dry: string;
  protein: string;
  proteinLight: string;
  proteinText: string;
  proteinBorder: string;
  fiber: string;
  fiberLight: string;
  fiberText: string;
  fiberBorder: string;
  both: string;
  bothLight: string;
  bothText: string;
  bothBorder: string;
  success: string;
  warning: string;
  warningLight: string;
  warningText: string;
  warningBorder: string;
  danger: string;
}

export const themes: Record<ThemeName, ThemeDefinition> = {
  // Coral Sunset - Warm & playful (original favorite)
  'bright-playful': {
    name: 'Coral Sunset',
    primary: '#FF6B6B',
    primaryDark: '#e85555',
    primaryLight: '#ff9999',
    primaryVibrant: '#ff5252',
    secondary: '#4ECDC4',
    secondaryLight: '#e0f7f5',
    secondaryText: '#2a9d8f',
    accent: '#FFE66D',
    bg: '#FFF9F0',
    bgCard: '#ffffff',
    text: '#3d3229',
    textMuted: '#7a6e62',
    textLight: '#a39789',
    border: '#e8e2dc',
    fresh: '#4ECDC4',
    frozen: '#74b9ff',
    dry: '#FFE66D',
    protein: '#4ECDC4',
    proteinLight: '#e0f7f5',
    proteinText: '#2a9d8f',
    proteinBorder: '#a8e6e0',
    fiber: '#95D85F',
    fiberLight: '#f0fbe8',
    fiberText: '#5a9a2e',
    fiberBorder: '#c5e8a8',
    both: '#FF6B6B',
    bothLight: '#ffe8e8',
    bothText: '#d94545',
    bothBorder: '#ffb8b8',
    success: '#4ECDC4',
    warning: '#FFE66D',
    warningLight: '#fff9e6',
    warningText: '#b8860b',
    warningBorder: '#ffe066',
    danger: '#FF6B6B',
  },
  // Deep Ocean - Cool & modern (indigo/cyan palette)
  'modern-bold': {
    name: 'Deep Ocean',
    primary: '#6366F1',
    primaryDark: '#4f46e5',
    primaryLight: '#a5b4fc',
    primaryVibrant: '#818cf8',
    secondary: '#06B6D4',
    secondaryLight: '#e0f7fa',
    secondaryText: '#0891b2',
    accent: '#F472B6',
    bg: '#F8FAFC',
    bgCard: '#ffffff',
    text: '#1e293b',
    textMuted: '#64748b',
    textLight: '#94a3b8',
    border: '#e2e8f0',
    fresh: '#06B6D4',
    frozen: '#6366F1',
    dry: '#F472B6',
    protein: '#06B6D4',
    proteinLight: '#e0f7fa',
    proteinText: '#0891b2',
    proteinBorder: '#67e8f9',
    fiber: '#34D399',
    fiberLight: '#ecfdf5',
    fiberText: '#059669',
    fiberBorder: '#a7f3d0',
    both: '#6366F1',
    bothLight: '#eef2ff',
    bothText: '#4338ca',
    bothBorder: '#c7d2fe',
    success: '#06B6D4',
    warning: '#F472B6',
    warningLight: '#fdf2f8',
    warningText: '#db2777',
    warningBorder: '#fbcfe8',
    danger: '#ef4444',
  },
  // Forest Grove - Natural & fresh (green/purple palette)
  'warm-energetic': {
    name: 'Forest Grove',
    primary: '#22C55E',
    primaryDark: '#16a34a',
    primaryLight: '#86efac',
    primaryVibrant: '#4ade80',
    secondary: '#A855F7',
    secondaryLight: '#f3e8ff',
    secondaryText: '#9333ea',
    accent: '#FBBF24',
    bg: '#F0FDF4',
    bgCard: '#ffffff',
    text: '#14532d',
    textMuted: '#4d7c0f',
    textLight: '#84cc16',
    border: '#d9f99d',
    fresh: '#22C55E',
    frozen: '#A855F7',
    dry: '#FBBF24',
    protein: '#A855F7',
    proteinLight: '#f3e8ff',
    proteinText: '#9333ea',
    proteinBorder: '#d8b4fe',
    fiber: '#22C55E',
    fiberLight: '#f0fdf4',
    fiberText: '#16a34a',
    fiberBorder: '#86efac',
    both: '#FBBF24',
    bothLight: '#fef3c7',
    bothText: '#d97706',
    bothBorder: '#fcd34d',
    success: '#22C55E',
    warning: '#FBBF24',
    warningLight: '#fef3c7',
    warningText: '#d97706',
    warningBorder: '#fcd34d',
    danger: '#ef4444',
  },
  // Midnight Plum - Bold & dramatic (violet/magenta palette)
  'cool-fresh': {
    name: 'Midnight Plum',
    primary: '#8B5CF6',
    primaryDark: '#7c3aed',
    primaryLight: '#c4b5fd',
    primaryVibrant: '#a78bfa',
    secondary: '#EC4899',
    secondaryLight: '#fce7f3',
    secondaryText: '#db2777',
    accent: '#2DD4BF',
    bg: '#FAF5FF',
    bgCard: '#ffffff',
    text: '#2e1065',
    textMuted: '#6b21a8',
    textLight: '#a855f7',
    border: '#e9d5ff',
    fresh: '#2DD4BF',
    frozen: '#8B5CF6',
    dry: '#EC4899',
    protein: '#EC4899',
    proteinLight: '#fce7f3',
    proteinText: '#db2777',
    proteinBorder: '#f9a8d4',
    fiber: '#2DD4BF',
    fiberLight: '#ccfbf1',
    fiberText: '#0d9488',
    fiberBorder: '#5eead4',
    both: '#8B5CF6',
    bothLight: '#ede9fe',
    bothText: '#7c3aed',
    bothBorder: '#c4b5fd',
    success: '#2DD4BF',
    warning: '#EC4899',
    warningLight: '#fce7f3',
    warningText: '#db2777',
    warningBorder: '#f9a8d4',
    danger: '#ef4444',
  },
};

export const themeList: { id: ThemeName; name: string; primary: string; secondary: string; accent: string }[] = [
  { id: 'bright-playful', name: 'Coral Sunset', primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#FFE66D' },
  { id: 'modern-bold', name: 'Deep Ocean', primary: '#6366F1', secondary: '#06B6D4', accent: '#F472B6' },
  { id: 'warm-energetic', name: 'Forest Grove', primary: '#22C55E', secondary: '#A855F7', accent: '#FBBF24' },
  { id: 'cool-fresh', name: 'Midnight Plum', primary: '#8B5CF6', secondary: '#EC4899', accent: '#2DD4BF' },
];
