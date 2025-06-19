import { prisma } from '@/lib/prisma'

const getUserData = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: {
                name: true,
                age: true,
                email: true,
                height: true,
                weight: true,
                physical_activity: true,
                gender: true
            },
        });

        return user;
    } catch (error) {
        console.error("Error fetching user data:", error); // TODO: Handle error appropriately
        return null;
    }
}

const getUserPreferences = async (email) => {
    try {
        const preferences = await prisma.user_preferences.findUnique({
            where: { email },
            select: {
                dislike_ingredients: true
            },
        });

        return preferences;
    } catch (error) {
        console.error("Error fetching user preferences:", error); // TODO: Handle error appropriately
        return null;
    }
}

export { getUserData, getUserPreferences };