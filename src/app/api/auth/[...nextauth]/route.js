import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { getUserData } from "@/lib/repos/user";

function isComplete(user) {
  return Boolean(
    user?.age &&
    user?.height &&
    user?.weight &&
    user?.physical_activity &&
    user?.gender
  );
}

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
            return `${baseUrl}/profile`
        },
        async session({ session, token, user }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
                session.user.data_completed = token.data_completed || false
                session.user.dislike_ingredients = token.dislike_ingredients || []
            }
            return session
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                // Solo en el primer inicio de sesión
                const dbUser = await prisma.user.findUnique({
                    where: { id: user.id },
                    select: {
                        age: true,
                        height: true,
                        weight: true,
                        physical_activity: true,
                        gender: true,
                        dislike_ingredients: true,
                    }
                })

                token.data_completed = isComplete(dbUser)
                token.dislike_ingredients = dbUser?.dislike_ingredients ? JSON.parse(dbUser.dislike_ingredients) : []
                console.log("Token JWT creado:", token)
            }
            if (trigger === "update") {
                const dbUser = await getUserData(token.email)
                console.log("da false?", dbUser)
                token.data_completed = isComplete(dbUser)
                token.dislike_ingredients = dbUser?.dislike_ingredients ? JSON.parse(dbUser.dislike_ingredients) : []
            }
            return token
        },
    },
    colorScheme: {
        primary: "#58C521",
        secondary: "#F095AE",
        accent: "#569A34",
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }