import { getTopUsersByLikes } from '~/server/db/users';
import { userTransformer } from '~/server/transformers/user';

export default defineEventHandler(async (event) => {
    const users = await getTopUsersByLikes();

  return {
    users: users.map(userTransformer)
  }
})
