import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getSession } from '@/auth';
import { Provider } from './providers';

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const session = await getSession();
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  robots: {
    follow: false,
    index: false,
  },
};
