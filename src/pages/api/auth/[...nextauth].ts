import NextAuth, { AuthOptions } from 'next-auth';
import GitlabProvider from 'next-auth/providers/gitlab';
import {
  getAuthSecret,
  getAuthUrl,
  getGitlabBaseUrl,
  getGitlabClientId,
  getGitlabClientSecret,
} from '@/libs/server/get-env';

export const authOptions: AuthOptions = {
  secret: getAuthSecret(),
  providers: [
    GitlabProvider({
      clientId: getGitlabClientId(),
      clientSecret: getGitlabClientSecret(),
      authorization: {
        url: `${getGitlabBaseUrl()}/oauth/authorize`,
        params: {
          scope: 'read_user',
          redirect_uri: `${getAuthUrl()}/callback/gitlab`,
        },
      },
      token: `${getGitlabBaseUrl()}/oauth/token`,
      userinfo: `${getGitlabBaseUrl()}/api/v4/user`,
      httpOptions: {
        timeout: 60_000,
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      return account ? { ...token, accessToken: account.access_token } : token;
    },
  },
};
export default NextAuth(authOptions);
