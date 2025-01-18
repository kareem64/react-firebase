import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter}from 'react-router-dom'
import {ToastContainer}from 'react-toastify'
import'react-toastify/dist/ReactToastify.css'
import {GoogleOAuthProvider}from '@react-oauth/google'
import {AuthContextProvider}from './context/AuthContextProvider.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
createRoot(document.getElementById('root')).render(
     <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <ToastContainer position='top-center' theme='colored'/>
   <AuthContextProvider>
    <Provider store={store}>
       <App />
    </Provider>
   </AuthContextProvider>
     
   
    
      </GoogleOAuthProvider>
    </BrowserRouter>
   
)
