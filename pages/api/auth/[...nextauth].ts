import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
            id: profile.id.toString(),
            name: profile.name || profile.login,
            username: profile.login,
            email: profile.email,
            image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
            id: profile.id.toString(),
            name: profile.name || profile.login,
            username: profile.login,
            email: profile.email,
            image: profile.avatar_url,
        };
      },
    }),
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'text' },
        password: { label: 'Semha', type: 'password' }
      },
      authorize: async (credentials, req) => {
        const user = {
          id:123,
          name: 'Tiago',
          email: 'tiago@atriostech.com.br',
          role: 'USER'
        }
        if(user) {
          return user;
        }
        return null;
      }

    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({session, user}) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.username,
      },

    }),
  },
};

export default NextAuth(authOptions);