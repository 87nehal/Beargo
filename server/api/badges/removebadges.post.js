import { removeBadgeFromUser } from '~/server/db/badges'

export default async (event) => {
    const body = await readBody(event)
    const res = await removeBadgeFromUser(body.userId, body.badgeId)
    return res
}