import './Blog.css'
import BlogButton from './BlogButton.jsx'
import { useState } from 'react'

export default function About(props) {

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
                <BlogButton />
                <BlogButton />
                <BlogButton />
            </section>
        </main>
    )
}