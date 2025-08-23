/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        artistic: ['"Pacifico"', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
