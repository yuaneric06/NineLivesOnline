import './Blog.css'
import BlogButton from './BlogButton.jsx'
import { Outlet, useNavigate } from 'react-router'
import { blogText } from './blogText.js'

export default function Blog(props) {
    const navigate = useNavigate();
    /**
     * take in url, title, media for button
     */
    const blogButtonElements = blogText.map(obj => {
        return <BlogButton 
            key={obj.url}
            title={obj.title} 
            media={obj.media} 
            mediaAlt={obj.mediaAlt}
            handleClick={() => navigate(obj.url)}
        />
    })

    return (
        <main>
            <header className="header">
                <img src="/src/media/caligo.png" alt="picture of caligo cat" />
                <span className="header-text">
                    <h1>Paws and Reflect</h1>
                    <p>Take notes you puny human
                    </p>
                </span>
            </header>


            <section className="blog-entries">
                {blogButtonElements}
            </section>

            <Outlet />
        </main>
    )
}