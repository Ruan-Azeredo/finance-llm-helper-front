import axios, { AxiosInstance } from "axios";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
    instance: AxiosInstance
    signIn: (email: string, password: string) => void
    signOut: () => void
    isAuthenticated: boolean | undefined
}

export const AuthContext = createContext<AuthContextType>({
    instance: axios,
    signIn: () => {},
    signOut: () => {},
    isAuthenticated: undefined
})

export function AuthProvider({ children }: {children: React.ReactNode}) {

    const [isAuthenticated, setIsAuthenticated] = useState()

    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log('token found: ', localStorage.getItem('token'))
            setIsAuthenticated(true)
            instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
            console.log('instance.defaults.headers.common["Authorization"] ', instance.defaults.headers.common['Authorization'])
            console.log('instance.defaults.headers.co', instance.defaults.headers.post['Access-Control-Allow-Origin'])
        } else {
            setIsAuthenticated(false)
        }
    }, [instance])

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