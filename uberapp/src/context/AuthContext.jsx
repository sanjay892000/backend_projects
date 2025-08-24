import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { errorEmitter, successEmitter } from '../ToastEmitter'

export const AuthContext = createContext()


const AuthState = ({ children }) => {

    const [user, setUser] = useState({

    })

    const signupAuthFun = async (user, navigate) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/uber/api/v3.2/auth/register`, user);
            console.log(response)

            if (response.data.success) {
                successEmitter(response.data.message)
                navigate('/login')
            }
            else {
                errorEmitter(response.data.message)
            }
        } catch (error) {
            errorEmitter(error.response.data.message || 'Something went wrong')
        }

    }

    const loginAuthFun = async (user, navigate) => {
        console.log(user)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/uber/api/v3.2/auth/login`, user);
            console.log(response)
            if (response.data.success) {
                localStorage.setItem('token', response.data.token)
                successEmitter(response.data.message)
                navigate('/home')
            }
            else {
                errorEmitter(response.data.message)
            }
        } catch (error) {
            errorEmitter(error.response.data.message || 'Something went wrong')
        }
    }


    return (
        <div>
            <AuthContext.Provider value={{ user, setUser, signupAuthFun, loginAuthFun }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthState;


export const useAuthContext = () => {
    return useContext(AuthContext)
}