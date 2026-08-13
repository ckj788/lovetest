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
        costar: {
          black: "#050505",
          dark: "#09090B",
          card: "#121215",
          border: "#27272A",
          line: "#3F3F46",
          white: "#FFFFFF",
          muted: "#A1A1AA",
          dim: "#71717A",
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
      },
      boxShadow: {
        'costar': '0 0 0 1px #27272A, 0 10px 30px -10px rgba(0, 0, 0, 0.8)',
        'costar-white': '0 0 0 1px #FFFFFF',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
