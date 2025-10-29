export default function Feature(props) {
    return (
        <section className="dropdown">
            <div className="feature-img">
                <h1>
                    {props.title}
                </h1>
                <img
                    src={props.img}
                    alt={props.title}
                    onMouseEnter={props.handleMouseEnter}
                    onMouseLeave={props.handleMouseLeave}
                />
            </div>
            <p className="feature-text">{props.text}</p>
        </section>
    )
}