import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const res = await prisma.follow.create({
        data: {
            followerId: body.followerId, 
            followingId: body.followingId
        }
    })
    return res
})