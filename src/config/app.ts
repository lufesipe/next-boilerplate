export const appConfig = {
  authSecret: process.env.AUTH_SECRET || '',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
  nextAuthUrl: process.env.NEXTAUTH_URL || '',
};
