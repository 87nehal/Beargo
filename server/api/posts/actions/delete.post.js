import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Delete replies
    await prisma.post.deleteMany({
        where: { replyToId: body.postId }
    })

    // Delete reactions
    await prisma.reaction.deleteMany({
        where: { postId: body.postId }
    })    

    // Delete media files
    await prisma.mediaFile.deleteMany({
        where: { postId: body.postId }
    })

    // Delete the post
    const res = await prisma.post.delete({
        where: { id: body.postId }
    })

    return res
})
