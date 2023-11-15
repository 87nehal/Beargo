import useFetchApi from "./useFetchApi"
import axios from 'axios'
export default () => {
    const getStockData = async (params ={}) => {
      try {
          const response = await useFetchApi(`/api/utilsapi/finnhub`, {
            method: 'GET',
            params
          })
          return response
        } catch (error) {
          throw error
        }
    }

    const getTopLikes = async (params ={}) => {
      try {
          const response = await useFetchApi(`/api/user/leaderboard/top-likes`, {
            method: 'GET'
          })
          return response
        } catch (error) {
          throw error
        }
    }

    const getTopFollows = async (params ={}) => {
      try {
          const response = await useFetchApi(`/api/user/leaderboard/top-followers`, {
            method: 'GET'
          })
          return response
        } catch (error) {
          throw error
        }
    }

    const getTopBadges = async (params ={}) => {
      try {
          const response = await useFetchApi(`/api/user/leaderboard/top-badges`, {
            method: 'GET'
          })
          return response
        } catch (error) {
          throw error
        }
    }

    return{
        getStockData,
        getTopLikes,
        getTopFollows,
        getTopBadges
    }  
}