import {getPosts} from '~/server/db/posts'
import { postTransformer } from '~/server/transformers/post'
export default defineEventHandler(async(event) => {
    const input  = event.toString(); 
    const params = new URLSearchParams(input.split("?")[1]);
    const userId = params.get("userId");
    const skip = Number(params.get("skip")) || 0;
    const posts = await getPosts(userId, {
        include:{
            author: true,
            mediaFile: true,
            replies: {
                include:{
                    author: true
                } 
            },
            replyTo: {
                include:{
                    author: true
                } 
            }
        },
        orderBy:[
            {
                createdAt: 'desc'
            }
        ]
    }, skip)
    return{
        post: posts.map(post => postTransformer(post, userId))
    }
})