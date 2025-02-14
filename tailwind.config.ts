// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Ensure this includes all your app folder files
    './components/**/*.{js,ts,jsx,tsx}', // Ensure this includes all your components
    './pages/**/*.{js,ts,jsx,tsx}', // Include all pages as well
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
