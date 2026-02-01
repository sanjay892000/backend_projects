import { createContext, useContext, useState } from "react"

export const authContext = createContext();

const [isLogin, setIsLogin] = useState(false);
const [user, setUser] = useState(null);



function AuthState({ children }) {
    return (
        <authContext.Provider value={{}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState

export const useAuthState = () => useContext(authContext);
