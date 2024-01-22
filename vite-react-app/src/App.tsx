import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import MainPage from './components/MainPage'
import { useState } from 'react'


// Define the context type
export default function App(){

  const [isAuthenticated , setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  console.log(isAuthenticated);

  return (
    <>
    <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    <MainPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </>
  )
}