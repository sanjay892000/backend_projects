import React, { useState } from 'react'
import dataContext from './dataContext';
import baseUrls from '../../baseUrls';
import { toast } from 'react-toastify';

function DataState({ children }) {

  const [auth, setAuth] = useState({})

  const successToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  const errorToast = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const signupFun = async (user, navigate) => {
    try {
      const response = await fetch(`${baseUrls}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        successToast(data.message)
        navigate('/login')
      }
      else {
        errorToast(data.message)
      }
    } catch (error) {
      console.error('Error during signup:', error);
      errorToast('Internal Server Error!');
    }
  }

  const loginFun = async (user, navigate) => {
    try {
      const response = await fetch(`${baseUrls}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem('token', data.token);
        successToast(data.message)
        navigate('/')
      }
      else {
        errorToast(data.message)
      }
    } catch (error) {
      console.error('Error during login:', error);
      errorToast('Internal Server Error!');
    }
  }

  const getAuthFun = async () => {
    try {
      const response = await fetch(`${baseUrls}/api/auth/getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setAuth(data.auth)
      }
    } catch (error) {
      console.log("error fetching auth data")
    }

  }

  const updateAuthFun = (user) => { }

  const logoutFun = (logoutFun) => {
    localStorage.removeItem('token');
    setAuth({})
    successToast('Logout Successfully!');
    navigate('/login')
  }

  return (
    <dataContext.Provider value={{ auth, signupFun, loginFun, logoutFun, updateAuthFun, getAuthFun }}>
      {children}
    </dataContext.Provider>
  )
}

export default DataState;
