// authOptions.ts
import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../lib/prisma";
import { JWT } from "next-auth/jwt";

interface MySessionUser {
  id: string;
  name: string;
  lastname: string;
  profile_picture?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.professionals.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error("NOT_FOUND");
        if (credentials?.password !== user.password) throw new Error("INVALID");
        
        return {
          id: user.id.toString(),
          name: user.name,
          lastname: user.lastname,
          profile_picture: user.profile_picture?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        const u = user as MySessionUser;
        token.sub = u.id;
        token.name = u.name;
        token.lastname = u.lastname;
        token.profile_picture = u.profile_picture;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const user = session.user as MySessionUser;
      user.id = token.sub as string;
      user.name = token.name as string;
      user.lastname = token.lastname as string;
      user.profile_picture = token.profile_picture as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
    updateAge: 60 * 5,
  },
  secret: process.env.JWT_SECRET,
};