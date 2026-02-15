import { useNavigate } from "react-router-dom";
import { useAuthState } from "../contextapi/Authstate"
import { useEffect } from "react";


function ProtectAuth({ children }) {

    const { isLogin } = useAuthState();
    const navigate = useNavigate();
    console.log(isLogin)

    useEffect(() => {
        if (!isLogin) {
            return navigate("/login")
        }
    }, [])


    return (
        <>
            {children}
        </>
    )
}

export default ProtectAuth
