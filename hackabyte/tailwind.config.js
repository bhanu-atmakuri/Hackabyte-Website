/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hackabyte-red': '#ff4d5a',
        'hackabyte-dark': '#1a1a1a',
        'hackabyte-gray': '#212121',
        'hackabyte-light': '#f8f8f8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}