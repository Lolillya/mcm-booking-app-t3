import { prisma } from "~/server/db";

export const getUserById = async (id: string) => {
    try {
        const user = prisma.profiles.findUnique({
            where: {
                id
            }
        })

        return user;
    }

    catch {
        return null;
    }
}