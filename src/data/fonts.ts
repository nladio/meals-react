import type { FontName } from '../types';

export interface FontDefinition {
  name: string;
  sansFont: string;
  displayFont: string;
}

export const fonts: Record<FontName, FontDefinition> = {
  'quirky-fun': {
    name: 'Quirky & Fun',
    sansFont: 'Quicksand, sans-serif',
    displayFont: 'Fredoka, sans-serif',
  },
  'clean-modern': {
    name: 'Clean & Modern',
    sansFont: 'Inter, sans-serif',
    displayFont: 'Inter, sans-serif',
  },
  'classic-elegant': {
    name: 'Classic & Elegant',
    sansFont: 'Lora, serif',
    displayFont: 'Playfair Display, serif',
  },
  'rounded-friendly': {
    name: 'Rounded & Friendly',
    sansFont: 'Nunito, sans-serif',
    displayFont: 'Nunito, sans-serif',
  },
};

export const fontList: { id: FontName; name: string; sansFont: string; displayFont: string }[] = [
  { id: 'quirky-fun', name: 'Quirky & Fun', sansFont: 'Quicksand, sans-serif', displayFont: 'Fredoka, sans-serif' },
  { id: 'clean-modern', name: 'Clean & Modern', sansFont: 'Inter, sans-serif', displayFont: 'Inter, sans-serif' },
  { id: 'classic-elegant', name: 'Classic & Elegant', sansFont: 'Lora, serif', displayFont: 'Playfair Display, serif' },
  { id: 'rounded-friendly', name: 'Rounded & Friendly', sansFont: 'Nunito, sans-serif', displayFont: 'Nunito, sans-serif' },
];
