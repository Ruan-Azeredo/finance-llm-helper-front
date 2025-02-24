import axios, { AxiosInstance } from "axios";
import { createContext, useState } from "react";

interface AuthContextType {
    instance: AxiosInstance
    signIn: (email: string, password: string) => void
    signOut: () => void
    isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType>({
    instance: axios,
    signIn: () => {},
    signOut: () => {},
    isAuthenticated: false
})

export function AuthProvider({ children }: {children: React.ReactNode}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000',
/*         headers: {
            common: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJydWFuQGdtaWwuY29tIiwiZXhwIjoxNzQwNDA2MDE4fQ.VlhIdJncHlsboP1RNfzI9MoqqGEGa7IZEa2-T5uWth8`
            }
        } */
    })

    async function signIn(email: string, password: string) {
        try {
            const auth = await instance.post('/auth/login', {email, password})

            if(auth.status === 200) {
                localStorage.setItem('token', auth.data.access_token.token)
                instance.defaults.headers.common['Authorization'] = `Bearer ${auth.data.access_token.token}`
                setIsAuthenticated(true)
            }
        } catch (error) {
            console.log(error)
        }

    }

    async function signOut() {
        localStorage.removeItem('token')
        instance.defaults.headers.common['Authorization'] = ''
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{
            instance,
            signIn,
            signOut,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}