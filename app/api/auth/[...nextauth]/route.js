import NextAuth from 'next-auth';
import { db } from '../../../lib/db';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
      try {
      console.log('Login user:', credentials);

      const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [credentials.email]
      );

      const user = rows[0];
      if (!user) {
        console.log('User not found');
        return null;
      }

      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (!isValid) {
        console.log('Incorrect password');
        return null;
      }

      console.log('Login OK:', user.email);
      return {
        id: user.id,
        name: user.name,
        email: user.email
      };
      } catch (err) {
      console.error('Login error:', err);
      throw new Error('Authorization error');
      }
    }})
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60
  },
  jwt: {
    maxAge: 30 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  }
};

export const {auth, handlers: {GET, POST}} = NextAuth(authConfig);