import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Game from './components/Game'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes>
    <Route path ="/" element={<Landing/>} />
    <Route path ="/game" element={<Game/>} />
  </Routes>
  </BrowserRouter>
)
