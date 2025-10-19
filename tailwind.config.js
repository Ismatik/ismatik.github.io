// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan your JS/JSX files
    "./public/index.html",       // And your index.html
  ],
  theme: {
    extend: {
      fontFamily: {
        // If you want to use Poppins globally as set in index.css
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        // Define your custom animations here if they are not in global CSS
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-faster': 'float-faster 5s ease-in-out infinite',
        'particle-drift': 'particle-drift 15s linear infinite',
      },
      keyframes: {
        // Keyframes must be defined here if not in global CSS or if you want them managed by Tailwind
        float: {
          '0%': { transform: 'translate(0, 0) rotate(-3deg)' },
          '50%': { transform: 'translate(-15px, -15px) rotate(-3deg)' },
          '100%': { transform: 'translate(0, 0) rotate(-3deg)' },
        },
        float_slow: { // Use underscore for kebab-case in JS object keys
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-10px, -10px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        float_faster: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, 10px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        particle_drift: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translate(50px, -50px) scale(1.2)', opacity: '1' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.5' },
        }
      },
    },
  },
  plugins: [],
}