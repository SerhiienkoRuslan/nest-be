import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    // GoogleProvider({ clientId: '', clientSecret: '' }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const response = await fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        const user = await response.json();

        return user as User;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     return { ...token, ...user };
  //   },
  //   async session({ session, token, user }) {
  //     session.user = token as any;
  //     return session;
  //   },
  // },
});

export { handler as GET, handler as POST };
