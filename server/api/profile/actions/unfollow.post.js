//Unfollow.js 
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { followerId, followingId } = body;

    const follow = await prisma.follow.findFirst({
        where: {
            followerId: followerId,
            followingId: followingId,
        },
    });

    if (follow) {
        const res = await prisma.follow.delete({
            where: {
                id: follow.id,
            },
        });
        return res;
    } else {
        throw new Error('Follow relationship not found');
    }
})
