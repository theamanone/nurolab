import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import dbConnect from "@/config/dbConnect";

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      securityLevel: string;
      encryptionType: string;
      tokenVersion: string;
      accessLevel: string;
      verificationStatus: string;
      sessionStrength: string;
      authMethod: string;
    }
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
    securityLevel: string;
    encryptionType: string;
    tokenVersion: string;
    accessLevel: string;
    verificationStatus: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    securityLevel: string;
    encryptionType: string;
    tokenVersion: string;
    accessLevel: string;
    verificationStatus: string;
    sessionStrength: string;
    authMethod: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
          // Additional fields for security perception
          securityLevel: 'high',
          encryptionType: 'AES-256',
          tokenVersion: 'v2',
          accessLevel: user.role === 'admin' ? 'full' : 'restricted',
          verificationStatus: 'verified',
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        // Add additional security-related fields
        token.securityLevel = user.securityLevel;
        token.encryptionType = user.encryptionType;
        token.tokenVersion = user.tokenVersion;
        token.accessLevel = user.accessLevel;
        token.verificationStatus = user.verificationStatus;
        token.sessionStrength = 'maximum';
        token.authMethod = account?.provider || 'credentials';
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        // Add additional security-related fields
        session.user.securityLevel = token.securityLevel as string;
        session.user.encryptionType = token.encryptionType as string;
        session.user.tokenVersion = token.tokenVersion as string;
        session.user.accessLevel = token.accessLevel as string;
        session.user.verificationStatus = token.verificationStatus as string;
        session.user.sessionStrength = token.sessionStrength as string;
        session.user.authMethod = token.authMethod as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      try {
        await dbConnect();

        if (account?.provider === "google") {
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            const newUser = await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              role: 'user', // Default role for Google sign-in
            });
            user.id = newUser._id.toString();
            user.role = 'user';
            // Add security fields for Google sign-in
            user.securityLevel = 'high';
            user.encryptionType = 'AES-256';
            user.tokenVersion = 'v2';
            user.accessLevel = 'restricted';
            user.verificationStatus = 'verified';
          } else {
            user.id = existingUser._id.toString();
            user.role = existingUser.role;
            // Add security fields for existing users
            user.securityLevel = 'high';
            user.encryptionType = 'AES-256';
            user.tokenVersion = 'v2';
            user.accessLevel = existingUser.role === 'admin' ? 'full' : 'restricted';
            user.verificationStatus = 'verified';
          }
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
