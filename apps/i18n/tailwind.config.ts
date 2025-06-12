// tailwind config is required for editor support

import type { Config } from 'tailwindcss'
import sharedConfig from '@repo/tailwind-config'

const config: Pick<Config, 'content' | 'presets' | 'theme' | 'plugins'> = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      scrollSnapAlign: {
        start: 'start',
      },
      fontSize: {
        small: 'clamp(12px, calc(16px + 1.6667vw), 14px);',
        regular: 'clamp(1em, 1.2rem + 0.667rem, 1.05rem);',
        increased: 'clamp(1.1rem, calc(1.1rem + 1.6667vw), 1.2rem);',
        medium: 'clamp(1.25rem, calc(1.25rem + 2.7778vw), 1.5rem);',
        large: 'clamp(1.563rem, calc(1.563rem + 3.125vw), 2.25rem);',
        huge: 'clamp(1.953rem, calc(1.953rem + 2.6667vw), 3.375rem);',
        giant: 'clamp(2.441rem, calc(2.441rem + 2.1111vw), 5.063rem);',
        mombo: 'clamp(3.352rem, calc(5.552rem + 2.4333vw), 7.45rem)',
      },
    },
  },
}

export default config
