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
        mbti: {
          pink: "#FF6B8B",
          purple: "#7C4DFF",
          blue: "#448AFF",
          teal: "#00BFA5",
          yellow: "#FFB300",
          peach: "#FF7043",
          bg: "#FAF8FF",
          card: "#FFFFFF",
          text: "#2D264B",
          muted: "#6E698D",
          border: "#EAE5F5",
        },
      },
      backgroundImage: {
        'gradient-mbti': 'linear-gradient(135deg, #FF6B8B 0%, #7C4DFF 50%, #448AFF 100%)',
        'gradient-soft': 'linear-gradient(135deg, #FFF5F7 0%, #F3EFFF 50%, #EBF3FF 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(250,248,255,0.95) 100%)',
      },
      boxShadow: {
        'mbti': '0 10px 30px -5px rgba(124, 77, 255, 0.12), 0 4px 12px rgba(0, 0, 0, 0.03)',
        'mbti-hover': '0 20px 40px -10px rgba(124, 77, 255, 0.22), 0 8px 16px rgba(0, 0, 0, 0.06)',
        'glow-pink': '0 0 25px rgba(255, 107, 139, 0.4)',
        'glow-purple': '0 0 25px rgba(124, 77, 255, 0.4)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}
