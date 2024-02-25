import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: { access_type: "offline", prompt: "consent" },
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60, // 1 day
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user?.id;
            }
            return token;
        },
        async session({ session, token }) {
            console.log(token.id);
            const [google] = await prisma.account.findMany({
                where: { userId: token.id, provider: "google" },
            });
            console.log("google", google);
            if (google.expires_at * 1000 < Date.now()) {
                // If the access token has expired, try to refresh it
                try {
                    // https://accounts.google.com/.well-known/openid-configuration
                    // We need the `token_endpoint`.
                    const response = await fetch(
                        "https://oauth2.googleapis.com/token",
                        {
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded",
                            },
                            body: new URLSearchParams({
                                client_id: process.env.GOOGLE_CLIENT_ID,
                                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                                grant_type: "refresh_token",
                                refresh_token: google.refresh_token,
                            }),
                            method: "POST",
                        }
                    );

                    const tokens = await response.json();

                    if (!response.ok) throw tokens;

                    await prisma.account.update({
                        data: {
                            access_token: tokens.access_token,
                            expires_at: Math.floor(
                                Date.now() / 1000 + tokens.expires_in
                            ),
                            refresh_token:
                                tokens.refresh_token ?? google.refresh_token,
                        },
                        where: {
                            provider_providerAccountId: {
                                provider: "google",
                                providerAccountId: google.providerAccountId,
                            },
                        },
                    });
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    // The error property will be used client-side to handle the refresh token error
                    session.error = "RefreshAccessTokenError";
                }
            }

            if (session?.user) {
                session.user.id = token.id;
            }

            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
};

export default NextAuth(authOptions);
