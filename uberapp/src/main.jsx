import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Elements from './Elements';
import AuthState from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import CaptainState from './context/CapatainContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainState>
      <AuthState>
        <Elements />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </AuthState>
    </CaptainState>
  </StrictMode>,
)
