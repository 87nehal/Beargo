import { userTransformer } from "~/server/transformers/user.js";
import { getUserByUsername } from "../../db/users.js";
import { createRefreshToken } from "~/server/db/refreshTokens.js";
import { generateTokens , sendRefreshToken } from "~/server/utils/jwt.js";
import { sendError } from "h3";
import bcrypt from "bcrypt";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, password } = body
    // Check if body contains username and password
    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }));
    }

    // Is the user registered?
    const user = await getUserByUsername(username)

    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password invalid'
        }));
    }

    // Compare passwords
    const doesThePasswordMatch = await bcrypt.compare(password,user.password)
    if(!doesThePasswordMatch){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password invalid'
        }));
    }
    // Generate tokens
    //Access tokens
    //Refresh tokens
    const {accessToken, refreshToken} = generateTokens(user)

    //Save it inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    //Add http only cookie
    sendRefreshToken(event,refreshToken)

    return{
        refreshToken: refreshToken,
        user: userTransformer(user)
    }
});
