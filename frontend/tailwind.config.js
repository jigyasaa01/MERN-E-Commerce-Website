import flowbitePlugin from 'flowbite/plugin'


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: '#111111', // Add your custom color here
      },
    },
  },
  plugins: [flowbitePlugin],
}

