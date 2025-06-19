import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl
        },
        async session({ session, token, user }) {
            // Add user ID to the session object
            session.user.id = user?.id || token?.sub
            return session
        }
    },
    colorScheme: {
        primary: "#58C521",
        secondary: "#F095AE",
        accent: "#569A34",
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }