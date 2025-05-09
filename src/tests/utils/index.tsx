import type { ReactElement, ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/style/theme';
import { render, type RenderOptions } from '@testing-library/react';

const AllProviders = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
