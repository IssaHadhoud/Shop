import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <GoogleOAuthProvider >
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
