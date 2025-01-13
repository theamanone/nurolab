import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      securityLevel: string;
      encryptionType: string;
      tokenVersion: string;
      accessLevel: string;
      verificationStatus: string;
      sessionStrength: string;
      authMethod: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: string;
    securityLevel: string;
    encryptionType: string;
    tokenVersion: string;
    accessLevel: string;
    verificationStatus: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
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
