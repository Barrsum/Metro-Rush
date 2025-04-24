// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Checks the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Checks all JS/TS/JSX/TSX files in src
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // You can add custom theme settings here later (colors, fonts, animations)
      keyframes: {
        roadAnimate: {
           '0%': { backgroundPositionY: '0px' },
           '100%': { backgroundPositionY: '600px' }, // Adjust based on road image height
         },
         float: {
           '0%, 100%': { transform: 'translateY(0)' },
           '50%': { transform: 'translateY(-5px)' },
         },
      },
    },
  },
  plugins: [],
}

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos