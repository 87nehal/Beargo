import { isUserFollowing } from '~/server/db/users'

export default defineEventHandler(async(event) => {
    const body = await readBody(event)

    return await isUserFollowing(body.followerId,body.followingId)
});