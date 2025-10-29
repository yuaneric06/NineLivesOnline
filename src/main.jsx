import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import About from './components/about/About.jsx'
import Blog from './components/blog/Blog.jsx'
import BlogEntry from './components/blog/BlogEntry.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/kibble-caper" element={<BlogEntry />} />
    </Routes>
  </BrowserRouter>
)
