import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/signIn",
    signOut: "/signIn",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // If this is a sign out redirect, go to sign in page
      if (url.includes("/signIn")) {
        return `${baseUrl}/signIn`;
      }
      // Otherwise redirect to productListing after successful sign in
      return `${baseUrl}/productListing`;
    },
  },
});
