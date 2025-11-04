import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import About from './components/about/About.jsx'
import BlogRoutes from './components/blog/BlogRoutes.jsx'
import Game from './components/game/Game.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/game" element={<Game />} />
      {BlogRoutes()}
    </Routes>
  </BrowserRouter>
)
