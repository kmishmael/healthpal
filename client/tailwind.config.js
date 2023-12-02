/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

