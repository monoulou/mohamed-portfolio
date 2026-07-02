/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'marketing-black': '#08090a',
        'panel': '#0f1011',
        'elevated': '#191a1b',
        'secondary-surface': '#28282c',
        'primary-text': '#f7f8f8',
        'secondary-text': '#d0d6e0',
        'tertiary-text': '#8a8f98',
        'quaternary-text': '#62666d',
        'brand-indigo': '#5e6ad2',
        'brand-accent': '#7170ff',
        'brand-hover': '#828fff',
        'success': '#27a644',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
