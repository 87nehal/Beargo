import { getPostsById } from "~/server/db/posts"
import { postTransformer } from "~/server/transformers/post"

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const post = await getPostsById(id, {
    include: {
      author: true,
      mediaFile: true,
      replyTo: {
        include: {
          author: true
        }
      },
      replies: {
        include: {
          author: true,
          mediaFile: true,
          replyTo: {
            include: {
              author: true
            }
          }
        }
      }
    }
  })
  return {
    "post": postTransformer(post)
  }
})
