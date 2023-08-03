/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gap: {
        '4': '2.75rem', 
      },
   
    },
  },
  prefix: 'tw-',
  plugins: [],
  important: true,
 
}