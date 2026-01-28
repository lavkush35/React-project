import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Videoroom from './pages/Videoroom'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/room/:roomID' element={<Videoroom/>}/>
    </Routes>
    </>
  )
}

export default App
