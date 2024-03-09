/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      '3xs': '300px',
      '2xs': '400px',
      'xs': '500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1280px',
      'xl': '1500px',
      '2xl': '1680px',
      '3xl': '1900px',
    },
  },
  plugins: [],
}

