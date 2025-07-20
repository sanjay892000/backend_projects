import React, { useEffect } from 'react'
import About from './components/About';
import Home from './components/Home';
import Listing from './components/Listing';
import ListingDetails from './components/ListingDetails';
import App from './App.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom';
import AddListing from './components/AddListing.jsx';
import Contact from './components/Contact';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import { useAuthContext } from './contextapi/authContext/authContext.js';

function Elements() {

  const { isLogin,  } = useAuthContext();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App />} >
                <Route path='' element={<Home />} />
                <Route path='listing' element={<Listing hidden={true} />} />
                <Route path='yourpost' element={<Listing hidden={false} userid={localStorage.getItem('userid')} />} />
                <Route path='addlisting' element={isLogin ? <AddListing /> : <Login />} />
                <Route path='profile' element={<Profile />} />
                <Route path='listdetails/:listId' element={<ListingDetails />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
                <Route path='*' element={<ErrorPage />} />
            </Route>
        )
    )


    return (
        <RouterProvider router={router} />
    )
}

export default Elements
