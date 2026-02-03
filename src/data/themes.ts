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
  'bright-playful': {
    name: 'Bright & Playful',
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
  'modern-bold': {
    name: 'Modern & Bold',
    primary: '#E91E63',
    primaryDark: '#c2185b',
    primaryLight: '#f48fb1',
    primaryVibrant: '#ff1744',
    secondary: '#00BCD4',
    secondaryLight: '#e0f7fa',
    secondaryText: '#00838f',
    accent: '#FFC107',
    bg: '#FAFAFA',
    bgCard: '#ffffff',
    text: '#212121',
    textMuted: '#757575',
    textLight: '#9e9e9e',
    border: '#e0e0e0',
    fresh: '#00BCD4',
    frozen: '#7c4dff',
    dry: '#FFC107',
    protein: '#00BCD4',
    proteinLight: '#e0f7fa',
    proteinText: '#00838f',
    proteinBorder: '#80deea',
    fiber: '#8BC34A',
    fiberLight: '#f1f8e9',
    fiberText: '#558b2f',
    fiberBorder: '#c5e1a5',
    both: '#E91E63',
    bothLight: '#fce4ec',
    bothText: '#ad1457',
    bothBorder: '#f48fb1',
    success: '#4CAF50',
    warning: '#FFC107',
    warningLight: '#fff8e1',
    warningText: '#ff8f00',
    warningBorder: '#ffe082',
    danger: '#f44336',
  },
  'warm-energetic': {
    name: 'Warm & Energetic',
    primary: '#FF5722',
    primaryDark: '#e64a19',
    primaryLight: '#ff8a65',
    primaryVibrant: '#ff3d00',
    secondary: '#009688',
    secondaryLight: '#e0f2f1',
    secondaryText: '#00695c',
    accent: '#FFEB3B',
    bg: '#FFF8E1',
    bgCard: '#ffffff',
    text: '#3e2723',
    textMuted: '#6d4c41',
    textLight: '#a1887f',
    border: '#d7ccc8',
    fresh: '#009688',
    frozen: '#5c6bc0',
    dry: '#FFEB3B',
    protein: '#009688',
    proteinLight: '#e0f2f1',
    proteinText: '#00695c',
    proteinBorder: '#80cbc4',
    fiber: '#7CB342',
    fiberLight: '#f1f8e9',
    fiberText: '#558b2f',
    fiberBorder: '#aed581',
    both: '#FF5722',
    bothLight: '#fbe9e7',
    bothText: '#d84315',
    bothBorder: '#ffab91',
    success: '#009688',
    warning: '#FFEB3B',
    warningLight: '#fffde7',
    warningText: '#f57f17',
    warningBorder: '#fff176',
    danger: '#FF5722',
  },
  'cool-fresh': {
    name: 'Cool & Fresh',
    primary: '#0EA5E9',
    primaryDark: '#0284c7',
    primaryLight: '#7dd3fc',
    primaryVibrant: '#0ea5e9',
    secondary: '#10B981',
    secondaryLight: '#ecfdf5',
    secondaryText: '#047857',
    accent: '#F59E0B',
    bg: '#F0F9FF',
    bgCard: '#ffffff',
    text: '#0f172a',
    textMuted: '#64748b',
    textLight: '#94a3b8',
    border: '#e2e8f0',
    fresh: '#10B981',
    frozen: '#8b5cf6',
    dry: '#F59E0B',
    protein: '#10B981',
    proteinLight: '#ecfdf5',
    proteinText: '#047857',
    proteinBorder: '#6ee7b7',
    fiber: '#84cc16',
    fiberLight: '#f7fee7',
    fiberText: '#4d7c0f',
    fiberBorder: '#bef264',
    both: '#0EA5E9',
    bothLight: '#e0f2fe',
    bothText: '#0369a1',
    bothBorder: '#7dd3fc',
    success: '#10B981',
    warning: '#F59E0B',
    warningLight: '#fef3c7',
    warningText: '#d97706',
    warningBorder: '#fcd34d',
    danger: '#ef4444',
  },
};

export const themeList: { id: ThemeName; name: string; primary: string; secondary: string; accent: string }[] = [
  { id: 'bright-playful', name: 'Bright & Playful', primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#FFE66D' },
  { id: 'modern-bold', name: 'Modern & Bold', primary: '#E91E63', secondary: '#00BCD4', accent: '#FFC107' },
  { id: 'warm-energetic', name: 'Warm & Energetic', primary: '#FF5722', secondary: '#009688', accent: '#FFEB3B' },
  { id: 'cool-fresh', name: 'Cool & Fresh', primary: '#0EA5E9', secondary: '#10B981', accent: '#F59E0B' },
];
