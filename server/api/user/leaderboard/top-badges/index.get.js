import { getTopUsersByBadges } from '~/server/db/users';
import { userTransformer } from '~/server/transformers/user';

export default defineEventHandler(async (event) => {
    const users = await getTopUsersByBadges();

  return {
    users: users.map(userTransformer)
  }
})
