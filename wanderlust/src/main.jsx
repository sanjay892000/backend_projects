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

const router = createBrowserRouter(
  createRoutesFromElements(
   
      <Route path='/' element={<App />} >
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='listing' element={<Listing />} />
        <Route path='addlisting' element={<AddListing />} />

      </Route>
    
  )
)


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
  </RouterProvider>,
)
