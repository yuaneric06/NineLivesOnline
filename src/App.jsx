import './App.css'

export default function App() {

  return (
    <main>
      <header className="header">
        <img src="/src/media/caligo.png" alt="picture of caligo cat" />
        <span className="header-text">
          <h1>Hello</h1>
          <p>My name is Kitty,
            currently spreading purrs across the internet

          </p>
        </span>
      </header>

      <section className="features">
        <section className="about-section">
          <h1>
            Learn more about me
          </h1>
          <button>
            <img className="feature-image" src="/src/media/about-bowl.png" alt="About" />
          </button>
        </section>
        <section className="blog-section">
          <h1>
            A day in the life
          </h1>
          <button>
            <img className="feature-image" src="/src/media/blog-bowl.png" alt="Blog" />
          </button>
        </section>
        <section className="generate-section">
          <h1>
            Live cat camera
          </h1>
          <button>
            <img className="feature-image" src="/src/media/generate-img-bowl.png" alt="Generate cat picture" />
          </button>
        </section>
        <section className="mission-section">
          <h1>
            Super secret missions
          </h1>
          <button>
            <img className="feature-image" src="/src/media/mission-bowl.png" alt="Missions" />
          </button>
        </section>
      </section>
    </main>
  )
}