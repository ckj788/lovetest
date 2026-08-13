/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          cream: "#FDF8E2",    // Warm cream background
          slate: "#504E76",    // Deep slate purple text & container
          lilac: "#C4C3E3",    // Pastel lavender accent
          sage: "#A3B565",     // Calming sage green accent
          sand: "#FCDD9D",     // Soft golden sand accent
          coral: "#F1642E",    // Vibrant terracotta orange CTA
          white: "#FFFFFF",    // Clean white surface
          dark: "#2C2A4B",     // Deep dark text
          border: "rgba(80, 78, 118, 0.15)", // Soft slate border
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft-flat': '0 8px 30px rgba(80, 78, 118, 0.08), 0 2px 8px rgba(80, 78, 118, 0.04)',
        'soft-button': '0 4px 0 #3C3A5A',
        'soft-coral': '0 4px 0 #C44616',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
