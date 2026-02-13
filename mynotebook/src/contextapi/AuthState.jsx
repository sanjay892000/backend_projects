import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURLS } from "./../BaseUrls";
import { errorEmitter, successEmitter } from "../ToastifyEmitter";

export const authContext = createContext(null);

function AuthState({ children }) {
  const [loader, setLoader] = useState(false);

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") || false,
  );

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const signupFunc = async (signUser, setSignUser) => {
    setLoader(true);
    try {
      const res = await fetch(`${BASEURLS}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUser),
      });

      const data = await res.json();

      if (data.success) {
        setSignUser({ name: "", email: "", password: "" });
        successEmitter(data.message);
        navigate("/login");
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const loginFunc = async (loginUser, setLoginUser) => {
    console.log(loginUser);
    setLoader(true);
    try {
      const res = await fetch(`${BASEURLS}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsLogin(data.token);
        setLoginUser({ email: "", password: "" });
        successEmitter(data.message);
        navigate("/");
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const logoutFunc = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    successEmitter("Logout successfully!");
    navigate("/login");
  };

  return (
    <authContext.Provider
      value={{
        loader,
        setLoader,
        signupFunc,
        loginFunc,
        isLogin,
        user,
        logoutFunc,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthState;

export const useAuthState = () => useContext(authContext);
