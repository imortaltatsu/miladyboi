import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Crimson Text', 'Georgia', 'serif'],
      },
      colors: {
        manga: {
          purple: '#9C27B0',
          pink: '#E91E63',
          cyan: '#00BCD4',
          blue: '#3B82F6',
        },
        leather: {
          dark: '#2a1810',
          medium: '#3d2414',
        },
        paper: {
          cream: '#f5f5dc',
          white: '#faf8f0',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-manga': 'linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)',
        'gradient-metal': 'linear-gradient(135deg, #b0b0b0 0%, #d4d4d4 25%, #ffffff 50%, #d4d4d4 75%, #b0b0b0 100%)',
      },
      boxShadow: {
        'embossed': 'inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.4), 0 8px 24px rgba(233,30,99,0.4)',
        'depth': '0 1px 0 rgba(255,255,255,0.1), 0 8px 16px rgba(0,0,0,0.4), 0 16px 32px rgba(0,0,0,0.3)',
        'crystal': 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 32px rgba(0,188,212,0.3)',
      },
    },
  },
  plugins: [],
}

export default config
