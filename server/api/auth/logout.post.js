import {removeRefreshToken} from "~~/server/db/refreshTokens"
export default defineEventHandler(async (event)=>{
    try{
      const cookies =  getCookie(event,"refresh_token")
      await removeRefreshToken(cookies)
    }catch(error){

    }
    sendRefreshToken(event,null)
    return{
      "res":'LoggedOut'
    }
})