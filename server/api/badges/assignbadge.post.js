import { assignBadgeToUser } from '~/server/db/badges'

export default async (event) => {
    const body = await readBody(event)
    const res = await assignBadgeToUser(body.userId, body.badgeId)
    return res
}