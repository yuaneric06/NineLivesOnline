import './App.css'
import Feature from './components/Feature.jsx'
import { useNavigate } from 'react-router'

export default function App() {
  const navigate = useNavigate();

  return (
    <main>
      <header className="app-header">
        <img src="/src/media/caligo.png" alt="picture of caligo cat" />
        <span className="header-text">
          <h1>Hello</h1>
          <p>My name is Kitty,
            currently spreading purrs across the internet

          </p>
        </span>
      </header>

      <section className="app-features">
        <Feature 
          name="about" 
          text="Learn more about me" 
          img="/src/media/about-bowl.png" 
          handleClick={() => navigate("/about")}
        />

        <Feature 
          name="blog" 
          text="A day in the life" 
          img="/src/media/blog-bowl.png" 
          handleClick={() => navigate("/blog")}
        />
        
        <Feature 
          name="game" 
          text="Catch the rat game" 
          img="/src/media/game-bowl.png"
          handleClick={() => navigate("/game")}
        />
      </section>
    </main>
  )
}