import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection("admins").findOne({ username: credentials.username });

        if (!user) {
          throw new Error("Invalid username or password");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password as string);

        if (!isPasswordValid) {
          throw new Error("Invalid username or password");
        }

        return { id: user._id.toString(), name: user.username };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
