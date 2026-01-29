import React from 'react'
import Home from './pages/Home'
import Room from './pages/Room'
import './index.css';
import { Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  )
}

export default App
