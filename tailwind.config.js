/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mercado-yellow': '#fff159',
        'mercado-blue': '#3483fa',
      }
    },
  },
  plugins: [],
}