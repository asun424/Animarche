/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./frontend/templates/index.html',
            './frontend/src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
        colors: {
            primary: '#1B73E8',
        },
    },
},
  variants: {
  extend: {},
  },
  plugins: [],
};
