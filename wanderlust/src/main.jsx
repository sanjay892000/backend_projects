import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import ThemeState from './contextapi/themeContext/ThemeState.jsx';
import AuthState from './contextapi/authContext/AuthState.jsx';
import { ToastContainer } from 'react-toastify';
import ListingState from './contextapi/listingContext/ListingState';
import Elements from './Elements.jsx';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeState>
      <AuthState>
        <ListingState>
          <Elements />
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
        </ListingState>
      </AuthState>
    </ThemeState>
  </StrictMode>
)
