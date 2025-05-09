'use client';

import type { Session } from 'next-auth';
import type { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/style/theme';
import { TableProvider } from '@/components/Elements/Table/context/TableContext';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 60 * 24 } } });

export const Provider = ({ children, session }: { children: ReactNode; session: Session | null }) => (
  <SessionProvider session={session}>
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <TableProvider>{children}</TableProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
      </QueryClientProvider>
    </ChakraProvider>
  </SessionProvider>
);
