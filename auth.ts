import { type AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/services/http/server/login';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        return login(credentials);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.user.id,
          name: token.user.name,
          email: token.user.email,
          role: token.user.role,
        },
      };
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
