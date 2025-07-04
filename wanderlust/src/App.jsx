import './App.css'
import About from './components/About'
import Footer from './components/Footer'
import Home from './components/Home'
import Listing from './components/Listing'
import ListingDetails from './components/ListingDetails'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      {/*    <Home/> */}
     {/*  <Listing /> */}
     {/* <ListingDetails/> */}
     <About/>
      <Footer />
    </>
  )
}

export default App
