import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Start from './pages/Start';
import App from './App';
import UserLogin from './pages/UserLogin';
import Home from './pages/Home';
import UserSignup from './pages/UserSignup';
import Captainlogin from './pages/Captainlogin';
import CaptainSignup from './pages/CaptainSignup';
import CaptainHome from './pages/CaptainHome';

function Elements() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} >
        <Route path="" element={<Start />} />
        <Route path='/home' element={<Home />} />
        <Route path='/captain-home' element={<CaptainHome />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default Elements
