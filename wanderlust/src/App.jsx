import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { useThemeContext } from './contextapi/themeContext/themeContext'
import { useEffect } from 'react'
import { useAuthContext } from './contextapi/authContext/authContext'

function App() {

  const { theme } = useThemeContext()

  useEffect(() => {
    let html = document.querySelector('html');
    html.classList.remove('dark', 'light');
    html.classList.add(theme);
  }, [theme])

  const { getAuthFun } = useAuthContext()
  useEffect(() => {
   if(localStorage.getItem('token')) {
      getAuthFun()
    }
  }, [])

  return (
    <main className='pt-[86px] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default App
