import axios, { AxiosInstance } from "axios";
import { createContext, useEffect, useState } from "react";
const VITE_APP = import.meta.env.VITE_APP

interface AuthContextType {
    instance?: AxiosInstance
    signIn?: (email: string, password: string) => void
    signOut: () => void
    loginError?: string | null
    accessToken?: string | null
    refreshToken?: string | null
    refreshAccessToken: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    refreshAccessToken: async () => {},
    signOut: function (): void {
        throw new Error("Function not implemented.");
    }
})
export function AuthProvider({ children }: {children: React.ReactNode}) {

    const [loginError, setLoginError] = useState<string | null>()

    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token') || null)
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refresh_token') || null)
    const [currentUser, setCurrentUser] = useState<unknown | null>(null)

    const instance = axios.create({
        baseURL: VITE_APP === 'PROD' ? 'https://inance-llm-helper-financehelperllm6507-kjc5emu8.leapcell.dev' : 'http://127.0.0.1:8000',
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })

    useEffect(() => {
        if (accessToken) {
            axios.get('http://127.0.0.1:8000/user/me', { headers: { Authorization: `Bearer ${accessToken}` } })
                .then(resp => setCurrentUser(resp.data))
                .catch(() => refreshAccessToken())
        }
    }, [accessToken])

    async function signIn(email: string, password: string) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/login', { email, password })

            setAccessToken(response.data.access_token.token)
            setRefreshToken(response.data.refresh_token.token)

            localStorage.setItem('access_token', response.data.access_token.token)
            localStorage.setItem('refresh_token', response.data.refresh_token.token)

            setLoginError(null)
        } catch (error) {
            console.log('Falha no login ', error)
            setLoginError('Email ou senha inválidos')
        }

    }

    async function refreshAccessToken(){
        try {
            const response = await axios.get('http://127.0.0.1:8000/auth/get-access-token', { 
                headers: { Authorization: `Bearer ${refreshToken}` } 
            })

            setAccessToken(response.data.access_token.token)
            localStorage.setItem('access_token', response.data.access_token.token)
        } catch (error) {
            console.log(error)
            signOut()
        }
    }

    async function signOut() {
        setAccessToken(null)
        setRefreshToken(null)
        setCurrentUser(null)
        
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }

    return (
        <AuthContext.Provider value={{
            instance,
            signIn,
            signOut,
            loginError,
            accessToken,
            refreshToken,
            refreshAccessToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}