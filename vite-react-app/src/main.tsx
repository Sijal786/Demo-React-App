import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import ErrorPage from './ErrorPage.tsx'
import MainPage from './components/MainPage.tsx'
import Login from './components/Login.tsx'
import SignUp from './components/Signup.tsx'
import App from './App.tsx'
import Sign from './components/Sign.tsx'
import PaymentModule from './components/PaymentModule.tsx'



const router = createBrowserRouter([
  { 
    path : "/",
    element : <Sign/>,
    errorElement : <ErrorPage />,
  },
  { 
    path : "/Login",
    element : <Login/>,
    errorElement : <ErrorPage />,
  },
  { 
    path : "/signup",
    element : <SignUp />,
    errorElement : <ErrorPage />,
  }, 
  { 
    path : "/mainpage",
    element : <MainPage />,
    errorElement : <ErrorPage />,
  }, 
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
