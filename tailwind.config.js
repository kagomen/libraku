/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          25: '#f6fefa',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans JP', 'sans-serif'],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      spacing: {
        calc: 'calc(100vh - 52px)',
      },
    },
  },
  plugins: [],
}
