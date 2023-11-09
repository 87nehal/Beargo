import { getUserBySearch } from '~/server/db/users'
import { userTransformer } from '~/server/transformers/user'

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event)
  const users = await getUserBySearch(query, {
    include: {
      following: true,
      followers: true,
    }
  })

  if (query === "" || query === undefined) {
    return {
      users: []
    }
  }

  return {
    users: users.map(userTransformer)
  }
})
