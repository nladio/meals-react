/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Reference CSS variables for consistency with @theme block
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        warning: {
          DEFAULT: 'var(--color-warning)',
          light: 'var(--color-warning-light)',
          text: 'var(--color-warning-text)',
          border: 'var(--color-warning-border)',
        },
        danger: 'var(--color-danger)',
        // Category colors
        fresh: 'var(--color-fresh)',
        frozen: 'var(--color-frozen)',
        dry: 'var(--color-dry)',
        // Nutrition colors
        protein: {
          DEFAULT: 'var(--color-protein)',
          light: 'var(--color-protein-light)',
          text: 'var(--color-protein-text)',
          border: 'var(--color-protein-border)',
        },
        fiber: {
          DEFAULT: 'var(--color-fiber)',
          light: 'var(--color-fiber-light)',
          text: 'var(--color-fiber-text)',
          border: 'var(--color-fiber-border)',
        },
        both: {
          DEFAULT: 'var(--color-both)',
          light: 'var(--color-both-light)',
          text: 'var(--color-both-text)',
          border: 'var(--color-both-border)',
        },
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
      },
    },
  },
  plugins: [],
};
