import { Roboto } from 'next/font/google';
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const roboto = Roboto({
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
});

const customConfig = defineConfig({
  globalCss: {
    body: {
      maxW: '100vw',
      fontFamily: roboto.style.fontFamily,
      color: '#231F20',
      bgColor: 'white',
      overflowX: 'hidden',
    },
    html: {
      maxW: '100vw',
      overflowX: 'hidden',
    },
    '*': {
      boxSizing: 'border-box',
      p: 0,
      m: 0,
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          main: { value: '#68afb8' },
          secondary: { value: '#DEA273' },
          black: { value: '#231F20' },
          border: { value: '#e2e8f0' },
          background: { value: '#f9fbfc' },
        },
        interaction: {
          action: { value: '#74b5be' },
          pastel: { value: '#90c4cb' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
