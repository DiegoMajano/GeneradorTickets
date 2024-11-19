import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NewTicket from '../components/NewTicket'
import QrReader from '../components/QrReader'
import Index from '../components/main/Index'
import Home from '../components/Home'

export default function Rutas() {

  const demoWindow = () => window
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Index window={demoWindow} />} />            
            <Route path='/home' element={<Home />} />            
            <Route path='/ticket' element={<NewTicket />} />            
            <Route path='/scanner' element={<QrReader />} />            
        </Routes>
    </BrowserRouter>
  )
}
