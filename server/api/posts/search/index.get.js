import {getSearchPosts} from '~/server/db/posts'
import { postTransformer } from '~/server/transformers/post'
export default defineEventHandler(async(event) =>{
    const {query,user} = getQuery(event)
    const posts = await getSearchPosts(query, {
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
    })
    if(query==="" || query===undefined){
        return{
            post:[]
        }
    }
    return{
        post: posts.map(post => postTransformer(post, user))
    }
})