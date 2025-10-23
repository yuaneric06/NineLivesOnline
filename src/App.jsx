import './App.css'
import About from './components/About.jsx'
import Blog from './components/Blog.jsx'
import Image from './components/Image.jsx'
import Mission from './components/Mission.jsx'

export default function App() {

  return (
    <main>
      <section className="about">
        <About />
      </section>
      <section className="blog">
        <Blog />
      </section>
      <section className="image">
        <Image />
      </section>
      <section className="mission">
        <Mission />
      </section>
    </main>
  )
}