import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    debug: true,
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
    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl
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