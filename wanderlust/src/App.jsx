import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {

  return (
    <main className='pt-[88px]'>
      <Navbar />
     <Outlet/>
      <Footer />
    </main>
  )
}

export default App
