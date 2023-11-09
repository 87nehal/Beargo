import { prisma } from "~/server/db"; 
import {sendError} from "h3"
import { createUser } from "~/server/db/users"
import { userTransformer } from "~/server/transformers/user";
export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const {name, username, email, password, repeatPassword, profileImage, bio} = body

    if(!username || !email || !password || !repeatPassword || !name ){
        return sendError(event,createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }
    if(password !== repeatPassword){
        return sendError(event,createError({
            statusCode: 400,
            statusMessage: 'Password Mismatch'
        }))
    }

    const userData ={
        username,
        email,
        password,
        name,
        profileImage:'https://picsum.photos/200/200',
        backgroundImage:'https://picsum.photos/1500/500',
        bio
    }

    const user = await createUser(userData)
    await prisma.follow.create({
        data: {
            followerId: user.id, 
            followingId: user.id
        }
    })

    return{
        body: userTransformer(user)
    }
})