/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // active le mode sombre via une classe 'dark' sur <html> ou <body>
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adapte selon ta structure de fichiers
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',  // bleu moyen (blue-600) pour mode clair
          dark: '#3b82f6',     // bleu clair (blue-500) pour mode sombre
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'hover', 'focus'],
      textColor: ['dark', 'hover', 'focus'],
      ringColor: ['dark', 'focus'],
      ringOffsetColor: ['dark', 'focus'],
    },
  },
  plugins: [],
}
