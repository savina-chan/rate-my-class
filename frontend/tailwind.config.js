/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Include the root HTML file
    './src/**/*.{js,jsx,ts,tsx}', // Include all React components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat'], // Replace default sans-serif with Montserrat
      },
    },
  },
  plugins: [],
};