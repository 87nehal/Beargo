import { getUserByUsername } from "~/server/db/users"
import { userTransformer } from "~/server/transformers/user"

export default defineEventHandler(async (event) => {
   const {id} = event.context.params
   const user = await getUserByUsername(id)
   return {
    "user":userTransformer(user)
   } 
})
