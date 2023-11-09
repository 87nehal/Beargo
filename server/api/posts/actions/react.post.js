import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Delete any existing reaction from this user on this post
  await prisma.reaction.deleteMany({
    where: {
      userId: body.userId,
      postId: body.postId
    }
  })

  // Create a new reaction
  const res = await prisma.reaction.create({
    data: {
      userId: body.userId,
      postId: body.postId,
      type: body.type
    }
  })

  return res
})