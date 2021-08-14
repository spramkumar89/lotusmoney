import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      console.log(
        `*****************ASYNC : JWT : User : ${user}, Account : ${account}, Profile : ${profile}, Token : ${token}, isNewUser : ${isNewUser}`
      );
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },

    async session(session, token) {
      console.log(
        `------------------>ASYNC : Session : ${JSON.stringify(
          session
        )}, Token : ${JSON.stringify(token)}`
      );
      // Add property to session, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.sub = token.sub;
      return session;
    },
  },
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 10 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: "ThisIsASecretMessage",
  },
  theme: "light",
});
