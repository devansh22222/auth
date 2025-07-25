import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  

  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path = "/" element ={<Home/>}/>
        <Route path = "/auth" element ={<Login/>}/>
      </Routes>
      
    </>
  )
}

export default App
