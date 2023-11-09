import useFetchApi from "./useFetchApi"
import jwt_decode from "jwt-decode"

export default () => {
    const useAuthToken = () => useState('auth_token')
    const useAuthUser = () => useState('auth_user')
    const useAuthLoading = () => useState('auth_loading', () => true)

    const setToken = (newToken) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser) => {
        const authUser = useAuthUser()
        authUser.value = newUser
        window.localStorage.setItem('user', newUser.id)
    }

    const setIsAuthLoading = (value) => {
        const authLoading = useAuthLoading()
        authLoading.value = value
    }

    const login = ({ username, password }) =>{
        return new Promise(async (resolve, reject) => {
            try{
                const data = await $fetch('/api/auth/login',{
                    method:'POST',
                    body:{
                        username,
                        password
                    }
                })
                setToken(data.access_token)
                setUser(data.user)
                resolve(true)
            } catch (error){
                reject(error)
            }
        })
    }

    const register = ({ name, username, email, password, repeatPassword, bio }) => {
        return new Promise(async (resolve, reject) => {
          try {
            const data = await $fetch('/api/auth/register', {
              method: 'POST',
              body: {
                name,
                username,
                email,
                password,
                repeatPassword,
                bio
              }
            })
            resolve(true)
          } catch (error) {
            reject(error)
          }
        })
    }     

    const refreshToken = () => {
        return new Promise(async(resolve, reject)=>{
            try {
                const data = await $fetch('/api/auth/refresh')
                setToken(data.access_token)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const getUser = () => {
        return new Promise(async(resolve, reject)=>{
            try {
                const data = await useFetchApi('/api/auth/user')
                setUser(data.user)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    
    const reRefreshAccessToken = () => {
        const authToken = useAuthToken()

        if(!authToken.value){
            return
        }

        const jwt = jwt_decode(authToken.value)
        const newRefreshTime = jwt.exp - 60000
        setTimeout(async() => {
            await refreshToken()
            refreshToken()
        }, newRefreshTime);
    }

    const initAuth = () => {
        return new Promise(async(resolve, reject)=>{
            setIsAuthLoading(true)
            try {
                await refreshToken()
                await getUser()

                reRefreshAccessToken()

                resolve(true)
            } catch (error) {
                reject(error)
            } finally {
                setIsAuthLoading(false)
            }
        })
    }

    const logout = () => {
        return new Promise(async (resolve, reject)=>{
            try {
                await useFetchApi('/api/auth/logout',{
                    method:'POST'
                })
                
                setToken(null)
                setUser(null)
                window.localStorage.setItem('darkMode', false)
                window.localStorage.setItem('user', null)
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    return {
        login,
        register,
        useAuthUser,
        useAuthToken,
        useAuthLoading,
        initAuth,
        getUser,
        logout
    }
}