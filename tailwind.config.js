/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#e07b39', dark: '#c46a2e' },
        secondary: '#4a90a4',
        success: '#4caf50',
        warning: '#ff9800',
        danger: '#f44336',
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
      },
    },
  },
  plugins: [],
};
