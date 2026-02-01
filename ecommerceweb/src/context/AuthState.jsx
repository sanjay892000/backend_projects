import { createContext, useContext, useState } from "react"
import api from './../utils/api';
import Login from './../pages/Login';
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../toast.emitter";

export const authContext = createContext();

function AuthState({ children }) {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [loader, setLoader] = useState(false);

    const checkAuth = async () => {
        setIsCheckingAuth(true);
        try {
            const response = await api.get('/auth/check');
            console.log(response.data)

            if (response.data.success) {
                setUser(response.data.user);
                setIsLogin(true);
            } else {
                setUser(null);
                setIsLogin(false);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsCheckingAuth(false);
        }
    };

    const signupFunc = async (userInfo) => {
        setLoader(true);
        try {
            const response = await api.post('/auth/signup', userInfo);
            if (response.data.success) {
                navigate("/login");
                toastSuccess(response.data.message);
            }
            else {
                toastError(response.data.message);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false);
        }
    };

    const loginFunc = async (credentials) => {
        setLoader(true);
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.success) {
                setUser(response.data.user);
                toastSuccess(response.data.message);
                setIsLogin(true);
                navigate("/");
            }
            else {
                toastError(response.data.message);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false);
        }
    };

    const logoutFunc = async () => {
        setLoader(true);
        try {
            const response = await api.post('/auth/logout');
            if (response.data.success) {
                setUser(null);
                setIsLogin(false);
                toastSuccess(response.data.message);
                navigate("/login");
            }
            else {
                toastError(response.data.message);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false);
        }
    };


    return (
        <authContext.Provider value={{ isLogin, setIsLogin, user, isCheckingAuth, setIsCheckingAuth, checkAuth, logoutFunc, loginFunc, signupFunc, loader }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState

export const useAuthState = () => useContext(authContext);
