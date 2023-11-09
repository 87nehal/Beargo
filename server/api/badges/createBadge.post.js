import { createBadge } from '~/server/db/badges'

export default async (event) => {
    const body = await readBody(event)
    const res = await createBadge(body)
    return res
}