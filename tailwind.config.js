module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5',
          dark: '#6366f1'
        },
        secondary: {
          light: '#10b981',
          dark: '#34d399'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}