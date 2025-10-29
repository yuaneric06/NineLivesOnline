export default function Feature(props) {
    return (
        <section>
            <h1>
                {props.text}
            </h1>
            <button onClick={props.handleClick}>
                <img className="feature-image" src={props.img} alt={props.name} />
            </button>
        </section>
    )
}