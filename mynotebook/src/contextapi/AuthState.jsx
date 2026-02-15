import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURLS } from "./../BaseUrls";
import { errorEmitter, successEmitter } from "../ToastifyEmitter";

export const authContext = createContext(null);

function AuthState({ children }) {
  const [loader, setLoader] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const [profile, setProfile] = useState(null);

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
    setLoader(true);
    try {
      const res = await fetch(`${BASEURLS}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
        setIsLogin(true);
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

  const logoutFunc = async () => {

    setLoader(true);
    try {
      const res = await fetch(`${BASEURLS}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setProfile(null);
        setIsLogin(false);
        successEmitter("Logout successfully!");
        navigate("/login");
      }
      else {
        errorEmitter(data.message || "Logout failed. Please try again.");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false);
    }
  };


  const checkLoginStatus = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${BASEURLS}/auth/checklogin`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success) {
        setProfile(data.user);
        setIsLogin(true);
      } else {
        setIsLogin(false);
        setProfile(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const updateProfile = async (updatedData) => {
    setLoader(true);
    try {
      const res = await fetch(`${BASEURLS}/auth/profile`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
        successEmitter(data.message);
      }
      else {
        errorEmitter(data.message);
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoader(false);
    }
  };




  return (
    <authContext.Provider
      value={{
        loader,
        setLoader,
        signupFunc,
        loginFunc,
        isLogin,
        profile,
        logoutFunc,
        updateProfile,
        checkLoginStatus
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthState;

export const useAuthState = () => useContext(authContext);
