import { useContext } from "react"
import { AuthContext } from "../contexts/Auth"
import axios from "axios"

const useAxiosAuth = () => {
    
    const { accessToken, refreshAccessToken, signOut } = useContext(AuthContext)

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })

    api.interceptors.request.use(
        config => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    api.interceptors.response.use(
        (response) => {
            return response
        },
        async (error) => {
            if (error.response.status === 401) {
                try {
                    await refreshAccessToken()
                    return api(error.config)
                } catch {
                    signOut()
                }
            }

            return Promise.reject(error)
        }
    )

    return api

}

export default useAxiosAuth