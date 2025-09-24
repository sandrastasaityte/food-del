import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import StoreContextProvider from './Context/StoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <StoreContextProvider>
         <App />
    </StoreContextProvider>
    </BrowserRouter>

)
