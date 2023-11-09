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
    return{
        getStockData
    }  
}