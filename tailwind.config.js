/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#d85a2b', dark: '#b94a23', light: '#f4a574' },
        secondary: '#4a90a4',
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
