import type { FontName } from '../types';

export interface FontDefinition {
  name: string;
  sansFont: string;
  displayFont: string;
}

export const fonts: Record<FontName, FontDefinition> = {
  // Playful Pop - Bubbly, kid-friendly
  'quirky-fun': {
    name: 'Playful Pop',
    sansFont: 'Quicksand, sans-serif',
    displayFont: 'Fredoka, sans-serif',
  },
  // Clean Geometric - Professional, clean
  'clean-modern': {
    name: 'Clean Geometric',
    sansFont: 'Source Sans 3, sans-serif',
    displayFont: 'Source Sans 3, sans-serif',
  },
  // Classic Serif - Traditional, elegant
  'classic-elegant': {
    name: 'Classic Serif',
    sansFont: 'Lora, serif',
    displayFont: 'Playfair Display, serif',
  },
  // Soft Artisan - Warm, contemporary, craft
  'rounded-friendly': {
    name: 'Soft Artisan',
    sansFont: 'Nunito, sans-serif',
    displayFont: 'Fraunces, serif',
  },
};

export const fontList: { id: FontName; name: string; sansFont: string; displayFont: string }[] = [
  { id: 'quirky-fun', name: 'Playful Pop', sansFont: 'Quicksand, sans-serif', displayFont: 'Fredoka, sans-serif' },
  { id: 'clean-modern', name: 'Clean Geometric', sansFont: 'Source Sans 3, sans-serif', displayFont: 'Source Sans 3, sans-serif' },
  { id: 'classic-elegant', name: 'Classic Serif', sansFont: 'Lora, serif', displayFont: 'Playfair Display, serif' },
  { id: 'rounded-friendly', name: 'Soft Artisan', sansFont: 'Nunito, sans-serif', displayFont: 'Fraunces, serif' },
];
