export default function BlogButton(props) {
    return (
        <div className="blog-entry">
            <h2>{props.title}</h2>
            <img 
                onClick={props.handleClick} 
                src={props.media} 
                alt={props.mediaAlt} 
            />
        </div>
    )
}