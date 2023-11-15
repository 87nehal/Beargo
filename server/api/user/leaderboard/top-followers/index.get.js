import { getTopUsersByFollowers } from '~/server/db/users';
import { userTransformer } from '~/server/transformers/user';

export default defineEventHandler(async (event) => {
    const users = await getTopUsersByFollowers();

  return {
    users: users.map(userTransformer)
  }
})
