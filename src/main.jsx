import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import About from './components/about/About.jsx'
import BlogRoutes from './components/blog/BlogRoutes.jsx'
import BlogEntry from './components/blog/BlogEntry.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      {BlogRoutes()}
    </Routes>
  </BrowserRouter>
)
