import { createContext, useContext, useState, useEffect } from 'react'
import jwtDecode from "jwt-decode";

import { api } from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [data, setData] = useState({})

    function signOut() {
        localStorage.removeItem('@foodexplorer:user')
        localStorage.removeItem('@foodexplorer:token')

        setData({})
    }

    function isUserAuthenticated() {
        const user = localStorage.getItem('@foodexplorer:user')

        if (!user) {
            return false
        }

        const token = localStorage.getItem('@foodexplorer:token')
        const tokenExpiration = jwtDecode(token).exp
        const currentTime = Math.floor(Date.now() / 1000)

        if (currentTime > tokenExpiration) {
            return false
        }

        return true
    }

    async function signIn({ email, password }) {
        try {
            const response = await api.post('/sessions', { email, password })
            const { user, token } = response.data

            localStorage.setItem('@foodexplorer:user', JSON.stringify(user))
            localStorage.setItem('@foodexplorer:token', token)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setData({ user, token })
        } catch (error) {
            if (error.response) alert(error.response.data.message)
            else alert('Erro ao realizar login')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('@foodexplorer:token')
        const user = localStorage.getItem('@foodexplorer:user')

        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setData({ token, user: JSON.parse(user) })
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                isUserAuthenticated,
                user: data.user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }
