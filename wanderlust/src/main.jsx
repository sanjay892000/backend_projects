import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './components/About'
import Home from './components/Home'
import Listing from './components/Listing'
import ListingDetails from './components/ListingDetails'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AddListing from './components/AddListing.jsx'
import Contact from './components/Contact';
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import ThemeState from './contextapi/themeContext/ThemeState.jsx'
import DataState from './contextapi/dataContext/DataState.jsx'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />} >
      <Route path='' element={<Home />} />
      <Route path='listing' element={<Listing />} />
      <Route path='addlisting' element={<AddListing />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />

    </Route>

  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeState>
      <DataState>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </DataState>
    </ThemeState>
  </StrictMode>
)
