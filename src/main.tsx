// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'

import IntroPage from './pages/IntroPage.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter> 
    <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/" element={<IntroPage />} />
    </Routes>
  </BrowserRouter>
)
