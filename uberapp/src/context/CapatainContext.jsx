import { createContext, useState, useContext } from 'react';
import { errorEmitter, successEmitter } from '../ToastEmitter';
import axios from 'axios';

export const CaptainContext = createContext();

const CaptainState = ({ children }) => {


    const [captain, setCaptain] = useState(null);

    const signupCaptainFun = async (user, navigate) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/uber/api/v3.2/captain/register`, user);
            console.log(response)

            if (response.data.success) {
                successEmitter(response.data.message)
                navigate('/captain-login')
            }
            else {
                errorEmitter(response.data.message)
            }
        } catch (error) {
            errorEmitter(error.response.data.message || 'Something went wrong')
        }

    }

    const loginCaptainFun = async (user, navigate) => {
        console.log(user)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/uber/api/v3.2/captain/login`, user);
            console.log(response)
            if (response.data.success) {
                localStorage.setItem('token', response.data.token)
                successEmitter(response.data.message)
                navigate('/captain-home')
            }
            else {
                errorEmitter(response.data.message)
            }
        } catch (error) {
            errorEmitter(error.response.data.message || 'Something went wrong')
        }
    }


    return (
        <CaptainContext.Provider value={{
            captain,
            setCaptain,
            signupCaptainFun,
            loginCaptainFun
        }}>
            {children}
        </CaptainContext.Provider>
    );
};

export default CaptainState;

export const useCaptainContext = () => {
    return useContext(CaptainContext)
}