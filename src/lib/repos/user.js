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
        const preferences = await prisma.user.findUnique({
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

export async function upsertUserProfile(email, data) {
    const {
        name,
        age,
        height,
        weight,
        physical_activity,
        gender,
        preferences,
    } = data

    if (age || height || weight || physical_activity || gender || name) {
        return prisma.user.upsert({
            where: { email },
            update: { name, age, height, weight, physical_activity, gender },
            create: {
                email,
                name: name ?? '',
                age: age ?? 0,
                height: height ?? 0,
                weight: weight ?? 0,
                physical_activity: physical_activity ?? '',
                gender: gender ?? '',
                dislike_ingredients: preferences ? JSON.stringify(preferences) : '[]',
            },
        })
    }

    if (preferences?.length) {
        return prisma.user.update({
            where: { email },
            data: { dislike_ingredients: JSON.stringify(preferences) },
        })
    }

    return null
}

export async function updateUserProfileByEmail(email, data) {
    return prisma.user.update({
        where: { email },
        data,
    })
}

export { getUserData, getUserPreferences };