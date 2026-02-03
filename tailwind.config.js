/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#FF6B6B', dark: '#e85555', light: '#ff9999' },
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        success: '#5b9a6f',
        warning: '#d4a24c',
        danger: '#c45a4a',
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
      },
    },
  },
  plugins: [],
};
