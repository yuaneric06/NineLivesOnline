import './About.css'
import AboutFeature from './AboutFeature.jsx'
import { useState } from 'react'

export default function About(props) {
    const [hoveredSection, setHoveredSection] = useState(null);
    /**
     * born date
weight
favorite foods
hobbies
human tier list
     */

    const subjects = ["Birth date", "Weight", "Favorite food", "Hobbies", "Best human"];
    const images = [
        "/src/media/black-paw.png", 
        "/src/media/brown-paw.png", 
        "/src/media/caligo-paw.png", 
        "/src/media/gray-paw.png", 
        "/src/media/white-paw.png"
    ]
    const featureText = [
        "I was born in the third week of July, 2016. What day however, I do not know! My owners were on vacation.", 
        "I weigh 22 pounds, a little skinny if you ask me",
        "I like to steal food from the dog, that food always tastes the best... especially when he sees me", 
        "Distracting my owners from doing work, sleeping in the middle of the bed, waking owners up at 7 am to feed me", 
        "idk man that eric guy is pretty chill"
    ]

    function handleMouseEnter(subject) {
        setHoveredSection(subject);
        console.log("hovering over " + subject);
    }

    function handleMouseLeave(subject) {
        setHoveredSection(null);
        console.log("not hovering over " + subject);
    }

    const subjectElements = subjects.map((subject, index) => {
        return <AboutFeature
            title={subject}
            text={featureText[index]}
            img={images[index]}
            isHovered={hoveredSection === subject}
            handleMouseEnter={()=>handleMouseEnter(subject)}
            handleMouseLeave={()=>handleMouseLeave(subject)}
        />
    });

    return (
        <main>
            <header className="header">
                <img src="/src/media/caligo.png" alt="picture of caligo cat" />
                <span className="header-text">
                    <h1>All About Meow</h1>
                    <p>Take notes you puny human
                    </p>
                </span>
            </header>

            <section className="about-features">
                {subjectElements}
            </section>

        </main>
    )
}