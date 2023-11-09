import {getPostsByUser} from '~/server/db/posts'
import { postTransformer } from '~/server/transformers/post'
export default defineEventHandler(async(event) =>{
    const  user  = event.context.params.id
    const posts = await getPostsByUser(user,{
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
        },
        orderBy:[
          {
              createdAt: 'desc'
          }
        ]
      })
    return{
      post: posts.map(post => postTransformer(post, posts[0].authorId))
    }
})