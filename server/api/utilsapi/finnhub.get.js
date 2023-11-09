import axios from 'axios'
export default defineEventHandler(async (event)=>{
    const apiKey = useRuntimeConfig().finnhubApiKey
    const { symbol } = getQuery(event)
    const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
    return{
        response : res.data
    }
})