import 'next-auth';

declare module 'next-auth' {
  interface User extends NextAuthUser {
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: string;
    };
  }
}
