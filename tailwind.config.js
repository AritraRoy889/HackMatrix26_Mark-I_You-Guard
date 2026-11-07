/** @type {import('tailwindcss').Config} */
export default {
  content: [ './index.html', './src/**/*.{js,ts,jsx,tsx}' ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        cyber: {
          dark: '#0a0d14',
          card: '#0f172a',
          border: '#1e293b',
          glow: '#06b6d4',
          accent: '#10b981',
          danger: '#ef4444',
          warning: '#f59e0b',
        },
      },
      fontFamily: {
        sans: [ 'Inter', 'system-ui', '-apple-system', 'sans-serif' ],
        mono: [ 'JetBrains Mono', 'Fira Code', 'monospace' ],
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
    },
  },
  plugins: [],
};
